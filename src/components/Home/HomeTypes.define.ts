import { ClassT } from '../../redux/types.define';

export type PropsT = {
    classes : ClassT[],
    loading : boolean,
    name : string,
    logOut : () => void,
    setClasses : (classes : ClassT[]) => void,
    setLoading: () => void
  }

export type APiClassDataT = {
    id : string,
    fields : {
        Name : string,
        Students : string[]
    }
}

export type ApiStudentDataT = {
    id : string,
    fields : {
        Name : string
    }
}