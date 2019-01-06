import React, { Component } from 'react';

class Image extends Component {
  state = {
    breed: null,
    subbreed: null,
    image: null
  }

  componentDidMount() {
    const props = this.props;

    this.setState({
      breed: props.breed,
      subbreed: props.subbreed
    });
  }

  randomize() {
    console.log('randomize');
  }

  fetchImage(newBreed) {
    const url = `https://dog.ceo/api/breed/${newBreed}/images/random`
    let image;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          image =  result.message;
          
          this.setState({
            image: result.message,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      return image;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      breed: nextProps.breed,
      subbreed: nextProps.subbreed
    });

    if (nextProps.subbreed) {
      this.fetchImage(`${nextProps.breed}/${nextProps.subbreed}`);
    } else if (nextProps.breed) {
      this.fetchImage(nextProps.breed);
    }
  }

  render() {
    const { image } = this.state;

    if (this.props.breed !== null) {
      return (
        <>
          <img key="image" src={image} alt="dog"/>
          <i className="fas fa-sync" onClick={this.randomize}></i>
        </>
      );
    } else {
      return ('');
    }
  }
}

export default Image;
