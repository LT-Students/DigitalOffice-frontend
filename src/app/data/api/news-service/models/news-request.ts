/* tslint:disable */
/* eslint-disable */
export interface NewsRequest {

  /**
   * Id of the news author.
   */
  authorId: string;

  /**
   * The news' content.
   */
  content: string;

  /**
   * Id of department the news sender.
   */
  departmentId?: string;

  /**
   * The news' author name.
   */
  pseudonym?: string;

  /**
   * Id of the news sender.
   */
  senderId: string;

  /**
   * The news' subject.
   */
  subject: string;
}

