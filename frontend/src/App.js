import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import FirstNav from "./components/FirstNav"
import SecondNav from "./components/SecondNav"
import Home from "./components/Home"
import Articles from "./components/Articles"
import AddArticle from "./components/AddArticle"
import Login from "./components/Login"
import Footer from "./components/Footer";
import Signup from "./components/Signup"
import SuperAdmin from "./components/SuperAdmin";
import ArticleDetails from "./components/ArticleDetails"
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="position-relative">
        <FirstNav />
        <SecondNav />
        <Route path="/articles" component={Articles} exact/>
        <Route path="/articles/:pageNumber" component={Articles} exact/>
        <Route path="/addArticle" component={AddArticle} exact/>
        <Route path="/article/:id" component={ArticleDetails}/>
        <Route path="/login" component={Login} exact/>
        <Route path ="/signup" component={Signup} />
        <Route path="/superAdmin" component={SuperAdmin} />
        <Route path="/" component={Home} exact/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
