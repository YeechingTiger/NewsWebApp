/**
 * Created by xinghe on 6/26/17.
 */
import React, {Component} from 'react';
var style = require('./navigator.scss');
import {push} from 'react-router-redux';
class Navigator extends Component {
    render() {
      const {dispatch} = this.props;
      return(
        <div className="navbar">
            <div className="brand">OneNews</div>
            <div className="right">
                <div className="login">Login</div>
                <div className="signup" onClick={this.props.signClick}>Signup</div>
            </div>
        </div>
      )
    }
}

export default Navigator;
