import './App.css';
import Header from './Pages/Wrapper/Header';
import Footer from './Pages/Wrapper/Footer';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import History from './Pages/History';
import About from './Pages/About';


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/history" exact component={History}/>
          <Route path="/about" exact component={About}/>
        </Switch>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
