import React from "react"
import ReactDOM from "react-dom"
import { ModalContainer, ModalRoute } from "react-router-modal"
import { BrowserRouter, Route } from "react-router-dom"

import App from "./App"
import SignUp from "./components/sign-up"
import SignIn from "./components/sign-in"
import Stats from "./components/stats"
import EditLinkForm from "./components/edit-link-form"
import NotFound from "./components/not-found"

import reportWebVitals from "./reportWebVitals"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={SignUp} />
      <Route exact path="/sign_up" component={SignUp} />
      <Route exact path="/sign_in" component={SignIn} />
      <Route exact path="/links" component={App} />
      <Route exact path="/not_found" component={NotFound} />
      <ModalRoute path={`/links/:id/stats`} component={Stats} parentPath="/links" closeModal="closeModal" />
      <ModalRoute path={`/links/:id/edit`} component={EditLinkForm} parentPath="/links" closeModal="closeModal" />
      <ModalContainer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)

reportWebVitals()
