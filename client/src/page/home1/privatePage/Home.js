import {Route, HashRouter as Router, withRouter, Link} from "react-router-dom";
import React, {Component} from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import ShowList from "../../../component/showList/showList";
import Loading from "../../../component/loading/loading";
import Navigator from "../../../component/navigator/navigator";
import {fetchNewsData} from "../../../actionCreator/NewsActionCreater";

const style = require("./abc.scss");

class Home extends Component {

    constructor() {
        super();
        this.handler = null;
        this.state={
          pageNumber:1
        }
    }

    handleSignClick() {
      this.props.dispatch(push("/signup"));
    }

    componentDidMount() {
        this.props.dispatch(fetchNewsData(10, 1));
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
        if (textHeight - top - window.screen.height <= 0 &&
            this.props.newsData.loading === false
            ) {

            this.setState({
              pageNumber: this.state.pageNumber + 1
            }, ()=>dispatch(fetchNewsData(10, this.state.pageNumber)))
        }
    }

    renderList() {
        const newsData = this.props.newsData.data;
        let list = [];
        for (let i = 0; i < newsData.length; i++) {
            list.push(<ShowList key={i} data={newsData[i]} />)
        }
        list.push(<Loading key="ladingbar" loading={this.props.newsData.loading} />)
        return list;
    }

    render() {
        return (
            <div>
                <Navigator signClick={this.handleSignClick.bind(this)}/>
                {this.renderList()}
            </div>
        )

    }
}
function mapStateToProps(state) {
    const {newsData, router, dispatch} = state;
    return {
        newsData, router, dispatch
    }
}
export default connect(mapStateToProps)(withRouter(Home))
