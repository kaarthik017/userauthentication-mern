import axios from "axios";
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom"
toast.configure();
export default function Login(){
   
    let history = useHistory();
    let [password,setPassword] = useState('');
    let [email,setEmail] = useState('');
    let login = event =>{
        event.preventDefault();
        const loginDetails ={
            email,
            password
        }
        axios.post(`/login`,loginDetails)
        .then(res =>{ if(res.data.message === "Login Successful"){
            history.push('/dashboard')
        }
        else if(res.data.message==="Invalid Credentials"){
            toast("Your email or password is incorrect");
        }
    })
        setEmail('')
        setPassword('')
    }
    let forgotPassword = event =>{
        const emailDetails = { email}
        event.preventDefault();
        axios.post(`/forgotpassword`,emailDetails)
        .then(res=>{
            if(res.data.message==="User not found"){
                toast("Enter Valid Email address");
            }else{
                toast(res.data.message)
            }})
    }
    return<>
    <h1 style={{textAlign: 'center'}}>Login Form</h1>
    <div className="container">
    <form onSubmit={login}>    
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
    <small id="emailHelp" className="form-text text-muted" style={{color : 'white'}}>We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <div className="btn-group col-md-12">
    <button type="submit" className="btn btn-success col-md-3">Submit</button>
    <div className="col-md-3"></div>
    <button type="button" className="btn btn-warning col-md-3" onClick={forgotPassword}>Forgot Password</button>
    <div className="col-md-3"></div>
    <button type="button" className="btn btn-primary col-md-3" onClick={()=>history.push('/')}>Back</button>
    </div>
</form>
</div>
    </>
}