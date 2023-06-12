import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private invalidEmail: string = "test@test.test";

  constructor() { }

  http(): Observable<string> {
    return of(this.invalidEmail).pipe(delay(2000));
  }
}
