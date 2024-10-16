//@ts-nocheck
'use client';

import { useState } from 'react';
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
import { formatValor } from '@/lib/utils/format';
import { createPix } from '@/lib/requests';
import { useAuthStore } from '@/stores/authStore';
import { shemaFormPix } from '@/schemas/schemaForms';

type Props = {
  setIsOpen: (value: boolean) => void;
};

export default function FormPix({ setIsOpen }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [valorFormat, setValorFormat] = useState('');
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { accounts } = useAccountStore();

  const form = useForm<z.infer<typeof shemaFormPix>>({
    resolver: zodResolver(shemaFormPix),
    defaultValues: {
      accountId: '',
      amount: '',
    },
  });

  async function onSubmit(values: z.infer<typeof shemaFormPix>) {
    setLoading(true);
    const resp = await createPix({
      ...values,
      document: user.accounts[0].document,
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
      description: `Codigo rastreio: ${resp.data.e2eId}, Valor: R$ ${values.amount}`,
    });
    setLoading(false);
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.accountId}
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
