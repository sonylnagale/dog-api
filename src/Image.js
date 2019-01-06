import React, { Component } from 'react';

class Image extends Component {
  state = {
    breed: null,
    subbreed: null,
    image: null
  }

  componentDidMount() {
    this.setState({
      breed: this.props.breed,
      subbreed: this.props.subbreed,
      image: null
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
          image = result.message;
          console.log(image);
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

  callback(event) {
    console.log('callback',this.state.breed, this.props.breed);
    // this.props.callback(this.state.breed, event.target.value);
    // this.fetchImage(this.props.breed)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      breed: nextProps.breed,
      subbreed: nextProps.subbreed
    })
    console.log('componentWillReceiveProps',nextProps.breed,nextProps.subbreed);
    // if ((prevProps.breed && prevProps.breed !== this.props.breed) ||
    //     (this.state.image == null && this.props.breed !== null)) {
    if (nextProps.subbreed) {
      this.fetchImage(`${nextProps.breed}/${nextProps.subbreed}`);
    } else if (nextProps.breed) {
      this.fetchImage(nextProps.breed);
    }

    // }
    //
    // if (this.props.subbreed && this.props.subbreed !== this.state.subbreed) {
    //   this.fetchImage(`${this.props.breed}/${this.props.subbreed}`);
    // }
  //   // this.callback(this.props.subbreed);
  //   if (prevProps.subbreed && prevProps.subbreed !== this.props.subbreed && this.props.subbreed !== null) {
  //     this.fetchImage(`${this.props.breed}/${this.props.subbreed}`);
  //   } else if (this.props.breed !== null && prevProps.breed !== this.props.breed) {
    // if (this.state.image == null && this.props.breed !== null) {
    //   this.fetchImage(this.props.breed);
    // }

  //   }
  }

  render() {
    if (this.props.breed !== null) {
      return (
        <>
          <img key="image" src={this.state.image} alt="dog"/>
          <i className="fas fa-sync" onClick={this.randomize}></i>
        </>
      );
    } else {
      return ('');
    }
  }
}

export default Image;
