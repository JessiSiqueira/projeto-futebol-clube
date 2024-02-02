import * as bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../model/UserModel';

export default class UserService {
  private user: UserModel;

  constructor() {
    this.user = new UserModel();
  }

  public async login(email: string, password: string): Promise<ServiceResponse<string>> {
    const user = await this.user.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' } };
    }

    const token = jwtUtil.userToken({ id: user.id, email: user.email });

    return { status: 'SUCCESSFUL', data: token };
  }
}
