import { UserActionTypes } from "./user.types";
import { UserStateT,UserAuthActionT } from '../types.define'


const INITIAL_STATE : UserStateT = {
    name : "",
}

const userReducer = (state:UserStateT=INITIAL_STATE,action: UserAuthActionT) => {
   switch(action.type) {
      case UserActionTypes.LOGIN:
          return {
              ...state,  
              name : action.payload
          }
      case UserActionTypes.LOGOUT:
          return {
          ...state,
          name : ""
      }
      default:
          return state;
   }
}

export default userReducer;