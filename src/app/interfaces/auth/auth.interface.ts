export interface IAuthenticationRequest{
    email: string;
    password: string;
}

export interface IAuthenticationResponse {
  id: string;
  jwt: string;
}
