import React, { Component } from 'react'

class Image extends Component {
  state = {
    breed: null,
    subbreed: null,
    image: null,
  }

  componentDidMount() {
    const { breed, subbreed } = this.props

    this.setState({
      breed: breed,
      subbreed: subbreed,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      breed: nextProps.breed,
      subbreed: nextProps.subbreed,
    })

    if (nextProps.subbreed) {
      this.fetchImage(`${ nextProps.breed }/${ nextProps.subbreed }`)
    } else if (nextProps.breed) {
      this.fetchImage(nextProps.breed)
    }
  }

  fetchImage(newBreed) {
    const url = `https://dog.ceo/api/breed/${ newBreed }/images/random`
    let image

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          image = result.message

          this.setState({
            image: result.message,
          })
        },
      )

    return image
  }

  randomize() {
    const { breed, subbreed } = this.state

    if (subbreed) {
      this.fetchImage(`${ breed }/${ subbreed }`)
    } else if (breed) {
      this.fetchImage(breed)
    }
  }

  render() {
    const { image, breed } = this.state

    if (breed !== null) {
      return (
        <>
          <img key="image" className="dog" data-test="dog" src={ image } alt="dog" />
          <i className="fas fa-sync" onClick={ this.randomize.bind(this) } onKeyDown={ this.randomize.bind(this) }role="button" tabIndex="-3" />
        </>
      )
    }

    return ('')
  }
}

export default Image
