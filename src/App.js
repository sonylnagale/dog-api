import React, { Component } from 'react';
import Select from './Select';
import './App.css';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    image: null,
    breeds: null,
    breed: null,
    subbreeds: [],
  };

  change = (data, breed, subbreed) => {
    // We've selected a single breed and now getting subbreeds if they exist
    // or we have a subbreed
    if (data && typeof data === "string" && !breed) {
      this.setState({
        breed: data,
        subbreeds: this.state.breeds[data],
        subbread: subbreed
      });

    } else if (breed) {
      this.setState({
        image: data,
      });
    } else {
      this.setState({
        breeds: data,
        isLoaded: true,
      });
    }

  }

  updateBreed = (data) => {
    this.setState({
      breed: data
    })
  }

  render() {
    const { breeds, breed, isLoaded, subbreeds, image } = this.state;

    const children = [];

    if (!isLoaded) {
      children.push(<Select key="empty" callbackFromParent={this.change}/>);
    } else {
      children.push(<Select key="breeds" breed={breed} breeds={breeds} callbackFromParent={this.change} updateBreed={this.updateBreed}/>);

      if (subbreeds.length > 0) {
        children.push(<Select key="subbreeds" breed={breed} breeds={subbreeds} callbackFromParent={this.change} updateBreed={this.updateBreed}/>);
      }

      if (image) {
        children.push(<img key="image" src={image} alt="dog" />);
      }
    }

    return (
        <DogComponent>
          {children}
        </DogComponent>
    );
  }

}

const DogComponent = props => (
  <div>{props.children}</div>
);

export default App;
