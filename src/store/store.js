import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }

//     console.log('type: ', action.type);
//     console.log('payload: ', action.payload);
//     console.log('currentState: ', store.getState());

//     next(action);

//     console.log('next state: ', store.getState());
// };

const initialState = {};

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, initialState, composedEnhancers);

// export const store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...middlewares),
//         (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
//             compose
//     )
// );
