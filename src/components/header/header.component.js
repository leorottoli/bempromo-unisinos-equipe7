import React, { Component } from "react";
import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

export default class Header extends Component {

  btnListar = React.forwardRef((props, ref) => <Link to={"/home"} {...props} ref={ref} />);
  btnAdicionar = React.forwardRef((props, ref) => <Link to={"/create"} {...props} ref={ref} />);
  btnSair = React.forwardRef((props, ref) => <Link to={"/"} {...props} ref={ref} />);

  onLogout(){
    alert("Logout")
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <img
                src="https://www.bempromotora.com.br/wp-content/uploads/2019/12/logo-bem.png"
                alt="logo-bem"
                className="logo"
              />
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="navbar-item">
              <Tooltip title="Listar clientes">
                <IconButton aria-label="list" component={this.btnListar}>
                  <FormatListBulletedOutlinedIcon />
                </IconButton>
              </Tooltip>
            </li>
            <li className="navbar-item">
              <Tooltip title="Adicionar cliente">
                <IconButton aria-label="add" component={this.btnAdicionar}>
                  <AddOutlinedIcon />
                </IconButton>
              </Tooltip>
            </li>
            <li className="navbar-item">
             <Tooltip title="Sair">
                <IconButton aria-label="exit" component={this.btnSair} >
                  <ExitToAppOutlinedIcon />
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
