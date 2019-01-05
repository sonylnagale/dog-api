import React, { Component } from 'react';

class Select extends Component {

  state = {
    breeds:this.props.breeds
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            breeds: result.message
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  change = (event) => {
    this.props.callbackFromParent(event.target.value);
  }

  render() {
    return (
      <select onChange={this.change}>
        <option>Select breed</option>
        {Object.keys(this.state.breeds).map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    )
  }
}

export default Select;
