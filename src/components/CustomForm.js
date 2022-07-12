import React, {useState} from "react";
function CustomForm(){
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [tnc, setTnc] = useState(false);

    function SubmitForm(e){ 
        e.preventDefault();
        console.log(name, sex, tnc)
    }
    function clearData(e){
        e.preventDefault();
        setName("");
        setSex("");
        setTnc(false);
    }

    return(
        <div className="customForm">
            <form className="MyForm" onSubmit={(e) => SubmitForm(e)}>                
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/><br/><br/>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br/><br/>
                <input type="checkbox" checked={tnc} value={tnc} onChange={(e) => setTnc(e.target.checked)}/><span>Term and conditions</span><br/><br/>
                <button type="submit">Calculate</button>
                <button onClick={clearData}>Clear</button>
            </form>
        </div>
    )
}

export default CustomForm;