import React, { Component } from 'react';
import Select from './Select';
import Image from './Image';
import './App.css';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    image: null,
    breeds: null,
    breed: null,
    subbreeds: [],
    subbreed: null
  };

  change = (data, breed, subbreed) => {
    console.log(data);
    // We've selected a single breed and now getting subbreeds if they exist
    // or we have a subbreed
    if (data && typeof data === "string") {
      this.setState({
        breed: data,
        subbreeds: this.state.breeds[data],
        subbreed: breed
      });

    } else if (breed) {

      this.setState({
        subbreed: breed,
        image: data,
      });
    } else {
      this.setState({
        breeds: data,
        isLoaded: true,
      });
    }

  }
  //
  // updateBreed = (breed, subbreed) => {
  //   this.setState({
  //     breed: breed,
  //     subbreed: subbreed,
  //     image: false
  //   });
  // }

  updateImage = (data) => {
    this.setState({
      image: data
    });
  }

  render() {
    const { breeds, breed, isLoaded, subbreeds, subbreed, image } = this.state;
    const children = [];

    if (!isLoaded) {
      children.push(<Select key="empty" change={this.change}/>);
    } else {
      children.push(<Select key="breeds" breed={breed} breeds={breeds} change={this.change}/>);

      if (subbreeds.length > 0) {
        children.push(<Select key="subbreeds" breed={breed} breeds={subbreeds} change={this.change} />);
      }

      children.push(<Image key="image" breed={breed} subbreed={subbreed} src={image} />);
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
