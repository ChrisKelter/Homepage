import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReCaptchaV3Service} from 'ng-recaptcha';
import {Subscription} from 'rxjs';
import {MessageService} from './message.service';
import {Message} from './message';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private recaptchaV3Service: ReCaptchaV3Service,
              private messageService: MessageService,
              private snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      name: [undefined, Validators.required],
      email: [undefined, Validators.compose([Validators.required, Validators.email])],
      subject: [undefined, Validators.required],
      message: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public sendMessage(): void {
    this.formGroup.disable();
    this.subscription = this.recaptchaV3Service.execute('sendMessage')
      .subscribe((token) => {
        const message: Message = this.formGroup.getRawValue();
        message.token = token;

        this.messageService.send(message).subscribe(result => {
            if (result) {
              this.openSnackBar('Nachricht wurde erfolgreich gesendet');
            }

            else {
              this.openSnackBar('Nachricht konnte nicht gesendet werden');
            }
            this.formGroup.enable();
            this.formGroup.reset();
        });
        this.subscription.unsubscribe();
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

}
