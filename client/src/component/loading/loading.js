/**
 * Created by xinghe on 7/7/17.
 */
import React, {Component} from 'react';
var style = require('./loading.scss');

class Loading extends Component {
    render() {
        return (
            <div className={this.props.loading ? "spinner" : "hide"}>
                <div className="bar1">
                </div>
                <div className="bar2">
                </div>
                <div className="bar3">
                </div>
                <div className="bar4">
                </div>
                <div className="bar5">
                </div>
                <div className="bar6">
                </div>
                <div className="bar7">
                </div>
                <div className="bar8">
                </div>
                <div className="bar9">
                </div>
                <div className="bar10">
                </div>
                <div className="bar11">
                </div>
                <div className="bar12">
                </div>
            </div>
        )
    }
}

export default Loading;
