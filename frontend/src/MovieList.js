import React, { Component } from 'react';

class MovieList extends Component {
  render() { 

    const movieListJSX = this.props.movieList.map( movie => (
      <div className="card">
        <img className="card-img-top" 
        src={"httpS://image.tmdb.org/t/p/w185/" + movie.poster_path} 
        alt="Card image cap" />
        
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    ))

    return (
      <div>
        {movieListJSX}
      </div>
    )
  }
}
 
export default MovieList;