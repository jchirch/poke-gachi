import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorPage from '../ErrorPage/ErrorPage';
import MainPage from '../MainPage/MainPage';
import StartPage from '../StartPage/StartPage';

function App() {

  const navigate = useNavigate();
  let params = "this";

  return (
    <div className="App">
      <img className="Logo" onClick={() => {navigate(`/`);}} src={'https://fontmeme.com/permalink/241101/6f970496b8e7aa40eddeec38e543fbb0.png'}>
      </img>
      
        <Routes>
        <Route path="/*" element={<ErrorPage />}/>
        <Route path="/" element={<StartPage />}/>
        <Route path="/Main/:UserVal" element={<MainPage params={params} />} />
        </Routes>
      </div>

  );
}

export default App;
