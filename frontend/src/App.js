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
    this.testMH = this.testMH.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description,Color&details&language=en'
    const imageUrl = event.target.imageUrl.value;
    const newImage = {
      url: imageUrl
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
        imageUrl: imageUrl,
        resultData: results.data.description.tags.join('  ')
      })
    })
  }

  testMH() {
    const baseUrl="https://api.mediahound.com/1.3/search/all/star";




    axios.get(baseUrl, {
      params: {
        access_token: "4bdb0a8b-0bcc-4fd3-8c72-a07aedffaed8",
      },
    })
    .then(result=>{
      console.log(result.data);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  render() {
    return (
      <div className="App">

        <button onClick={this.testMH}>MH</button>

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
