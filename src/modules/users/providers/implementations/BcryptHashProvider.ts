import bcrypt from 'bcrypt'

import IHashProvider from '../interfaces/IHashProvider'

export default class BcryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10)
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed)
  }
}
