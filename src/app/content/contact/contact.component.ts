import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../service/message.service";
import {MatList, MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Data} from "../../data";
import {D} from "@angular/cdk/keycodes";
import {FriendlyCaptchaSDK, WidgetHandle} from "@friendlycaptcha/sdk";
import {CaptchaResponse} from "./captchaResponse";
import {Message} from "./message";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatList,
    MatListItem,
    MatIcon,
    MatLine,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatListItemIcon,
    MatListItemTitle
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription?: Subscription;
  formGroup: FormGroup;
  data: Data = new Data()
  friendlyCaptchaSdk: FriendlyCaptchaSDK;
  @ViewChild('friendlyCaptcha') friendlyCaptcha?: ElementRef;
  captchaSolved = false
  captchaResponse?: CaptchaResponse
  widget?:WidgetHandle

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      name: [undefined, Validators.required],
      email: [undefined, Validators.compose([Validators.required, Validators.email])],
      subject: [undefined, Validators.required],
      message: [undefined, Validators.required]
    });

    this.friendlyCaptchaSdk = new FriendlyCaptchaSDK();
  }

  ngAfterViewInit() {
    // Create the widget
    if (this.friendlyCaptcha) {
      this.widget = this.friendlyCaptchaSdk.createWidget({
        element: this.friendlyCaptcha.nativeElement,
        sitekey: "FCMV65PL57UVOLQI"
      });
      this.widget.startMode = "focus"

      this.widget.addEventListener('frc:widget.complete', (ev: CustomEvent) => {
        this.captchaSolved = true;
        this.captchaResponse = ev.detail
      })
    }
  }


  ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public sendMessage(): void {
    if (!this.captchaResponse) {
      return;
    }

    this.formGroup.disable();
    const message: Message = this.formGroup.getRawValue();
    message.captcha = this.captchaResponse;

    this.messageService.send(message).subscribe({
      next: () => {
          this.openSnackBar('Nachricht wurde erfolgreich gesendet');
          this.widget?.reset();
          this.formGroup.enable();
          this.formGroup.reset();
      },
      error: (err) => {
        this.openSnackBar('Nachricht konnte nicht gesendet werden');
        console.error(err)
        this.widget?.reset();
        this.formGroup.enable();
        this.formGroup.reset();
      }
    })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

  get formIsValid(): boolean {
    return this.formGroup.valid && this.captchaSolved;
  }

}

