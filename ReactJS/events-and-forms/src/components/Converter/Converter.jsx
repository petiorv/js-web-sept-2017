import React, { Component } from 'react';
import './Converter.css'; 

export default class Converter extends Component {
    render() {
        return (
            <div className="converter">
                <form>
                    <input
                        name="eur"
                        type="number"
                    />
                    <input
                        type="submit"
                        value="Convert"
                    />
                    <br />
                    <input
                        type="number"
                        disabled="true"
                    />
                </form>
            </div>
        );
    }
}