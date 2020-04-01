import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Loader } from "../loader/loader.component";
import { Erro } from "../erro/erro.component";
import Header from "../header/header.component";

const Cliente = props => (
  <tr className="tr-liner">
    <td className="table-cell">
      <Link
        to={"/detail/" + props.cliente.id}
        className="text-reset text-decoration-none"
      >
        {props.cliente.nome}
      </Link>
    </td>
    <td className="table-cell">
      <Link
        to={"/detail/" + props.cliente.id}
        className="text-reset text-decoration-none"
      >
        {props.cliente.cpfOuCnpj.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/g,
          "$1.$2.$3-$4"
        )}
      </Link>
    </td>
    <td className="table-cell">
      <Link
        to={"/detail/" + props.cliente.id}
        className="text-reset text-decoration-none"
      >
        {props.cliente.dataNascimento}
      </Link>
    </td>
    <td className="table-cell">
      <Link
        to={"/detail/" + props.cliente.id}
        className="text-reset text-decoration-none"
      >
        {props.cliente.email}
      </Link>
    </td>
  </tr>
);

export default class ListarCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      isLoading: false,
      error: false,
      msg: "",
      busca: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.setState({ isLoading: true });
    axios
      .get(
        "https://bempromo.herokuapp.com/clientes", //{timeout:10},
        { headers: { Authorization: token } }
      )
      .then(response => {
        this.setState({
          clientes: response.data,
          isLoading: false,
          msg: "",
          error: false
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          msg: err.message,
          isLoading: false
        });
        console.log(this.state.error);
        if (this.state.error) {
          if (this.state.msg === "Request failed with status code 403") {
            localStorage.setItem("login", false);
            this.props.history.push("/login");
          }
        }
      });
  }

  handleChange = (e) => {
    this.setState({busca: e.target.value.replace(/\D/g, '')})
  }

  onSearch(e){
    e.preventDefault();
    alert("Você buscou o CPF "+this.state.busca);
  }

  clienteList() {
    return this.state.clientes.map(function(currentCliente, i) {
      return <Cliente cliente={currentCliente} key={i} />;
    });
  }

  carregaClientes() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="container custom-details mt-5 mb-5">
          <Loader />
        </div>
      );
    } else if (this.state.error) {
        return (
          <div className="container custom-details">
            <Erro />
          </div>
        );
      } else {
      return (
        <table className="content-body">
          <tbody>
            <tr className="tr-liner tr-header">
              <td className="table-cell">Nome</td>
              <td className="table-cell">CPF</td>
              <td className="table-cell">Nascimento</td>
              <td className="table-cell">E-mail</td>
            </tr>
          </tbody>
          <tbody>{this.clienteList()}</tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <div className="container d-flex justify-content-center custom pt-3 pb-5">
        <div className="custom-details content">
          <div>
            <Header />
            {this.carregaClientes()} 
          </div>
        </div>
      </div>
    );
  }
}
