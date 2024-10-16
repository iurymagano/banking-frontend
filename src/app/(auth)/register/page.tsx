'use client';

import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, UserRoundPlus } from 'lucide-react';
import { formatDoc } from '@/lib/utils/format';
import Link from 'next/link';
import { schemaSignUp } from '@/schemas/schemaCreateUser';
import { handleSignUp } from '@/lib/server/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

type FormValues = z.infer<typeof schemaSignUp>;

export default function RegistroAvancadoPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { clearUser } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schemaSignUp),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      type: 'PERSONAL',
      document: '',
    },
  });

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'password') {
        calculatePasswordStrength(value.password || '');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    // clearUser();
    setLoading(true);
    const resp = await handleSignUp(data);

    if (resp.result !== 'success') {
      toast({
        variant: 'destructive',
        title: resp.message,
      });
      setLoading(false);

      return;
    }
    toast({
      variant: 'default',
      title: 'Conta criada!',
      description: 'Seus dados foram enviados com sucesso.',
    });

    setLoading(false);

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-900">
            Criar conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de conta</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                          className="focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <Progress
                      value={passwordStrength}
                      className="w-full h-2 mt-2 bg-blue-100"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                isLoading={loading}
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserRoundPlus className="h-5 w-5 mr-2" />
                Registrar
              </Button>
            </form>
            <div className="mt-4">
              <Link href={'/'}>
                <Button
                  variant="outline"
                  className="w-full text-blue-600 hover:text-blue-700"
                >
                  Já tem uma conta? Faça login
                </Button>
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
