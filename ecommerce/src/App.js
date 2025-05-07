import Myroute from "./Myroute";
import store from './redux/reducer/store';

import { createStore } from "redux";

import { Provider } from "react-redux";

import { combineReducers } from "redux";
import student from "./redux/reducer/student";
import mystore from "./redux/finalreducer/mystore";
import "./App.css";

function App() {
  
  
  return (
    <Provider store = {mystore}>
      <Myroute/> 
    </Provider>
  );
}

export default App;
