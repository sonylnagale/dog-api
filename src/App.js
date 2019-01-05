import React, { Component } from 'react';
import Select from './Select';
import './App.css';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    breeds: [],
    breed: null,
    image: null,
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

  fetchDog(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            image: result.message
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

  change = (data) => {
    this.setState({
      breed: data
    });

    this.fetchDog(data);
  }

  render() {
    const { error, isLoaded, breeds, breed } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Select breeds={breeds} callbackFromParent={this.change}/>

          <br />

          <img src={this.state.image} />
        </React.Fragment>
      );
    }
  }
}

export default App;
