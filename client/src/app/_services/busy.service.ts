import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyReqCnt = 0;

  constructor(private spinner: NgxSpinnerService) {}

  busy() {
    this.busyReqCnt++;
    this.spinner.show(undefined, {
      type: 'ball-elastic-dots',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333',
    });
  }

  idle() {
    this.busyReqCnt--;
    if (this.busyReqCnt <= 0) {
      this.busyReqCnt = 0;
      this.spinner.hide();
    }
  }
}
