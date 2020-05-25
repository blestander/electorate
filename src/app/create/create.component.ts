import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { PollService } from '../poll.service';
import { AuthService } from '../auth.service';

const webhookRegex = /https:\/\/discordapp\.com\/api\/webhooks\/([0-9]*)\/([A-Za-z0-9\-_]*)/g;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        options: new FormArray([
            new FormControl('', Validators.required)
        ]),
        method: new FormControl('', Validators.required),
        guild: new FormControl(''),
        webhook: new FormControl('')
    })

    loggedIn: boolean = true;
    webhookEnabled: boolean = false;
    webhookValid: boolean = true;
    guildEnabled: boolean = false;
    guildValid: boolean = true;

    constructor(
        private auth: AuthService,
        private pollService: PollService
    ) { }

    ngOnInit(): void {
        this.auth.checkLogin().subscribe({
            next: b => this.loggedIn = b,
            error: err => console.error(err)
        });
    }

    get options() {
        return this.createForm.get('options') as FormArray;
    }

    addOption() {
        this.options.push(new FormControl('', Validators.required))
    }

    onSubmit() {
        if (this.createForm.valid) {
            this.pollService.createPoll(this.createForm.value);
        }
    }

    toggleWebhook() {
        this.webhookEnabled = !this.webhookEnabled;
        if (!this.webhookEnabled) // Webhook now disabled
            this.createForm.get('webhook').setValue('');
        this.webhookValid = this.validateWebhook();
    }

    validateWebhook() {
        if (this.webhookEnabled) {
            return webhookRegex.test(this.createForm.get('webhook').value);
        } else
            return true;
    }

    toggleGuild() {
        this.guildEnabled = !this.guildEnabled;
        if (!this.guildEnabled) // Guild is now disabled
            this.createForm.get('guild').setValue('');
        this.guildValid = this.validateGuild();
    }

    validateGuild() {
        return !this.guildEnabled || this.createForm.get('guild').value != "";
    }

}
