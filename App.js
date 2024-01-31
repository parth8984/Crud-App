import React, {useEffect, useState} from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData'; 
import { First } from 'react-bootstrap/esm/PageItem';


function App(){
 
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [LastName, setlastName] = useState('')
  const [Age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [ isUpdate, setIsUpdate] = useState(false)


  useEffect(() => {
  setData(EmployeeData) 
  },[]);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined)
    {
  setIsUpdate(true) 
  setId(id);
  setFirstName(dt[0].firstName);
  setlastName(dt[0].LastName);
  setAge(dt[0].Age);
  }

  }

  const handleDelete = (id) => {
   
 if(id>0)
    {
      if(window.confirm("Are you sure to delete this item?"))
      {
        const dt = data.filter(item => item.id !== id);
       setData(dt);
      }
    }
  }
  

  const handleSave = (e) => {
 

let error = '';

    if(firstName === '')
    error += 'first Name is required, '
    if(LastName === '')
    error += 'Last Name is required, '
    if(Age <=0 )
    error += 'Age is required'

  if(error === '') 
  {

     e.preventDefault();
      const dt = [...data];
      const newObject = {
        id :EmployeeData.length +1 ,
        firstName : firstName,
        LastName : LastName,
        Age : Age
      }
      dt.push(newObject);
      setData(dt); 
    }
  else {
    alert(error)
  }
  }
  const handleUpdate = () => {
    const index = data.map((item)=>{
      return item.id
    }).indexOf(id);
    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].LastName= LastName;
    dt[index].Age =Age;
  setData(dt);
  handleClear();
  }

  const handleClear = () => {
    setId(0);
  setFirstName('');
  setlastName('');
  setAge('');
  setIsUpdate(false);
  }

  return(
    
    <div className='App'> 
    
    <div  style={{display: 'flex', justifyContent:'center', marginTop:"10px"}}>
      <div>
        <label>First Name :
          <input type='text' placeholder='Enter First name' onChange= {(e) => setFirstName(e.target.value)} value={firstName}/>
        </label>
      </div>
      <div>
        <label>Last Name :
          <input type='text' placeholder='Enter Last name' onChange={(e) => setlastName(e.target.value)} value={LastName} />
        </label>
      </div>
      <div>
        <label>Age :
          <input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={Age}/>
        </label>
      </div>
      <div> 
        {
          !isUpdate   ?
          <button className='btn btn-primary' onClick= {(e) => handleSave(e)} >Save</button>
          :
          <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
        }
      <button className='btn btn-danger'  onClick={() => handleClear()}>Clear</button>
      </div>
      
    </div>
  <table className='table table-hover'>
    <thead>
      <tr>
        <td>S. No</td>
        <td>Id</td>
        <td>First Name</td>
        <td>LastName</td>
        <td>Age</td>
        <td>Actions</td>
      </tr>
    </thead>
    <tbody>
      
      {
      data.map((item,index)=>{
        return(
          <tr key={index}>
          <td>{index+ 1}</td>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.LastName}</td>
          <td>{item.Age}</td>
          <td>
           <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
           <button className='btn btn-danger'  onClick={() => handleDelete(item.id)}>Delete</button>
           
         </td> </tr>
        
        )
      })
      }
    </tbody>
  </table>
  </div>

  )};
export default App;