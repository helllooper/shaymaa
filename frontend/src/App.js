import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import FirstNav from "./components/FirstNav"
import SecondNav from "./components/SecondNav"
import MainPic from "./components/MainPic"
import Circles from "./components/Circles"

function App() {
  return (
    <div className="position-relative">
      <FirstNav />
      <SecondNav />
      <MainPic />
      <Circles />
    </div>
  );
}

export default App;
