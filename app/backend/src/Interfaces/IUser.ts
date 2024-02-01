type IdUser = {
  id: number;
};

interface IUser extends IdUser {
  username: string,
  role: string,
  email: string,
  password: string,
}

export {
  IdUser,
  IUser,
};
