/* tslint:disable */
/* eslint-disable */
export interface NewsRequest {

  /**
   * Id of the news author.
   */
  authorId: string;

  /**
   * The news' author name.
   */
  authorName: string;

  /**
   * The news' content.
   */
  content: string;

  /**
   * Id of the news. Required when it's wanted to be edited.
   */
  id: string;

  /**
   * Id of the news sender.
   */
  senderId: string;

  /**
   * The news' subject.
   */
  subject: string;
}

