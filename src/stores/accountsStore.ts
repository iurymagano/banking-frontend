import { Account, Transaction } from '@/types/Accounts';
import { create } from 'zustand';

export type AccountsStore = {
  accounts: Account[];
  transactions: Transaction[];
};

export type AccountsActions = {
  setAccounts: (accounts: Account[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
};

export type AccountStore = AccountsStore & AccountsActions;

export const useAccountStore = create<AccountStore>()((set) => ({
  accounts: [],
  transactions: [],
  setAccounts: (accounts: Account[]) => set({ accounts }),
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
}));
