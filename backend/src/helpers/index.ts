import bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}




