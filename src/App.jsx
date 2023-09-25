import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import WorldOne from "./components/WorldOne";
import WorldTwo from "./components/WorldTwo";
import WorldThree from "./components/WorldThree";
import Characters from "./components/Characters";

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

function App() {
  const { name } = useParams();

  return (
    <div id="App">
      <Header>
        {name === "world-one" ? (
          <Characters
            characterOne={{ name: "Mario", image: marioImg }}
            characterTwo={{ name: "Blastoise", image: blastoiseImg }}
            characterThree={{ name: "Crono", image: cronoImg }}
          />
        ) : name === "world-two" ? (
          <Characters
            characterOne={{ name: "Gandalf", image: gandalfImg }}
            characterTwo={{ name: "Shrek", image: shrekImg }}
            characterThree={{ name: "Genie", image: genieImg }}
          />
        ) : (
          name === "world-three" && (
            <Characters
              characterOne={{ name: "Waldo", image: waldoImg }}
              characterTwo={{ name: "Rick", image: rickImg }}
              characterThree={{ name: "Ed", image: edImg }}
            />
          )
        )}
      </Header>
      {name === "world-one" ? (
        <WorldOne />
      ) : name === "world-two" ? (
        <WorldTwo />
      ) : name === "world-three" ? (
        <WorldThree />
      ) : name === undefined ? (
        <Homepage />
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}

export default App;
