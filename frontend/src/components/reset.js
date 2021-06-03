import axios from "axios"
import { useState } from "react"

export default function Reset(props){
   
    let token = props.match.params.token
    let [password, setnewPassword] = useState('')
    let resetPassword = event =>{
        event.preventDefault()
        const newPassword = { password, token }
        axios.post(`/resetpassword`,newPassword)
        .then(res=>{console.log(res.data.message)})
    }
    return<>
    <h1 style={{textAlign: 'center'}}>Reset Password</h1>
    <div className="container">
    <form onSubmit={resetPassword}>    
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Enter your new password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setnewPassword(e.target.value)} required/>
    </div>
    <button type="submit" className="btn btn-primary col-md-3">Submit</button>
    </form>
    </div>
    </>
}