import { formatDate } from '@/lib/utils/format';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import NumberMotion from './numberMotion';
import { Transaction } from '@/types/Accounts';
import Link from 'next/link';

export default function TableView({ data }: { data: Transaction[] }) {
  const typeAccount = {
    BUSINESS: 'Empresarial',
    PERSONAL: 'Empresarial',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base text-gray-500">
          Transações de clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Tipo de conta</TableHead>
              <TableHead>Tipo de transação</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.id} className="cursor-pointer">
                <TableCell style={{ minWidth: '100px' }}>
                  {formatDate(transaction.createdAt)}
                </TableCell>
                <TableCell style={{ minWidth: '100px' }}>
                  {transaction.name}
                </TableCell>
                <TableCell style={{ minWidth: '140px' }}>
                  {transaction.document}
                </TableCell>
                <TableCell style={{ minWidth: '100px' }}>
                  {typeAccount[transaction.typeAccount]}
                </TableCell>
                <TableCell style={{ minWidth: '100px' }}>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'incoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: '100px' }}>
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
                <TableCell>
                  <Link
                    href={`/statement/${transaction.accountId}`}
                    className="bg-primary p-1 text-white rounded-sm"
                  >
                    Extrato
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
