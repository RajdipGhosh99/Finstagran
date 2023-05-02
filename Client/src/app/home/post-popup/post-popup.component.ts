import { Component, Input, OnInit } from "@angular/core";


@Component({
    selector:'app-post-popup',
    templateUrl:'./post-popup.component.html',
    styleUrls: ['./post-popup.component.scss']
})


export class PostPopupComponent implements OnInit {
    @Input() hide:boolean=false;
    constructor() {
        
    }
    ngOnInit(): void {
        
    }
}