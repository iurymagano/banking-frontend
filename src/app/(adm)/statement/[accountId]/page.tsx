// @ts-nocheck
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NumberMotion from '@/components/ui/numberMotion';
import { apiIca } from '@/lib/requests';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate, formatDoc } from '@/lib/utils/format';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    accountId: string;
  };
};

export default async function Account({ params }: Props) {
  const resp = await apiIca({
    method: 'GET',
    path: `/account/${params.accountId}`,
  });
  if (resp.result !== 'success' || !params.accountId) {
    redirect('/');
  }

  const respTransactions = await apiIca({
    method: 'GET',
    path: `/account/${params.accountId}/statement`,
  });

  const transactions = respTransactions.data.transactions;

  const user = resp.data;
  const nameFormat = () => {
    if (user.name) {
      return user.name.slice(0, 2).toUpperCase();
    }
    return '';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-2xl text-gray-600">Conta</CardTitle>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{nameFormat()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-gray-600">
            <span className="font-medium ">{user.name}</span>
            <span className="">{user.email}</span>
            <span>{formatDoc(user.document)}</span>
            <span>
              {user.branch}/{user.number}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-600">Saldo</h2>
          <NumberMotion
            value={user.balance}
            className="text-green-600"
            money={true}
            prefix="R$"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo de transação</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.amount > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <NumberMotion
                    value={transaction.amount}
                    className={`text-sm ${
                      transaction.amount > 0
                        ? ' text-green-600'
                        : ' text-red-600'
                    }`}
                    money={true}
                    prefix="R$"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
