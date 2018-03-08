import React, { Component } from 'react';
import './App.css';
import config from  './config.json';
import axios from 'axios';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import ImageList from './ImageList';
import Grid  from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
      //console.log('movie list', results);
      console.log(Array.from(results.data.cast));
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
      <Grid container justify="center" alignItems="flex-end" alignContent="flex-end">
        <Grid item xs={12}>
          <Typography align="center" variant="headline" color="primary">
            <SearchForm handleSubmit={ this.handleSubmit }/>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <ImageList imageUrls = { this.state.imageUrls }/>
        </Grid>
        {/* <div>
          {
            this.state.imageUrl ? <img src={this.state.imageUrl} alt="image"/> : '' 
          }
          
        </div> */}

        <div>
          <p>{this.state.actorName}</p>
        </div>
          <Grid>
            <MovieList actorName={this.state.actorName} movieList={this.state.movieList}/>
          </Grid>
      </Grid>
    );
  }
}

export default App;
