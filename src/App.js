import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./Components/Home/home";
import SignUp from "./Components/Signup/signup";
import SignIn from "./Components/Signin/signin";
import VerifyEmail from "./Components/verifyEmail/verifyEmail";

const App = () => (
  <Router>
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verify-email" component={VerifyEmail} />
      </Switch>
    </>
  </Router>
);
export default App;
