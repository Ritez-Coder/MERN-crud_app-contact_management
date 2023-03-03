import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function CreateContact({ todos, setTodo }) {
     const navigate = useNavigate();
     const [isSuccess, setIsSuccess] = useState(false);
     const [name, setName] = useState("");
     const [isNameValid, setIsNameValid] = useState(true);
     const [phone, setPhone] = useState("");
     const [isPhoneValid, setIsPhoneValid] = useState(true);
     const [label, setLabel] = useState("Work");

     const addContact = async (contact) => {
          await axios.post("http://127.0.0.1:8080/contacts", contact)
          const res = await axios.get("http://127.0.0.1:8080/contacts/")
          setTodo(res.data);
     }

     useEffect(() => {
          setTimeout(() => {
               setIsSuccess(false)
          }, 3000)
     }, [isSuccess])

     const handleSubmit = (e) => {
          e.preventDefault();
          addContact({ name, phone, label })
          setLabel("")
          setName("")
          setPhone("")
          setIsSuccess(true)
          setTimeout(() => {
               navigate('/')
          }, 2000);
     }
     const handleNameChange = (e) => {
          setName(state => {
               return e.target.value
          })
          if (name.length > 5) {
               setIsNameValid(true)
          } else {
               setIsNameValid(false)
          }
     }

     const handlePhoneChange = (e) => {
          setPhone(state => e.target.value);
          phone.length >= 10 ? setIsPhoneValid(true) : setIsPhoneValid(false);
     }

     const handleLabelChange = (e) => {
          setLabel(state => e.target.value)
     }
     // console.log(label)
     return (
          <div className='form-div'>
               <div className='popup'>
                    {
                         isSuccess ? <p>Submitted Successfully !</p> : ""
                    }
               </div>
               <form onSubmit={handleSubmit} >
                    <h2 className='form-h'>Create New Contact</h2>
                    <div className='form-group'>
                         <label htmlFor="name">Name</label>
                         <br />
                         <input autoComplete='off' onChange={handleNameChange} value={name} type="text" id='name' placeholder='Enter a name' />
                         {
                              isNameValid ? "" : <small>name should be of more than 5 chars.</small>
                         }
                    </div>
                    <div className='form-group'>
                         <label htmlFor="phone">Phone</label>
                         <br />
                         <input autoComplete='off' onChange={handlePhoneChange} value={phone} type="text" id='phone' placeholder='00000 00000' />
                         {
                              !isPhoneValid ? <small>Enter a valid phone number</small> : ""
                         }
                    </div>
                    <div className='form-group'>
                         <input onChange={handleLabelChange} type="radio" id="friend" name="label" value="Friend" />
                         <label htmlFor="friend">Friend</label>
                         <input onChange={handleLabelChange} type="radio" id="work" name="label" value="Work" />
                         <label htmlFor="work">Work</label>
                         <input onChange={handleLabelChange} type="radio" id="family" name="label" value="Family" />
                         <label htmlFor="family">Family</label>
                    </div>

                    <div className='form-group'>
                         <button className='btn' type='submit'>Create Contact</button>
                    </div>
               </form>

          </div>
     )
}

export default CreateContact
