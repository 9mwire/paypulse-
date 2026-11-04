const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport20_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=575d49f6";
import { WalletProvider, useWallet } from "/src/context/WalletContext.tsx";
import { TopAppBar } from "/src/components/TopAppBar.tsx";
import { BottomNavBar } from "/src/components/BottomNavBar.tsx";
import { HomeView } from "/src/components/HomeView.tsx";
import { SavingsVaultView } from "/src/components/SavingsVaultView.tsx";
import { BudgetTracker } from "/src/components/BudgetTracker.tsx";
import { TransactionHistoryView } from "/src/components/TransactionHistoryView.tsx";
import { ProfileView } from "/src/components/ProfileView.tsx";
import { SendMoneyModal } from "/src/components/SendMoneyModal.tsx";
import { AddMoneyModal } from "/src/components/AddMoneyModal.tsx";
import { QuickServicesModal } from "/src/components/QuickServicesModal.tsx";
import { SimulateIncomingTransferModal } from "/src/components/SimulateIncomingTransferModal.tsx";
import { NotificationDrawer } from "/src/components/NotificationDrawer.tsx";
import { NotificationToast } from "/src/components/NotificationToast.tsx";
import { TransactionReceiptModal } from "/src/components/TransactionReceiptModal.tsx";
import { QRCodeModal } from "/src/components/QRCodeModal.tsx";
import { RewardsModal } from "/src/components/RewardsModal.tsx";
import { DownloadAppModal } from "/src/components/DownloadAppModal.tsx";
import { Send, Plus, Wifi, Battery, Signal, Home, PiggyBank, PieChart, Receipt, User, QrCode, Gift, Download } from "/node_modules/.vite/deps/lucide-react.js?v=575d49f6";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport20_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=575d49f6";
function AppContent() {
	const { selectedReceiptTx, setSelectedReceiptTx, budget, transactions } = useWallet();
	const [activeTab, setActiveTab] = useState("home");
	const [viewMode, setViewMode] = useState("mobile");
	// Modals state
	const [isSendOpen, setIsSendOpen] = useState(false);
	const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
	const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
	const [isQuickServicesOpen, setIsQuickServicesOpen] = useState(false);
	const [quickServiceType, setQuickServiceType] = useState("airtime");
	const [isSimulateOpen, setIsSimulateOpen] = useState(false);
	const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
	const [isQROpen, setIsQROpen] = useState(false);
	const [isRewardsOpen, setIsRewardsOpen] = useState(false);
	const [isDownloadOpen, setIsDownloadOpen] = useState(false);
	const handleOpenSendMoney = (ben) => {
		setSelectedBeneficiary(ben || null);
		setIsSendOpen(true);
	};
	const handleOpenQuickServices = (service) => {
		setQuickServiceType(service || "airtime");
		setIsQuickServicesOpen(true);
	};
	const handleScanSuccess = (merchant) => {
		setSelectedBeneficiary({
			id: `ben_scan_${Date.now()}`,
			name: merchant.name,
			accountNumber: merchant.account,
			bankName: merchant.bank,
			avatarBg: "bg-emerald-600",
			initials: "QR"
		});
		setIsSendOpen(true);
	};
	const totalSpent = transactions.filter((t) => t.type !== "fund" && t.type !== "receive" && t.category !== "Income").reduce((acc, t) => acc + t.amount, 0);
	const budgetAlert = totalSpent >= budget.monthlyLimit * .8;
	const desktopNavItems = [
		{
			id: "home",
			label: "Wallet Dashboard",
			icon: Home
		},
		{
			id: "savings",
			label: "Savings & Vaults",
			icon: PiggyBank
		},
		{
			id: "budget",
			label: "Budget Radar",
			icon: PieChart,
			badge: budgetAlert
		},
		{
			id: "transactions",
			label: "Transaction Activity",
			icon: Receipt
		},
		{
			id: "profile",
			label: "Me & Security",
			icon: User
		}
	];
	const renderActiveView = () => {
		switch (activeTab) {
			case "home": return /* @__PURE__ */ _jsxDEV(HomeView, {
				onOpenSendMoney: handleOpenSendMoney,
				onOpenAddMoney: () => setIsAddMoneyOpen(true),
				onOpenQuickServices: handleOpenQuickServices,
				onOpenSimulate: () => setIsSimulateOpen(true),
				onOpenQR: () => setIsQROpen(true),
				onOpenRewards: () => setIsRewardsOpen(true),
				onNavigateTab: setActiveTab
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 101,
				columnNumber: 11
			}, this);
			case "savings": return /* @__PURE__ */ _jsxDEV(SavingsVaultView, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 16
			}, this);
			case "budget": return /* @__PURE__ */ _jsxDEV(BudgetTracker, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 16
			}, this);
			case "transactions": return /* @__PURE__ */ _jsxDEV(TransactionHistoryView, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 16
			}, this);
			case "profile": return /* @__PURE__ */ _jsxDEV(ProfileView, { onOpenDownload: () => setIsDownloadOpen(true) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 16
			}, this);
			default: return null;
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors",
		children: [
			/* @__PURE__ */ _jsxDEV(NotificationToast, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(TopAppBar, {
				onOpenNotifications: () => setIsNotifDrawerOpen(true),
				onOpenSimulate: () => setIsSimulateOpen(true),
				onOpenQR: () => setIsQROpen(true),
				onOpenRewards: () => setIsRewardsOpen(true),
				onOpenDownload: () => setIsDownloadOpen(true),
				viewMode,
				onToggleViewMode: () => setViewMode(viewMode === "mobile" ? "expanded" : "mobile")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("main", {
				className: "flex-1 flex justify-center py-2 sm:py-5 px-0 sm:px-4",
				children: viewMode === "mobile" ? /* @__PURE__ */ _jsxDEV(
					"div",
					/* Realistic Smartphone Chassis Frame */
					{
						className: "w-full sm:max-w-[430px] bg-slate-50 dark:bg-slate-900 sm:rounded-[40px] rounded-none shadow-2xl sm:border-[6px] border-0 border-slate-800/90 dark:border-slate-800 overflow-hidden flex flex-col min-h-screen sm:min-h-[850px] relative transition-all",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "h-10 bg-slate-50 dark:bg-slate-900 px-6 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 select-none z-10 shrink-0 border-b border-slate-100 dark:border-slate-800/40",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-bold text-[12px] tabular-nums",
										children: "09:41"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 149,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "w-24 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-sm",
										children: [/* @__PURE__ */ _jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 153,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1.5 text-slate-600 dark:text-slate-300",
										children: [
											/* @__PURE__ */ _jsxDEV(Signal, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 158,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV(Wifi, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 159,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV(Battery, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 160,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 157,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex-1 overflow-y-auto p-4 pb-24",
								children: renderActiveView()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV(BottomNavBar, {
								activeTab,
								onSelectTab: setActiveTab
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 13
							}, this)
						]
					},
					void 0,
					true,
					{
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 11
					},
					this
				) : 
				/* Expanded Wide View Mode */
				/* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-5xl mx-auto px-4 pb-20 space-y-6",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 flex-wrap",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1 overflow-x-auto",
							children: desktopNavItems.map((item) => {
								const Icon = item.icon;
								const isActive = activeTab === item.id;
								return /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setActiveTab(item.id),
									className: `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${isActive ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"}`,
									children: [
										/* @__PURE__ */ _jsxDEV(Icon, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 192,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: item.label }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 23
										}, this),
										item.badge && /* @__PURE__ */ _jsxDEV("span", { className: "w-2 h-2 rounded-full bg-rose-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 195,
											columnNumber: 25
										}, this)
									]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setIsDownloadOpen(true),
									className: "h-9 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Download App" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setIsQROpen(true),
									className: "h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(QrCode, { className: "w-3.5 h-3.5 text-emerald-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "QR Pay" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setIsRewardsOpen(true),
									className: "h-9 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(Gift, { className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 224,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Rewards" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 225,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleOpenSendMoney(null),
									className: "h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Send Money" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 233,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setIsAddMoneyOpen(true),
									className: "h-9 px-3.5 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold text-xs flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Add Money" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-transparent",
						children: renderActiveView()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 142,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(SendMoneyModal, {
				isOpen: isSendOpen,
				onClose: () => setIsSendOpen(false),
				initialRecipient: selectedBeneficiary
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 255,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(AddMoneyModal, {
				isOpen: isAddMoneyOpen,
				onClose: () => setIsAddMoneyOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 261,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(QuickServicesModal, {
				isOpen: isQuickServicesOpen,
				onClose: () => setIsQuickServicesOpen(false),
				initialService: quickServiceType
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 266,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(SimulateIncomingTransferModal, {
				isOpen: isSimulateOpen,
				onClose: () => setIsSimulateOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 272,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(NotificationDrawer, {
				isOpen: isNotifDrawerOpen,
				onClose: () => setIsNotifDrawerOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 277,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(QRCodeModal, {
				isOpen: isQROpen,
				onClose: () => setIsQROpen(false),
				onScanSuccess: handleScanSuccess
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 282,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(RewardsModal, {
				isOpen: isRewardsOpen,
				onClose: () => setIsRewardsOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(DownloadAppModal, {
				isOpen: isDownloadOpen,
				onClose: () => setIsDownloadOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(TransactionReceiptModal, {
				transaction: selectedReceiptTx,
				onClose: () => setSelectedReceiptTx(null)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 298,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 125,
		columnNumber: 5
	}, this);
}
export default function App() {
	return /* @__PURE__ */ _jsxDEV(WalletProvider, { children: /* @__PURE__ */ _jsxDEV(AppContent, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 309,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 308,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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dEM7Ozs7O0dBRUQsd0JBQUMsa0JBQUQ7SUFDRSxRQUFRO0lBQ1IsZUFBZSxrQkFBa0IsS0FBSztHQUN2Qzs7Ozs7R0FFRCx3QkFBQyx5QkFBRDtJQUNFLGFBQWE7SUFDYixlQUFlLHFCQUFxQixJQUFJO0dBQ3pDOzs7OztFQUNFOzs7Ozs7QUFFVDtBQUVBLGVBQWUsU0FBUyxNQUFNO0NBQzVCLE9BQ0Usd0JBQUMsZ0JBQUQsWUFDRSx3QkFBQyxZQUFELENBQWE7Ozs7VUFDQzs7Ozs7QUFFcEIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQXBwLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBXYWxsZXRQcm92aWRlciwgdXNlV2FsbGV0IH0gZnJvbSAnLi9jb250ZXh0L1dhbGxldENvbnRleHQnO1xuaW1wb3J0IHsgVG9wQXBwQmFyIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvcEFwcEJhcic7XG5pbXBvcnQgeyBCb3R0b21OYXZCYXIgfSBmcm9tICcuL2NvbXBvbmVudHMvQm90dG9tTmF2QmFyJztcbmltcG9ydCB7IEhvbWVWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWVWaWV3JztcbmltcG9ydCB7IFNhdmluZ3NWYXVsdFZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvU2F2aW5nc1ZhdWx0Vmlldyc7XG5pbXBvcnQgeyBCdWRnZXRUcmFja2VyIH0gZnJvbSAnLi9jb21wb25lbnRzL0J1ZGdldFRyYWNrZXInO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25IaXN0b3J5VmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9UcmFuc2FjdGlvbkhpc3RvcnlWaWV3JztcbmltcG9ydCB7IFByb2ZpbGVWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb2ZpbGVWaWV3JztcbmltcG9ydCB7IFNlbmRNb25leU1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbmRNb25leU1vZGFsJztcbmltcG9ydCB7IEFkZE1vbmV5TW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvQWRkTW9uZXlNb2RhbCc7XG5pbXBvcnQgeyBRdWlja1NlcnZpY2VzTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvUXVpY2tTZXJ2aWNlc01vZGFsJztcbmltcG9ydCB7IFNpbXVsYXRlSW5jb21pbmdUcmFuc2Zlck1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL1NpbXVsYXRlSW5jb21pbmdUcmFuc2Zlck1vZGFsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkRyYXdlciB9IGZyb20gJy4vY29tcG9uZW50cy9Ob3RpZmljYXRpb25EcmF3ZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uVG9hc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvTm90aWZpY2F0aW9uVG9hc3QnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25SZWNlaXB0TW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvVHJhbnNhY3Rpb25SZWNlaXB0TW9kYWwnO1xuaW1wb3J0IHsgUVJDb2RlTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvUVJDb2RlTW9kYWwnO1xuaW1wb3J0IHsgUmV3YXJkc01vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL1Jld2FyZHNNb2RhbCc7XG5pbXBvcnQgeyBEb3dubG9hZEFwcE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0Rvd25sb2FkQXBwTW9kYWwnO1xuaW1wb3J0IHsgQmVuZWZpY2lhcnkgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFxuICBTZW5kLCBcbiAgUGx1cywgXG4gIFNwYXJrbGVzLCBcbiAgV2lmaSwgXG4gIEJhdHRlcnksIFxuICBTaWduYWwsIFxuICBIb21lLCBcbiAgUGlnZ3lCYW5rLCBcbiAgUGllQ2hhcnQsIFxuICBSZWNlaXB0LCBcbiAgVXNlcixcbiAgQXJyb3dEb3duTGVmdCxcbiAgUXJDb2RlLFxuICBHaWZ0LFxuICBEb3dubG9hZFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5mdW5jdGlvbiBBcHBDb250ZW50KCkge1xuICBjb25zdCB7IHNlbGVjdGVkUmVjZWlwdFR4LCBzZXRTZWxlY3RlZFJlY2VpcHRUeCwgYnVkZ2V0LCB0cmFuc2FjdGlvbnMgfSA9IHVzZVdhbGxldCgpO1xuXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnaG9tZScgfCAnc2F2aW5ncycgfCAnYnVkZ2V0JyB8ICd0cmFuc2FjdGlvbnMnIHwgJ3Byb2ZpbGUnPignaG9tZScpO1xuICBjb25zdCBbdmlld01vZGUsIHNldFZpZXdNb2RlXSA9IHVzZVN0YXRlPCdtb2JpbGUnIHwgJ2V4cGFuZGVkJz4oJ21vYmlsZScpO1xuXG4gIC8vIE1vZGFscyBzdGF0ZVxuICBjb25zdCBbaXNTZW5kT3Blbiwgc2V0SXNTZW5kT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZEJlbmVmaWNpYXJ5LCBzZXRTZWxlY3RlZEJlbmVmaWNpYXJ5XSA9IHVzZVN0YXRlPEJlbmVmaWNpYXJ5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0FkZE1vbmV5T3Blbiwgc2V0SXNBZGRNb25leU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNRdWlja1NlcnZpY2VzT3Blbiwgc2V0SXNRdWlja1NlcnZpY2VzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtxdWlja1NlcnZpY2VUeXBlLCBzZXRRdWlja1NlcnZpY2VUeXBlXSA9IHVzZVN0YXRlPCdhaXJ0aW1lJyB8ICdkYXRhJyB8ICdlbGVjdHJpY2l0eScgfCAndHYnPignYWlydGltZScpO1xuICBjb25zdCBbaXNTaW11bGF0ZU9wZW4sIHNldElzU2ltdWxhdGVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTm90aWZEcmF3ZXJPcGVuLCBzZXRJc05vdGlmRHJhd2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1FST3Blbiwgc2V0SXNRUk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNSZXdhcmRzT3Blbiwgc2V0SXNSZXdhcmRzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0Rvd25sb2FkT3Blbiwgc2V0SXNEb3dubG9hZE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5TZW5kTW9uZXkgPSAoYmVuPzogQmVuZWZpY2lhcnkgfCBudWxsKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRCZW5lZmljaWFyeShiZW4gfHwgbnVsbCk7XG4gICAgc2V0SXNTZW5kT3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVPcGVuUXVpY2tTZXJ2aWNlcyA9IChzZXJ2aWNlPzogJ2FpcnRpbWUnIHwgJ2RhdGEnIHwgJ2VsZWN0cmljaXR5JyB8ICd0dicpID0+IHtcbiAgICBzZXRRdWlja1NlcnZpY2VUeXBlKHNlcnZpY2UgfHwgJ2FpcnRpbWUnKTtcbiAgICBzZXRJc1F1aWNrU2VydmljZXNPcGVuKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNjYW5TdWNjZXNzID0gKG1lcmNoYW50OiB7IG5hbWU6IHN0cmluZzsgYWNjb3VudDogc3RyaW5nOyBiYW5rOiBzdHJpbmcgfSkgPT4ge1xuICAgIHNldFNlbGVjdGVkQmVuZWZpY2lhcnkoe1xuICAgICAgaWQ6IGBiZW5fc2Nhbl8ke0RhdGUubm93KCl9YCxcbiAgICAgIG5hbWU6IG1lcmNoYW50Lm5hbWUsXG4gICAgICBhY2NvdW50TnVtYmVyOiBtZXJjaGFudC5hY2NvdW50LFxuICAgICAgYmFua05hbWU6IG1lcmNoYW50LmJhbmssXG4gICAgICBhdmF0YXJCZzogJ2JnLWVtZXJhbGQtNjAwJyxcbiAgICAgIGluaXRpYWxzOiAnUVInLFxuICAgIH0pO1xuICAgIHNldElzU2VuZE9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgdG90YWxTcGVudCA9IHRyYW5zYWN0aW9uc1xuICAgIC5maWx0ZXIoKHQpID0+IHQudHlwZSAhPT0gJ2Z1bmQnICYmIHQudHlwZSAhPT0gJ3JlY2VpdmUnICYmIHQuY2F0ZWdvcnkgIT09ICdJbmNvbWUnKVxuICAgIC5yZWR1Y2UoKGFjYywgdCkgPT4gYWNjICsgdC5hbW91bnQsIDApO1xuICBjb25zdCBidWRnZXRBbGVydCA9IHRvdGFsU3BlbnQgPj0gYnVkZ2V0Lm1vbnRobHlMaW1pdCAqIDAuODtcblxuICBjb25zdCBkZXNrdG9wTmF2SXRlbXM6IHtcbiAgICBpZDogJ2hvbWUnIHwgJ3NhdmluZ3MnIHwgJ2J1ZGdldCcgfCAndHJhbnNhY3Rpb25zJyB8ICdwcm9maWxlJztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb246IFJlYWN0LkNvbXBvbmVudFR5cGU8eyBjbGFzc05hbWU/OiBzdHJpbmcgfT47XG4gICAgYmFkZ2U/OiBib29sZWFuO1xuICB9W10gPSBbXG4gICAgeyBpZDogJ2hvbWUnLCBsYWJlbDogJ1dhbGxldCBEYXNoYm9hcmQnLCBpY29uOiBIb21lIH0sXG4gICAgeyBpZDogJ3NhdmluZ3MnLCBsYWJlbDogJ1NhdmluZ3MgJiBWYXVsdHMnLCBpY29uOiBQaWdneUJhbmsgfSxcbiAgICB7IGlkOiAnYnVkZ2V0JywgbGFiZWw6ICdCdWRnZXQgUmFkYXInLCBpY29uOiBQaWVDaGFydCwgYmFkZ2U6IGJ1ZGdldEFsZXJ0IH0sXG4gICAgeyBpZDogJ3RyYW5zYWN0aW9ucycsIGxhYmVsOiAnVHJhbnNhY3Rpb24gQWN0aXZpdHknLCBpY29uOiBSZWNlaXB0IH0sXG4gICAgeyBpZDogJ3Byb2ZpbGUnLCBsYWJlbDogJ01lICYgU2VjdXJpdHknLCBpY29uOiBVc2VyIH0sXG4gIF07XG5cbiAgY29uc3QgcmVuZGVyQWN0aXZlVmlldyA9ICgpID0+IHtcbiAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEhvbWVWaWV3XG4gICAgICAgICAgICBvbk9wZW5TZW5kTW9uZXk9e2hhbmRsZU9wZW5TZW5kTW9uZXl9XG4gICAgICAgICAgICBvbk9wZW5BZGRNb25leT17KCkgPT4gc2V0SXNBZGRNb25leU9wZW4odHJ1ZSl9XG4gICAgICAgICAgICBvbk9wZW5RdWlja1NlcnZpY2VzPXtoYW5kbGVPcGVuUXVpY2tTZXJ2aWNlc31cbiAgICAgICAgICAgIG9uT3BlblNpbXVsYXRlPXsoKSA9PiBzZXRJc1NpbXVsYXRlT3Blbih0cnVlKX1cbiAgICAgICAgICAgIG9uT3BlblFSPXsoKSA9PiBzZXRJc1FST3Blbih0cnVlKX1cbiAgICAgICAgICAgIG9uT3BlblJld2FyZHM9eygpID0+IHNldElzUmV3YXJkc09wZW4odHJ1ZSl9XG4gICAgICAgICAgICBvbk5hdmlnYXRlVGFiPXtzZXRBY3RpdmVUYWJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ3NhdmluZ3MnOlxuICAgICAgICByZXR1cm4gPFNhdmluZ3NWYXVsdFZpZXcgLz47XG4gICAgICBjYXNlICdidWRnZXQnOlxuICAgICAgICByZXR1cm4gPEJ1ZGdldFRyYWNrZXIgLz47XG4gICAgICBjYXNlICd0cmFuc2FjdGlvbnMnOlxuICAgICAgICByZXR1cm4gPFRyYW5zYWN0aW9uSGlzdG9yeVZpZXcgLz47XG4gICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgcmV0dXJuIDxQcm9maWxlVmlldyBvbk9wZW5Eb3dubG9hZD17KCkgPT4gc2V0SXNEb3dubG9hZE9wZW4odHJ1ZSl9IC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctc2xhdGUtMTAwIGRhcms6Ymctc2xhdGUtOTUwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC1zbGF0ZS0xMDAgZmxleCBmbGV4LWNvbCBmb250LXNhbnMgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgIFxuICAgICAgey8qIFJlYWwtdGltZSBQdXNoIE5vdGlmaWNhdGlvbiBCYW5uZXIgKFNsaWRlcyBkb3duIGF0IHRvcCkgKi99XG4gICAgICA8Tm90aWZpY2F0aW9uVG9hc3QgLz5cblxuICAgICAgey8qIFRvcCBBcHBsaWNhdGlvbiBCYXIgKi99XG4gICAgICA8VG9wQXBwQmFyXG4gICAgICAgIG9uT3Blbk5vdGlmaWNhdGlvbnM9eygpID0+IHNldElzTm90aWZEcmF3ZXJPcGVuKHRydWUpfVxuICAgICAgICBvbk9wZW5TaW11bGF0ZT17KCkgPT4gc2V0SXNTaW11bGF0ZU9wZW4odHJ1ZSl9XG4gICAgICAgIG9uT3BlblFSPXsoKSA9PiBzZXRJc1FST3Blbih0cnVlKX1cbiAgICAgICAgb25PcGVuUmV3YXJkcz17KCkgPT4gc2V0SXNSZXdhcmRzT3Blbih0cnVlKX1cbiAgICAgICAgb25PcGVuRG93bmxvYWQ9eygpID0+IHNldElzRG93bmxvYWRPcGVuKHRydWUpfVxuICAgICAgICB2aWV3TW9kZT17dmlld01vZGV9XG4gICAgICAgIG9uVG9nZ2xlVmlld01vZGU9eygpID0+IHNldFZpZXdNb2RlKHZpZXdNb2RlID09PSAnbW9iaWxlJyA/ICdleHBhbmRlZCcgOiAnbW9iaWxlJyl9XG4gICAgICAvPlxuXG4gICAgICB7LyogTWFpbiBDb250ZW50IEFyZWEgKi99XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlciBweS0yIHNtOnB5LTUgcHgtMCBzbTpweC00XCI+XG4gICAgICAgIHt2aWV3TW9kZSA9PT0gJ21vYmlsZScgPyAoXG4gICAgICAgICAgLyogUmVhbGlzdGljIFNtYXJ0cGhvbmUgQ2hhc3NpcyBGcmFtZSAqL1xuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIHNtOm1heC13LVs0MzBweF0gYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05MDAgc206cm91bmRlZC1bNDBweF0gcm91bmRlZC1ub25lIHNoYWRvdy0yeGwgc206Ym9yZGVyLVs2cHhdIGJvcmRlci0wIGJvcmRlci1zbGF0ZS04MDAvOTAgZGFyazpib3JkZXItc2xhdGUtODAwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIG1pbi1oLXNjcmVlbiBzbTptaW4taC1bODUwcHhdIHJlbGF0aXZlIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBQaG9uZSBUb3AgTm90Y2ggLyBTdGF0dXMgQmFyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTEwIGJnLXNsYXRlLTUwIGRhcms6Ymctc2xhdGUtOTAwIHB4LTYgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS04MDAgZGFyazp0ZXh0LXNsYXRlLTIwMCBzZWxlY3Qtbm9uZSB6LTEwIHNocmluay0wIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAgZGFyazpib3JkZXItc2xhdGUtODAwLzQwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LVsxMnB4XSB0YWJ1bGFyLW51bXNcIj4wOTo0MTwvc3Bhbj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBEeW5hbWljIElzbGFuZCBQaWxsICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMjQgaC00IGJnLWJsYWNrIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTkwMCByaW5nLTEgcmluZy1zbGF0ZS04MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNTAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxTaWduYWwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxXaWZpIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8QmF0dGVyeSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNjcm9sbGFibGUgVmlldyBDb250YWluZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC00IHBiLTI0XCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJBY3RpdmVWaWV3KCl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1vYmlsZSBCb3R0b20gTmF2aWdhdGlvbiAqL31cbiAgICAgICAgICAgIDxCb3R0b21OYXZCYXIgYWN0aXZlVGFiPXthY3RpdmVUYWJ9IG9uU2VsZWN0VGFiPXtzZXRBY3RpdmVUYWJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgLyogRXhwYW5kZWQgV2lkZSBWaWV3IE1vZGUgKi9cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy01eGwgbXgtYXV0byBweC00IHBiLTIwIHNwYWNlLXktNlwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogRGVza3RvcCBOYXZpZ2F0aW9uIFRhYnMgU3RyaXAgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIHJvdW5kZWQtMnhsIHAtMiBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICB7ZGVza3RvcE5hdkl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IGl0ZW0uaWNvbjtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgc2hhZG93LXNtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtOTAwIGRhcms6aG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS01MCBkYXJrOmhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5iYWRnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yb3NlLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRmFzdCBEZXNrdG9wIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0Rvd25sb2FkT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtOSBweC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Eb3dubG9hZCBBcHA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1FST3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtOSBweC0zIHJvdW5kZWQteGwgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCBkYXJrOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTcwMCBkYXJrOnRleHQtc2xhdGUtMzAwIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxRckNvZGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5RUiBQYXk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1Jld2FyZHNPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC05IHB4LTMgcm91bmRlZC14bCBiZy1hbWJlci01MCBob3ZlcjpiZy1hbWJlci0xMDAgZGFyazpiZy1hbWJlci05NTAvNDAgdGV4dC1hbWJlci03MDAgZGFyazp0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8R2lmdCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5SZXdhcmRzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3BlblNlbmRNb25leShudWxsKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtOSBweC0zLjUgcm91bmRlZC14bCBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LXNtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U2VuZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5TZW5kIE1vbmV5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNBZGRNb25leU9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTkgcHgtMy41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTYwMCB0ZXh0LWVtZXJhbGQtNzAwIGRhcms6dGV4dC1lbWVyYWxkLTMwMCBob3ZlcjpiZy1lbWVyYWxkLTUwIGRhcms6aG92ZXI6YmctZW1lcmFsZC05NTAvNDAgZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QWRkIE1vbmV5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRGVza3RvcCBWaWV3IFJlbmRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAge3JlbmRlckFjdGl2ZVZpZXcoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9tYWluPlxuXG4gICAgICB7LyogTW9kYWxzICYgRGlhbG9ncyAqL31cbiAgICAgIDxTZW5kTW9uZXlNb2RhbFxuICAgICAgICBpc09wZW49e2lzU2VuZE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzU2VuZE9wZW4oZmFsc2UpfVxuICAgICAgICBpbml0aWFsUmVjaXBpZW50PXtzZWxlY3RlZEJlbmVmaWNpYXJ5fVxuICAgICAgLz5cblxuICAgICAgPEFkZE1vbmV5TW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0FkZE1vbmV5T3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNBZGRNb25leU9wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgPFF1aWNrU2VydmljZXNNb2RhbFxuICAgICAgICBpc09wZW49e2lzUXVpY2tTZXJ2aWNlc09wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzUXVpY2tTZXJ2aWNlc09wZW4oZmFsc2UpfVxuICAgICAgICBpbml0aWFsU2VydmljZT17cXVpY2tTZXJ2aWNlVHlwZX1cbiAgICAgIC8+XG5cbiAgICAgIDxTaW11bGF0ZUluY29taW5nVHJhbnNmZXJNb2RhbFxuICAgICAgICBpc09wZW49e2lzU2ltdWxhdGVPcGVufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc1NpbXVsYXRlT3BlbihmYWxzZSl9XG4gICAgICAvPlxuXG4gICAgICA8Tm90aWZpY2F0aW9uRHJhd2VyXG4gICAgICAgIGlzT3Blbj17aXNOb3RpZkRyYXdlck9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzTm90aWZEcmF3ZXJPcGVuKGZhbHNlKX1cbiAgICAgIC8+XG5cbiAgICAgIDxRUkNvZGVNb2RhbFxuICAgICAgICBpc09wZW49e2lzUVJPcGVufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc1FST3BlbihmYWxzZSl9XG4gICAgICAgIG9uU2NhblN1Y2Nlc3M9e2hhbmRsZVNjYW5TdWNjZXNzfVxuICAgICAgLz5cblxuICAgICAgPFJld2FyZHNNb2RhbFxuICAgICAgICBpc09wZW49e2lzUmV3YXJkc09wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzUmV3YXJkc09wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgPERvd25sb2FkQXBwTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0Rvd25sb2FkT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNEb3dubG9hZE9wZW4oZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgPFRyYW5zYWN0aW9uUmVjZWlwdE1vZGFsXG4gICAgICAgIHRyYW5zYWN0aW9uPXtzZWxlY3RlZFJlY2VpcHRUeH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2VsZWN0ZWRSZWNlaXB0VHgobnVsbCl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiAoXG4gICAgPFdhbGxldFByb3ZpZGVyPlxuICAgICAgPEFwcENvbnRlbnQgLz5cbiAgICA8L1dhbGxldFByb3ZpZGVyPlxuICApO1xufVxuIl19