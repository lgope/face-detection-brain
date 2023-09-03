import React, { Component } from 'react';

const emojis = ['😄', '😃', '😀', '😊', '😉', '😍', '🔶', '🔷', '🚀'];

class Rank extends Component {
  state = {
    emoji: '',
  };

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = rank => {
    const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];
    this.setState({ emoji: rankEmoji });
  };
  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>{entries === undefined ? '0' : entries}</div>
        <div className='white f3'>{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
