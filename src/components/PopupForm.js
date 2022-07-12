import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState, Component } from "react";
import './PopupForm.css';
import { Button, Alert, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import {isLoggedIn, deleteTokens} from './auth.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const logout = () => {
    deleteTokens();   
    window.location.replace("/") 
    toast.success('Successfully Logged Out.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });    
  };
const Home = ()=> <div><h3>Hi, {localStorage.getItem("email")}<button onClickCapture={logout}> logout</button></h3></div>;


function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <FormLabel>{label}</FormLabel>
        <FormControl {...props} />
        {help && <Alert>{help}</Alert>}
      </FormGroup>
    );
  }

  export default class PopupForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          email:"",
          password:"",
          csrf: ""
        }
        fetch("http://localhost:5000/auth/signin_csrf", {
            method: 'GET',
        }).then( res => res.json())
        .then(data=>{
            this.setState({
                csrf: data.token
            })                        
        });
    
    }
    
    handleChange=event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleRegistration = e =>{
        e.preventDefault() ;
        let url = "http://localhost:5000/auth/register"
        let formData  = new FormData();
        let data = this.state;
        for(let name in data) {
            formData.append(name, data[name]);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "IjZhNTVmYWE0Yjc1YWJiMjc2MmI2ZThhMTAyODk0NTMwZmRiZmRkZTYi.YrSDqg.3Kg4WI3vlYypKVdMHNum8aSELQk"
              },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "csrf_token": "IjZhNTVmYWE0Yjc1YWJiMjc2MmI2ZThhMTAyODk0NTMwZmRiZmRkZTYi.YrSDqg.3Kg4WI3vlYypKVdMHNum8aSELQk"
            })
        }).then( res => res.json())
        .then(data=>{
            localStorage.setItem('access_token', data.access_token);
            
            localStorage.setItem('email', data.email);

            if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
                window.location.replace("/")
            }else{
                alert(data.error)
            }
        }).catch(err => console.log(err));
    }
    
    handleSignIn = e =>{
        e.preventDefault() ;
        let url = "http://localhost:5000/auth/login"
        let formData  = new FormData();
        let data = this.state;
        for(let name in data) {
            formData.append(name, data[name]);
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.getElementById("csrf-token").getAttribute("content")
              },
            credentials: "same-origin",
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "csrf_token": document.getElementById("csrf-token").getAttribute("content")
            })
        }).then( res => res.json())
        .then(data=>{
            localStorage.setItem('access_token', data.access_token);
            
            localStorage.setItem('email', data.email);

            if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
            window.location.replace("/")
            toast.success('Successfully Logged In.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }else{
                alert(data.error);
            }
        }).catch(err => console.log(err));
    }    
    render(){
        if (!isLoggedIn()){
            return (            
                <Popup
                    trigger={<button className="button"> Login </button>}
                    modal
                    nested
                >
                    {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className="header">
                            <h1>Login</h1>
                        </div>
                        <div className="content">
                            <div className="LoginForm">
                                <form>
                                <meta  id="csrf-token" content={this.state.csrf}></meta>
                                <FieldGroup
                                    id="formControlsEmail"
                                    type="email"
                                    name="email"
                                    label="Email address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Enter email"
                                />
                                <FieldGroup 
                                id="formControlsPassword" 
                                type="password"
                                name="password"
                                label="Password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password"
                                help="Password length should be atleast 8 characters long." />

                                <Button  onClick={this.handleSignIn}>Log in</Button>
                                <Button onClick={this.handleRegistration}  className="pull-right"> Register</Button>
                                </form>
                            </div>
                        </div>        
                    </div>
                    )}
                </Popup>
            )
        }
        else{
            return <Home />
        }        
    }     
}
