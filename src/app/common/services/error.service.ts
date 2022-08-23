import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../material/error-message/error-message.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog : MatDialog) { }

  openErrorDialog(content : any) : void {
    const dialogRef = this.dialog.open(ErrorMessageComponent, {
      width: "30%",
      data: { content: content }
    });
  }
}
