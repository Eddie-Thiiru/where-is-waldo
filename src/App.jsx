import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import WorldOne from "./components/WorldOne";
import WorldTwo from "./components/WorldTwo";
import WorldThree from "./components/WorldThree";
import "./styles/App.css";
import "./styles/worldPage.css";

function App() {
  const { name } = useParams();

  return (
    <div id="App">
      <Header />
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
