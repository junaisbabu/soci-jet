import React, { useEffect, useState } from "react";
import { signUp } from "../../firebase/firebaseAuth";
import "../login & signup/loginSignup.css";
import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { onAuth } from "../../redux/actions/Actions";
import { Link, useNavigate } from "react-router-dom";
import firestoreSevice from "../../firebase/firebaseFirestore";
import { getAuth, updateProfile } from "firebase/auth";
import Nav from "./Nav";

const auth = getAuth();

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    setErr("");

    try {
      await signUp(email, password).then(async (result) => {
        await updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVei_YzwR4hisFo7RAtfoHDZh4QQMd807Zzg1KzhrMMy7p9AQgz04QLMcCW-QEf6JXT8&usqp=CAU",
        });
        let userData = {
          id: result.user.uid,
          name: auth.currentUser.displayName,
          email: email,
          avatar: auth.currentUser.photoURL,
          username: firstName,
          bio: "",
          link: "",
        };

        await firestoreSevice.updateDocument(
          "currentUser",
          "0RPIcmA7A3sF0flPTswX",
          userData
        );
        await firestoreSevice.setDocument("users", result.user.uid, userData);
      });

      navigate("/login");
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
          <div className="col-lg-12 login-title">SIGN UP</div>

          {err && <div className="alert alert-danger">{err}</div>}

          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSignUp}>
                <div className="row">
                  <div class="form-group col-6">
                    <label class="form-control-label">Full Name</label>
                    <input
                      type="text"
                      class="form-control shadow-none"
                      required
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div class="form-group col-6">
                    <label class="form-control-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control shadow-none"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                </div>

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
                  <span>
                    Already having an account?{" "}
                    <Link to="/login" className="link">
                      Sign in
                    </Link>
                  </span>
                  <button type="submit" className="btn btn-outline">
                    SIGN UP
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

export default Signup;
