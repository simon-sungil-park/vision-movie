import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';


class ImageList extends Component {
 
  render() { 

    const imageUrlsJSX = this.props.imageUrls.map((url)=>(
        <GridListTile>
        <img src={ url } />
        <GridListTileBar/>
      </GridListTile>
    ))

    return ( 
      <div>
        <GridList cellHeight="300">
          { imageUrlsJSX }
        </GridList>      
      </div> 
    )
  }
}
 
export default ImageList;