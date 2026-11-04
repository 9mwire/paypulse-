import { useEffect, useMemo, useState, type FormEvent } from "react";

type TransactionType = "credit" | "debit" | "save" | "withdraw";
type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  detail?: string;
  date: string;
};
type WalletData = { balance: number; savings: number; transactions: Transaction[] };
type Tab = "home" | "transfer" | "savings" | "rewards" | "profile";
type Modal = "add" | "qr" | null;

const STORAGE_KEY = "paypulse-demo-wallet-v1";
const DAILY_LIMIT = 1_000_000;
const STARTING_BALANCE = 250_000;
const demoRecipients: Record<string, string> = {
  "0123456789": "Ada Okafor (Demo)",
  "9876543210": "Emeka Obi (Demo)",
};

const css = `
  :root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#14251e;background:#f4f7f5;font-synthesis:none;text-rendering:optimizeLegibility}
  *{box-sizing:border-box}body{margin:0;min-width:320px;background:#f4f7f5}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #21b98170;outline-offset:2px}
  .app{min-height:100vh;--surface:#fff;--bg:#f4f7f5;--ink:#14251e;--muted:#75847b;--line:#e7eeea;--soft:#eff7f2;background:var(--bg);color:var(--ink);transition:background .2s,color .2s}
  .app.dark{--surface:#16231d;--bg:#0e1712;--ink:#eff8f2;--muted:#9aaba0;--line:#2a3a31;--soft:#1d3026}
  .topbar{height:68px;background:var(--surface);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 max(20px,calc((100% - 1180px)/2));position:sticky;top:0;z-index:5}
  .brand{display:flex;align-items:center;gap:10px;font-weight:850;font-size:20px;letter-spacing:-.6px}.brandmark{width:35px;height:35px;border-radius:12px;background:#0c875a;color:white;display:grid;place-items:center;font-size:20px;font-weight:900}.top-right{display:flex;align-items:center;gap:12px}.demo-pill{border-radius:999px;padding:7px 10px;background:#fff2cf;color:#765500;font-size:10px;font-weight:850;letter-spacing:.5px}.avatar{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#d6f1e2;color:#08734e;font-weight:800}
  .layout{max-width:1180px;margin:0 auto;padding:24px 20px 50px;display:grid;grid-template-columns:220px minmax(0,1fr);gap:25px}.sidebar{position:sticky;top:91px;height:max-content;display:flex;flex-direction:column;gap:6px;padding:10px;background:var(--surface);border:1px solid var(--line);border-radius:18px}.navbtn{border:0;background:transparent;color:var(--muted);padding:12px 13px;border-radius:11px;text-align:left;font-weight:700;display:flex;gap:12px;align-items:center}.navbtn.active{background:#e8f6ee;color:#08734e}.dark .navbtn.active{background:#1d3d2c;color:#8ce0b6}.navicon{width:21px;text-align:center;font-size:17px}.content{min-width:0}.pagehead{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:0 0 18px}.pagehead h1{font-size:25px;margin:0 0 5px;letter-spacing:-.8px}.muted{color:var(--muted);font-size:13px}.notice{border:1px solid #f0d98f;background:#fff9e8;color:#654f17;padding:11px 14px;border-radius:12px;font-size:12px;line-height:1.55;margin-bottom:17px}
  .grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(270px,.85fr);gap:16px}.stack{display:flex;flex-direction:column;gap:16px}.card{background:var(--surface);border:1px solid var(--line);border-radius:17px;padding:20px;box-shadow:0 5px 18px #102f2008}.balance-card{background:linear-gradient(130deg,#08734e,#06412e);color:#fff;min-height:213px;position:relative;overflow:hidden;padding:22px}.balance-card:after{content:"";position:absolute;width:245px;height:245px;border:1px solid #ffffff20;border-radius:50%;right:-75px;top:20px;box-shadow:0 0 0 28px #ffffff08,0 0 0 58px #ffffff06;pointer-events:none}.balance-top{display:flex;align-items:center;justify-content:space-between;color:#d4ede1;font-size:13px;position:relative;z-index:1}.balance{font-size:36px;font-weight:850;letter-spacing:-1.3px;margin:10px 0 18px;position:relative;z-index:1}.balance-actions{display:flex;gap:9px;position:relative;z-index:1}.btn{border:0;border-radius:10px;background:#0b8b5c;color:#fff;padding:11px 15px;font-weight:750}.btn:hover{filter:brightness(.96)}.btn.white{background:white;color:#08734e}.btn.soft{background:var(--soft);color:#08734e}.dark .btn.soft{color:#92e0b8}.btn.ghost{background:transparent;border:1px solid var(--line);color:var(--ink)}.btn.full{width:100%}.round-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:15px}.quick{border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:12px 7px;text-align:center;color:var(--ink);font-weight:700;font-size:12px}.quick:hover{border-color:#9bd4b6}.quick-icon{display:grid;place-items:center;margin:0 auto 7px;width:38px;height:38px;border-radius:13px;background:var(--soft);color:#08734e;font-size:18px}
  .section-title{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 13px}.section-title h2{font-size:16px;margin:0;letter-spacing:-.3px}.linkbtn{border:0;background:none;color:#08734e;font-weight:750;font-size:12px;padding:4px}.dark .linkbtn{color:#8ce0b6}.limit-line{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:var(--muted);margin:13px 0 7px}.progress{height:7px;background:#e6eee9;border-radius:9px;overflow:hidden}.progress i{display:block;height:100%;background:#21b981;border-radius:9px}.dark .progress{background:#2b3c32}.transaction{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 0;border-top:1px solid var(--line)}.transaction:first-of-type{border-top:0}.txleft{display:flex;align-items:center;gap:11px;min-width:0}.txicon{width:38px;height:38px;border-radius:13px;background:#e8f6ee;color:#08734e;display:grid;place-items:center;font-weight:900;flex:none}.txicon.debit{background:#fff0eb;color:#bd5137}.txicon.save{background:#f2ecff;color:#7654b4}.txname{font-size:13px;font-weight:750;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.txdate{font-size:10px;color:var(--muted);margin-top:4px}.txamount{font-size:13px;font-weight:800;white-space:nowrap}.positive{color:#08734e}.negative{color:#bd5137}.dark .positive{color:#8ce0b6}.empty{padding:22px 10px;text-align:center;color:var(--muted);font-size:13px}
  .field{margin-bottom:13px}.field label{display:block;font-size:12px;color:var(--muted);font-weight:700;margin-bottom:6px}.field input,.field select{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:10px;color:var(--ink);background:var(--surface)}.form-title{font-size:17px;font-weight:800;margin:0 0 15px}.recipient{background:var(--soft);color:#12613f;border-radius:10px;padding:11px 12px;font-size:12px;font-weight:750;margin:0 0 13px}.dark .recipient{color:#9fe0bb}.recipient small{display:block;font-weight:500;color:var(--muted);margin-top:3px}.footnote{font-size:11px;line-height:1.5;color:var(--muted);margin-top:12px}.vault{background:linear-gradient(135deg,#f3efff,#fff);border:1px solid #e8defc}.dark .vault{background:linear-gradient(135deg,#2a2239,#1a251e);border-color:#3a304b}.vault-amount{font-size:27px;font-weight:850;margin:10px 0}.feature{padding:18px;border-radius:15px;background:linear-gradient(130deg,#e7f7ed,#f8fff9);border:1px solid #d8efe0}.dark .feature{background:#1c3426;border-color:#2d4b38}.feature h3{margin:0 0 6px;font-size:15px}.feature p{margin:0;color:var(--muted);font-size:12px;line-height:1.5}.statgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.stat{padding:15px;background:var(--soft);border-radius:13px}.stat strong{font-size:19px;display:block;margin-bottom:4px}.stat span{font-size:11px;color:var(--muted)}
  .mobile-nav{display:none}.modal-backdrop{position:fixed;inset:0;background:#061b12a6;z-index:10;display:grid;place-items:center;padding:18px}.modal{width:min(100%,440px);background:var(--surface);color:var(--ink);border-radius:18px;padding:22px;box-shadow:0 20px 80px #0003}.modalhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.modalhead h2{font-size:18px;margin:0}.close{border:0;background:var(--soft);color:var(--ink);border-radius:9px;width:34px;height:34px;font-size:20px}.qrbox{width:190px;height:190px;margin:15px auto;background:repeating-conic-gradient(#10291d 0% 25%,#fff 0% 50%) 50% / 18px 18px;border:12px solid white;outline:1px solid var(--line);border-radius:9px;position:relative}.qrbox:after{content:"DEMO";position:absolute;inset:65px 42px;background:#fff;display:grid;place-items:center;font-weight:900;color:#08734e;font-size:13px;letter-spacing:1px}.status{border-radius:11px;background:var(--soft);padding:11px 13px;font-size:12px;margin-top:15px;color:var(--ink)}.reset{border:0;background:none;color:var(--muted);text-decoration:underline;font-size:12px;padding:6px}
  @media(max-width:760px){.topbar{height:60px;padding:0 15px}.layout{display:block;padding:18px 13px 94px}.sidebar{display:none}.grid{grid-template-columns:1fr}.pagehead h1{font-size:23px}.balance{font-size:33px}.mobile-nav{position:fixed;z-index:6;bottom:0;left:0;right:0;display:grid;grid-template-columns:repeat(5,1fr);padding:7px 5px max(7px,env(safe-area-inset-bottom));background:var(--surface);border-top:1px solid var(--line)}.mobile-nav .navbtn{padding:5px 2px;display:flex;flex-direction:column;gap:3px;text-align:center;font-size:9px;border-radius:9px}.mobile-nav .navicon{font-size:17px}.demo-pill{font-size:9px;padding:6px 8px}.round-actions{gap:7px}.quick{font-size:11px}}
`;

