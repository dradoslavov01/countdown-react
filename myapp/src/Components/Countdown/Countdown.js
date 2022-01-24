import './Countdown.css';
import React from 'react';

class Countdown extends React.Component {

    state = {
        days: null,
        hours: null,
        minutes: null,
        seconds: 59,
        message: ''
    }

    convertToDays() {
        const data = this.props.moment;
        const regex = /\d{1,}/g;
        const match = data.match(regex);

        //checking if parameter exist in props
        if (data.indexOf('years') > -1 &&
            data.indexOf('months') > -1 &&
            data.indexOf('weeks') > - 1 &&
            data.indexOf("days") > -1 &&
            data.indexOf("hours") > -1 &&
            data.indexOf("minutes") > -1) {
            //convert years, months and weeks to days
            const years = match[0];
            const months = match[1];
            const weeks = match[2];
            const days = Number(match[3]);
            const allDays = years * 365 + months * 30 + weeks * 7 + days;
            this.setState({ days: allDays, hours: match[4], minutes: match[5] });
        } else if (data.indexOf("months") > -1 &&
            data.indexOf("weeks") > -1 &&
            data.indexOf('days') > -1 &&
            data.indexOf('hours') > -1 &&
            data.indexOf('minutes') > -1) {
            //convert months and weeks to days
            const months = match[0];
            const weeks = match[1];
            const days = Number(match[2]);
            const allDays = months * 30 + weeks * 7 + days;
            this.setState({ days: allDays, hours: match[3], minutes: match[4] });
        } else if (data.indexOf("weeks") > -1 &&
            data.indexOf("days") > -1 &&
            data.indexOf("hours") > -1 &&
            data.indexOf('minutes') > -1) {
            //convert weeks to days
            const weeks = match[0];
            const days = Number(match[1]);
            const allDays = weeks * 7 + days;
            this.setState({ days: allDays, hours: match[2], minutes: match[3] });
        } else if (data.indexOf("days") > -1 &&
            data.indexOf("hours") > -1 &&
            data.indexOf('minutes') > -1) {
            this.setState({ days: match[0], hours: match[1], minutes: match[2] });
        } else if (data.indexOf("hours") > -1 &&
            data.indexOf("minutes") > -1) {
            this.setState({ days: 0, hours: match[0], minutes: match[1] });
        } else if (data.indexOf('hours') > -1) {
            this.setState({ days: 0, hours: match[0], minutes: 0 });
        } else {
            this.setState({ days: 0, hours: 0, minutes: match[0], seconds: 0 });
        }

        this.setState((state) => ({

        }));
    }

    componentDidMount() {
        this.convertToDays();
        const message = this.props.message;

        let interval = setInterval(() => {
            if (this.state.seconds > 0) {
                this.setState((state) => ({ ...state, seconds: state.seconds -= 1 }))
            }
            if (this.state.minutes > 0 && this.state.seconds === 0) {
                this.setState((state) => ({ ...state, minutes: state.minutes -= 1, seconds: 59 }))
            }
            if (this.state.hours > 0 && this.state.minutes === 0) {
                this.setState((state) => ({ ...state, hours: state.hours -= 1, minutes: 59 }))
            }
            if (this.state.days > 0 && this.state.hours === 0) {
                this.setState((state) => ({ ...state, days: state.days -= 1, hours: 24 }))
            }
            if (!this.state.days && !this.state.hours && !this.state.minutes && !this.state.seconds) {
                this.setState((state) => ({ ...state, message }));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    };


    render() {
        return <div className="container">
            <p className="title">Countdown:</p>
            <p className="date">{this.state.days === 1 ? `${this.state.days} day` : `${this.state.days} days`}, {this.state.hours > 10 ? `${this.state.hours}` : `0${this.state.hours}`}:{this.state.minutes > 10 ? `${this.state.minutes}` : `0${this.state.minutes}`}:{this.state.seconds > 10 ? `${this.state.seconds}` : `0${this.state.seconds}`}</p>
            <p className="message">{this.state.message}</p>
        </div>
    };
}

export default Countdown;
