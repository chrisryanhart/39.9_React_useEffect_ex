import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import axios from "axios";


function CardGame() {
    
    const drawTimer = useRef();

    const [toggleStatus, setToggleStatus] = useState(false);
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState(null);
    const [url, setUrl] = useState(null);


    useEffect(function getDeckWhenMounted(){
        async function getDeck(){
            const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = deck.data.deck_id;
            setDeckId(deckId);
            setUrl(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);

            return deckId;
        }
        getDeck();
    },[]);

    useEffect(function drawCardInt(){
        if(toggleStatus){
            drawTimer.current = setInterval(async () => {
                const res = await axios.get(url);

                if(!res.data.success) {
                    clearInterval(drawTimer.current);
                    return alert('Error: no cards remaining!')
                }

                const newCard = res.data.cards[0].image;

                console.log(`In set interval `,drawTimer.current);

                setCard(newCard);
            }, 1000);
        }

        console.log(`in drawCardInt`, drawTimer.current);

        return () => {
            console.log(`in return function`, drawTimer.current);
            clearInterval(drawTimer.current);
        }

    }, [toggleStatus,url]);

    

    const toggleDraw = () => {

        setToggleStatus(!toggleStatus);
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
        <button onClick={toggleDraw}>Start/Stop Drawing</button>
      </>
    );
  }
  export default CardGame;