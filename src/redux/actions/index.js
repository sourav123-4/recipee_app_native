import rootReducer from '../reducers/index';
import store from '../store';

const {dispatch} = store;
export function getData(data) {
  dispatch(rootReducer(data));
}
