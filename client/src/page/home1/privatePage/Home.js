import {Route, HashRouter as Router, withRouter, Link} from "react-router-dom";
import React, {Component} from "react";
import {connect} from "react-redux";
import ShowList from "../../../component/showList/showList";
import {fetchNewsData} from "../../../actionCreator/NewsActionCreater";

const style = require("./abc.scss");

class Home extends Component {

    constructor() {
        super();
        this.handler = null;
    }

    componentDidMount() {
        this.props.dispatch(fetchNewsData());
        this.handler = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handler, true);
    }

    componentWillUnmount() {
        if (typeof this.handler === "function") {
            window.removeEventListener('scroll', this.handler, true);
        }
    }

    handleScroll() {
        const {dispatch} = this.props;
        let top = document.documentElement.scrollTop || document.body.scrollTop;  //获取滚动距离
        let textHeight = document.body.scrollHeight;
        if (textHeight - top - window.screen.height <= 0
            ) {
            dispatch(fetchNewsData());
        }
    }

    renderList() {
        const newsData = this.props.newsData.data;
        let list = [];
        for (let i = 0; i < newsData.length; i++) {
            list.push(<ShowList key={i} data={newsData[i]} />)
        }
        return list;
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )

    }
}
function mapStateToProps(state) {
    const {newsData, router} = state;
    return {
        newsData, router
    }
}
export default connect(mapStateToProps)(withRouter(Home))