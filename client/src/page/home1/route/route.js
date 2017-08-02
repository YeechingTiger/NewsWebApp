/**
 * Created by pz on 2017/6/11.
 */
import {Route} from "react-router-dom";
import React from "react";
import HomePage from "../privatePage/Home";
import SignPage from "../privatePage/SignPage";


export default <div>
    <Route exact path="/" component={HomePage}/>
    <Route path="/signup" component={SignPage}/>
</div>;
