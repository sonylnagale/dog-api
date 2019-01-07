import React, { Component } from 'react'

class Select extends Component {
  state = {
    breeds: null,
    breed: null,
  }

  componentDidMount() {
    const { breed } = this.props

    this.setState({
      breed,
    })

    if (!breed) {
      this.fetchDogs()
    }
  }

  change = (event) => {
    const { breeds, change } = this.props

    this.setState({
      breed: event.target.value,
      breeds,
    })

    change(event.target.value)
  }

  changeSubbreed = (event) => {
    const { change, breed } = this.props
    this.setState({
      breed,
    })

    change(breed, event.target.value)
  }

  fetchDogs() {
    const { change } = this.props
    const url = 'https://dog.ceo/api/breeds/list/all'

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            breeds: result.message,
          })

          change(result.message)
        },
      )
  }

  render() {
    const { breeds, breed } = this.state
    if (breed && this.props.breeds.length) {
      return (
        <select onChange={ this.changeSubbreed } data-test="subbreeds">
          <option>Select subbreed</option>
          { this.props.breeds.map(subbreed => (
            <option key={ subbreed } value={ subbreed }>
              { subbreed }
            </option> ),
          ) }
        </select>
      )
    }

    if (breeds) {
      return (
        <select onChange={ this.change } id="breeds" data-test="breeds">
          <option>Select breed</option>
          { Object.keys(breeds).map(thisBreed => (
            <option key={ thisBreed } value={ thisBreed }>
              { thisBreed }
            </option>
          )) }
        </select>
      )
    }

    return 'Loading...'
  }
}

export default Select
