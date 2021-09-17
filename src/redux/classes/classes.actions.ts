import { ClassesActionTypes } from "./classes.types"
import { ClassT,ClassesActionT } from '../types.define';

export const setClasses = (classes : ClassT[]) : ClassesActionT => ({
    type : ClassesActionTypes.SET_CLASSES,
    payload : classes
});

export const setLoading = () : ClassesActionT => ({
    type : ClassesActionTypes.SET_LOADING
})