import { UserActionTypes } from './user.types';
import { UserLogoutActionT,UserLoginActionT } from '../types.define'

export const startLogIn = (name :string) : UserLoginActionT => ({
   type : UserActionTypes.LOGIN,
   payload : name
})

export const logOut = () : UserLogoutActionT  => ({
    type : UserActionTypes.LOGOUT
})