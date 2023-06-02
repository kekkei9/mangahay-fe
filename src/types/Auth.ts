export type SignUp = {};

export type Account = {
  id?: number;
  email?: string;
  fullname?: string;
  password?: null;
  avatar?: string;
  wallpaper?: null;
  active?: boolean;
  facebook?: boolean;
  id_facebook?: null;
  google?: boolean;
  id_google?: null;
  phone?: null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Login = {
  access_token: string;
  refresh_token: string;
};
