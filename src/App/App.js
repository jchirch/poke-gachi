import logo from '../logo.svg'
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import ErrorPage from '../ErrorPage/ErrorPage';
import MainPage from '../MainPage/MainPage';
import StartPage from '../StartPage/StartPage';
import TrainPage from '../TrainPage/TrainPage';
import StatPage from '../StatPage/StatPage';

function App() {

  const [user, setUser] = useState({});
  const [mons, setMons] = useState([]);
  const navigate = useNavigate();
  let params = "this";  
  function fetchData() {
    // fetch()
    //   .then((res) => {
    //     if (!res.ok) {
    //       const err = new Error(res.statusText);
    //       err.statusCode = res.status;
    //       throw err;
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //
    //    do something with data     
    //
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  useEffect(() => {
    fetchData();

  }, [])


  return (
    <div className="App">
      <header className="App-header"> 
          <Link to={'/'}>
          Return to start.</Link>
      </header>
      <p onClick={()=>navigate(`/Start`)}>
      Click here to navigate to the next part of the site.
      </p>
      <Routes>
      <Route path="/*" params={"this"} element={<ErrorPage params={params}/>} />

        <Route path="/Start" element={<StartPage />} />
        <Route path="/Main/:UserVal" element={<MainPage params={params} />} />
        <Route path="/Main/:UserVal/Stats" element={<StatPage params={params} />} />
        <Route path="/Main/:UserVal/Train" element={<TrainPage params={params} />} />
      </Routes>
    </div>
  );
}

export default App;
