export class UserDTO {

  constructor(data:Partial<UserDTO>) {
    Object.assign(this, data);
  }

  userId?: number|null;
  firstName?: string|null;
  lastName?: string|null;
  email?: string|null;
  password?: string|null;
  address?: string|null;
  phoneNumber?: string|null;
  orderHistory?: string|null;

}
