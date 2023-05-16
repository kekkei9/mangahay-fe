export type LoginResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  result?: {
    access_token: string;
    refresh_token: string;
  };
};
