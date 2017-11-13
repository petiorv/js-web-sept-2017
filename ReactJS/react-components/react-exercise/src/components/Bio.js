import React, { Component } from 'react';
import Char from './Char';


class Bio extends Component {
    constructor() {
        super();
        
        this.state = {
            id: 0,
            currentChar: {}
        };
    }

    componentWillReceiveProps(props){
        fetch('http://localhost:9999/character/' + props.params.id).then(data => {
            return data.json();
        }).then(parsedData => {
            this.setState({ currentChar: parsedData });
        })
    }

    componentDidMount() {
        fetch('http://localhost:9999/character/' + this.state.id).then(data => {
            return data.json();
        }).then(parsedData => {           
            this.setState({ currentChar: parsedData });
        })
    }
    render() {
        return (
            <div>                                
                <fieldset className="char-details">
                    <Char params={this.state.currentChar} />
                    <p>{this.state.currentChar.bio}</p>
                </fieldset>
            </div>
        );
    }
}

export default Bio;