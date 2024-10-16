import { isValidCNPJ, isValidCPF } from '@/lib/utils/validation';
import { z } from 'zod';

// Schema for creating a user by the admin interface
// This schema is used when an admin creates a new user in the system
export const schemaCreateUser = z.object({
  name: z.string({ message: 'Nome obrigatório' }).min(3, 'Minimo 3 caracteres'),
  document: z.string({ message: 'Documento obrigatório' }).refine(
    (doc) => {
      return isValidCPF(doc) || isValidCNPJ(doc);
    },
    {
      message: 'Documento inválido',
    },
  ),
  type: z.string({ message: 'Tipo obrigatório' }).min(3, 'Minimo 3 caracteres'),
  email: z
    .string({ message: 'Email obrigatório' })
    .email({ message: 'Formato de email inválido' }),
});

// Schema for creating an account by the user
// This schema is used when a user creates their own account before logging into the system
export const schemaSignUp = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    .regex(/[a-z]/, {
      message: 'Senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[A-Z]/, {
      message: 'Senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Senha deve conter pelo menos um caractere especial',
    }),
  type: z.enum(['PERSONAL', 'BUSINESS'], {
    required_error: 'Selecione um tipo de conta',
  }),
  document: z.string().refine(
    (val) => {
      const numbers = val.replace(/\D/g, '');
      return numbers.length === 11 || numbers.length === 14;
    },
    { message: 'CPF ou CNPJ inválido' },
  ),
});

export const schemaTransfers = z
  .object({
    sourceAccountId: z
      .string({
        required_error: 'Por favor selecione uma conta de origem.',
      })
      .min(3, { message: 'Selecione a conta de origem' }),
    targetAccountId: z
      .string({
        required_error: 'Por favor selecione uma conta de destino.',
      })
      .min(3, { message: 'Selecione a conta de destino' }),
    amount: z.string().refine(
      (val) => {
        const number = parseFloat(val.replace(/[^\d,]/g, '').replace(',', '.'));
        return !isNaN(number) && number > 0;
      },
      {
        message: 'Por favor, insira um valor válido maior que zero.',
      },
    ),
  })
  .refine((data) => data.sourceAccountId !== data.targetAccountId, {
    message: 'A conta de origem e destino não podem ser a mesma.',
    path: ['targetAccountId'],
  });

export const shemaFormPix = z.object({
  accountId: z.string({
    required_error: 'Por favor selecione uma conta.',
  }),
  amount: z.string().refine(
    (val) => {
      const number = parseFloat(val.replace(/[^\d,]/g, '').replace(',', '.'));
      return !isNaN(number) && number > 0;
    },
    {
      message: 'Por favor, insira um valor válido maior que zero.',
    },
  ),
});
