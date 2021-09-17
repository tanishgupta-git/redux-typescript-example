import React,{useEffect} from 'react'
import Card from '../Card/Card';
import './Home.css';
import axios from 'axios';
import { ClassT,ClassesActionT } from '../../redux/types.define';
import { StateT } from '../../redux/root-reducer';
import { connect } from 'react-redux'
import { setClasses,setLoading } from '../../redux/classes/classes.actions'
import { Dispatch } from 'redux'
import { APiClassDataT,ApiStudentDataT,PropsT } from './HomeTypes.define'
import { addStudentDataInClass } from '../../utils/homeFunctions';

const Home : React.FC<PropsT> = ({logOut,name,classes,setClasses,loading,setLoading}) => {

    // add the baseId anf apiKey of your airtable account in the .env file 
    const API_STUDENTS_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_baseId}/Students/`;
    const API_CLASSES_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_baseId}/Classes/`;
    const API_KEY = process.env.REACT_APP_apiKey;

    useEffect( () => {
       setLoading();
       const fetchClasses = async () => {
    // filtering the table by user name
        const queryFilter = `?filterByFormula={name}="${name}"`;
        const link = `${API_STUDENTS_URL}${queryFilter}`;
        const headers = {
            headers : {
                Authorization : `Bearer ${API_KEY}`
            }
        }

        try {
          // getting the classes data of login user
          const { data } = await axios.get(`${link}`,headers); 
          if( !data.records.length) {
            setClasses([]);
          }
          const classesId : string[] = data.records[0].fields.Classes;
          let classes : ClassT[] = [];
          // querying the classes data realted to the user
          const classqueryFilter = "?filterByFormula=OR(" + classesId.map(id => { return `RECORD_ID()="${id}"` }).join(",") + ")";
          const { data:classesData } = await axios.get(`${API_CLASSES_URL}${classqueryFilter}`,headers);
          const studentObject : any = {}

          // adding the data in class array and formation of studentObject
          classesData.records.forEach( (classData:APiClassDataT) => {
            classes.push({id: classData.id,name : classData.fields.Name, students : classData.fields.Students.map(student => ({id:student,name:""}) )});
             classData.fields.Students.forEach( student => {
                  studentObject[student] = "";
             })
          })

          // querying the students data related to the classes
          const studentqueryFilter =  "?filterByFormula=OR(" + Object.keys(studentObject).map(id => { return `RECORD_ID()="${id}"` }).join(",") + ")";
          const {data:studentsData} = await axios.get(`${API_STUDENTS_URL}${studentqueryFilter}`,headers);
          studentsData.records.forEach( (studentData : ApiStudentDataT) => {
              studentObject[studentData.id]  = studentData.fields.Name;
          })
         classes  = addStudentDataInClass(classes,studentObject);
        setClasses(classes)
        }
         catch (e) {
            console.log(e)
        }

       }
       fetchClasses();
     
    },[name,setClasses,setLoading,API_KEY,API_CLASSES_URL,API_STUDENTS_URL])

    const handleClick = () : void => {
        logOut();
        setClasses([]);
    }

    return (
        <div className='home'>
            <div className='home__header'>
                <button onClick={handleClick}>Logout</button>
            </div>
        
           {
               loading ?
               <h2>Loading ...</h2>
                :
                <div className='home__cardscontainer'>
                    {
                        classes.map( (item : ClassT) => (
                            <Card key={item.id} courseName={item.name} students={item.students}/>
                        ))
                    }
               </div>
           }
        </div>
    )
}

const mapStateToProps = (state:StateT) => ({
    classes : state.classes.classes,
    loading : state.classes.loading
})
  
const mapDispatchToProps = (dispatch:Dispatch<ClassesActionT>) => ({
   setClasses : (classes:ClassT[]) => dispatch(setClasses(classes)),
   setLoading : () => dispatch(setLoading())
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);