import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './auth/login/Login';
import Home from './home/Home';
import Callback from './auth/login/callback/Callback';
import Signup from './auth/signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} exact />
          <Route path="/oauth2/callback" component={Callback} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
