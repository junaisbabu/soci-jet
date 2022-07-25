import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../firebase/firebaseAuth';
import './loginSignup.css'

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState();

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setErr('');

        try {
            await logIn(email, password);
            navigate('/')
        }
        catch(err) {
            setErr(err.message);
        }

    }

  return (
    <>
    <div className='loginSignup-container container'>
    <div className="row">
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                <i className="bi bi-key"></i>
                </div>
                <div className="col-lg-12 login-title">
                    LOG IN
                </div>

                {err && <div className='alert alert-danger'>{err}</div>}

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label className="form-control-label">Email</label>
                                <input type="text" className="form-control shadow-none" onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control shadow-none" onChange={(event) => setPassword(event.target.value)} />
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-12 login-btm login-button">
                                    <button type="submit" className="btn btn-outline-primary">LOG IN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
    </div>
    </>
    
  )
}

export default Login