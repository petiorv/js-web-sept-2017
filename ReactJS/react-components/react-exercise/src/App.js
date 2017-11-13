import React, { Component } from 'react';
import './App.css';

import Slider from './components/Slider';
import Roster from './components/Roster';
import Bio from './components/Bio';

import ObserverMenu from './utils/observer';

class App extends Component {
  constructor(){
    super();

    this.state = { 
      focusedChar : 0
    }

    this.eventHanlder = (newState) => {
      this.setState(newState)
    } 
  }

  componentDidMount(){
    ObserverMenu.addObserver("changeFocus", this.eventHanlder);
  }

  render() {
    return (
      <div className="App">
        
        <Slider />
        <Roster />      
        <Bio params={this.state}/>  
      </div>
    );
  }
}

export default App;
