import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-voter-row',
    templateUrl: './voter-row.component.html',
    styleUrls: ['./voter-row.component.css']
})
export class VoterRowComponent implements OnInit {

    @Input() voter;

    constructor() { }

    ngOnInit(): void {}

    initialImageSrc() {
        if (this.voter.custom_image)
            return this.voter.custom_image;
        else if (this.voter.default_image)
            return this.voter.default_image;
        else
            return "https://cdn.discordapp.com/embed/avatars/1.png";
    }

    onImageFailure() {
        if (this.voter.default_image)
            return this.voter.default_image;
        else
            return "https://cdn.discordapp.com/embed/avatars/1.png";
    }

}
