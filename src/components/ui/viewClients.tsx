import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const statusColors = {
  ACTIVE: 'bg-green-500',
  PENDING_KYC: 'bg-yellow-500',
};

const labels = {
  ACTIVE: 'ATIVO',
  PENDING_KYC: 'PENDENTE',
};

type Props = {
  data: Array<Client>;
  title: string;
};

type Client = {
  id: number;
  name: string;
  avatar: string;
  status: 'ACTIVE' | 'PENDING_KYC';
};

export default function ViewClients({ data, title }: Props) {
  return (
    <Card className="w-full h-[250px]">
      <CardHeader className="mb-0 pb-2">
        <p className="text-base text-gray-500">{title}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-0">
          {data.map((cliente) => (
            <Link href={`statement/${cliente.id}`}>
              <li
                key={cliente.id}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={cliente.avatar} alt={cliente.name} />
                  <AvatarFallback>
                    {cliente.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold">{cliente.name}</h3>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    statusColors[cliente?.status] || ''
                  } text-white`}
                >
                  {labels[cliente.status] || cliente.status}
                </Badge>
              </li>
            </Link>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
