import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { PollService } from '../poll.service';
import { AuthService } from '../auth.service';
import { GuildService } from '../guild.service';

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

    guilds: any[] = [];
    error: number = null;
    webhookEnabled: boolean = false;
    webhookValid: boolean = true;
    guildEnabled: boolean = false;
    guildValid: boolean = true;

    constructor(
        private guildService: GuildService,
        private pollService: PollService
    ) { }

    ngOnInit(): void {
        this.guildService.getGuilds().subscribe({
            next: g => this.guilds = g,
            error: err => this.error = err.status
        })
    }

    get options() {
        return this.createForm.get('options') as FormArray;
    }

    addOption() {
        this.options.push(new FormControl('', Validators.required))
    }

    onSubmit() {
        if (this.createForm.valid) {
            this.pollService.createPoll({
                ...this.createForm.value,
                guild_proof: this.getGuildProof()
            });
        }
    }

    private getGuildProof() {
        let guild_id = this.createForm.get('guild').value;
        if (guild_id) {
            for (let i = 0; i < this.guilds.length; i++)
                if (guild_id == this.guilds[i].id)
                    return this.guilds[i].proof;
        } else
            return undefined;
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
