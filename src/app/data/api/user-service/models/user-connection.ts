/* tslint:disable */
/* eslint-disable */
import { ConnectionType } from './connection-type';
export interface UserConnection {
  type: ConnectionType;

  /**
   * User mail, telegram, phone, skype.
   */
  value: string;
}

