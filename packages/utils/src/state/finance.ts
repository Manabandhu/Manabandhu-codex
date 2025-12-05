import { create } from 'zustand';
import { ExpenseEntry, WalletShare } from '@manabandhu/types/finance';

interface FinanceState {
  expenses: ExpenseEntry[];
  wallets: WalletShare[];
  addExpense: (entry: ExpenseEntry) => void;
  addWallet: (wallet: WalletShare) => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  expenses: [],
  wallets: [],
  addExpense: (entry) => set({ expenses: [...get().expenses, entry] }),
  addWallet: (wallet) => set({ wallets: [...get().wallets, wallet] })
}));
