import React from "react";
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { MemoryRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import ListarCliente from "../pages/listar-clientes.component";
import Login from '../pages/login.component';
import DetalharCliente from '../pages/detalhar-cliente.component'
import CriarCliente from '../pages/criar-cliente.component'
import EditarCliente from '../pages/editar-cliente.component'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {... rest}
        render={props =>
            localStorage.getItem('login') ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/home" component={ListarCliente} />
            <PrivateRoute path="/detail/:id" component={DetalharCliente} />
            <PrivateRoute path="/edit/:id" component={EditarCliente} />
            <PrivateRoute path="/create" component={CriarCliente} />
            
        </Switch>
    </Router>

);

export default Routes;