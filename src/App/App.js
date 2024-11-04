import logo from '../logo.svg'
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import ErrorPage from '../ErrorPage/ErrorPage';
import MainPage from '../MainPage/MainPage';
import StartPage from '../StartPage/StartPage';
import TrainPage from '../TrainPage/TrainPage';
import StatPage from '../StatPage/StatPage';
import beachImg from '../Utilities/Images/Box_Beach_BDSP.png'
import caveImg from '../Utilities/Images/Box_Cave_BDSP.png'
import checkImg from '../Utilities/Images/Box_Checks_BDSP.png'
import cityImg from '../Utilities/Images/Box_City_BDSP.png'
import cragImg from '../Utilities/Images/Box_Crag_BDSP.png'
import desertImg from '../Utilities/Images/Box_Desert_BDSP.png'
import forestImg from '../Utilities/Images/Box_Forest_BDSP.png'
import savannahImg from '../Utilities/Images/Box_Savanna_BDSP.png'
import seafloorImg from '../Utilities/Images/Box_Seafloor_BDSP.png'
import skyImg from '../Utilities/Images/Box_Sky_BDSP.png'
import snowImg from '../Utilities/Images/Box_Snow_BDSP.png'
import volcanoImg from '../Utilities/Images/Box_Volcano_BDSP.png'
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
      <img className="Logo" onClick={() => {navigate(`/`);}} src={'https://fontmeme.com/permalink/241101/6f970496b8e7aa40eddeec38e543fbb0.png'}>
      </img>
      
        <Routes>
        <Route path="/*" element={<ErrorPage />}/>
        <Route path="/" element={<StartPage />}/>
        <Route path="/Main/:UserVal" element={<MainPage params={params} />} />
          <Route path="/Main/:UserVal/Stats" element={<StatPage params={params} />} />
          <Route path="/Main/:UserVal/Train" element={<TrainPage params={params} />} />
        </Routes>
      </div>

  );
}

export default App;
