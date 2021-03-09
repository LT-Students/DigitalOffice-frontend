import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  private httpProtocol: 'http' | 'https' = 'https';
  private domainName = 'localhost';

  private apiPorts = {
    http: {
      project: ':9804',
      timeManagement: ':9806',
    },
    https: {
      project: ':9803',
      timeManagement: ':9805',
    },
  };

  get port() {
    return this.apiPorts[this.httpProtocol];
  }

  private readonly API_DOMAIN = this.httpProtocol + '://' + this.domainName;

  readonly PROJECT_SERVICE_ENDPOINT =
    this.API_DOMAIN + this.port.project + '/api/';

  readonly TIME_MANAGEMENT_SERVICE_ENDPOINT =
    this.API_DOMAIN + this.port.timeManagement + '/api/';
}
