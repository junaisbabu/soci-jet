import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../firebase/firebaseAuth";
import "./loginSignup.css";
import Nav from "./Nav";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErr("");

    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <>
      <Nav />
      <div className="loginSignup-container container">
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="bi bi-key"></i>
          </div>
          <div className="col-lg-12 login-title">LOG IN</div>

          {err && <div className="alert alert-danger">{err}</div>}

          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-control-label">Email</label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control shadow-none"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="col-lg-12 loginbttm">
                  <span className="sign-up-text">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link">
                      Sign up
                    </Link>
                  </span>
                  <button type="submit" className="btn btn-outline">
                    LOG IN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
