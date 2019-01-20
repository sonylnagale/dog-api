#  ![](public/favicon.png)

## Let's Find Your Favorite Dog!

### Problem Statement

Implement a small app that displays photos from the Dog API: https://dog.ceo/dog-api/

Your app should provide a UI which allows the user to indicate a breed and optional sub-breed, and cycle one-by-one through the available images of that (sub-)breed. All breed and photo info should be retrieved from the API, not hardcoded.

### Approach

Using `create-react-app`, I scaffolded a React project for the challenge.

There are four components:
  1. `App.js`, the base component, which handles rendering and communication with its children.
  1. `Select.js` which renders the `<select>` menus according to the proper data.
  1. `Image.js` to render the appropriate dog image.
  1. `Dog.js`, a simple JSX container.

### Running

The stood-up version is here: https://dog-api-sonyl.herokuapp.com/

Locally, please `git checkout dev` and run `yarn start`.

### Testing

I created very basic test suites for this application. They can be run via `yarn test`.

