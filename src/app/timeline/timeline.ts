export class Timeline {
  constructor(
    public timeTitle: string,
    public timeSubtitle: string,
    public contentTitle: string,
    public contentText: string,
    public subContent?: {
      title: string,
      content: string,
    }
  ) {
  }
}
