import { Outlet } from "react-router-dom";
import "./components/Homepage";
import "./styles/App.css";

function App() {
  return (
    <div id="App">
      <Outlet />
    </div>
  );
}

export default App;
