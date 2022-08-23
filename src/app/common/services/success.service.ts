import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMaterialComponent } from '../material/dialog-material/dialog-material.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private dialog : MatDialog) { }

  openDialog(content : any) : void {
    const dialogRef = this.dialog.open(DialogMaterialComponent, {
      width: "30%",
      data: { content: content }
    });
  }
}
