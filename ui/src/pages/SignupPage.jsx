import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_USER } from "../mutations/userMutations";
import { useMutation } from "@apollo/client";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupUser] = useMutation(SIGNUP_USER, {
    variables: { name, email, password },
    onCompleted: ({ signupUser }) => {
      signupUser.authenticated = true;
      dispatch(setUser(signupUser));
      navigate("/");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      return alert("Please fill out all the fields.");
    }

    signupUser(name, email, password);
  };

  return (
    <div className="container main d-flex flex-wrap justify-content-center py-3">
      <div className="row my-5">
        <div className="col-12 text-center">
          <h2 className="fw-lighter">Signup</h2>

          <form onSubmit={onSubmit} className="login-form mt-3">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Fullname"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>
              I have a license/permit & I read the{" "}
              <a href="#" className="text-decoration-none">
                Terms and Conditions
              </a>
              .
            </p>
            <p>
              Have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
              .
            </p>

            <button type="submit" className="btn pink-btn w-25 mt-2">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
