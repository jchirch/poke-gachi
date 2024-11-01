import logo from '../logo.svg'
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import ErrorPage from '../ErrorPage/ErrorPage';
import MainPage from '../MainPage/MainPage';
import StartPage from '../StartPage/StartPage';
import TrainPage from '../TrainPage/TrainPage';
import StatPage from '../StatPage/StatPage';
import beachImg from '../Utils/Images/Box_Beach_BDSP.png'
import caveImg from '../Utils/Images/Box_Cave_BDSP.png'
import checkImg from '../Utils/Images/Box_Checks_BDSP.png'
import cityImg from '../Utils/Images/Box_City_BDSP.png'
import cragImg from '../Utils/Images/Box_Crag_BDSP.png'
import desertImg from '../Utils/Images/Box_Desert_BDSP.png'
import forestImg from '../Utils/Images/Box_Forest_BDSP.png'
import savannahImg from '../Utils/Images/Box_Savanna_BDSP.png'
import seafloorImg from '../Utils/Images/Box_Seafloor_BDSP.png'
import skyImg from '../Utils/Images/Box_Sky_BDSP.png'
import snowImg from '../Utils/Images/Box_Snow_BDSP.png'
import volcanoImg from '../Utils/Images/Box_Volcano_BDSP.png'
function App() {

  const [user, setUser] = useState({});
  const [mons, setMons] = useState([]);
  const navigate = useNavigate();
  let params = "this";
  let bgArray = [beachImg, caveImg, checkImg, cityImg, cragImg, desertImg, forestImg, savannahImg, seafloorImg, skyImg, snowImg, volcanoImg]

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
      <header className="Logo" onClick={() => {navigate(`/`);}}>
        Placeholder for logo. Users will be able to click here to return to the entry page.
      </header>
        <Routes>
          <Route path="/*" element={<StartPage />}/>
          <Route path="/Main/:UserVal" element={<MainPage params={params} />} />
          <Route path="/Main/:UserVal/Stats" element={<StatPage params={params} />} />
          <Route path="/Main/:UserVal/Train" element={<TrainPage params={params} />} />
        </Routes>
      </div>
  );
}

export default App;
