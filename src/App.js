import SimpleTimer from './BasicTimer/SimpleTimer';
import Weather from './WeatherApp/Weather';
import Reminder from './ReminderApp/Reminder';
import Quiz from './QuizApp/Quiz';
import MemoryGame from './MemoryGame/MemoryGame';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/*switch used to render only the first
    route that matches the location rather
    than rendering all matching routes. */}
      <Routes>
        <Route exact path='/' element={<ul>
            <br />
            <li>
              {/* Link component uses the to prop
            to describe the location where the
            links should navigate to. */}
              <Link to='SimpleTimer' >
              SimpleTimer
              </Link>
            </li>
            <br />
            <li>
              <Link to='Weather' >
              Weather
              </Link>
            </li>
            <br />
            <li>
              <Link to='Reminder' >
              Reminder
              </Link>
            </li>
            <br />
            <li>
              <Link to='Quiz' >
              Quiz
              </Link>
            </li>
            <br />
            <li>
              <Link to='MemoryGame' >
              MemoryGame
              </Link>
            </li>
            <br />
          </ul>}>
        </Route>
        <Route exact path='/SimpleTimer' element={<SimpleTimer />}></Route>
        <Route exact path='/Quiz' element={<Quiz />}></Route>
        <Route exact path='/Weather' element={<Weather />}></Route>
        <Route exact path='/Reminder' element={<Reminder />}></Route>
        <Route exact path='/MemoryGame' element={<MemoryGame />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
