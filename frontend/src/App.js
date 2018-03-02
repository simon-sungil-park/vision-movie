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
    const baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description,Color&details&language=en'
    const newImage = {
      url: event.target.imageUrl.value
    }

    axios.post(baseUrl, 
        newImage, 
        {
        headers: 
        { 
          'Content-Type': 'application/json', 
          'Ocp-Apim-Subscription-Key': config.apikey  
        }
    })
    .then(results => {
      this.setState( {
        imageUrl: newImage.url,
        resultData: results.data.description.captions[0].text
      })
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
