import { ClassesActionTypes } from './classes.types'
import { ClassesStateT,ClassesActionT } from '../types.define';

const INITIAL_STATE  = {
    classes : [],
    loading : false
}

const classesReducer = (state :ClassesStateT=INITIAL_STATE,action:ClassesActionT) => {
   switch (action.type) {
      case ClassesActionTypes.SET_CLASSES : 
        return {
            ...state,
            classes : action.payload,
            loading : false
        }
      case ClassesActionTypes.SET_LOADING:
          return {
              ...state,
              loading : true
          }
      default:
          return state;
   }
}

export default classesReducer;