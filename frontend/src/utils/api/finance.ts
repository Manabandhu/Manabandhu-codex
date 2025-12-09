import { api } from './client';
import type { ExpenseEntry, WalletShare } from '@/types';

export const financeAPI = {
  getExpenses: (userId: string) => api.get<ExpenseEntry[]>('/finance/expenses', { params: { userId } }),
  addExpense: (expense: Partial<ExpenseEntry>) => api.post<ExpenseEntry>('/finance/expenses', expense),
  getWallets: (userId: string) => api.get<WalletShare[]>('/finance/wallets', { params: { userId } }),
  convertCurrency: (from: string, to: string, amount: number) => api.post('/finance/convert', null, { params: { from, to, amount } }),
  getReports: (userId: string) => api.get('/finance/reports', { params: { userId } })
};
