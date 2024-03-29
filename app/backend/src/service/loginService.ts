import * as bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../model/UserModel';

export default class UserService {
  private user: UserModel;

  constructor() {
    this.user = new UserModel();
  }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'All fields must be filled' } };
    }

    const user = await this.user.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' } };
    }

    const token2 = jwtUtil.userToken({ id: user.id, email: user.email, role: user.role });

    return { status: 'SUCCESSFUL', data: { token: token2 } };
  }

  public async getRole(email: string): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.user.findByEmail(email);

    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
