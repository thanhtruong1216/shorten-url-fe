import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"

import SignUp from "./components/sign-up"
import SignIn from "./components/sign-in"

import reportWebVitals from "./reportWebVitals"
import "./index.css"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={SignUp} />
      <Route exact path="/sign_up" component={SignUp} />
      <Route exact path="/sign_in" component={SignIn} />
      <Route exact path="/links" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)

reportWebVitals()
