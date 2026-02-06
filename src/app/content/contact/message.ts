import {CaptchaResponse} from "./captchaResponse";

export class Message {
  constructor(
    public name: string,
    public email: string,
    public subject: string,
    public message: string,
    public captcha: CaptchaResponse
  ) {
  }
}
