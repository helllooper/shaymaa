import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import FirstNav from "./components/FirstNav"
import SecondNav from "./components/SecondNav"
import Home from "./components/Home"
import Articles from "./components/Articles"
import Videos from "./components/Videos";
import AddArticle from "./components/AddArticle"
import Login from "./components/Login"
import Footer from "./components/Footer";
import Signup from "./components/Signup"
import SuperAdmin from "./components/SuperAdmin";
import ArticleDetails from "./components/ArticleDetails";
import Admin from "./components/Admin";
import EditArticle from "./components/EditArticle";
import EditVideo from "./components/EditVideo";
import EnterEmail from "./components/EnterEmail";
import ScrollToTop from "./components/ScrollToTop";
import AddVideo from "./components/AddVideo";
import AddAuthor from "./components/AddAuthor";
import Author from "./components/Author";
import SearchResults from "./components/SearchResults";
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
        <ScrollToTop />
        <FirstNav />
        <SecondNav />
        <Route path="/articles" component={Articles} exact/>
        <Route path="/videos" component={Videos} exact/>
        <Route path="/articles/:pageNumber" render={({history, match}) => (<Articles history={history} match={match} keyword={null}/>)} exact/>
        <Route path="/videos/:pageNumber" render={({history, match}) => (<Videos history={history} match={match} keyword={null}/>)} exact/>
        <Route path="/addArticle" component={AddArticle} exact/>
        <Route path="/addAuthor" component={AddAuthor} exact/>
        <Route path="/article/:id" component={ArticleDetails}/>
        <Route path="/author/:id" component={Author}/>
        <Route path="/login" component={Login} exact/>
        <Route path ="/signup" component={Signup} exact/>
        <Route path="/superAdmin" component={SuperAdmin} exact/>
        <Route path="/admin/:id" component={Admin} exact/>
        <Route path="/edit" component={EditArticle} exact />
        <Route path="/editVideo" component={EditVideo} exact />
        <Route path="/enterEmail" component={EnterEmail} exact />
        <Route path="/addVideo" component={AddVideo} exact/>
        <Route path="/search" component={SearchResults} exact/>        
        <Route path="/" component={Home} exact/>
        <Footer />
    </Router>
  );
}

export default App;
