import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export default function Register(){

    let history = useHistory();
    let [name,setName] = useState('');
    let [username,setUsername] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let handleSubmit = event => {
        event.preventDefault()
        const registered = {
            name,
            username,
            email,
            password
        }
        if(name===""||username===""||email===""||password===""){
          toast("Kindly fill all the fields");
        }else{
        axios.post(`/register`, registered)
        .then(res => console.log(res.data.message))
        toast("User Registered");
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        history.push('/login')
        }
    }
    return<>
    <h1 style={{textAlign: 'center'}}>Sign Up Form</h1>
    <div className="container">
    <form onSubmit={handleSubmit}> 
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Username</label>
    <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1" >Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <div className="btn-group col-md-12">
  <button type="submit" className="btn btn-success col-md-3">Submit</button>
    <div className="col-md-6"></div>
    <button type="button" className="btn btn-primary col-md-3" onClick={()=>history.push('/')}>Back</button>
  </div>
</form>
</div>

    </>
}