import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Render from "./components/Render/Render";
import "./components/CSS/Network.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  let token = localStorage.usertoken
  return (
    <Router>
      <Route exact path="/" component={token == null ? Home : Render} />
      <Route path="/register" component={Home} />
      <Route path="/user/register" component={Home} />
      <Route path="/admin/register" component={Home} />
      <Route path="/dailyUpdate" component={Render} />
      <Route path="/myInquriy" component={Render} />
      <Route path="/profile" component={token == null ? Home : Render} />
      <Route path="/createInquriy" component={Render} />
      <Route path="/createDailyUpdate" component={Render} />
    </Router>
  );
};

export default App;
