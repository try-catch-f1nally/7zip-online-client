export interface AuthResponse {
  userId: string;
  accessToken: string;
}

export interface AuthState {
  isAuth: boolean;
  userId: string | null;
  email: string | null;
  accessToken: string | null;
}

export interface SignupBody {
  email: string;
  password: string;
  passwordConfirm: string;
  userAgree: boolean;
}

export interface LoginBody {
  email: string;
  password: string;
}
