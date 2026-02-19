import db from '@/database/db';
import { Order } from '@/schemas/orderSchema';

export async function _createOrder(body: Order) {
  const newOrder = await db.orders.create({
    data: {
      name: body.name,
      email: body.email,
      address: body.address,
      payment: body.payment,
      items: {
        createMany: {
          data: body.items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    },
    include: {
      items: true,
    },
  });

  return newOrder;
}
export async function _getOrderById(id: string) {
  const order = await db.orders.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    const err: any = new Error('Ordem não encontrada.');
    err.status = 404;
    throw err;
  }

  return order;
}
