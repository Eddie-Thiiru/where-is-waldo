import { useState, createContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Homepage from "./components/Homepage";
import WorldOne from "./components/WorldOne";
import WorldTwo from "./components/WorldTwo";
import WorldThree from "./components/WorldThree";
import Characters from "./components/Characters";
import LeaderboardPage from "./components/LeaderBoardPage";
import LeaderBoard from "./components/Leaderboard";

// Import character images
import marioImg from "./images/mario.png";
import blastoiseImg from "./images/blastoise.png";
import cronoImg from "./images/crono.png";
import gandalfImg from "./images/gandalf.png";
import shrekImg from "./images/shrek.png";
import genieImg from "./images/genie.png";
import waldoImg from "./images/waldo.png";
import rickImg from "./images/rick.png";
import edImg from "./images/ed.png";

// import styles
import "./styles/App.css";
import "./styles/worldPage.css";

export const WinContext = createContext();

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState({ hasError: false, msg: "" });
  const { name } = useParams();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let object = {};

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    fetch(`http://localhost:3000/leaderboard/${name}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        setGameWon(false);
        navigate(`/leaderboard/${name}`);
        return response.json();
      })
      .catch((err) => {
        err
          .json()
          .then((jsonError) => {
            setError((prev) => ({
              ...prev,
              hasError: true,
              msg: jsonError.errors,
            }));
          })
          .catch((genericError) => {
            console.log(err.statusText);
          });
      });
  };

  const modalClassName = gameWon === true ? "modalOpen" : "";

  return (
    <WinContext.Provider value={{ gameWon, setGameWon, error, handleSubmit }}>
      <div id="App" className={modalClassName}>
        {pathname === "/leaderboard/prehisoria" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"prehisoria"} />
          </>
        ) : pathname === "/leaderboard/isord" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"isord"} />
          </>
        ) : pathname === "/leaderboard/memesupreme" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"memesupreme"} />
          </>
        ) : name === "prehisoria" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Mario", image: marioImg },
                  { pos: 2, name: "Blastoise", image: blastoiseImg },
                  { pos: 3, name: "Crono", image: cronoImg },
                ]}
              />
            </Header>
            <Timer world={"prehisoria"} />
            <WorldOne />
          </>
        ) : name === "isord" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Gandalf", image: gandalfImg },
                  { pos: 2, name: "Shrek", image: shrekImg },
                  { pos: 3, name: "Genie", image: genieImg },
                ]}
              />
            </Header>
            <Timer world={"isord"} />
            <WorldTwo />
          </>
        ) : name === "memesupreme" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Waldo", image: waldoImg },
                  { pos: 2, name: "Rick", image: rickImg },
                  { pos: 3, name: "Ed", image: edImg },
                ]}
              />
            </Header>
            <Timer world={"memesupreme"} />
            <WorldThree />
          </>
        ) : name === "leaderboard" ? (
          <>
            <Header></Header>
            <LeaderboardPage />
          </>
        ) : name === undefined ? (
          <>
            <Header></Header>
            <Homepage />
          </>
        ) : (
          <div>Error</div>
        )}
      </div>
    </WinContext.Provider>
  );
}

export default App;
