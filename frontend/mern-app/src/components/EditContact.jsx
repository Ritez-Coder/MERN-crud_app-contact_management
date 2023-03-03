import React, { useEffect, useState } from 'react'
import axios from 'axios'

function EditContact({ isEdit, setIsEdit, todos, setTodo, editId }) {
     // console.log(todos)
     const [editItems, setEditItems] = useState({})
     const filterEditItems = () => {
          const filtered = todos.find(el => {
               return el._id === editId;
          })
          setEditItems(filtered);
     }
     useEffect(() => {
          filterEditItems();
     }, [])
     const { name, phone, label } = editItems

     const updateContact = async () => {
          await axios.patch(`http://127.0.0.1:8080/contacts/${editId}`, { name, phone, label })
          const res = await axios.get("http://127.0.0.1:8080/contacts/")
          setTodo(res.data);
     }

     return (
          <div className='edit-page'>
               <div>
                    <h3>Edit Contact</h3>
               </div>
               <div className="form-group">
                    <input type="text" placeholder='Edit name' onChange={(e) => {
                         setEditItems(state => {
                              return {
                                   ...state, name: e.target.value
                              }
                         })
                    }} value={name} />
               </div>
               <div className="form-group">
                    <input type="text" placeholder='Edit phone' value={phone} onChange={(e) => {
                         setEditItems(state => {
                              return { ...state, phone: e.target.value }
                         })
                    }} />
               </div>
               <div className="form-group">
                    <input onChange={(e) => {
                         setEditItems(state => {
                              return { ...state, label: e.target.value }
                         })
                    }} type="radio" name="label" value={"Friend"} id="friend" />
                    <label htmlFor="friend">Friend</label>
                    <input onChange={(e) => {
                         setEditItems(state => {
                              return { ...state, label: e.target.value }
                         })
                    }} type="radio" name="label" value={"Work"} id="work" />
                    <label htmlFor="work">Work</label>
                    <input onChange={(e) => {
                         setEditItems(state => {
                              return { ...state, label: e.target.value }
                         })
                    }} type="radio" name="label" value={"Home"} id="home" />
                    <label htmlFor="home">Home</label>
               </div>

               <div>
                    <button onClick={() => {
                         setIsEdit(false)
                         updateContact()
                         console.log(editItems)

                    }} className='btn' >Submit</button>

                    <button className='btn' onClick={() => {
                         setIsEdit(false);
                    }}>Cancel</button>
               </div>

          </div>
     )
}

export default EditContact
