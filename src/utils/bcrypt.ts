import bcrypt from "bcrypt";

export function generateHash(password: string, salt = 10): string {
  return bcrypt.hashSync(password, salt);
}

export function validationHash(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}