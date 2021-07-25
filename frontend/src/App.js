import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import FirstNav from "./components/FirstNav"
import SecondNav from "./components/SecondNav"
import MainPic from "./components/MainPic"
import Circles from "./components/Circles";
import Background from "./components/Background";
import Cards from "./components/Cards";
import Video from "./components/Video";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div className="position-relative">
      <FirstNav />
      <SecondNav />
      <MainPic />
      <Circles />
      <Background />
      <Cards />
      <Video />
      <Carousel />
    </div>
  );
}

export default App;
