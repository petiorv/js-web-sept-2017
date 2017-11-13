import React, {Component} from 'react';

export default class ToggleButton extends Component{
    constructor(props){
        super(props);

        this.state = {
            power: true
        };

        //Bind event handlers
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState(prevState => ({power: !prevState.power}))
    }

    render(){
        return(
            <button onClick={this.onClick}>
                {this.state.power ? 'ON' : 'OFF'}
            </button>
        );
    }
}