interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const saveAuthToSession = ({
  accessToken,
  refreshToken,
}: Tokens): void => {
  sessionStorage.setItem('lib_jwt_token', accessToken);
  sessionStorage.setItem('lib_refresh_token', refreshToken);
};

export const clearAuthFromSession = (): void => {
  sessionStorage.removeItem('lib_jwt_token');
  sessionStorage.removeItem('lib_refresh_token');
};

export const getTokenFromSession = (): string | null => {
  return sessionStorage.getItem('lib_jwt_token');
};