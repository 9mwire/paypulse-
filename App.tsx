import { useEffect, useMemo, useState } from "react";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  account?: string;
  date: string;
};

type DemoData = { balance: number; transactions: Transaction[] };

const STORAGE_KEY = "paypulse-demo-wallet-v1";
const DAILY_LIMIT = 1_000_000;
const STARTING_BALANCE = 250_000;
const demoRecipients: Record<string, string> = {
  "0123456789": "Ada Okafor (Demo)",
  "9876543210": "Emeka Obi (Demo)",
};

const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f3f6f5; color: #14251e; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  button, input, select { font: inherit; }
  button { cursor: pointer; }
  .app { min-height: 100vh; }
  .topbar { background: #073b2c; color: white; padding: 16px max(20px, calc((100% - 1080px)/2)); display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .brand { display:flex; align-items:center; gap:10px; font-size:20px; font-weight:800; letter-spacing:-.5px; }
  .brand-mark { width:34px; height:34px; display:grid; place-items:center; border-radius:11px; background:#19bd7b; color:#073b2c; font-weight:900; }
  .demo-pill { background:#fff3cc; color:#795400; border-radius:999px; padding:7px 11px; font-size:12px; font-weight:800; }
  .shell { max-width:1080px; margin:0 auto; padding:28px 20px 56px; }
  .notice { border:1px solid #f1d88e; background:#fff9e8; color:#624b13; padding:12px 15px; border-radius:13px; font-size:13px; line-height:1.55; margin-bottom:22px; }
  .heading { display:flex; justify-content:space-between; align-items:flex-end; gap:12px; margin-bottom:18px; }
  h1 { font-size:28px; margin:0 0 5px; letter-spacing:-.8px; }
  .muted { color:#718078; font-size:14px; }
  .grid { display:grid; grid-template-columns:1.1fr .9fr; gap:18px; }
  .card { background:#fff; border:1px solid #e6ece8; border-radius:18px; padding:22px; box-shadow:0 5px 18px #123b2b0a; }
  .balance-card { background:linear-gradient(135deg,#08734e,#06432f); color:white; min-height:205px; position:relative; overflow:hidden; }
  .balance-card:after { content:""; position:absolute; width:230px; height:230px; border:1px solid #ffffff20; border-radius:50%; right:-80px; top:40px; box-shadow:0 0 0 30px #ffffff08,0 0 0 60px #ffffff06; }
  .balance-label { color:#d5eee3; font-size:14px; }
  .balance { font-size:38px; font-weight:800; letter-spacing:-1.4px; margin:12px 0 18px; }
  .small-balance-note { color:#c2e5d6; font-size:12px; }
  .limit-row { display:flex; justify-content:space-between; font-size:12px; color:#d5eee3; margin-top:12px; }
  .progress { height:6px; background:#ffffff35; border-radius:10px; overflow:hidden; margin-top:7px; }
  .progress > i { display:block; height:100%; background:#a7f3cd; border-radius:10px; }
  .actions { display:flex; gap:10px; margin-top:17px; }
  .btn { border:0; border-radius:11px; padding:11px 15px; background:#0b8b5c; color:#fff; font-weight:750; }
  .btn:hover { filter:brightness(.95); }
  .btn.secondary { background:#e8f5ee; color:#08734e; }
  .btn.ghost { background:#f0f3f1; color:#47574f; }
  .btn.full { width:100%; }
  .form-title { font-size:17px; font-weight:800; margin:0 0 16px; }
  .field { margin-bottom:13px; }
  .field label { display:block; font-size:12px; color:#607168; font-weight:700; margin-bottom:6px; }
  .field input, .field select { width:100%; border:1px solid #dce5df; border-radius:10px; padding:11px 12px; outline:none; background:#fff; color:#14251e; }
  .field input:focus, .field select:focus { border-color:#159b68; box-shadow:0 0 0 3px #159b6819; }
  .recipient { padding:11px 12px; border-radius:10px; margin:0 0 13px; background:#eaf7ef; color:#12613f; font-size:13px; font-weight:700; }
  .recipient small { display:block; font-weight:500; margin-top:3px; color:#557565; }
  .section-head { display:flex; justify-content:space-between; align-items:center; margin:25px 0 12px; }
  .section-head h2 { font-size:18px; margin:0; }
  .history { padding:0; overflow:hidden; }
  .transaction { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:15px 18px; border-top:1px solid #eef1ef; }
  .transaction:first-child { border-top:0; }
  .tx-left { display:flex; align-items:center; gap:12px; min-width:0; }
  .tx-icon { width:38px; height:38px; display:grid; place-items:center; border-radius:12px; background:#eaf7ef; color:#08734e; font-weight:900; flex:none; }
  .tx-icon.debit { background:#fff0eb; color:#c25536; }
  .tx-name { font-weight:750; font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .tx-date { color:#839087; font-size:11px; margin-top:4px; }
  .tx-amount { white-space:nowrap; font-size:14px; font-weight:800; }
  .credit-text { color:#08734e; } .debit-text { color:#bd5137; }
  .empty { padding:25px; text-align:center; color:#7b8981; font-size:14px; }
  .footer-note { color:#819087; font-size:11px; line-height:1.5; margin-top:14px; }
  .reset { color:#64746b; background:none; border:0; text-decoration:underline; font-size:12px; }
  @media(max-width:720px) { .shell{padding:20px 14px 40px}.grid{grid-template-columns:1fr}.balance{font-size:34px}.heading{align-items:flex-start; flex-direction:column}.topbar{padding:13px 15px} }
`;

function readDemoData(): DemoData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as DemoData;
      if (typeof parsed.balance === "number" && Array.isArray(parsed.transactions)) return parsed;
    }
  } catch {
    // Ignore unavailable storage or invalid demo data and start with a clean wallet.
  }
  return { balance: STARTING_BALANCE, transactions: [] };
}

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(amount);
}

function dayStartTimestamp(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export default function App() {
  const [wallet, setWallet] = useState<DemoData>(readDemoData);
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("Demo Bank");
  const [sendAmount, setSendAmount] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet)); } catch { /* Demo still works for this session. */ }
  }, [wallet]);

  const sentToday = useMemo(() => {
    const start = dayStartTimestamp();
    return wallet.transactions
      .filter((tx) => tx.type === "debit" && new Date(tx.date).getTime() >= start)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [wallet.transactions]);
  const remainingLimit = Math.max(0, DAILY_LIMIT - sentToday);
  const resolvedName = accountNumber.length === 10
    ? (demoRecipients[accountNumber] ?? `Demo Account ${accountNumber.slice(-4)}`)
    : "";

  function recordTransaction(type: Transaction["type"], amount: number, description: string, account?: string) {
    const transaction: Transaction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      amount,
      description,
      account,
      date: new Date().toISOString(),
    };
    setWallet((current) => ({
      balance: current.balance + (type === "credit" ? amount : -amount),
      transactions: [transaction, ...current.transactions],
    }));
  }

  function handleAddMoney(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(addAmount);
    if (!Number.isFinite(amount) || amount <= 0) return setMessage("Enter an amount greater than zero.");
    if (amount > 100_000_000) return setMessage("For this demo, add-money amounts are capped at ₦100,000,000.");
    recordTransaction("credit", amount, "Demo money added", "Demo top-up");
    setAddAmount("");
    setMessage(`${formatNaira(amount)} added to your demo wallet.`);
  }

  function handleSendMoney(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(sendAmount);
    if (accountNumber.length !== 10) return setMessage("Enter a 10-digit demo account number.");
    if (!Number.isFinite(amount) || amount <= 0) return setMessage("Enter an amount greater than zero.");
    if (amount > wallet.balance) return setMessage("Your demo wallet balance is not enough for this transfer.");
    if (amount > remainingLimit) return setMessage(`This transfer is over your remaining daily demo limit of ${formatNaira(remainingLimit)}.`);
    recordTransaction("debit", amount, `Demo transfer to ${resolvedName}`, `${bank} • ${accountNumber}`);
    setSendAmount("");
    setAccountNumber("");
    setMessage(`${formatNaira(amount)} demo transfer completed. No real money was sent.`);
  }

  function resetDemo() {
    setWallet({ balance: STARTING_BALANCE, transactions: [] });
    setMessage("Demo wallet reset to its starting balance.");
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <header className="topbar">
        <div className="brand"><span className="brand-mark">P</span><span>PayPulse</span></div>
        <span className="demo-pill">DEMO WALLET · NO REAL MONEY</span>
      </header>
      <main className="shell">
        <div className="notice"><strong>Demo only:</strong> balances, account-name matches, and transfers are simulated in this browser. No bank is contacted and no real money is added or sent. The 10-digit account-name results below are fictional examples.</div>
        <div className="heading">
          <div><h1>Your wallet</h1><div className="muted">A simple PayPulse demo wallet experience</div></div>
          <button className="reset" onClick={resetDemo} type="button">Reset demo data</button>
        </div>
        <section className="grid">
          <div className="card balance-card">
            <div className="balance-label">Available demo balance</div>
            <div className="balance">{formatNaira(wallet.balance)}</div>
            <div className="small-balance-note">Starting demo funds are fictional and stored on this device.</div>
            <div className="limit-row"><span>Daily sending limit</span><span>{formatNaira(sentToday)} / {formatNaira(DAILY_LIMIT)}</span></div>
            <div className="progress"><i style={{ width: `${Math.min(100, (sentToday / DAILY_LIMIT) * 100)}%` }} /></div>
            <div className="limit-row"><span>Remaining today</span><strong>{formatNaira(remainingLimit)}</strong></div>
          </div>
          <form className="card" onSubmit={handleAddMoney}>
            <h2 className="form-title">Add demo money</h2>
            <div className="field"><label htmlFor="add-amount">Amount (NGN)</label><input id="add-amount" inputMode="decimal" type="number" min="1" step="0.01" placeholder="e.g. 5000" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} required /></div>
            <button className="btn full" type="submit">＋ Add to demo wallet</button>
            <div className="footer-note">This only changes the simulated balance and creates a demo transaction record.</div>
          </form>
        </section>

        <section className="grid" style={{ marginTop: 18 }}>
          <form className="card" onSubmit={handleSendMoney}>
            <h2 className="form-title">Send demo money</h2>
            <div className="field"><label htmlFor="bank">Bank</label><select id="bank" value={bank} onChange={(e) => setBank(e.target.value)}><option>Demo Bank</option><option>Example Microfinance Bank</option><option>Sample Digital Bank</option></select></div>
            <div className="field"><label htmlFor="account">Account number</label><input id="account" inputMode="numeric" autoComplete="off" maxLength={10} placeholder="Enter 10 digits" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} required /></div>
            {resolvedName && <div className="recipient">✓ Simulated account name: {resolvedName}<small>Fictional demo match · not verified with a bank</small></div>}
            <div className="field"><label htmlFor="send-amount">Amount (NGN)</label><input id="send-amount" inputMode="decimal" type="number" min="1" step="0.01" placeholder="e.g. 2500" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} required /></div>
            <button className="btn full" type="submit">Send demo money</button>
            <div className="footer-note">Transfers are simulated only. Daily demo sending limit: ₦1,000,000.</div>
          </form>
          <div>
            <div className="section-head" style={{ marginTop: 0 }}><h2>Recent activity</h2><span className="muted">{wallet.transactions.length} transactions</span></div>
            <div className="card history">
              {wallet.transactions.length === 0 ? <div className="empty">No transactions yet.<br />Add demo money or try a demo transfer.</div> : wallet.transactions.slice(0, 6).map((tx) => (
                <div className="transaction" key={tx.id}>
                  <div className="tx-left"><span className={`tx-icon ${tx.type === "debit" ? "debit" : ""}`}>{tx.type === "credit" ? "+" : "↗"}</span><div style={{ minWidth: 0 }}><div className="tx-name">{tx.description}</div><div className="tx-date">{new Date(tx.date).toLocaleString()} {tx.account ? ` · ${tx.account}` : ""}</div></div></div>
                  <div className={`tx-amount ${tx.type === "credit" ? "credit-text" : "debit-text"}`}>{tx.type === "credit" ? "+" : "−"}{formatNaira(tx.amount)}</div>
                </div>
              ))}
            </div>
            {wallet.transactions.length > 6 && <div className="footer-note">Showing the latest 6 of {wallet.transactions.length}. Demo history is saved in this browser.</div>}
          </div>
        </section>
        {message && <div role="status" aria-live="polite" className="notice" style={{ marginTop: 18, marginBottom: 0 }}>{message}</div>}
      </main>
    </div>
  );
}
