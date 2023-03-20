import React from "react";
import "./memoryApp.css";

const pairsList = [{
    id: 1,
    text: "1"
  }, {
    id: 2,
    text: "2"
  }, {
    id: 3,
    text: "3"
  }, {
    id: 4,
    text: "4"
  }, {
    id: 5,
    text: "5"
  }, {
    id: 6,
    text: "6"
  }, {
    id: 7,
    text: "7"
  }, {
    id: 8,
    text: "8"
  }, {
    id: 9,
    text: "9"
  }, {
    id: 10,
    text: "10"
  }, {
    id: 11,
    text: "11"
  }, {
    id: 12,
    text: "12"
  }];

class MemoryApp extends React.Component {
constructor(props) {
  super(props);    
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
    if (firstCard.text == secondCard.text) {
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
    cardContent = <span className="card-content">{ card.text }</span>;
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

export default MemoryApp