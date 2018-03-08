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
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { LinearProgress } from 'material-ui/Progress';
import { CircularProgress } from 'material-ui/Progress';

class App extends Component {

  constructor() {
    super();

    this.state = {
      imageUrls: [
        'http://www.wnetwork.com/sites/www.wnetwork.com/files/styles/w-article-desktop/public/post/7929/julia_1.jpg',
        'https://www.ecartelera.com/images/sets/26400/26484.jpg',
        'http://www.miami.com/wp-content/uploads/sites/2/2017/12/leonardo_dicaprio.jpg',
      ],
      actorName: '',
      actorId: '',
      movieList: [],
      showProgress: false     
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchResult = this.fetchResult.bind(this);
  }

  fetchResult(imageUrl) {

    const baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description,Color&details&language=en'

    this.setState( { 
      showProgress: true
    })
    
    axios.post(baseUrl, 
        { url: imageUrl }, 
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
    .finally(()=>{
      this.setState( { 
        showProgress: false
      })  
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const imageUrl = event.target.imageUrl.value;

    this.setState({
      imageUrls: [imageUrl, ...this.state.imageUrls]
    });
    
    this.fetchResult(imageUrl);
  }

  render() {
    return (
      <div>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Vision Movie
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{height:30}}></div>
      <Grid container justify="center" alignItems="flex-end" alignContent="flex-end">
        <Grid item xs={12}>
          <Typography align="center" variant="headline" color="primary">
            <SearchForm handleSubmit={ this.handleSubmit }/>
          </Typography>
        </Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <ImageList imageUrls={this.state.imageUrls} fetchResult={this.fetchResult}/>
        </Grid>
        <Grid item xs={2}></Grid>

        {
          this.state.showProgress ? 
            (
              <div>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <CircularProgress />
                </Grid>
                <Grid item xs={2}></Grid>
              </div>
            ) : 
            (
              <div>
                <Grid item xs={12}>
                  <Typography align="center" variant="headline" color="primary">
                    {this.state.actorName}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <MovieList actorName={this.state.actorName} movieList={this.state.movieList}/>
                </Grid>
              </div>
            )
        }

      </Grid>
      </div>

    );
  }
}

export default App;
