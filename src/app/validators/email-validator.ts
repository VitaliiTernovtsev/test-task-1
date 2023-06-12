import { AbstractControl, AsyncValidatorFn, ValidationErrors, } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmailService } from 'src/app/services/email.service';

export class EmailValidator {
    static createValidator(emailService: EmailService): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return emailService
                .http()
                .pipe(
                    map(email => email === control.value ? { emailExists: true } : null));
        };
    }
}