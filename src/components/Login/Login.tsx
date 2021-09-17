import React,{ useState } from 'react'
import './Login.css';

type Props = {
    startLogIn : (name:string) => void
}
const Login : React.FC<Props> = ({startLogIn}) =>  {
    const [text,setText] = useState("");

    const handleClick = () : void => {
      startLogIn(text);
    } 

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
    }

    return (
        <div className='loginContainer'>
            <div className='loginContainer__form'>
                <p>Sudent Name : <input value={text} onChange={handleChange}/></p>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Login
