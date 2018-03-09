import React, { Component } from 'react';
import './App.css';
import config from  './config.json';
import axios from 'axios';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import ImageList from './ImageList';
import Grid  from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { CircularProgress } from 'material-ui/Progress';

class App extends Component {

  constructor() {
    super();

    this.state = {
      imageUrls: [
        'http://www.wnetwork.com/sites/www.wnetwork.com/files/styles/w-article-desktop/public/post/7929/julia_1.jpg',
        'https://www.ecartelera.com/images/sets/26400/26484.jpg',
        'http://www.miami.com/wp-content/uploads/sites/2/2017/12/leonardo_dicaprio.jpg',
        'https://www.telegraph.co.uk/content/dam/technology/2017/06/06/TELEMMGLPICT000131019253_trans_NvBQzQNjv4BqF4WwDpbO-CkdHTTCi9TWzkYMapKPjdhyLnv9ax6_too.jpeg?imwidth=450'
      ],
      actorName: '',
      errorMessage: '',
      movieList: [],
      showProgress: false     
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchResult = this.fetchResult.bind(this);
  }

  fetchResult(imageUrl) {

    const baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description,Color&details&language=en'

    this.setState( { 
      showProgress: true,
      errorMessage: '',
      actorName: '',
      movieList: []
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

      let actorName;

      try {
        actorName = results.data.categories[0].detail.celebrities[0].name;
      }
      catch(err) {
        throw new Error('no-idea');
      }

      this.setState({
        actorName: actorName
      });        


      const baseUrlForPersonId = 'https://api.themoviedb.org/3/search/person';
      const paramsForPersonId = 
        {
          api_key: config.tmdbkey,
          language: 'en-US',
          page: '1',
          query: actorName
        };

      return axios.get(baseUrlForPersonId, { params: paramsForPersonId })
    } )
    .then( results => {

      let actorId;

      try {
        actorId = results.data.results[0].id;
      }
      catch(err) {
        throw new Error('no-actor');
      }

      const baseUrlForMovies = 'https://api.themoviedb.org/3/person/' + actorId + '/movie_credits';
      const paramsForMovies = 
        {
          api_key: config.tmdbkey,
          language: 'en-US',
        };

      return axios.get(baseUrlForMovies, { params: paramsForMovies} );
    })
    .then(results => {
      this.setState({
        movieList: Array.from(results.data.cast)
      });       
    })
    .catch(err => {

      if (err.message === 'no-idea') {
        this.setState({
          actorName: '',
          errorMessage: 'Sorry, I have no idea...', 
          movieList: []
        });        
      }
      else if (err.message === 'no-actor') {
        this.setState({
          errorMessage: '', 
          movieList: []
        });        
      }
      else if (err.response && err.response.data && err.response.data.message) {
        this.setState({
          actorName: '',
          errorMessage: 'Sorry, ' + err.response.data.message, 
          movieList: []
        });        
      }
      else {
        this.setState({
          actorName:'',
          errorMessage: 'Sorry, something worg...', 
          movieList: []
        });        
      }
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
      <div className="vm-main" >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Vision Movie
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="vm-spacer"></div>

        <Grid container justify="center" alignItems="flex-end" alignContent="flex-end">
          <Grid item xs={12}>
            <Typography align="center" variant="headline" color="primary">
              <SearchForm handleSubmit={ this.handleSubmit }/>
            </Typography>
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <ImageList imageUrls={this.state.imageUrls} 
                       fetchResult={this.fetchResult}/>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <div className="vm-spacer"></div>

        {
          this.state.showProgress ? 
            (
              <div className="vm-spinner" >
                <CircularProgress />
              </div>
            ) : 
            (
              <MovieList actorName={this.state.actorName} 
                         movieList={this.state.movieList}
                         errorMessage={this.state.errorMessage}/>
            )
        }
        <div className="vm-spacer"></div>
        <div className="vm-spacer"></div>
        <div className="vm-spacer"></div>
        <div className="vm-spacer"></div>
        <div className="vm-spacer"></div>

      </div>
    );

  }
}

export default App;
