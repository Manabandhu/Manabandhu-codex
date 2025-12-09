export interface ExpenseEntry {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  createdAt: string;
}

export interface WalletShare {
  id: string;
  name: string;
  balance: number;
  members: string[];
}
