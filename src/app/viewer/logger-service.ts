import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class LoggerService {

  constructor(private snackBar: MdSnackBar) {}

  error(message: string, e: DOMException): void {
    this.snackBar.open(message || 'Something went terribly wrong...', null, {
      duration: 5000,
    });
    console.log(e.message);
  }
}
