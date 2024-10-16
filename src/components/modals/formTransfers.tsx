//@ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAccountStore } from '@/stores/accountsStore';
import { apiIca, createTransfers } from '@/lib/requests';
import { formatValor } from '@/lib/utils/format';
import { schemaTransfers } from '@/schemas/schemaCreateUser';
import { useAuthStore } from '@/stores/authStore';

type Props = {
  setIsOpen: (value: boolean) => void;
};

export default function FormTransfers({ setIsOpen }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [valorFormat, setValorFormat] = useState('');
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { accounts } = useAccountStore();

  const isTypeAdm = user?.email === 'adm@email.com';
  const accountId = user?.accounts[0].accountId;

  const form = useForm<z.infer<typeof schemaTransfers>>({
    resolver: zodResolver(schemaTransfers),
    defaultValues: {
      sourceAccountId: '',
      targetAccountId: '',
      amount: '',
    },
  });

  useEffect(() => {
    if (!isTypeAdm && accountId) {
      form.setValue('sourceAccountId', accountId);
    }
  }, [isTypeAdm, accountId, form]);

  async function onSubmit(values: z.infer<typeof schemaTransfers>) {
    setLoading(true);

    const number = values.amount.replace(/[^\d,]/g, '');

    const valueNumeric = parseFloat(number.replace(',', '.'));
    values.amount = valueNumeric;

    const resp = await apiIca({
      path: '/transaction/internal',
      request: {
        method: 'POST',
        data: values,
      },
    });

    if (resp.result !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Não foi possível enviar a transação',
      });

      setLoading(false);
      return;
    }

    toast({
      variant: 'default',
      title: 'Transação enviada',
    });
    setIsOpen(false);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sourceAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta de origem </FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isTypeAdm && !!field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {account.document}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecione a conta para a transação.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta de destino</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {account.document}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecione a conta para a transação.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  placeholder="R$ 0,00"
                  {...field}
                  value={valorFormat}
                  onChange={(e) => {
                    const formatted = formatValor(e.target.value);
                    setValorFormat(formatted);
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              <FormDescription>Insira o valor da transação.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" isLoading={loading}>
          Enviar
        </Button>
      </form>
    </Form>
  );
}
