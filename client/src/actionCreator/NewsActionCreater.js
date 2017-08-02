/**
 * Created by xinghe on 7/28/17.
 */

export function fetchNewsData(number, pagenumber) {
    return dispatch => {
        dispatch({type: 'SENDREQUEST'});
        let body = JSON.stringify({
          number: number,
          pagenumber: pagenumber
        })
        console.log(body);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let request = new Request('http://localhost:3000/news', {
            method: 'POST',
            cache: false,
            headers: headers,
            body: body
        });
        console.log(request);
        fetch(request).then(res => res.json()).then(res => {dispatch(receiveNewsData(JSON.parse(res))),
        console.log(JSON.parse(res))});
    }
}

function receiveNewsData(data) {
    return {
        type: 'RECEIVEDATA',
        payload: data,
    }
}
