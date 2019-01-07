import React, { Component } from 'react';

class Select extends Component {

  state = {
    breeds: null,
    breed: this.props.breed,
    image: null,
    subbreed: null
  };

  componentDidMount() {
    const { breed } = this.state;
    if (!breed) {
      this.fetchDogs();
    }
  }

  fetchDogs() {
    const url = "https://dog.ceo/api/breeds/list/all";

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            breeds: result.message
          });

          this.props.change(result.message);
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
    this.setState({
      breed: event.target.value,
      image: null,
      breeds: this.props.breeds,
      subbreeds: null
    });

    this.props.change(event.target.value);
  }

  changeSubbreed = (event) => {
    this.setState({
      subbreed: event.target.value,
      breed: this.props.breed
    });

    this.props.change(this.props.breed, event.target.value);
  }

  render() {
    const { breeds, breed } = this.state;
    if (breed && this.props.breeds.length) {
      return (
        <select onChange={this.changeSubbreed} data-test="subbreeds">
          <option>Select subbreed</option>
          {this.props.breeds.map(subbreed =>
            <option key={subbreed} value={subbreed}>
              {subbreed}
            </option>
          )}
        </select>
      )
    } else if (breeds) {
      return (
        <select onChange={this.change} id="breeds" data-test="breeds">
          <option>Select breed</option>
          {Object.keys(breeds).map(breed => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Select;
