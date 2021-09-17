import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { connect } from 'react-redux'
import Login from './components/Login/Login';
import { startLogIn,logOut } from './redux/user/user.actions'
import { UserAuthActionT } from './redux/types.define';
import { StateT } from './redux/root-reducer'
import { Dispatch } from 'redux'



type Props = {
  name : string,
  startLogIn : (name:string) => void,
  logOut : () => void
}

const App:React.FC<Props> = ({name,startLogIn,logOut})  => {
  return (
    <div className="App">
      {
        name 
         ?
         <Home logOut={logOut} name={name}/>
         :
         <Login startLogIn={startLogIn}/>
      }
    </div>
  );
}

const mapStateToProps = (state:StateT) => ({
  name : state.user.name
})

const mapDispatchToProps = (dispatch:Dispatch<UserAuthActionT>) => ({
 startLogIn : (name:string) => dispatch(startLogIn(name)),
 logOut : () => dispatch(logOut())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);