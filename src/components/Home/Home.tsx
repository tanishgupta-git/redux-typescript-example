import React,{useEffect} from 'react'
import Card from '../Card/Card';
import './Home.css';
import axios from 'axios';
import { ClassT,StudentT,ClassesActionT } from '../../redux/types.define';
import { StateT } from '../../redux/root-reducer';
import { connect } from 'react-redux'
import { setClasses,setLoading } from '../../redux/classes/classes.actions'
import { Dispatch } from 'redux'

type Props = {
  classes : ClassT[],
  loading : boolean,
  name : string,
  logOut : () => void,
  setClasses : (classes : ClassT[]) => void,
  setLoading: () => void
}

const Home : React.FC<Props> = ({logOut,name,classes,setClasses,loading,setLoading}) => {

    // add the baseId anf apiKey of your airtable account in the .env file 
    const API_STUDENTS_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_baseId}/Students/`;
    const API_CLASSES_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_baseId}/Classes/`;

    // filtering the table by user name
    const queryFilter = `?filterByFormula={name}="${name}"`;
    const link = `${API_STUDENTS_URL}${queryFilter}`;
    const API_KEY = process.env.REACT_APP_apiKey;

    useEffect( () => {
       
       let controller = new AbortController();

       setLoading();
       const fetchClasses = async () => {

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
          let classesId : string[] = data.records[0].fields.Classes;

          let classes : ClassT[] = [];
          await Promise.all(          
            classesId.map( async (classId : string) => {

            const link2 = `${API_CLASSES_URL}${classId}`;
            // getting the students id's of a class
            const { data } = await axios.get(`${link2}`,headers);
            const className : string = data.fields.Name;
            const studentsId : string[] = data.fields.Students;
            let students : StudentT[] = [];
            
            await Promise.all(
                studentsId.map( async (studentId : string ) => {
                const link3 = `${API_STUDENTS_URL}${studentId}`;
                // getting the name of the student from it's id
                const { data } = await axios.get(`${link3}`,headers);
                const studentName :string = data.fields.Name;
                students.push({id:studentId,name :studentName});
                })
            )

           classes.push({id: classId, name : className, students : students});

         }))
        setClasses(classes)
        } catch (e) {
            console.log(e)
        }

       }
       fetchClasses();
       return () => controller?.abort();
     
    },[name,link,setClasses,setLoading,API_KEY,API_CLASSES_URL,API_STUDENTS_URL])

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