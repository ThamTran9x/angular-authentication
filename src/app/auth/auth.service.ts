import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  signUp(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWq_2qULObFwaF8r8w41NgM_u5bq8HAFk', {
      email,
      password,
      returnSecureToken: true
      }
    ).pipe(catchError(this.handleError));
  }

 login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWq_2qULObFwaF8r8w41NgM_u5bq8HAFk', {
      email,
      password,
      returnSecureToken: true
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown erorr occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not found.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user is disabled.';
        break;
    }
    return throwError(errorMessage);
  }
}
