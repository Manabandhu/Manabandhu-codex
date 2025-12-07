import { client } from './client';
import type { ExpenseEntry, WalletShare } from '@manabandhu/types';

export const financeAPI = {
  getExpenses: (userId: string) => client.get<ExpenseEntry[]>('/finance/expenses', { params: { userId } }),
  addExpense: (expense: Partial<ExpenseEntry>) => client.post<ExpenseEntry>('/finance/expenses', expense),
  getWallets: (userId: string) => client.get<WalletShare[]>('/finance/wallets', { params: { userId } }),
  convertCurrency: (from: string, to: string, amount: number) => client.post('/finance/convert', null, { params: { from, to, amount } }),
  getReports: (userId: string) => client.get('/finance/reports', { params: { userId } })
};
