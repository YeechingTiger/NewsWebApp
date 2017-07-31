import { createStore, applyMiddleware, compose } from 'redux';
// import DevTools,{ createDevTools } from 'redux-devtools';
import { syncHistoryWithStore, routerReducer,routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
// import {createHistory} from 'history';
import  { createLogger } from 'redux-logger';
// import promiseMiddleware from '../api/promiseMiddleware';
import rootReducer from '../redux/reducers';

// const middlewareBuilder = () => {
//
//   let middleware = {};
//   let universalMiddleware = [thunk];
//   let allComposeElements = [];
//w
//   if(process.browser){
//     if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'){
//       middleware = applyMiddleware(...universalMiddleware);
//       allComposeElements = [
//         middleware,
//         // reduxReactRouter({
//         //   createHistory
//         // })
//       ]
//     }else{
//       middleware = applyMiddleware(...universalMiddleware,createLogger());
//       allComposeElements = [
//         middleware,
//         // reduxReactRouter({
//         //   createHistory
//         // }),
//           createDevTools()
//       ]
//     }
//   }else{
//     middleware = applyMiddleware(...universalMiddleware);
//     allComposeElements = [
//       middleware
//     ]
//   }
//
//   return allComposeElements;
//
// }
//
// const finalCreateStore = compose(...middlewareBuilder())(createStore);


// import DevTools from '../DevTools';



export default function configureStore(preloadedState = {},history) {

    const middleware = routerMiddleware(history)
    var  composeEnhancers =compose;
    if(process.browser&&process.env.NODE_ENV !== 'production'&&window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }else{
        composeEnhancers = compose;
    }
    // = (window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const finalCreateStore = composeEnhancers(
        applyMiddleware(thunk,middleware),
        // DevTools.instrument()
    );

    let store;
    if(process.env.NODE_ENV=="production"){
        store = createStore(
            rootReducer,
            preloadedState,
            finalCreateStore
        )


        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => {
                const nextRootReducer = require('./reducers').default
                store.replaceReducer(nextRootReducer)
            })
        }
    }else{
        store = createStore(
            rootReducer,
            preloadedState,
            finalCreateStore
        )
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers

            module.hot.accept('./reducers', () => {
                const nextRootReducer = require('./reducers').default
                store.replaceReducer(nextRootReducer)
            })
        }
    }


    return store
}




// export default function configureStore(initialState) {
//   const store = finalCreateStore(rootReducer, initialState);
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers').default;
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// }