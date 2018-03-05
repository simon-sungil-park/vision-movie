import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" name="imageUrl" value="http://www.wnetwork.com/sites/www.wnetwork.com/files/styles/w-article-desktop/public/post/7929/julia_1.jpg"/>
          <input type="submit" />  
        </form>
      </div>
    )
  }
}
 
export default SearchForm;