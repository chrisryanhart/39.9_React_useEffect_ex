import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import axios from "axios";


function CardGame() {
    
    const drawTimer = useRef();

    const [toggleStatus, setToggleStatus] = useState(false);
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState(null);
    const [url, setUrl] = useState(null);

    // unmount the timer upon termination

    // what will the callback function be?
    // two states for drawing: t or f



    useEffect(function getDeckWhenMounted(){
        async function getDeck(){
            const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = deck.data.deck_id;
            setDeckId(deckId);
            return deckId;
        }
        getDeck();
    },[]);

    useEffect(function drawCardInt(){
        drawTimer.current = setInterval(async () => {
            const res = await axios.get(url);
            const newCard = res.data.cards[0].image;
            console.log(res.data.remaining);
            // could call from existing callback function
            setCard(newCard);
        }, 1000);

        return function cleanUpClearTime() {
            console.log('Unmount timer', drawTimer.current);
            clearInterval(drawTimer.current);
        }
    }, [url]);

    console.log(toggleStatus);
    // use toggle status to remove listner

    const toggleDraw = () => {
        if (toggleStatus) {
            clearInterval(drawTimer.current);
        }    
        console.log(drawTimer);
        setUrl(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
        setToggleStatus(!toggleStatus);
        console.log('test');

    }
    // console.log(drawTimer);

    // change to start an interval
    // use setRef for the timer

    // const drawCard = async () => {
    //     const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);

    //     if(!res.data.success) {
    //         return alert('Error: no cards remaining!')
    //     }

    //     console.log(res.data.remaining);
    //     const newCard = res.data.cards[0].image;
    //     setCard(newCard);
    // }
    // onClick={drawCard}
    
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