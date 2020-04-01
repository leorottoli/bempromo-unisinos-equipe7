import React, {Component} from 'react';
import axios from 'axios';

import { Loader } from '../loader/loader.component';
import { Erro } from '../erro/erro.component'

const Mensagem = props => (
    <tr className="mt-2 mb-2 d-flex justify-content-center">
        <p className="error-msg">E-mail ou senha inválidos</p>
    </tr>
)

const Carregando = props => (
    <div className="justify-content-center"><Loader/></div>
)

const Timeout = props => (
    <div className="justify-content-center ml-5 mr-5"><Erro/></div>
)

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);

        this.state = {
            email: '',
            senha:'',
            msg:'',
            isLoading: false,
            error: false
        }
    }

    componentDidMount(){
        localStorage.setItem('login', false);
        localStorage.setItem('token', false);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeSenha(e) {
        this.setState({
            senha: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ 
            isLoading: true,
            msg: '',
            error: false
        });
        const userData = {
            email: this.state.email,
            senha: this.state.senha
        }

        axios.post('https://bempromo.herokuapp.com/login', userData, {timeout: 10000})
        .then(res => {
            localStorage.setItem('token', res.headers.authorization);
            localStorage.setItem('login', true);
            this.setState({
                email: '',
                senha: '',
                isLoading: false,
                msg:'',
                error: false
            });
            this.props.history.push('/home');
        })
        .catch(err => {
            localStorage.setItem('login', false);
            this.setState({
                error: true,
                msg: err.message,
                email: '',
                senha: '',
                isLoading: false
            })
        })
    }

mostraLoader(){
        if (this.state.isLoading) {
            return <Carregando/>
        }
}

mostraErro(){
    if (this.state.error) {
        if(this.state.msg === "Request failed with status code 401"){
            return <Mensagem/>
        } else {
            return <Timeout/>
        }
    }
}
    render() {
        return (
            <div className="container d-flex justify-content-center pt-3 pb-5">
                <div className="content">
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <div className="collpase navbar-collapse">
                            <img src='https://www.bempromotora.com.br/wp-content/uploads/2019/12/logo-bem.png' alt='logo-bem' className='logo'/>
                        </div>
                    </nav>
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="d-flex justify-content-center">
                                    <h5>Login</h5> 
                                    <br></br>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                        <tr className="form-group mt-0 mb-0 d-flex justify-content-center">
                                            <td className="table-password">
                                                <input  type="email"
                                                        className="login-input text-center"
                                                        placeholder="e-mail@exemplo.com"
                                                        value={this.state.email}
                                                        onChange={this.onChangeEmail}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="form-group mt-0 mb-3 d-flex justify-content-center">
                                            <td className="table-password">
                                                <input  type="password"
                                                        className="login-input text-center"
                                                        placeholder="senha"
                                                        value={this.state.senha}
                                                        onChange={this.onChangeSenha}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="form-group mt-0 mb-3 d-flex justify-content-center text-center">
                                            <td className="table-password">
                                                <input type="submit" className="btn btn-outline-primary login-btn" value="Acessar"/>
                                            </td>
                                        </tr>
                                        {this.mostraLoader()}
                                        {this.mostraErro()}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}