
import { z } from 'zod';

export const OrderFormSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' }),
  email: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'Este campo deve ser um email.' }),
  address: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' }),
  payment: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' }),
  items: z.array(
    z.object({
      productId: z
        .string({
          required_error: 'Campo obrigatório',
        })
        .min(1, { message: 'Campo obrigatório' }),
      quantity: z
        .number({
          required_error: 'Campo obrigatório',
        })
        .min(1, { message: 'Pelo menos um item deve ser adicionado' }),
    })
  ).min(1, { message: 'Pelo menos um item deve ser adicionado' }),


});

export type Order = z.infer<typeof OrderFormSchema>;