import React, { Component } from 'react';
import './MovieList.css'

class MovieList extends Component {
  render() { 

    const movieListJSX = this.props.movieList.map( movie => !movie.poster_path ?
      '':
      (
        <div className="vm-card" >
          <div className="vm-poster" >
              <img src={"https://image.tmdb.org/t/p/w185/" + movie.poster_path} 
                alt={movie.original_title + " poster"} />
          </div>
          <div className="vm-content" >
            <h3>
              {movie.original_title} 
              <span>
                {movie.release_date ? movie.release_date.substring(0,4) : ''}
              </span>
            </h3>
            <h4>{"as " + movie.character}</h4>
            <p>{movie.overview}</p>
          </div>
        </div>
    ))

    return (
      <div className="vm-container" > 
        <h2>{this.props.actorName}</h2>
        <h2>{this.props.errorMessage}</h2>
        {
          movieListJSX.length > 0 ? 
            movieListJSX : 
            this.props.actorName ? 
              (<h3 style={{textAlign:'center'}}>No movies found.</h3>) :
              ''
        }
        
      </div>
    )
  }
}
 
export default MovieList;