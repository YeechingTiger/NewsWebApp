require('babel-core/register');
// require("./index");
import APP from "../PageMain";
import React, {Component, PropTypes} from 'react';
import {renderToString} from "react-dom/server";
import {Route, StaticRouter, withRouter} from "react-router-dom";
const context = {}
const markup = renderToString(
    <APP/>
)
console.log(markup);