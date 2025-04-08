import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class CryptographyAdapter {
  private readonly PASSWORD_ROUNDS = 10;

  async encrypt(password: string): Promise<string> {
    const salt = await genSalt(this.PASSWORD_ROUNDS);
    const encrypted = await hash(password, salt);

    return encrypted;
  }

  async compare(password: string, encrypted: string) {
    return await compare(password, encrypted);
  }
}
