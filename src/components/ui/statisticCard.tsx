import { Card } from './card';
import NumberMotion from './numberMotion';

type StatisticCardProps = {
  title: string;
  value: number;
  prefix?: string;
  icon?: any;
  color?: string;
  money?: boolean;
};

export default function StatisticCard({
  title,
  value,
  prefix,
  icon,
  color,
  money,
}: StatisticCardProps) {
  return (
    <Card className="p-4 flex justify-between ">
      <div className="flex flex-col gap-4">
        <p className="text-base text-gray-500">{title}</p>
        <NumberMotion
          money={money}
          value={value}
          prefix={prefix}
          color={color}
        />
      </div>
      <div>{icon}</div>
    </Card>
  );
}
