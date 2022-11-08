import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import axios from "axios";


function CardGame() {

    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState(null);

    useEffect(function getDeckWhenMounted(){
        async function getDeck(){
            const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = deck.data.deck_id;
            setDeckId(deckId);
            return deckId;
        }
        getDeck();
    },[]);

    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);

        if(!res.data.success) {
            return alert('Error: no cards remaining!')
        }

        console.log(res.data.remaining);
        const newCard = res.data.cards[0].image;
        setCard(newCard);
    }

    
    return (
      <>
        <h3>Card Game</h3>
        <div>
            {deckId ? deckId : "page loading..."}
        </div>
        <div>
            {card ? <Card src={card}/> : "Draw first card to start the game"}
        </div>
        <button onClick={drawCard}>Draw Card</button>
      </>
    );
  }
  export default CardGame;