export interface UserLogin {
  email: string;
  password: string;
}
export interface User extends UserLogin {
  first_name: 'string';
  last_name: 'string';
}

export type UserResponse = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  access_token: string;
  access_token_expiration: string;
};
