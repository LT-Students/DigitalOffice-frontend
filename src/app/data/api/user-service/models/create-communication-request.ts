/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
export interface CreateCommunicationRequest {
  communicationType: CommunicationType;

  /**
   * Unique user identifier. Is null if create with user creating
   */
  userId?: null | string;

  /**
   * Name of school.
   */
  value: string;
}

