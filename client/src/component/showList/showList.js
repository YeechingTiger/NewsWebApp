/**
 * Created by xinghe on 6/26/17.
 */
import React, {Component} from 'react';
var style = require('./showList.scss');

class ShowList extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className="showList" onClick={ () => {window.open(data.url)} }>
                <div className="pic">
                    <img src={data.urlToImage} />
                </div>
                <div className="description">
                    <p className="source">{data.source}</p>
                    <div className="title">{data.title}</div>
                    <div className="author">Author: {(data.author===null||data.author==="")?"Jason Ho":data.author}</div>
                    <div className="info">{data.description}</div>
                </div>
            </div>
        )
    }
}

export default ShowList;
