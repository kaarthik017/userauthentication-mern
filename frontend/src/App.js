
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route
  } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Reset from './components/reset'
import dashboard from './components/dashboard';
import Home from './components/home';


function App() {
  return <>
  
  <Router>
    <Switch>
      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/register" component={Register} exact={true}></Route>
      <Route path="/login" component={Login} exact={true}></Route>
      <Route path="/resetpassword/:token" component={Reset} exact={true}></Route>
      <Route path="/dashboard" component={dashboard} exact={true}></Route>
    </Switch>
  </Router>
  </>
}

export default App;
