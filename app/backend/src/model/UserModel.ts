import { IUser } from '../Interfaces/IUser';
import ModelUser from '../database/models/User.model';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private modelUser = ModelUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.modelUser.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user.toJSON();
  }
}
