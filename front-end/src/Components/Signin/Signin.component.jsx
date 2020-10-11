import React from 'react';
import './Signin.styles.css';

class Signin extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: '',
    isLoading: false,
  };

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (userType = '') => {
    const { signInEmail, signInPassword } = this.state;
    this.setState({ isLoading: !this.state.isLoading });

    fetch('/api/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userType === 'guest' ? 'guest@gmail.com' : signInEmail,
        password: userType === 'guest' ? '1234' : signInPassword,
      }),
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          alert('Wrong Credentials!');
          this.setState({ isLoading: !this.state.isLoading });
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              {this.state.isLoading && <h5>Loading....</h5>}
              <br />
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className=''>
                <input
                  onClick={() => this.onSubmitSignIn()}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  disabled={!this.state.signInPassword.trim()}
                  value='Sign in'
                />
              </div>
            </fieldset>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div className=''>
                <input
                  onClick={() => this.onSubmitSignIn('guest')}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib outline pa2 mr2'
                  type='submit'
                  value='Guest Login'
                />
              </div>
              <div className=''>
                <input
                  onClick={() => onRouteChange('register')}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib outline pa3 mr2'
                  type='submit'
                  value='Register'
                />
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
