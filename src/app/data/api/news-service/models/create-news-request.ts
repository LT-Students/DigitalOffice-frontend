/* tslint:disable */
/* eslint-disable */
export interface CreateNewsRequest {

  /**
   * Id of the news author.
   */
  authorId: string;

  /**
   * The news content.
   */
  content: string;

  /**
   * Id of department the news sender.
   */
  departmentId?: string;

  /**
   * The news' preview.
   */
  preview: string;

  /**
   * The news author name.
   */
  pseudonym?: string;

  /**
   * The news subject.
   */
  subject: string;
}

