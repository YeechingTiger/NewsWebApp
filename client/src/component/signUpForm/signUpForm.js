/**
 * Created by xinghe on 6/26/17.
 */
import React, {Component} from 'react';
var style = require('./signUpForm.scss');
var md5 = require('md5');

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state={
          account:"",
          password:""
        }
        this.handleChangeAccount = this.handleChangeAccount.bind(this);
    }

    handleChangeAccount(event) {
      console.log(event)
      this.setState({
        account: event.target.value
      });
    }

    handleChangePassword(event) {
      this.setState({
        password: event.target.value
      });
    }

    render() {
        return (
            <div>
                <h1>xxxx {this.state.account} {md5(this.state.password)}</h1>
                <input type="text"  onChange={this.handleChangeAccount} />
                <input type="text" value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
            </div>
        )
    }
}

export default SignUpForm;
