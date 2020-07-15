import { Request, Response } from 'express'

export default class ProfileController {
  async index(req: Request, res: Response): Promise<void> {
    res.json({})
  }

  async update(req: Request, res: Response): Promise<void> {
    res.json()
  }
}
