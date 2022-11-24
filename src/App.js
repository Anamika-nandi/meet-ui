import React, { useState } from 'react';
import './App.css';
import { ClockCircleFilled, CalendarTwoTone, GlobalOutlined, CloseOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import validator from "validator";
import { Button, Modal} from 'antd';

function App() {
  const [name, setName] = useState("");
  const [emails, setEmails] = useState([""]);
  const [extraInfo, setExtraInfo] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailErros, setEmailErrors] = useState([""]);
  const [isAlert, setIsAlert] = useState(false)
  const handleAdd=()=>{
    setEmails([...emails,""]);
    setEmailErrors([...emailErros,""])
  }
  const handleEmailRemove=(i)=>{
    const list = emails
    list.splice(i,1)
    setEmails([...list])
    const errList = emailErros
    errList.splice(i,1);
    setEmailErrors([...errList])
  }

  const handleEmailChange=(e, index)=>{
    const list = emails
    list[index] = e.target.value
    setEmails([...list])
  }
const resetErrors=()=>{
    setIsAlert(false)
    setNameError("")
    let errArr = []
    for(let i=0; i<emailErros.length;i++){
      errArr = [...errArr,""]
    }
    setEmailErrors([...errArr])
}
  const handleSubmit=(e)=>{
    e.preventDefault()
    resetErrors()
    let isError = false;
    if(name.trim()===""){
      isError = true
      setNameError("Name can not be empty")
    }
    for(let i=0;i<emails.length;i++){
      let email = emails[i]
      if(email.trim()===""){
        isError = true
        const errors = emailErros
        errors[i] = "Email can not be empty"
        setEmailErrors([...errors])
      }
      else if(!validator.isEmail(email)){
        isError = true
        const errors = emailErros
        errors[i] = "Invalid email"
        setEmailErrors([...errors])
      }
    }
    if(isError){
      setIsAlert(true)
    }else{
      onSuccess()
    }
  }

  const onSuccess = () => {
    Modal.success({
      title: "Here's the information received from you: ",
      content: (
        <div>
          <p><span style={{"fontWeight":"600"}}>Name:</span> {name}</p>
          <p  style={{"fontWeight":"600"}}>Guests:</p>
           {emails.map((email)=>
            <p class="pl-2">{email}</p>
           )}
           {(extraInfo.trim()!=="")&&
           <>
            <p  style={{"fontWeight":"600"}}> About meeting:</p>
            <p>{extraInfo}</p>
           </>}
        </div>
      ),
    });
  };

  return (

    <div class="container root">
       {isAlert && <Alert message="Kindly resolve the errors to proceed" type="error" closable onClose={()=>{setIsAlert(false)}}/>}
      <div class='wrapper'>
     
        <div class='box-1'>
          <p class="txt-meet-details" style={{'marginBottom':'0px'}}>Gaurav Garg</p>
          <p class="text-min-left">15 Minute Meeting</p>
          <div class="time-wrapper"><ClockCircleFilled style={{"fontSize":'14px', 'color':'#6e6e6e', 'marginRight':'5px'}}/>
            <span class="txt-meet-details">15 min</span>
          </div>
          <div class="time-wrapper"><CalendarTwoTone style={{"fontSize":'14px', 'marginRight':'5px', 'alignSelf':'flex-start', 'marginTop':'4px'}} twoToneColor="#6e6e6e"/>
            <span class="txt-meet-details">9:30am - 9:45am, Friday, September 16, 2022</span>
          </div>
          <div class="time-wrapper"><GlobalOutlined style={{"fontSize":'14px', 'color':'#6e6e6e', 'marginRight':'5px'}}/>
            <span class="txt-meet-details">India Standard Time</span>
          </div>
        </div>
        <div class='box-2'>
          <span style={{'fontWeight':'800', color:"#4d4e52"}}>Enter Details</span>
        <form onSubmit={handleSubmit}>
          <div class="form-group mt-2">
            <label for="inputName">Name*</label>
            <input type="text" class="form-control mt-1" id="inputName" value={name} placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>
            {(nameError!=="")&&<small class="form-text text-error">{nameError}</small>}
          </div>

          <div class="form-group">
            <label class="mt-2">Email*</label>
          {emails.map((email,i)=><>
            <div class="time-wrapper">
              <input type="text" class="form-control" placeholder="Enter email" value={email} onChange={(e)=>{handleEmailChange(e,i)}}/>
            {(i>0)&&<CloseOutlined style={{"fontSize":'14px', 'color':'#e02828', 'marginLeft':'5px', 'cursor':"pointer"}} onClick={()=>{handleEmailRemove(i)}}/>}
            </div>
            {(emailErros[i]!=="")&&<small class="form-text text-error">{emailErros[i]}</small>}
          </>)}
          </div>

          <button type='button' class='btn btn-add mt-2' onClick={handleAdd}>Add Guests</button>

          <div class="form-group mt-1">
            <label for="inputTextarea">Please share anything that will help prepare for our meeting.</label>
            <textarea class="form-control mt-1" id="inputTextarea" value={extraInfo} rows="3" onChange={(e)=>{setExtraInfo(e.target.value)}}></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-5 btn-se" >Schedule Event</button>
        </form>
        </div>
      </div>

    </div>
  );
}

export default App;
