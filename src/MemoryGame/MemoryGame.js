import React, { useEffect, useState, useRef } from "react";
import "./memoryGame.css";
import Modal from "react-modal";




    // let subtitle;
    // const [modalIsOpen, setIsOpen] = React.useState(true);
  
    // function openModal() {
    //   setIsOpen(true);
    // }
  
    // function closeModal() {
    //   setIsOpen(false);
    // }
  
    // return (
    //   <div>
    //   <Modal
    //             isOpen={modalIsOpen}
    //             onRequestClose={closeModal}
    //             style={customStyles}
    //           >
    //             <form>
    //               <h2 className="modalTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Memory Game</h2>
    //               <button onClick={closeModal} className="Start">Start</button>
    //               <button onClick={closeModal} className="Score">Score</button>
    //               <button onClick={closeModal} className="About">About</button>
    //             </form>
    //           </Modal>

      
    //   </div>
    // );
  
    const pairsList = [
      {id: 0,  backgroundImage: 'url(https://www.proflowers.com/blog/wp-content/plugins/pf-flowertypes/image/flower-197343.jpg'},
      {id: 1,  backgroundImage: 'url(https://www.proflowers.com/blog/wp-content/plugins/pf-flowertypes/image/flower-197343.jpg'},
      {id: 2,   backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZoTcGFaH1vzbTe86xjkkerh2F0QlJTDH_g&usqp=CAU)'},
      {id: 3,   backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZoTcGFaH1vzbTe86xjkkerh2F0QlJTDH_g&usqp=CAU)'},
      {id: 4,   backgroundImage: 'url(https://stylesatlife.com/wp-content/uploads/2020/02/Jasmine-flower-types.jpg)'},
      {id: 5,   backgroundImage: 'url(https://stylesatlife.com/wp-content/uploads/2020/02/Jasmine-flower-types.jpg)'},
      {id: 6,   backgroundImage: 'url(https://thegardeningdad.com/wp-content/uploads/2020/11/common-daisies.jpg'},
      {id: 7,   backgroundImage: 'url(https://thegardeningdad.com/wp-content/uploads/2020/11/common-daisies.jpg'},
      {id: 8,   backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVnhApZLbqffH38HIrMc-DfoAID76xLeyiFZNY7CjrG021pjf0sLDJtWE4GHoGfxhtWk&usqp=CAU)'},
      {id: 9,   backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVnhApZLbqffH38HIrMc-DfoAID76xLeyiFZNY7CjrG021pjf0sLDJtWE4GHoGfxhtWk&usqp=CAU)'},
      {id: 10,  backgroundImage: 'url(https://yourgardenbuddy.com/wp-content/uploads/2020/12/Winter-Flowers.jpg)'},
      {id: 11,  backgroundImage: 'url(https://yourgardenbuddy.com/wp-content/uploads/2020/12/Winter-Flowers.jpg)'},
      {id: 12,  backgroundImage: 'url(https://www.signaturetownhousehydepark.co.uk/blog/wp-content/uploads/2022/06/8-Places-to-See-Beautiful-Roses-in-Bloom-in-London.jpg)'},
      {id: 13,  backgroundImage: 'url(https://www.signaturetownhousehydepark.co.uk/blog/wp-content/uploads/2022/06/8-Places-to-See-Beautiful-Roses-in-Bloom-in-London.jpg)'},
      {id: 14,  backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/32/84/90/1000_F_232849052_aa6FM38JHCp4bLKXg5251pUNFZF3Puvq.jpg)'},
      {id: 15,  backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/32/84/90/1000_F_232849052_aa6FM38JHCp4bLKXg5251pUNFZF3Puvq.jpg)'}
    ]; 
    
    class MemoryGame extends React.Component {
      constructor(props) {
        super(props)
        this.state = this.getNewGame();
        //this.onSelectedCard = this.onSelectedCard.bind(this);
      };
      
      getNewGame() {
        return {
          game: this.shuffleCards(),
          firstCard: null,
          secondCard: null,
        };
      };
      shuffleCards() {
        var cards = [];
        for (var i = 0; i < (pairsList.length); i++) {
          var card = JSON.parse(JSON.stringify(pairsList[i]));
          card.id = i;
          card.visible = false;
          card.matched = false;
          cards.push(card);
          var pairedCard = JSON.parse(JSON.stringify(card));
          //this way of clone might not work if the object contains functions
          pairedCard.id = i + pairsList.length;
          cards.push(pairedCard);;
        }
        return this.shuffleArray(cards);
      };
      shuffleArray(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };
      onResetGame() {
        var newState = this.getNewGame();
        this.setState(newState);
      }
      onSelectedCard(card) {
        //console.log(this, card);
        var cards = this.state.game.slice();
        var firstCard = this.state.firstCard;
        var secondCard = this.state.secondCard;
        //if the card is visible ignore the click
        if (card.visible) {
          return;
        }
        //console.log(cards, cards.indexOf(card));
        //make selected card visible
        cards[cards.indexOf(card)].visible = true;
        //console.log(firstCard, secondCard);
        //if second card is set then reset the selectedCards
        if (this.state.secondCard) {
          cards[cards.indexOf(firstCard)].visible = false;
          cards[cards.indexOf(secondCard)].visible = false;
          secondCard = null;
          firstCard = null;
        }
        if (!firstCard) {
          //set this card as first card
          firstCard = card;
          //and wait for second card to be selected.
        } else {
          //second card seleted
          secondCard = card;
          if (firstCard.backgroundImage == secondCard.backgroundImage) {
            //is a match
            cards[cards.indexOf(firstCard)].matched = true;
            cards[cards.indexOf(secondCard)].matched = true;
            firstCard = null;
            secondCard = null;
          } else {
            //didnt match. wait for next click
          }
        }
      
        this.setState({
          game: cards,
          firstCard: firstCard,
          secondCard: secondCard
        });
      };
      render() {
        var status;
        if (this.state.game.filter(function(val) {
            return !val.matched;
          }).length == 0) {
          status = "COMPLETED";
        }
        return (
          <div>
            <header className="page-header row">
              <h1>Numeric Memory</h1>
            </header>
            <div id="game-extras" className="row">
              <StatsComponent game={ this.state.game } />
              <OptionsComponent onResetGame={() => this.onResetGame()} />
            </div>
            <BoardComponent game={ this.state.game } onSelectedCard={(card) => this.onSelectedCard(card)} />
            <StatusComponent status={status} />
          </div>
        );
      }
      };
      
      class StatsComponent extends React.Component {
      render() {
        var totalPairs = this.props.game.length / 2;
        var matchedPairs = this.props.game.filter((val) => {
          return val.matched;
        }).length / 2;
        return (
          <section className="col-xs-8 text-left game-stats">
          <b>Matched Pairs</b> <meter value={matchedPairs} min="0" max={totalPairs}></meter> {matchedPairs}/{totalPairs}
        </section>
        );
      }
      };
      
      class OptionsComponent extends React.Component {
      render() {
        return (
          <aside className="col-xs-4 text-right game-options">
          <button className="btn btn-xs btn-success" onClick={() => this.props.onResetGame()}>
            <span className="glyphicon glyphicon-refresh" aria-hidden="true">   </span>  RESTART</button>
         </aside>
        );
      }
      };
      
      class BoardComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          cards: props.game
        };
      };
      componentWillReceiveProps(nextProps){
        this.setState({cards: nextProps.game});
      };
      cardUp(card) {
      
        //this.props.onSelectedCard(card);
      };
      render() {
        var board = this;
        var cards = this.state.cards.map(function(card) {
          return <CardComponent id={card.id} key={card.id} card={card} 
                   onSelectedCard={board.props.onSelectedCard.bind(this, card)} />;
        });
        return (
          <section id="game-board" className="row">
            {cards}
          </section>
        );
      };
      };
      
      class CardComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          card: props.card
        };
      };
      turnUpCard() {
        var card = this.state.card;
        this.props.onSelectedCard(card);
      };
      render() {
        //console.log("card details", this.props.card);
        var card = this.props.card;
        var cardContent;
        var cardClasses = "card";
        if (card.visible) {
          cardContent = <span className="card-content">{ card.backgroundImage }</span>;
          if (!card.matched) {
            cardClasses += " card-selected";
          } else {
            cardClasses += " card-visible";
          }
        }
        return (
          <div className="g-col-6">
            <div className={cardClasses} onClick={() => this.props.onSelectedCard()}>
              {cardContent}
            </div>
          </div>
        );
      };
      }
      
      class StatusComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      render() {
        if (this.props.status !== "COMPLETED") {
          return null;
        }
        return (
          <div>
            <h2>Congratulations!</h2>
          </div>
        );
      }
      };
export default MemoryGame
