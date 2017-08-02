import {Route, HashRouter as Router, withRouter, Link} from "react-router-dom";
import React, {Component} from "react";
import {connect} from "react-redux";
import SignUpForm from "../../../component/signUpForm/signUpForm";
import {fetchNewsData} from "../../../actionCreator/NewsActionCreater";
const style = require("./abc.scss");

class SignPage extends Component {

    render() {
        return (
            <div>
                <SignUpForm />
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { newsData,router} = state;
    return {
        newsData,router
    }
}
export default connect(mapStateToProps)(withRouter(SignPage))
