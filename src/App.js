import SimpleTimer from "./BasicTimer/SimpleTimer";
import Weather from "./WeatherApp/Weather";
import Reminder from "./ReminderApp/Reminder";
import Quiz from "./QuizApp/Quiz";
import MemoryGame from "./MemoryGame/MemoryGame";
import Timer from "./AdvancedTimer/AdvancedTimer";
import MemoryApp from "./MemoryGame/MemoryApp";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="appTitle">React Exercises</h1>
     
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <section class="dl-blurbs">
              <dl>
                <dt>
                  <Link to="SimpleTimer">SimpleTimer</Link>
                </dt>
                <dt>
                  <Link to="Weather">Weather</Link>
                </dt>
                
                <dt>
                  <Link to="Reminder">Reminder</Link>
                </dt>
                
                <dt>
                  <Link to="Quiz">Quiz</Link>
                </dt>
                
                <dt>
                  <Link to="MemoryGame">MemoryGame</Link>
                </dt>
                
                <dt>
                  <Link to="AdvancedTimer">AdvancedTImer</Link>
                </dt>
         

              </dl>
              </section>
            }
          ></Route>
          <Route exact path="/SimpleTimer" element={<SimpleTimer />}></Route>
          <Route exact path="/Quiz" element={<Quiz />}></Route>
          <Route exact path="/Weather" element={<Weather />}></Route>
          <Route exact path="/Reminder" element={<Reminder />}></Route>
          <Route exact path="/MemoryGame" element={<MemoryGame />}></Route>
          <Route exact path="/AdvancedTimer" element={<Timer />}></Route>
        </Routes>
      </BrowserRouter>
      <MemoryApp />
    </div>
  );
}

export default App;