function loadWallet(): WalletData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as Partial<WalletData>;
      if (typeof data.balance === "number" && Array.isArray(data.transactions)) {
        return { balance: data.balance, savings: typeof data.savings === "number" ? data.savings : 0, transactions: data.transactions };
      }
    }
  } catch { /* Start with fresh demo data if browser storage is unavailable or invalid. */ }
  return { balance: STARTING_BALANCE, savings: 0, transactions: [] };
}

function money(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(amount);
}

function todayStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

const navItems: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "transfer", label: "Transfer", icon: "↗" },
  { id: "savings", label: "Savings", icon: "▤" },
  { id: "rewards", label: "Rewards", icon: "✦" },
  { id: "profile", label: "Profile", icon: "●" },
];

export default function App() {
  const [wallet, setWallet] = useState<WalletData>(loadWallet);
  const [tab, setTab] = useState<Tab>("home");
  const [modal, setModal] = useState<Modal>(null);
  const [dark, setDark] = useState(false);
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("Demo Bank");
  const [sendAmount, setSendAmount] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet)); } catch { /* Current session remains usable without storage. */ }
  }, [wallet]);

  const sentToday = useMemo(() => {
    const start = todayStart();
    return wallet.transactions.filter((tx) => tx.type === "debit" && new Date(tx.date).getTime() >= start).reduce((sum, tx) => sum + tx.amount, 0);
  }, [wallet.transactions]);
  const remaining = Math.max(0, DAILY_LIMIT - sentToday);
  const recipientName = account.length === 10 ? (demoRecipients[account] ?? `Demo Account ${account.slice(-4)}`) : "";
  const points = Math.floor(wallet.transactions.reduce((sum, tx) => sum + tx.amount, 0) / 1000);

  function addTransaction(type: TransactionType, amount: number, description: string, detail?: string) {
    const tx: Transaction = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type, amount, description, detail, date: new Date().toISOString() };
    setWallet((current) => ({
      balance: current.balance + (type === "credit" || type === "withdraw" ? amount : type === "debit" || type === "save" ? -amount : 0),
      savings: current.savings + (type === "save" ? amount : type === "withdraw" ? -amount : 0),
      transactions: [tx, ...current.transactions],
    }));
  }

  function submitAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(addAmount);
    if (!Number.isFinite(amount) || amount <= 0) return setMessage("Enter an amount greater than zero.");
    if (amount > 100_000_000) return setMessage("Demo top-ups are capped at ₦100,000,000.");
    addTransaction("credit", amount, "Demo money added", "Simulated top-up");
    setAddAmount(""); setModal(null); setMessage(`${money(amount)} added to your demo wallet.`);
  }

  function submitSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(sendAmount);
    if (account.length !== 10) return setMessage("Enter a 10-digit demo account number.");
    if (!Number.isFinite(amount) || amount <= 0) return setMessage("Enter an amount greater than zero.");
    if (amount > wallet.balance) return setMessage("Your demo wallet balance is not enough for this transfer.");
    if (amount > remaining) return setMessage(`The transfer is over your remaining daily demo limit of ${money(remaining)}.`);
    addTransaction("debit", amount, `Demo transfer to ${recipientName}`, `${bank} · ${account}`);
    setSendAmount(""); setAccount(""); setMessage(`${money(amount)} demo transfer completed. No real money was sent.`);
  }

  function submitSavings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(savingsAmount);
    if (!Number.isFinite(amount) || amount <= 0) return setMessage("Enter a savings amount greater than zero.");
    if (amount > wallet.balance) return setMessage("Your available demo balance is too low.");
    addTransaction("save", amount, "Moved into demo savings", "Savings vault");
    setSavingsAmount(""); setMessage(`${money(amount)} moved to demo savings.`);
  }

  function withdrawSavings() {
    if (wallet.savings <= 0) return setMessage("There is no demo savings balance to withdraw.");
    addTransaction("withdraw", wallet.savings, "Withdrawn from demo savings", "Savings vault");
    setMessage(`${money(wallet.savings)} moved back to your demo wallet.`);
  }

  function reset() {
    setWallet({ balance: STARTING_BALANCE, savings: 0, transactions: [] });
    setMessage("Demo data reset to the fictional starting balance.");
  }

  function history(limit = 6) {
    const items = wallet.transactions.slice(0, limit);
    if (!items.length) return <div className="empty">No transactions yet. Try adding demo money or making a demo transfer.</div>;
    return items.map((tx) => {
      const isPositive = tx.type === "credit" || tx.type === "withdraw";
      const symbol = tx.type === "credit" ? "+" : tx.type === "debit" ? "↗" : tx.type === "save" ? "▤" : "↓";
      return <div className="transaction" key={tx.id}>
        <div className="txleft"><span className={`txicon ${tx.type === "debit" ? "debit" : tx.type === "save" ? "save" : ""}`}>{symbol}</span><div style={{ minWidth: 0 }}><div className="txname">{tx.description}</div><div className="txdate">{new Date(tx.date).toLocaleString()} {tx.detail ? ` · ${tx.detail}` : ""}</div></div></div>
        <div className={`txamount ${isPositive ? "positive" : tx.type === "debit" ? "negative" : ""}`}>{isPositive ? "+" : "−"}{money(tx.amount)}</div>
      </div>;
    });
  }

  function renderHome() {
    return <>
      <div className="pagehead"><div><h1>Good day 👋</h1><div className="muted">Here’s what’s happening with your demo wallet.</div></div><div className="avatar" title="Demo profile">P</div></div>
      <div className="notice"><strong>Demo only:</strong> account names and transactions are fictional. No bank is contacted and no real money is added, stored, or sent.</div>
      <div className="grid">
        <div>
          <section className="balance-card"><div className="balance-top"><span>Available demo balance</span><span>•••</span></div><div className="balance">{money(wallet.balance)}</div><div className="balance-actions"><button className="btn white" onClick={() => setModal("add")}>＋ Add money</button><button className="btn" onClick={() => setTab("transfer")}>↗ Send money</button></div></section>
          <div className="round-actions">
            <button className="quick" onClick={() => setModal("add")}><span className="quick-icon">＋</span>Add money</button>
            <button className="quick" onClick={() => setTab("transfer")}><span className="quick-icon">↗</span>Transfer</button>
            <button className="quick" onClick={() => setTab("savings")}><span className="quick-icon">▤</span>Savings</button>
            <button className="quick" onClick={() => setModal("qr")}><span className="quick-icon">▦</span>QR pay</button>
          </div>
          <section className="card" style={{ marginTop: 16 }}><div className="section-title"><h2>Recent activity</h2><button className="linkbtn" onClick={() => setTab("profile")}>View history</button></div>{history(5)}</section>
        </div>
        <div className="stack">
          <section className="card"><div className="section-title"><h2>Daily transfer limit</h2><span className="muted">Today</span></div><div style={{ fontSize: 22, fontWeight: 850 }}>{money(remaining)} <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>left</span></div><div className="limit-line"><span>{money(sentToday)} used</span><span>{money(DAILY_LIMIT)} daily limit</span></div><div className="progress"><i style={{ width: `${Math.min(100, sentToday / DAILY_LIMIT * 100)}%` }} /></div><div className="footnote">Demo sending limit resets at local midnight.</div></section>
          <section className="card vault"><div className="section-title"><h2>My savings vault</h2><span>✦</span></div><div className="vault-amount">{money(wallet.savings)}</div><div className="muted">Your simulated savings balance</div><button className="btn soft" style={{ marginTop: 14 }} onClick={() => setTab("savings")}>Manage savings</button></section>
          <section className="feature"><h3>✨ PayPulse rewards</h3><p>You have <strong>{points.toLocaleString()} demo points</strong>. Explore the rewards screen to see your simulated perks.</p><button className="linkbtn" style={{ paddingLeft: 0, marginTop: 8 }} onClick={() => setTab("rewards")}>Explore rewards →</button></section>
        </div>
      </div>
    </>;
  }

  function renderTransfer() {
    return <><div className="pagehead"><div><h1>Transfer</h1><div className="muted">Send a simulated payment to a demo recipient.</div></div></div><div className="notice"><strong>Simulation:</strong> the account-name preview is fictional and not verified by a bank. Submitting will only update this browser’s demo balance and history.</div><div className="grid"><form className="card" onSubmit={submitSend}><h2 className="form-title">Bank transfer</h2><div className="field"><label htmlFor="bank">Bank</label><select id="bank" value={bank} onChange={(e) => setBank(e.target.value)}><option>Demo Bank</option><option>Example Microfinance Bank</option><option>Sample Digital Bank</option></select></div><div className="field"><label htmlFor="account">Account number</label><input id="account" inputMode="numeric" autoComplete="off" maxLength={10} placeholder="Enter 10 digits" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, "").slice(0, 10))} required /></div>{recipientName && <div className="recipient">✓ Simulated account name: {recipientName}<small>Fictional demo match · not verified with any bank</small></div>}<div className="field"><label htmlFor="send-amount">Amount (NGN)</label><input id="send-amount" inputMode="decimal" type="number" min="1" step="0.01" placeholder="e.g. 2,500" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} required /></div><div className="field"><label htmlFor="narration">Narration</label><input id="narration" placeholder="Optional note" /></div><button className="btn full" type="submit">Review and send demo money</button><div className="footnote">The daily demo transfer limit is ₦1,000,000. Your available balance is {money(wallet.balance)}.</div></form><div className="stack"><section className="card"><div className="section-title"><h2>Limit remaining</h2><span className="muted">Today</span></div><div style={{ fontSize: 23, fontWeight: 850 }}>{money(remaining)}</div><div className="limit-line"><span>{money(sentToday)} sent in demo today</span><span>{money(DAILY_LIMIT)}</span></div><div className="progress"><i style={{ width: `${Math.min(100, sentToday / DAILY_LIMIT * 100)}%` }} /></div></section><section className="card"><div className="section-title"><h2>Recent recipients</h2></div><button className="quick" style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }} onClick={() => { setAccount("0123456789"); setBank("Demo Bank"); }}><span className="avatar">AO</span><span>Ada Okafor <span className="muted">· Demo recipient</span></span></button><button className="quick" style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, marginTop: 8 }} onClick={() => { setAccount("9876543210"); setBank("Demo Bank"); }}><span className="avatar">EO</span><span>Emeka Obi <span className="muted">· Demo recipient</span></span></button></section></div></div></>;
  }

  function renderSavings() {
    return <><div className="pagehead"><div><h1>Savings</h1><div className="muted">Set aside and withdraw fictional demo funds.</div></div></div><div className="notice"><strong>Demo vault:</strong> this is not a deposit account and earns no real interest. Savings changes are simulated and saved only in this browser.</div><div className="grid"><div className="stack"><section className="card vault"><div className="muted">Total in demo vault</div><div className="vault-amount">{money(wallet.savings)}</div><button className="btn soft" onClick={withdrawSavings}>Withdraw all to wallet</button></section><form className="card" onSubmit={submitSavings}><h2 className="form-title">Move money into savings</h2><div className="field"><label htmlFor="save-amount">Amount (NGN)</label><input id="save-amount" type="number" min="1" step="0.01" placeholder="e.g. 10000" value={savingsAmount} onChange={(e) => setSavingsAmount(e.target.value)} required /></div><div className="footnote">Available demo balance: {money(wallet.balance)}</div><button className="btn full" style={{ marginTop: 13 }} type="submit">Save demo money</button></form></div><section className="card"><div className="section-title"><h2>Vault activity</h2><span className="muted">Recent</span></div>{history(8)}</section></div></>;
  }

  function renderRewards() {
    return <><div className="pagehead"><div><h1>Rewards</h1><div className="muted">A little appreciation for trying the PayPulse demo.</div></div></div><div className="notice"><strong>Demo rewards:</strong> points are illustrative, have no cash value, and cannot be redeemed.</div><div className="grid"><section className="balance-card"><div className="balance-top"><span>Your demo points</span><span>✦</span></div><div className="balance">{points.toLocaleString()} pts</div><div className="small-balance-note">Points are calculated from simulated wallet activity.</div></section><div className="card"><div className="section-title"><h2>Demo perks</h2></div><div className="feature" style={{ marginBottom: 10 }}><h3>🌱 Wallet explorer</h3><p>Try add money, transfers, and savings to see how the demo history updates.</p></div><div className="feature"><h3>🎁 Sample reward</h3><p>In a real product, rewards and eligibility would be provided by the service operator.</p></div></div></div></>;
  }

  function renderProfile() {
    return <><div className="pagehead"><div><h1>Profile & settings</h1><div className="muted">Local demo preferences and activity.</div></div></div><div className="notice"><strong>Demo profile:</strong> no real identity, bank account, or card is associated with this wallet.</div><div className="grid"><div className="stack"><section className="card"><div className="txleft"><span className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>P</span><div><div style={{ fontWeight: 800 }}>PayPulse Demo User</div><div className="muted">demo.user@example.test</div></div></div></section><section className="card"><div className="section-title"><h2>Preferences</h2></div><button className="quick" style={{ width: "100%", textAlign: "left" }} onClick={() => setDark((value) => !value)}>{dark ? "☀️  Switch to light appearance" : "🌙  Switch to dark appearance"}</button><button className="btn ghost full" style={{ marginTop: 10 }} onClick={reset}>Reset demo wallet and history</button><div className="footnote">Reset restores the fictional starting balance of {money(STARTING_BALANCE)} and clears this browser’s demo transaction history.</div></section></div><section className="card"><div className="section-title"><h2>Transaction history</h2><span className="muted">{wallet.transactions.length} total</span></div>{history(100)}</section></div></>;
  }

  const screen = tab === "home" ? renderHome() : tab === "transfer" ? renderTransfer() : tab === "savings" ? renderSavings() : tab === "rewards" ? renderRewards() : renderProfile();

  return <div className={`app ${dark ? "dark" : ""}`}><style>{css}</style>
    <header className="topbar"><div className="brand"><span className="brandmark">P</span>PayPulse</div><div className="top-right"><span className="demo-pill">DEMO WALLET · NO REAL MONEY</span><button aria-label="Open QR pay" title="QR pay" className="btn soft" style={{ padding: "8px 11px" }} onClick={() => setModal("qr")}>▦</button><span className="avatar">P</span></div></header>
    <div className="layout"><nav className="sidebar" aria-label="Main navigation">{navItems.map((item) => <button key={item.id} className={`navbtn ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}><span className="navicon">{item.icon}</span>{item.label}</button>)}</nav><main className="content">{screen}{message && <div role="status" aria-live="polite" className="status">{message}</div>}</main></div>
    <nav className="mobile-nav" aria-label="Main navigation">{navItems.map((item) => <button key={item.id} className={`navbtn ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}><span className="navicon">{item.icon}</span>{item.label}</button>)}</nav>
    {modal === "add" && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-title" onClick={(event) => event.stopPropagation()}><div className="modalhead"><h2 id="add-title">Add demo money</h2><button className="close" aria-label="Close" onClick={() => setModal(null)}>×</button></div><div className="notice">Simulated only — no payment method or bank is used.</div><form onSubmit={submitAdd}><div className="field"><label htmlFor="modal-add-amount">Amount (NGN)</label><input autoFocus id="modal-add-amount" type="number" min="1" step="0.01" placeholder="e.g. 5,000" value={addAmount} onChange={(event) => setAddAmount(event.target.value)} required /></div><button className="btn full" type="submit">Add to demo wallet</button></form></section></div>}
    {modal === "qr" && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={(event) => event.stopPropagation()}><div className="modalhead"><h2 id="qr-title">QR pay · demo</h2><button className="close" aria-label="Close" onClick={() => setModal(null)}>×</button></div><div className="notice">This sample graphic is decorative and cannot receive or initiate payments.</div><div className="qrbox" aria-label="Decorative demo QR graphic"/><p style={{ textAlign: "center", fontWeight: 800, marginBottom: 4 }}>PayPulse Demo Wallet</p><p className="muted" style={{ textAlign: "center", marginTop: 0 }}>Demo ID · PP-DEMO-0001</p><button className="btn full" onClick={() => setModal(null)}>Done</button></section></div>}
  </div>;
}
