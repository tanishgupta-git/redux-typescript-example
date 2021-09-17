import React from 'react'
import './Card.css';

interface StudentI {
        name : string,
        id : string
}
type Props = {
  courseName : String,
  students : StudentI[]
}

const Card : React.FC<Props> = ({courseName,students}) => {
    return (
        <div className='card'>
            <h4 >Name</h4>
            <p>{courseName}</p>
            <h4>Students</h4>
            <p>{
                students.map( (student,index) => {      
                return ( 
                 index === students.length - 1
                    ?
                 (<span key={student.id}>{student.name}</span>) 
                    :
                 (<span key={student.id}>{student.name}, </span>)
                )
                })
            }
            </p>
        </div>
    )
}

export default Card
