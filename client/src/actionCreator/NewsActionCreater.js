/**
 * Created by xinghe on 7/28/17.
 */

export function fetchNewsData() {
    return dispatch => {
        dispatch({type: 'SENDREQUEST'});
        let request = new Request('http://localhost:3000/news', {
            method: 'GET',
            cache: false
        });
        fetch(request).then(res => res.json()).then(res => dispatch(receiveNewsData(res)));
    }
}

function receiveNewsData(data) {
    return {
        type: 'RECEIVEDATA',
        payload: data,
    }
}