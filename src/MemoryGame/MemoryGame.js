import React, { useEffect, useState, useRef } from "react";
import "./memoryGame.css";
import Modal from "react-modal";


function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
       const j = Math.floor(Math.random() * i)
       const temp = array[i]
       array[i] = array[j]
       array[j] = temp
    }
    return array
}

const Navbar = ({onNewGame}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      transform: "translate(-50%, -50%)",
      backgroundImage: "url(https://thumbs.dreamstime.com/z/beautiful-flower-arches-walkway-ornamental-plants-garden-chiang-rai-asian-festival-thailand-51957332.jpg)",
      justifyContent: "center",
      height: "50vh",
      width: "500px"
    },
  };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(true);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    return (
      <div>
      <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <form>
                  <h2 className="modalTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Memory Game</h2>
                  <button onClick={closeModal} className="Start">Start</button>
                  <button onClick={closeModal} className="Score">Score</button>
                  <button onClick={closeModal} className="About">About</button>
                </form>
              </Modal>
      <header>
        <h2>
          <a>Memory Game</a>
        </h2>
        <nav>
          <li>
            <a onClick={onNewGame}>Restart</a>
          </li>
        </nav>
      </header>
      </div>
    )
}

const Card = ({bgImage, showing, onClick}) => {
  const style = {
    width: '10%',
    minWidth: '100px',
    height: '130px',
    margin: '20px 55px',
    display: 'inline-block',
    background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(241,166,13,0.5550595238095238) 52%, rgba(0,212,255,1) 100%)',
    border: '5px solid grey',
    borderRadius: '20px',
    backgroundImage: '100%',
    textAlign: 'center',
  }
  
  if (showing) {
    style.backgroundImage = bgImage
  }
  
  return <div onClick={onClick} style={style}></div>
}

const CardState = {
   HIDING: 0,   
   SHOWING: 1,  
   MATCHING: 2  
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props)
    
   let cards = [
      {id: 0,  cardState: CardState.HIDING, backgroundImage: 'url(https://www.proflowers.com/blog/wp-content/plugins/pf-flowertypes/image/flower-197343.jpg'},
      {id: 1,  cardState: CardState.HIDING, backgroundImage: 'url(https://www.proflowers.com/blog/wp-content/plugins/pf-flowertypes/image/flower-197343.jpg'},
      {id: 2,  cardState: CardState.HIDING, backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZoTcGFaH1vzbTe86xjkkerh2F0QlJTDH_g&usqp=CAU)'},
      {id: 3,  cardState: CardState.HIDING, backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZoTcGFaH1vzbTe86xjkkerh2F0QlJTDH_g&usqp=CAU)'},
      {id: 4,  cardState: CardState.HIDING, backgroundImage: 'url(https://stylesatlife.com/wp-content/uploads/2020/02/Jasmine-flower-types.jpg)'},
      {id: 5,  cardState: CardState.HIDING, backgroundImage: 'url(https://stylesatlife.com/wp-content/uploads/2020/02/Jasmine-flower-types.jpg)'},
      {id: 6,  cardState: CardState.HIDING, backgroundImage: 'url(https://thegardeningdad.com/wp-content/uploads/2020/11/common-daisies.jpg'},
      {id: 7,  cardState: CardState.HIDING, backgroundImage: 'url(https://thegardeningdad.com/wp-content/uploads/2020/11/common-daisies.jpg'},
      {id: 8,  cardState: CardState.HIDING, backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVnhApZLbqffH38HIrMc-DfoAID76xLeyiFZNY7CjrG021pjf0sLDJtWE4GHoGfxhtWk&usqp=CAU)'},
      {id: 9,  cardState: CardState.HIDING, backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVnhApZLbqffH38HIrMc-DfoAID76xLeyiFZNY7CjrG021pjf0sLDJtWE4GHoGfxhtWk&usqp=CAU)'},
      {id: 10, cardState: CardState.HIDING, backgroundImage: 'url(https://yourgardenbuddy.com/wp-content/uploads/2020/12/Winter-Flowers.jpg)'},
      {id: 11, cardState: CardState.HIDING, backgroundImage: 'url(https://yourgardenbuddy.com/wp-content/uploads/2020/12/Winter-Flowers.jpg)'},
      {id: 12, cardState: CardState.HIDING, backgroundImage: 'url(https://www.signaturetownhousehydepark.co.uk/blog/wp-content/uploads/2022/06/8-Places-to-See-Beautiful-Roses-in-Bloom-in-London.jpg)'},
      {id: 13, cardState: CardState.HIDING, backgroundImage: 'url(https://www.signaturetownhousehydepark.co.uk/blog/wp-content/uploads/2022/06/8-Places-to-See-Beautiful-Roses-in-Bloom-in-London.jpg)'},
      {id: 14, cardState: CardState.HIDING, backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/32/84/90/1000_F_232849052_aa6FM38JHCp4bLKXg5251pUNFZF3Puvq.jpg)'},
      {id: 15, cardState: CardState.HIDING, backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/32/84/90/1000_F_232849052_aa6FM38JHCp4bLKXg5251pUNFZF3Puvq.jpg)'}
    ]; 
    
    // SHUFFLE CARDS
    cards = shuffle(cards)
    this.state = { cards, noClick: false } 
  }
  
  handleNewGame = () => {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }))
    cards = shuffle(cards)
    this.setState({cards})
  }
  
  handleClick = (id) => {
    
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          }
        }
        return c
      })
    }

    const foundCard = this.state.cards.find(c => c.id === id)
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return
    }
    
    let noClick = false
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING)
    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING)
    
    const ids = showingCards.map((c) => c.id)
    if (showingCards.length === 2 &&
       showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING)
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING)
      
      noClick = true     
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false})
        }, 1300)
      })
      return
    }
    
    this.setState({cards, noClick})
  }

  render() {
    const cards = this.state.cards.map(card => (
      <Card 
        key={card.id} 
        showing={card.cardState !== CardState.HIDING} 
        bgImage={card.backgroundImage} 
        onClick={()=> this.handleClick(card.id)}  
      />)
      
    )
                                       
    return <div>
              <Navbar onNewGame={this.handleNewGame} />
              {cards}
           </div>
  }
}

export default MemoryGame
