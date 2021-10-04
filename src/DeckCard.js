import React from 'react';
import axios from 'axios';
import { Card } from './Card';
import './DeckCard.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class DeckCard extends React.Component {
  constructor(props) {
    super(props);
    this.getCard = this.getCard.bind(this);
    this.state = {
      deckData: null,
      cardsData: [],
    };
  }

  async componentDidMount() {
    const deckUrl = `${API_BASE_URL}/new/shuffle`;
    const apiResult = await axios.get(deckUrl);
    const deckData = apiResult.data;
    const remainingCards = apiResult.data.remaining;
    this.setState({ deckData: deckData });
  }

  async getCard() {
    const cardUrl = `${API_BASE_URL}/${this.state.deckData.deck_id}/draw`;
    const cardResult = await axios.get(cardUrl);
    const card = cardResult.data.cards[0];

    this.setState((prev) => ({
      cardsData: [
        ...prev.cardsData,
        {
          id: card.code,
          image: card.image,
          name: `${card.suit} ${card.value}`,
        },
      ],
    }));
  }

  render() {
    return (
      <>
        <header>
          <h1>.CARD DEALER.</h1>
          <p>A little Project made wit React</p>
          <button onClick={this.getCard}>Load Card</button>
        </header>
        {this.state.cardsData.map((c) => {
          return <Card image={c.image} />;
        })}
      </>
    );
  }
}

export default DeckCard;
