import React from 'react';
import Tilt from 'react-tilt';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: ''
    };
  }

  onCurrentPasswordChange = event => {
    this.setState({ currentPassword: event.target.value });
  };

  onNewPasswordChange = event => {
    this.setState({ newPassword: event.target.value });
  };

  render() {
    const { name } = this.props;

    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <div className='f1 fw6 ph0 mh0'>{name.toUpperCase()}</div>

            <div className='center'>
              <br />
              <Tilt
                className='Tilt br2 shadow-2'
                options={{ max: 55 }}
                style={{ height: 150, width: 150 }}
              >
                <div className='Tilt-inner pa3'>
                  <img
                    alt='profilepic'
                    src={`https://robohash.org/${name}?size=150x150`}
                  />
                </div>
              </Tilt>
              <br />
            </div>

            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Current Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='cpassword'
                id='cpassword'
              />
            </div>

            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                New Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='npassword'
                id='npassword'
              />
            </div>

            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Change Password'
              />
            </div>

            <br />
            <br />
            <br />

            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Delete Account'
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default AccountSettings;
