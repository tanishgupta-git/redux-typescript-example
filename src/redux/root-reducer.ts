import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import classesReducer from './classes/classes.reducer';

const rootReducer = combineReducers({
    user : userReducer,
    classes : classesReducer
  });

export type StateT = ReturnType<typeof rootReducer>;
export default rootReducer;