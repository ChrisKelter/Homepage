export class CaptchaResponse {
  constructor(
    public id:string,
    public name: string,
    public response: string,
    public state: string
  ) {
  }
}
