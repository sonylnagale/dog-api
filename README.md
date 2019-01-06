#  ![](public/favicon.png)

## Let's Find Your Favorite Dog!

### Problem Statement

Implement a small app that displays photos from the Dog API: https://dog.ceo/dog-api/

Your app should provide a UI which allows the user to indicate a breed and optional sub-breed, and cycle one-by-one through the available images of that (sub-)breed. All breed and photo info should be retrieved from the API, not hardcoded.

Feel free to use frameworks such as Vue.js/React/Angular/jQuery or vanilla JS as you see fit.

Estimated time to spend: 4 hours.

### Approach

Using `create-react-app`, I scaffolded a React project for the challenge.

There are three components:
  1. `App.js`, the base component, which handles rendering and communication with its children.
  1. `Select.js` which renders the `<select>` menus according to the proper data.
  1. `Image.js` to render the appropriate dog image.

The application is simple, but not naïve: all calls to the Dog API are handled in an asynchronous fashion to allow the Dog API time to respond appropriately.

### Running

The stood-up version is here: https://dog-api-sonyl.herokuapp.com/








This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
