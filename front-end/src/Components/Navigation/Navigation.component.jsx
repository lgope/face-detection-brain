import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class Navigation extends React.Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    const { onRouteChange, isSignedIn } = this.props;
    if (!isSignedIn) {
      return (
        <div className='pa5 tc'>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag='span'
              onClick={this.toggle}
              data-toggle='dropdown'
              aria-expanded={this.state.dropdownOpen}
            >
              <img
                src='http://tachyons.io/img/logo.jpg'
                className='br-100 h3 w3 dib'
                alt='avatar'
              />
            </DropdownToggle>
            <DropdownMenu
              className='b--transparent shadow-5'
              style={{
                marginTop: '15px',
                left: '-80%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
              right
            >
              <DropdownItem onClick={() => onRouteChange('signin')}>
                Sign In
              </DropdownItem>
              <DropdownItem onClick={() => onRouteChange('register')}>
                Register
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <a
                  href='https://github.com/lgope'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href='https://www.linkedin.com/in/lakshman-gope-ba8847154/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div className='pa4 tc'>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag='span'
              onClick={this.toggle}
              data-toggle='dropdown'
              aria-expanded={this.state.dropdownOpen}
            >
              <img
                src='http://tachyons.io/img/logo.jpg'
                className='br-100 h3 w3 dib'
                alt='avatar'
              />
            </DropdownToggle>
            <DropdownMenu
              className='b--transparent shadow-5'
              style={{
                marginTop: '20px',
                right: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
              right
            >
              <DropdownItem onClick={() => onRouteChange('home')}>
                Home
              </DropdownItem>
              <DropdownItem>Leaderboard</DropdownItem>
              <DropdownItem>View Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onRouteChange('account')}>
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => onRouteChange('signout')}>
                Sign Out
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <a
                  href='https://github.com/lgope'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href='https://www.linkedin.com/in/lakshman-gope-ba8847154/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
  }
}

export default Navigation;
