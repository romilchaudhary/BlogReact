import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ToastContainer} from 'react-toastify';
import {User, Name} from './components/User';
import TestData from './components/TestData';
import CustomForm from './components/CustomForm';

function App() {
  const [age, setAge] = useState(27)
  function UpdateAge(){
    setAge(age+1)
  }
  function Nested()
  {
    return(
      <h1>Nested Function</h1>
    )
  }
  return (
    <div className="App">
      <div>Hello World</div>
      <User email="romil.roar2@gmail.com" roll="23" other={{age:age, last:"kumar"}}/>
      <button onClick={()=>UpdateAge()}>Update Age</button>
      <Name></Name>
      <Same />
      {Nested()}
      <TestData />
      <CustomForm />
      <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div> 
    </div>
    
  );
}

function Same(){
  return(
    <h1>Same Component</h1>
  )
}

export default App;
