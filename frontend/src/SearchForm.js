import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <TextField  placeholder="Enter Url" type="text" name="imageUrl" />
          <Button type="submit">Search</Button> 
        </form>
      </div>
    )
  }
}
 
export default SearchForm;