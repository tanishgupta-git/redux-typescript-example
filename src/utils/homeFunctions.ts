import { ClassT } from '../redux/types.define'

export const addStudentDataInClass = (classes : ClassT[],studentObject:any) : ClassT[] => {
    return classes.map( (classItem) => {
        let students = classItem.students.map( student => ({
           id : student.id,
           name : studentObject[student.id]  
        }))
        return ({id : classItem.id,name : classItem.name,students : students})
    } )
}

