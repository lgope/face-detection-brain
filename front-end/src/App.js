import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Account from './Components/Account/Account.component';
import Navigation from './Components/Navigation/Navigation.component';
import Logo from './Components/Logo/Logo.component';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.component';
import Rank from './Components/Rank/Rank.component';
import FaceDetection from './Components/FaceDetection/FaceDetection.component';

import Signin from './Components/Signin/Signin.component';
import Register from './Components/Register/Register.component';

import './App.css';
const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: '',
  },
};

class App extends Component {
  state = initialState;

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = data => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  // onPictureSubmit()
  onButtonSubmit = () => {
    if (!this.state.input.length) {
      return alert('Please enter an image address!');
    }
    this.setState({ imageUrl: this.state.input });
    fetch('/api/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('/api/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => alert('Something Wrong!'));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.error(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        {
          <div
            style={{
              display: 'flex',
              justifyContent: isSignedIn ? 'space-between' : 'flex-end',
            }}
          >
            {isSignedIn && <Logo />}
            <Navigation
              isSignedIn={isSignedIn}
              onRouteChange={this.onRouteChange}
              toggleModal={this.toggleModal}
            />
          </div>
        }
        {route === 'home' && (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection boxes={boxes} imageUrl={imageUrl} />
          </div>
        )}

        {route === 'account' && (
          <Account
            name={this.state.user.name}
            email={this.state.user.email}
            onRouteChange={this.onRouteChange}
          />
        )}
        {route === 'signin' && (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
        {route === 'register' && (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
