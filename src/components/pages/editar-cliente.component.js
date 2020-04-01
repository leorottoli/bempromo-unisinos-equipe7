import React, {Component} from 'react';
import axios from 'axios';

import { Loader } from "../loader/loader.component";
import { Erro } from "../erro/erro.component";
import Header from "../header/header.component";

import MaskedInput from 'react-text-mask';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

export default class EditarCliente extends Component {

    constructor(props) {
        super(props);
        
        this.onChangeClienteNome = this.onChangeClienteNome.bind(this);
        this.onChangeClienteCpf = this.onChangeClienteCpf.bind(this);
        this.onChangeClienteDataNascimento = this.onChangeClienteDataNascimento.bind(this);
        this.onChangeClienteEmail = this.onChangeClienteEmail.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            cpfOuCnpj: '',
            dataNascimento: '',
            email: '',
            isLoading: false,
            msg: "",
            error: false
        }
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
            this.setState({
              id: response.data.id,
              nome: response.data.nome,
              cpfOuCnpj: response.data.cpfOuCnpj,
              dataNascimento: response.data.dataNascimento,
              email: response.data.email,
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
                this.props.history.push("/login");
              }
            }
          });
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

    onChangeClienteEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    
    onCancel(e){
        this.props.history.push('/detail/'+this.props.match.params.id);
    }
    
    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("token");
        this.setState({ isLoading: true });
        const setCliente = {
            nome: this.state.nome,
            cpfOuCnpj: this.state.cpfOuCnpj.replace(/\D/g, ''),
            dataNascimento: this.state.dataNascimento,
            email: this.state.email
        }
        console.log(setCliente);
        axios.put('https://bempromo.herokuapp.com/clientes/'+this.props.match.params.id, setCliente, //{timeout:10},
        { headers: { Authorization: token } })
            .then(res => {
                console.log(res.data);
                this.setState({
                    nome: '',
                    cpfOuCnpj: '',
                    dataNascimento: '',
                    email: '',
                    isLoading: false,
                    msg: "",
                    error: false
                });
                this.props.history.push('/detail/'+this.props.match.params.id);
            })
            .catch(err => {
            this.setState({
              error: true,
              msg: err.message,
              isLoading: false
            });
            console.log(this.state.msg);
            if (this.state.error) {
              if (this.state.msg === "Request failed with status code 403") {
                this.props.history.push("/login");
              }
            }
          });
    }

    editaCliente(){
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
                        <h5>Atualizar dados do cliente</h5>
                    </div>
                        <form onSubmit={this.onSubmit}>
                        <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                            <td className="table-cell">Nome: </td>
                            <td className="table-cell">
                                <input  type="text"
                                        className="client-input"
                                        value={this.state.nome}
                                        onChange={this.onChangeClienteNome}
                                        /></td>
                        </tr>
                        <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                            <td className="table-cell">CPF: </td>
                            <td className="table-cell">
                                <MaskedInput  type="text"
                                        className="client-input-off"
                                        value={this.state.cpfOuCnpj}
                                        onChange={this.onChangeClienteCpf}
                                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                        guide={false}/>
                            </td>          
                        </tr>
                        <tr className="form-group mb-0 tr-liner d-flex justify-content-between">
                            <td className="table-cell">Data de Nascimento: </td>
                            <td className="table-cell">
                                <MaskedInput  type="text"
                                        className="client-input-off"
                                        value={this.state.dataNascimento}
                                        onChange={this.onChangeClienteDataNascimento}
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        guide={false}/>
                            </td>
                        </tr>
                        <tr className="form-group tr-liner d-flex justify-content-between">
                            <td className="table-cell">E-mail: </td>
                            <td className="table-cell">
                                <input  type="email"
                                        className="client-input"
                                        value={this.state.email}
                                        onChange={this.onChangeClienteEmail}
                                        /></td>
                        </tr>
                        <div className="form-group d-flex justify-content-center mt-5 mb-3">
                            <Tooltip title="Salvar" placement="top">
                                <IconButton 
                                    aria-label="save"
                                    type="submit"
                                    value="Create Cliente">
                                    <CheckOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Descartar" placement="top">
                                <IconButton 
                                    aria-label="cancel"
                                    onClick={e =>
                                        window.confirm("Tem certeza que deseja descartar as alteralções?") &&
                                        this.onCancel(e)
                                    }>
                                    <ClearOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        </form>
                    </div>
                    <div className="col col-1"></div>
                </div>
          )
        }
    }

    render() {
        return (
          <div className="container d-flex justify-content-center custom pt-3 pb-5">
            <div className="custom-details content">
              <Header />
              {this.editaCliente()}
            </div>
          </div>
        );
      }
}
