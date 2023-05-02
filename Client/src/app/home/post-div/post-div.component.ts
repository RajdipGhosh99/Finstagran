import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-div',
  templateUrl: './post-div.component.html',
  styleUrls: ['./post-div.component.scss']
})
export class PostDivComponent implements OnInit {
  @Input() postObj: any = {}
  public popupHide: boolean = false;

  ngOnInit(): void {

  }

  timeAgo(input: Date): any {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter: any = new Intl.RelativeTimeFormat('en');
    const ranges: any = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1
    };
    const secondsElapsed: any = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta: any = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }


}
