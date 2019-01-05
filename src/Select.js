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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { breed, image } = this.state;

    if (breed && !image) {
      this.fetchImage(breed);
    }
  }

  fetchImage(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            image: result.message
          });
          this.props.callbackFromParent(result.message, breed);
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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

          this.props.callbackFromParent(result.message);
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

    this.props.callbackFromParent(event.target.value);
    this.updateBreed(event.target.value);
  }

  changeSubbreed = (event) => {
    this.setState({
      subbreed: event.target.value,
      breed: this.props.breed
    });

    this.fetchImage(`${this.props.breed}/${event.target.value}`);
    this.props.callbackFromParent(this.state.image, this.state.breed, event.target.value);
    this.updateBreed(this.props.breed);
  }

  updateBreed = (data) => {
    this.setState({
      breed: data
    })
    this.props.updateBreed(data);
  }


  render() {
    const { breeds, breed } = this.state;
    if (breed && this.props.breeds.length) {
      return (
        <select onChange={this.changeSubbreed}>
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
        <select onChange={this.change}>
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
