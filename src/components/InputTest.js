import React, {useState} from "react";

function InputTest(){
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    function getData(val){
        setData(val.target.value)
        setShow(false);
    }
    function print(){
        setShow(true)
    }
    return(
        <div>
            {
            show ? 
            <h1>{data}</h1>: 
            null
            }
            <input type="text" onChange={(val) => getData(val)}/>
            <button onClick={() => print()}>Print</button>
        </div>
    )
    
}

export default InputTest;