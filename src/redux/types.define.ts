import { UserActionTypes } from "./user/user.types";
import { ClassesActionTypes } from './classes/classes.types'

// defining types for user
export type UserStateT = {
    name : string
}

export type UserLoginActionT = {
  type : UserActionTypes.LOGIN,
  payload : string
}

export type UserLogoutActionT = {
    type : UserActionTypes.LOGOUT
}

export type UserAuthActionT = UserLoginActionT | UserLogoutActionT;

// defining types for classes
export type StudentT = {
  id : string,
  name : string
}
export type ClassT = {
  id : string,
  name : string,
  students : StudentT[]
}

export type ClassesStateT = {
  classes : ClassT[],
  loading : boolean
}

export type SetClassesActionT = {
  type : ClassesActionTypes.SET_CLASSES,
  payload : ClassT[]
}

export type LoadingActionT = {
  type : ClassesActionTypes.SET_LOADING
}

export type ClassesActionT = SetClassesActionT | LoadingActionT; 