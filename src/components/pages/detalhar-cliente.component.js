import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Loader } from "../loader/loader.component";
import { Erro } from "../erro/erro.component";
import Header from "../header/header.component";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const Telefone = props => (
  <tr className="tr-liner d-flex justify-content-between">
    <td className="table-cell">Telefone {props.ordem}:</td>
    <td className="table-cell">{props.fone}</td>
  </tr>
);

export default class DetalharCliente extends Component {
  constructor(props) {
    super(props);

    this.onGoBack = this.onGoBack.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      id: "",
      nome: "",
      dataNascimento: "",
      email: "",
      cpfOuCnpj: "",
      enderecos: [],
      endereco: [
        {
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cep: ""
        }
      ],
      telefones: [],
      perfis: [],
      isLoading: false
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.setState({ isLoading: true });
    axios
      .get(
        "https://bempromo.herokuapp.com/clientes/" + this.props.match.params.id, //{timeout:10},
        { headers: { Authorization: token } }
      )
      .then(response => {
        response.data.enderecos.map((item, i) =>
          this.setState({ endereco: item })
        );
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          cpfOuCnpj: response.data.cpfOuCnpj,
          dataNascimento: response.data.dataNascimento,
          email: response.data.email,
          telefones: response.data.telefones,
          enderecos: response.data.enderecos,
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
        if (this.state.error) {
          if (this.state.msg === "Request failed with status code 403") {
            this.props.history.push("/login");
          }
        }
      });
  }

  onGoBack(e) {
    this.props.history.push("/home");
  }

  onDelete(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    let token = localStorage.getItem("token");
    axios
      .delete(
        "https://bempromo.herokuapp.com/clientes/" + this.props.match.params.id, //{timeout:10},
        { headers: { Authorization: token } }
      )
      .then(res => {
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

  listaTelefones() {
    return this.state.telefones.map(function(currentTelefone, i) {
      let chave = i + 1;
      if (currentTelefone.length === 11) {
        return (
          <Telefone
            fone={currentTelefone.replace(
              /(\d{2})(\d{5})(\d{4})/g,
              "($1) $2-$3"
            )}
            key={i}
            ordem={chave}
          />
        );
      } else if (currentTelefone.length === 10) {
        return (
          <Telefone
            fone={currentTelefone.replace(
              /(\d{2})(\d{4})(\d{4})/g,
              "($1) $2-$3"
            )}
            key={i}
            ordem={chave}
          />
        );
      } else {
        return <Telefone fone={currentTelefone} key={i} ordem={chave} />;
      }
    });
  }

  listaEnderecos() {
    if (this.state.enderecos.length > 0) {
      return (
        <div>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Endereço: </td>
            <td className="table-cell">{this.state.endereco.logradouro}</td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Numero: </td>
            <td className="table-cell">{this.state.endereco.numero}</td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Complemento: </td>
            <td className="table-cell">{this.state.endereco.complemento}</td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Bairro: </td>
            <td className="table-cell">{this.state.endereco.bairro}</td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">CEP: </td>
            <td className="table-cell">
              {this.state.endereco.cep
                ? this.state.endereco.cep.replace(/(\d{5})(\d{3})/g, "$1-$2")
                : ""}
            </td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Cidade: </td>
            <td className="table-cell">{this.state.endereco.cidade.nome}</td>
          </tr>
          <tr className="tr-liner d-flex justify-content-between">
            <td className="table-cell">Estado: </td>
            <td className="table-cell">
              {this.state.endereco.cidade.estado.nome}
            </td>
          </tr>
        </div>
      );
    }
  }

  detalhaCliente() {
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
            <div className="d-flex justify-content-center mt-1 mb-1">
              <h5>Detalhes do cliente</h5>
            </div>
            <div className="d-flex justify-content-left sub-titulo mt-4 mb-3">
              <h6>Dados pessoais</h6>
            </div>
            <tr className="tr-liner d-flex justify-content-between">
              <td className="table-cell">Nome: </td>
              <td className="table-cell">{this.state.nome}</td>
            </tr>
            <tr className="tr-liner d-flex justify-content-between">
              <td className="table-cell">CPF: </td>
              <td className="table-cell">
                {this.state.cpfOuCnpj.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                  "$1.$2.$3-$4"
                )}
              </td>
            </tr>
            <tr className="tr-liner d-flex justify-content-between">
              <td className="table-cell">Data de Nascimento: </td>
              <td className="table-cell">{this.state.dataNascimento}</td>
            </tr>
            <div className="d-flex justify-content-left sub-titulo mt-4 mb-3">
              <h6>Endereço</h6>
            </div>
            {this.listaEnderecos()}
            <div className="d-flex justify-content-left sub-titulo mt-5 mb-3">
              <h6>Contato</h6>
            </div>
            <tr className="tr-liner d-flex justify-content-between">
              <td className="table-cell">E-mail: </td>
              <td className="table-cell">{this.state.email}</td>
            </tr>
            {this.listaTelefones()}
            <div className="form-group d-flex justify-content-center mt-5 mb-3">
              <Tooltip title="Voltar" placement="top">
                <IconButton aria-label="back" onClick={this.onGoBack}>
                  <KeyboardBackspaceOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir" placement="top">
                <IconButton
                  aria-label="delete"
                  onClick={e =>
                    window.confirm(
                      "Tem certeza que deseja deletar o cliente?"
                    ) && this.onDelete(e)
                  }
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar" placement="top">
                <Link to={"/edit/" + this.props.match.params.id}>
                  <IconButton aria-label="edit">
                    <EditOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
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
          {this.detalhaCliente()}
        </div>
      </div>
    );
  }
}
