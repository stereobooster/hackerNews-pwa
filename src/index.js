import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import App from "./App";
import Newest from "./Newest";
import Show from "./Show";
import Ask from "./Ask";
import Jobs from "./Jobs";
import Story from "./Story";

import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

const defaultChannelList = ["top", "new", "show", "ask", "job"];

const changeChannel = event => {
  const channelList = document.querySelectorAll(".channel > a");
  if (channelList && channelList.length > 0) {
    for (let i = 0; i < channelList.length; i += 1) {
      channelList[i].setAttribute("style", "");
    }
  }
  event.target.setAttribute(
    "style",
    "border-bottom: 4px solid rgb(255, 102, 0)"
  );
};

const snap = navigator.userAgent === "ReactSnap";
const initChannel = () => {
  if (snap) return;
  const path = window.location.pathname.match(/\/([a-z]*)\/([0-9]*)/, "g");
  let channel = "news";
  if (path) {
    channel = path[1];
  }
  const index = defaultChannelList.indexOf(channel);
  const channelList = document.querySelectorAll(".channel > a");
  index > -1 &&
    channelList[index].setAttribute(
      "style",
      "border-bottom: 4px solid rgb(255, 102, 0)"
    );
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <div className="topbar">
          <div className="logo">Y</div>
          <ul>
            <li className="channel">
              <Link to="/top/1" onClick={event => changeChannel(event)}>
                TOP
              </Link>
            </li>
            <li className="channel">
              <Link to="/new/1" onClick={event => changeChannel(event)}>
                NEW
              </Link>
            </li>
            <li className="channel">
              <Link to="/show/1" onClick={event => changeChannel(event)}>
                SHOW
              </Link>
            </li>
            <li className="channel">
              <Link to="/ask/1" onClick={event => changeChannel(event)}>
                ASK
              </Link>
            </li>
            <li className="channel">
              <Link to="/job/1" onClick={event => changeChannel(event)}>
                JOBS
              </Link>
            </li>
          </ul>
        </div>
        <Route exact path="/" component={() => <Redirect to="/top/1" />} />
        <Route exact path="/top/:page" component={App} />
        <Route exact path="/new/:page" component={Newest} />
        <Route exact path="/show/:page" component={Show} />
        <Route exact path="/ask/:page" component={Ask} />
        <Route exact path="/job/:page" component={Jobs} />
        <Route exact path="/item/:id" component={Story} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

window.addEventListener("popstate", () => initChannel());

initChannel();
registerServiceWorker();
