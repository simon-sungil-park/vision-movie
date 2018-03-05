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
          <input type="text" name="imageUrl" />
          <input type="submit" />  
        </form>
      </div>
    )
  }
}
 
export default SearchForm;