import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/loginService';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const payload = req.body.user;
    const { status, data } = await this.userService.getRole(payload.email);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
