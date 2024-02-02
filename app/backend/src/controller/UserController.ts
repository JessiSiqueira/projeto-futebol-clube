import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/loginService';
import JWTUtils from '../utils/jwt';

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
    const { authorization } = req.headers;
    let verifyToken;

    if (typeof authorization === 'string') {
      verifyToken = JWTUtils.verifyToken(authorization) as { email: string };
    }

    const { status, data } = await this.userService.getRole(verifyToken?.email || '');
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
