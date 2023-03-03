import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditContact from './EditContact'


function Contacts({ todos, setTodo }) {
     // console.log(todos)
     const [isEdit, setIsEdit] = useState(true);
     const [editId, setEditId] = useState();
     const [isDel, setIsDel] = useState(false);
     const [delId, setDelId] = useState();
     useEffect(() => {
          setIsEdit(false)
     }, [])
     return (
          isEdit ? <EditContact editId={editId} setEditId={setEditId} isEdit={isEdit} setTodo={setTodo} todos={todos} setIsEdit={setIsEdit} />
               :
               isDel ? <DelContact setIsDel={setIsDel} delId={delId} setDelId={setDelId} setTodo={setTodo} /> :
                    <div className='todos-div'>
                         <table>
                              <thead>
                                   <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Label</th>
                                        <th>Action</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        todos.map((val, ind) => {
                                             return <Todo setDelId={setDelId} key={ind.toString()} setIsDel={setIsDel} setEditId={setEditId} editId={editId} setIsEdit={setIsEdit} setTodo={setTodo} todo={val} />
                                        })
                                   }
                              </tbody>
                         </table>

                    </div>
     )
}

const Todo = ({ todo, setTodo, setIsEdit, setEditId, setIsDel, setDelId }) => {



     return <tr>
          <td>{todo.name}</td>
          <td>{todo.phone}</td>
          <td>{todo.label}</td>
          <td className='action-btns'>
               <button onClick={() => {
                    // deleteContact(todo._id)
                    setIsDel(true);
                    setDelId(todo._id);
               }} className='del-btn' >Del</button>
               <button onClick={() => {
                    setIsEdit(true)
                    setEditId(todo._id)
               }} className='edit-btn'>Edit</button>
          </td>
     </tr>
}

export default Contacts

const DelContact = ({ setTodo, delId, setDelId, setIsDel }) => {

     const deleteContact = async (id) => {
          await axios.delete(`http://127.0.0.1:8080/contacts/${id}`)
          setTodo((state => {
               const filterData = state.filter((el, ind) => {
                    return el._id !== id;
               })
               return filterData;
          }))
     }



     return <div className='del-page'>
          <p style={{ fontSize: "2rem" }}>Are You Sure Want to Delete !</p>

          <div className='btn-grp'>
               <button onClick={() => {
                    deleteContact(delId);
                    setDelId();
                    setIsDel(false)
               }} className='conf-del' >Yes Delete !</button>
               <button onClick={() => {
                    setIsDel(false)
                    setDelId()
               }} className='cancel-del' >Cancel</button>
          </div>
     </div>
}