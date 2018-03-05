import React, { Component } from 'react';
import './App.css';
import config from  './config.json'
import axios from 'axios'
import SearchForm from './SearchForm'
import MovieList from './MovieList'
import ImageList from './ImageList'

class App extends Component {

  constructor() {
    super();

    this.state = {
      imageUrls: [],
      actorName: '',
      actorId: '',
      movieList: []      
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

    this.setState({
      imageUrls: [...this.state.imageUrls, imageUrl]
    });

    axios.post(baseUrl, 
        newImage, 
        {
          headers: 
          { 
            'Content-Type': 'application/json', 
            'Ocp-Apim-Subscription-Key': config.apikey  
          }
        }
     )
    .then(results => {

      const actorName = results.data.categories[0].detail.celebrities[0].name;
      const baseUrlForPersonId = 'https://api.themoviedb.org/3/search/person';
      const paramsForPersonId = 
        {
          api_key: config.tmdbkey,
          language: 'en-US',
          page: '1',
          query: actorName
        };
      
      this.setState({
        actorName: actorName
      });        

      return axios.get(baseUrlForPersonId, { params: paramsForPersonId })
    } )
    .then( results => {
      console.log('person id', results);

      const actorId = results.data.results[0].id;
      const baseUrlForMovies = 'https://api.themoviedb.org/3/person/' + actorId + '/movie_credits';
      const paramsForMovies = 
        {
          api_key: config.tmdbkey,
          language: 'en-US',
        };

      this.setState({
        actorId: actorId
      });        
  
      return axios.get(baseUrlForMovies, { params: paramsForMovies} );
    })
    .then(results => {
      console.log('movie list', results);

      this.setState({
        movieList: Array.from(results.data.cast)
      });        
    })
    .catch(err => {
      console.log(err);
    })
  }


  render() {
    return (
      <div className="container">

        <SearchForm handleSubmit={ this.handleSubmit }/>
        <div className="col-sm-8 offset-sm-2">
          <ImageList imageUrls = { this.state.imageUrls }/>
        </div>
        { console.log(this.state) }
        
        {/* <div>
          {
            this.state.imageUrl ? <img src={this.state.imageUrl} alt="image"/> : '' 
          }
          
        </div> */}

        <div>
          <p>{this.state.actorName}</p>
        </div>
        <MovieList actorName={ this.state.actorName }/>

      </div>
    );
  }
}

export default App;
