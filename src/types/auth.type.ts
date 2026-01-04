export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  username: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}
