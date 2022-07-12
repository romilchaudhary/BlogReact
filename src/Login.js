import React, { Component } from 'react';


import validator from 'validator';
const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};
 
const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};
 
export default class Login extends Component {
    render() {
        return <form>
            <h3>Login</h3>
            <div>
                <label>
                    Email*
                    <input name='email' validations={[required, email]}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <input type='password' name='password' validations={[required]}/>
                </label>
            </div>
            <div>
                {/* <Button>Submit</Button> */}
            </div>
        </form>;
    }
}