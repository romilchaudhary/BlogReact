import React, {Component} from "react";

export default class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.name,
            count: this.props.count,
            show: false,
            inputCheckbox:false
        }
    }
    updateData(){
        this.setState({data: "Romil", count:this.state.count+1,show:!this.state.show})
    }
    checkboxChanged(val){
        alert(val.target.checked)
        this.setState({inputCheckbox: val.target.checked});
    }
    render(){
        return(
            <div>
                {
                    this.state.show?<h1>Student Component clicked {this.state.count} times by {this.state.data}</h1>:null
                } 
                <input type="checkbox"  onChange={(val) => this.checkboxChanged(val)}/>               
                <button onClick={() => this.updateData()}>Click Me to show data by {this.state.data}</button>
            </div>            
        )
    }
}