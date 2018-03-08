import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    //color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
};

class ImageList extends Component {
 
  render() { 

    const imageUrlsJSX = this.props.imageUrls.map((url)=>(
      <GridListTile>
        <img src={ url } onClick={()=>{this.props.fetchResult(url)}}/>
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