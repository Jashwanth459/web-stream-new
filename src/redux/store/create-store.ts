import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { IStore } from '../../helpers/types';
import makeRootReducer from '../reducers/reducers';

// const INITIAL_STATE: IStore = {
//   rawData: [],
//   data: [],
//   loading: false,
//   isLightTheme: true
// }

const store = (initialState = {}) => {
  const middleware = [thunk]
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleware))
  )
  return store;
}

export default store
