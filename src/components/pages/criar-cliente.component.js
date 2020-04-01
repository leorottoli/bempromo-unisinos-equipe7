import React, { Component } from "react";
import axios from "axios";

import { Loader } from "../loader/loader.component";
import { Erro } from "../erro/erro.component";
import Header from "../header/header.component";

import MaskedInput from "react-text-mask";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

export default class CriarCliente extends Component {
  constructor(props) {
    super(props);

    this.onChangeClienteNome = this.onChangeClienteNome.bind(this);
    this.onChangeClienteCpf = this.onChangeClienteCpf.bind(this);
    this.onChangeClienteDataNascimento = this.onChangeClienteDataNascimento.bind(
      this
    );

    this.onChangeClienteLogradouro = this.onChangeClienteLogradouro.bind(this);
    this.onChangeClienteNumero = this.onChangeClienteNumero.bind(this);
    this.onChangeClienteComplemento = this.onChangeClienteComplemento.bind(
      this
    );
    this.onChangeClienteBairo = this.onChangeClienteBairo.bind(this);
    this.onChangeClienteCep = this.onChangeClienteCep.bind(this);
    this.onChangeClienteCidadeId = this.onChangeClienteCidadeId.bind(this);

    this.onChangeClienteEmail = this.onChangeClienteEmail.bind(this);
    this.onChangeClienteTelefone1 = this.onChangeClienteTelefone1.bind(this);
    this.onChangeClienteTelefone2 = this.onChangeClienteTelefone2.bind(this);

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: "",
      cpfOuCnpj: "",
      dataNascimento: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidadeId: 0,
      email: "",
      telefone1: "",
      telefone2: "",
      isLoading: false,
      msg: "",
      error: false
    };
  }

  onChangeClienteNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeClienteCpf(e) {
    this.setState({
      cpfOuCnpj: e.target.value
    });
  }

  onChangeClienteDataNascimento(e) {
    this.setState({
      dataNascimento: e.target.value
    });
  }

  onChangeClienteLogradouro(e) {
    this.setState({
      logradouro: e.target.value
    });
  }

  onChangeClienteNumero(e) {
    this.setState({
      numero: e.target.value
    });
  }

  onChangeClienteComplemento(e) {
    this.setState({
      complemento: e.target.value
    });
  }

  onChangeClienteBairo(e) {
    this.setState({
      bairro: e.target.value
    });
  }

  onChangeClienteCep(e) {
    this.setState({
      cep: e.target.value
    });
  }

  onChangeClienteCidadeId(e) {
    this.setState({
      cidadeId: e.target.value
    });
  }

  onChangeClienteEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeClienteTelefone1(e) {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    const result = e.target.value.replace(regex, "($1) $2-$3");
    this.setState({
      telefone1: result
    });
  }

  onChangeClienteTelefone2(e) {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    const result = e.target.value.replace(regex, "($1) $2-$3");
    this.setState({
      telefone2: result
    });
  }

  onCancel(e) {
    this.props.history.push("/home");
  }

  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    this.setState({ isLoading: true });
    const newCliente = {
      nome: this.state.nome,
      tipo: 1,
      cpfOuCnpj: this.state.cpfOuCnpj.replace(/\D/g, ""),
      dataNascimento: this.state.dataNascimento,
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      cep: this.state.cep.replace(/\D/g, ""),
      cidadeId: Number.parseInt(this.state.cidadeId, 10),
      email: this.state.email,
      telefone1: this.state.telefone1.replace(/\D/g, ""),
      telefone2: this.state.telefone2.replace(/\D/g, ""),
      senha: "000"
    };
    axios
      .post(
        "https://bempromo.herokuapp.com/clientes",
        newCliente, //{timeout:10},
        { headers: { Authorization: token } }
      )
      .then(res => {
        this.setState({
          nome: "",
          cpfOuCnpj: "",
          dataNascimento: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cep: "",
          cidadeId: "",
          email: "",
          telefone1: "",
          telefone2: "",
          isLoading: false,
          msg: "",
          error: false
        });
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({
          error: true,
          msg: err.message,
          isLoading: false
        });
        if (this.state.error) {
          if (this.state.msg === "Request failed with status code 403") {
            this.props.history.push("/login");
          }
        }
      });
  }

  insereCliente() {
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
        <div className="row">
          <div className="col col-1"></div>
          <div className="col col-10">
            <div className="d-flex justify-content-center mt-1 mb-3">
              <h5>Cadastro de cliente</h5>
            </div>
            <form onSubmit={this.onSubmit}>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Nome: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    value={this.state.nome}
                    onChange={this.onChangeClienteNome}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">CPF: </td>
                <td className="table-cell">
                  <MaskedInput
                    type="text"
                    className="client-input"
                    value={this.state.cpfOuCnpj}
                    onChange={this.onChangeClienteCpf}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      ".",
                      /\d/,
                      /\d/,
                      /\d/,
                      ".",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/
                    ]}
                    guide={false}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Data de Nascimento: </td>
                <td className="table-cell">
                  <MaskedInput
                    type="text"
                    className="client-input"
                    value={this.state.dataNascimento}
                    onChange={this.onChangeClienteDataNascimento}
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/
                    ]}
                    guide={false}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Endereço: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    value={this.state.logradouro}
                    onChange={this.onChangeClienteLogradouro}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Número: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    value={this.state.numero}
                    onChange={this.onChangeClienteNumero}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Complemento: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    value={this.state.complemento}
                    onChange={this.onChangeClienteComplemento}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Bairro: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    value={this.state.bairro}
                    onChange={this.onChangeClienteBairo}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">CEP: </td>
                <td className="table-cell">
                  <MaskedInput
                    type="text"
                    className="client-input"
                    value={this.state.cep}
                    onChange={this.onChangeClienteCep}
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    guide={false}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Cidade: </td>
                <td className="table-cell">
                  <select
                    className="client-input"
                    id="cidade"
                    onChange={this.onChangeClienteCidadeId}
                  >
                    <option selected>Selecione...</option>
                    <option value="1">Porto Alegre</option>
                    <option value="2">Canoas</option>
                    <option value="3">Campinas</option>
                  </select>
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">E-mail: </td>
                <td className="table-cell">
                  <input
                    type="email"
                    className="client-input"
                    value={this.state.email}
                    onChange={this.onChangeClienteEmail}
                  />
                </td>
              </tr>
              <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                <td className="table-cell">Telefone 1: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    placeholder="Opcional"
                    value={this.state.telefone1}
                    onChange={this.onChangeClienteTelefone1}
                  />
                </td>
              </tr>
              <tr className="form-group tr-liner d-flex justify-content-between">
                <td className="table-cell">Telefone 2: </td>
                <td className="table-cell">
                  <input
                    type="text"
                    className="client-input"
                    placeholder="Opcional"
                    value={this.state.telefone2}
                    onChange={this.onChangeClienteTelefone2}
                  />
                </td>
              </tr>
              <div className="form-group d-flex justify-content-center mt-5 mb-3">
                <Tooltip title="Salvar" placement="top">
                  <IconButton
                    aria-label="save"
                    type="submit"
                    value="Create Cliente"
                  >
                    <CheckOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Descartar" placement="top">
                  <IconButton aria-label="cancel" onClick={e =>
                              window.confirm("Tem certeza que deseja descartar as alteralções?") &&
                              this.onCancel(e)
                          }>
                    <ClearOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </form>
          </div>
          <div className="col col-1"></div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container d-flex justify-content-center custom pt-3 pb-5">
        <div className="custom-details content">
          <Header />
          {this.insereCliente()}
        </div>
      </div>
    );
  }
}
