export interface LeaveTime {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  leaveType: number;
  comment: string;
  createdAt: Date;
  createdBy: string;
}
