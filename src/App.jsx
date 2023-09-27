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
      {name === "world-one" ? (
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
          <WorldOne />
        </>
      ) : name === "world-two" ? (
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
          <WorldTwo />
        </>
      ) : name === "world-three" ? (
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
          <WorldThree />
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
  );
}

export default App;
