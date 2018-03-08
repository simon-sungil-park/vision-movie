import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid  from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class MovieList extends Component {
  render() { 

    const movieListJSX = this.props.movieList.map( movie => (

      <Paper>
        <Grid container wrap="nowrap">
          <Grid item xs={4}>
              <img  
              src={"httpS://image.tmdb.org/t/p/w185/" + movie.poster_path} 
              alt="Card image cap" />
          </Grid>
          <Grid item xs={8} >
            <div  >
              <h5 >Card title</h5>
              <Typography >Some quick example text to build on the card title and make up the bulk of the card's content.</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    ))

    return (
      <div>
        {movieListJSX}
      </div>
    )
  }
}
 
export default MovieList;