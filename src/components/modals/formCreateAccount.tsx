'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UserRoundPlus } from 'lucide-react';
import { formatDoc } from '@/lib/utils/format';
import { schemaCreateUser } from '@/schemas/schemaCreateUser';
import { useToast } from '@/hooks/use-toast';
import { registerAccount } from '@/lib/requests';

type FormValues = z.infer<typeof schemaCreateUser>;
type Props = {
  setIsOpen: (value: boolean) => void;
};
export default function FormCreateAccount({ setIsOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schemaCreateUser),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      type: 'PERSONAL',
      document: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const account = { ...data, password: data.document };
    const resp = await registerAccount(account);
    if (resp.result !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Conta Criada!',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
      return;
    }
    form.reset();
    toast({
      variant: 'default',
      title: 'Conta Criada!',
    });
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de conta</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PERSONAL">Pessoal</SelectItem>
                  <SelectItem value="BUSINESS">Empresarial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {form.watch('type') === 'PERSONAL' ? 'CPF' : 'CNPJ'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    const formatted = formatDoc(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder={
                    form.watch('type') === 'PERSONAL'
                      ? '000.000.000-00'
                      : '00.000.000/0000-00'
                  }
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          isLoading={loading}
        >
          <UserRoundPlus className="h-5 w-5 mr-2" />
          Registrar
        </Button>
      </form>
    </Form>
  );
}
