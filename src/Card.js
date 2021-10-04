import React from 'react';
import axios from 'axios';
import './Card.css';

export class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const randRotate = Math.floor(Math.random() * 50);
    console.log(randRotate);
    const rotate = `rotate(${randRotate}deg)`;
    return (
      <>
        <img
          src={this.props.image}
          className="Card"
          style={{ transform: rotate }}
        />
      </>
    );
  }
}
