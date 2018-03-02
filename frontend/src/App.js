import React, { Component } from 'react';
import './App.css';
import config from './config.json'
import axios from 'axios'

class App extends Component {

  constructor() {
    super();

    this.state = {
      imageUrl: '',
      resultData: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState( {
      imageUrl: event.target.imageUrl.value
    })
  }


  render() {
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="imageUrl" />
          <input type="submit" />  
        </form>

        <div>
          <img src={this.state.imageUrl} alt="image"/>
        </div>

        <div>
          <p>{this.state.resultData}</p>
        </div>



      </div>
    );
  }
}

export default App;
