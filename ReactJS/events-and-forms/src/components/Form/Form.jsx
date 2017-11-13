import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            bio: '',
            selectedCar: 'Volvo'
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        alert(this.state.name);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    onChange={this.onChange}
                    placeholder="name"
                    name="name"
                    type="text"
                    value={this.state.name}
                />
                <input
                    onChange={this.onChange}
                    placeholder="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                />
                <br />
                <textarea
                    onChange={this.onChange}
                    name="bio"
                    value={this.state.bio}
                />
                <br />
                <input type="submit" value="submit" />
                <br />
                <select
                    onChange={this.onChange}
                    value={this.state.selectedCar}
                    name="selectedCar">
                    <option>Volvo</option>
                    <option>Audi</option>
                </select>
            </form>
        );
    }
}