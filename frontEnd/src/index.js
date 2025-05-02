import React from "react";
import ReactDOM from "react-dom/client";
import  ContextApp  from "./components/ContextApp";
import  CloudinaryScriptContext  from "./components/CloudinaryUploadWidget";
import {BrowserRouter} from "react-router-dom"
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import AppContextProvider from "./components/ContextApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<BrowserRouter >
 
<ContextApp>
<Provider store={store}>
<App /> 
</Provider></ContextApp>  

</BrowserRouter>


);
