import React, { Component } from 'react';
import Carousel from 'nuka-carousel';

class ImageList extends Component {
 
  render() { 

    const imageUrlsJSX = this.props.imageUrls.map((url)=>(
      <img src={ url } className="img-fluid"/>
    ))

    return ( 
      <div>
        <Carousel>
          { imageUrlsJSX }
        </Carousel>      
      </div> 
    )
  }
}
 
export default ImageList;