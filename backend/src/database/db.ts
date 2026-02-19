import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient<{ omit: { users: { password: true } } }> | undefined;
}

const db = globalThis.prisma || new PrismaClient({
  omit: {
    users: {
      password: true
    },
  },
});
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;
