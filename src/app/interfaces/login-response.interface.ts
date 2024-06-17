export interface ILoginResponse {
  token: IToken;
  username: string;
  user_id: string;
}

export interface IToken {
  token: string;
}
