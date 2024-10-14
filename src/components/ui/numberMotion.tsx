'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

type NumberMotionProps = {
  value: number;
  color?: string;
  prefix?: string;
  money?: boolean;
  className?: string;
};

export default function NumberMotion({
  value,
  color,
  prefix,
  money,
  className,
}: NumberMotionProps) {
  const count = useMotionValue(0);
  const formatValue = (value: any) =>
    money
      ? value.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : Math.round(value);

  const rounded = useTransform(count, formatValue);

  useEffect(() => {
    const animation = animate(count, value, { duration: 2 });

    return () => animation.stop();
  }, [count, value]);

  return (
    <div className={cn('font-semibold text-3xl flex text-gray-800', className)}>
      {prefix}
      <motion.p>{rounded}</motion.p>
    </div>
  );
}
