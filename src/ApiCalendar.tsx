import React, { ReactNode } from "react";
import {Button, Text, View} from 'react-native';

const gapi = require('gapi');

let CLIENT_ID: string = "474857817188-o8gdccn66v5jbh6uarqod8jv1vfq2pl8.apps.googleusercontent.com";
let API_KEY: string = "AIzaSyBNuPUopv37muXGvxuDCE7ShrFyPEw6JEM";
let SCOPES: string = "https://www.googleapis.com/auth/calendar.readonly";
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

export default class ApiCalendar extends React.Component<any, any> {
    public constructor(props: object) {
        super(props);

        this.state = {
            sign: true,
            message: [],
        };
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.handleSignoutClick = this.handleSignoutClick.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.appendPre = this.appendPre.bind(this);
    }

    private updateSigninStatus(isSignedIn: any): void {
        if (isSignedIn) {
            this.setState({
                sign: true,
            });
            this.listUpcomingEvents();
        } else {
            this.setState({
                sign: false,
            });
        }
    }

    public handleAuthClick(): void {
        gapi.auth2.getAuthInstance().signIn();
    }

    public handleSignoutClick(): void {
        gapi.auth2.getAuthInstance().signOut();
    }

    public appendPre(newMessage: string): void {
        console.log(this.state.sign);
        this.setState({
            message: [...this.state.message, `${newMessage}\n`],
        });
    }

    public listUpcomingEvents(): void {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response: any) => {
            let events = response.result.items;
            this.appendPre('Upcoming events:');

            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    let when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    this.appendPre(event.summary + ' (' + when + ')')
                }
            } else {
                this.appendPre('No upcoming events found.');
            }
        });
    }

    private initClient(): void {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    public handleClientLoad(): void {
        gapi.load('client:auth2', this.initClient)
    }

    render(): ReactNode {
        return (
            <View>
                <Text>{this.state.sign} Salut je suis Google Api</Text>
                <Button title="Connect" onPress={this.handleAuthClick} />
                <Button title="Disconnect" onPress={this.handleSignoutClick} />
                <Text>{this.state.message}</Text>
            </View>
        )
    }
}