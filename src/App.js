import React, { Component } from 'react'
import Dog from './components/Dog'
import Select from './components/Select'
import Image from './components/Image'
import './App.css'

class App extends Component {
  state = {
    isLoaded: false,
    breeds: null,
    breed: null,
    subbreeds: [],
    subbreed: null,
  }

  change = (data, breed) => {
    const { breeds } = this.state

    // We've selected a single breed and now getting subbreeds if they exist
    // or we have a subbreed
    if (data && typeof data === 'string') {
      this.setState({
        breed: data,
        subbreeds: breeds[ data ],
        subbreed: breed,
      })
    } else if (breed) {
      this.setState({
        subbreed: breed,
      })
    } else {
      this.setState({
        breeds: data,
        isLoaded: true,
      })
    }
  }

  render() {
    const {
      breeds, breed, isLoaded, subbreeds, subbreed,
    } = this.state
    const children = []
    let image

    if (!isLoaded) {
      children.push(<Select key="empty" change={ this.change } />)
    } else {
      children.push(<Select key="breeds" breed={ breed } breeds={ breeds } change={ this.change } />)

      if (subbreeds.length > 0) {
        children.push(<Select key="subbreeds" breed={ breed } breeds={ subbreeds } change={ this.change } />)
      }

      image = <Image key="image" breed={ breed } subbreed={ subbreed } src="" />
    }

    return (
      <>
        <Dog>
          { children }
        </Dog>
        { image }
      </>
    )
  }
}

export default App
