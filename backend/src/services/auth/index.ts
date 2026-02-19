import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import db from '@/database/db';
import { users as User } from '@prisma/client';
import { hashPassword } from '@/helpers';
import { User as CurrentUser } from '@/@types/custom.js';

export async function _signUp(body: User) {
  const user = await db.users.findFirst({ where: { email: body.email } });
  if (user) {
    throw new Error('Usuário já castrado.');
  }

  body.password = await hashPassword(body.password);
  const newUser = await db.users.create({ data: body });

  //@ts-ignore
  delete newUser.password;

  return newUser;
}

export async function _signIn(req: Request) {
  const user = await db.users.findFirst({
    where: { email: req.body.email },
    select: { id: true, email: true, name: true, password: true, address: true },
  });
  if (!user) {
    throw new Error('Usuário ou senha incorretos.');
  }
  const isValid = await bcrypt.compare(req.body.password, user.password ?? '');
  if (!isValid) {
    throw new Error('Usuário ou senha incorretos.');
  }
  //@ts-ignore
  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
  return { token: token };
}


