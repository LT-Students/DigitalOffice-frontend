/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
export interface CreateCommunicationRequest {
  type: CommunicationType;

  /**
   * Unique user identifier. Is null if create with user creating
   */
  userId?: null | string;

  /**
   * Communication value
   */
  value: string;
}

