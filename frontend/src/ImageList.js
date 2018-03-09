import React, { Component } from 'react';
import GridList, { GridListTile } from 'material-ui/GridList';
import './App.css';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }
};

class ImageList extends Component {
 
  render() { 

    const imageUrlsJSX = this.props.imageUrls.map((url)=>(
      <GridListTile>
        <img className="vm-image" src={ url } onClick={()=>{this.props.fetchResult(url)}} alt="imageUrl"/>
      </GridListTile>
    ))

    return ( 
      <div style={styles.root}>
        <GridList cellHeight="300" style={styles.gridList} >
          { imageUrlsJSX }
        </GridList>      
      </div> 
    )
  }
}
 
export default ImageList;