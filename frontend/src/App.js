import React, { Component } from 'react';
import './App.css';
import config from  './config.json'
import axios from 'axios'
import SearchForm from './SearchForm'
import MovieList from './MovieList'

class App extends Component {

  constructor() {
    super();

    this.state = {
      imageUrl: '',
      actorName: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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
        actorName: results.data.categories[0].detail.celebrities[0].name
      })
    })
  }

  render() {
    return (
      <div className="App">
        <SearchForm handleSubmit={ this.handleSubmit }/>
        { console.log(this.state) }
        <div>
          <img src={this.state.imageUrl} alt="image"/>
        </div>

        <div>
          <p>{this.state.actorName}</p>
        </div>
        <MovieList actorName={ this.state.actorName }/>

      </div>
    );
  }
}

export default App;
