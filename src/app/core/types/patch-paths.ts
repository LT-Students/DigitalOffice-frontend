export type PatchRequest<T extends string> = { [key in T]?: any };
export type LeaveTimePath = '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';
