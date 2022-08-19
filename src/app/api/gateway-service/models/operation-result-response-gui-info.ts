/* tslint:disable */
/* eslint-disable */
import { GuiInfo } from './gui-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseGuiInfo {
	body?: GuiInfo;
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
