import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
 
  return (
    <>
      
      <div className=" box" >
        <div>
        <h1 style={{ textAlign: "center" }}>
          Welcome to User Registration and Login Page
        </h1>
        <div className="row">
          <div className="col-sm-6">
            <div className="card" style={{ backgroundColor: "grey" }} >
              <div className="card-body">
                <h5 className="card-title">First Time Registration</h5>
                <p className="card-text">
                If you are a first time user, please register here!
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => history.push("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card" style={{ backgroundColor: "grey" }}>
              <div className="card-body">
                <h5 className="card-title">Exisiting User Login</h5>
                <p className="card-text">
                    If you are an Exisiting user, please Login here!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={()=> history.push("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div> 
        </div>
      </div>
      
    </>
  );
}
