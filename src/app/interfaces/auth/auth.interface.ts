export interface IAuthenticationRequest{
    email: string;
    password: string;
}

export interface IAuthenticationResponse {
  userId: string;
  jwtToken: string;
}
