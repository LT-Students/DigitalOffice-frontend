/* tslint:disable */
/* eslint-disable */
import { BookingRule } from './booking-rule';
export interface CreateWorkspaceTypeRequest {
  bookingRule: BookingRule;
  description?: string;
  endTime?: string;
  name: string;
  startTime?: string;
}

