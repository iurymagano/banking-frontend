'use client';

import TabButtons from '@/components/layouts/tabButtons';
import StatisticCard from '@/components/ui/statisticCard';
import TableTransactions from '../ui/tableTransactions';
import ViewClients from '../ui/viewClients';
import { FaUsers } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { useAccountStore } from '@/stores/accountsStore';
import { Account } from '@/types/Accounts';

export default function DashboardAdm() {
  const { accounts, transactions } = useAccountStore();
  const qtdAccounts = accounts.length;
  const balance = accounts.reduce((acc, account) => acc + account.balance, 0);

  const topThreeAccounts: Array<Account> = accounts
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 3);

  const clientsCurrent: Array<Account> = accounts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="grid gap-3 grid-rows-1 h-full">
      <TabButtons />
      <div className="w-full grid grid-cols-2 gap-3 max-2xl:grid-cols-2 max-md:grid-cols-1">
        <StatisticCard
          title="Total de contas"
          value={qtdAccounts}
          icon={<FaUsers className="text-blue-600 text-2xl" />}
        />
        <StatisticCard
          title="Valor total"
          value={balance}
          prefix="R$"
          money={true}
          icon={<MdAttachMoney className="text-green-600 text-2xl" />}
        />
        <ViewClients data={topThreeAccounts} title="Principais clientes" />
        <ViewClients data={clientsCurrent} title="Novos Clientes" />
      </div>
      <div className="grid grid-cols-1 grid-rows-1 ">
        <TableTransactions data={transactions} />
      </div>
    </div>
  );
}
