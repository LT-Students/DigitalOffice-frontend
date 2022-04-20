/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
export interface EditCommunicationRequest {

  /**
   * allows to establish the confirmed communication as BaseEmail.
   */
  type?: CommunicationType;

  /**
   * new the communication value
   */
  value?: string;
}

