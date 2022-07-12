import React, {useState} from "react";
export function User(props){
    return(
        <div>
            <h1>User Component</h1>
            <h1>Romil</h1>
            <h2>Email: {props.email}</h2>
            <h3>Roll: {props.roll}</h3>
            <h4>Age: {props.other.age}</h4>
            <h5>Last: {props.other.last}</h5>
        </div>        
    )
}

export function Name(){
    let data = "Romil"
    function test(){
        data = "Chinku";
        alert(data);
    }
    const [update, setUpdate] = useState(0);
    const [myName, setMyName] = useState("Kaanha");
    function updateData(){
        setUpdate(update+1);
        setMyName("Shreyansh Chaudhary");
    }
    return(
        <div>
            <h2>My Name Is {data}</h2>
            <button onClick={() => test()}>Click Me</button>
            <p>updated {update} times by {myName}</p>
            <button onClick={updateData}>Update</button>
        </div>        
    )
}
