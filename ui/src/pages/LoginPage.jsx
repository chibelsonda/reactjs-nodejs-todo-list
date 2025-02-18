import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../mutations/userMutations";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: { email, password },
    onCompleted: ({ loginUser }) => {
      loginUser.authenticated = true;

      dispatch(setUser(loginUser));

      navigate("/");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("Please fill out all the fields.");
    }

    loginUser(email, password);
  };

  return (
    <div className="container main d-flex flex-wrap justify-content-center py-3">
      <div className="row my-5">
        <div className="col-12 text-center">
          <h2 className="fw-lighter">Log In</h2>

          <form onSubmit={onSubmit} className="login-form mt-3">
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
              Forgot your password?{" "}
              <Link to="/forgot-password" className="text-decoration-none">
                Click here
              </Link>
              .
            </p>
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Sign up
              </Link>
              .
            </p>

            <button type="submit" className="btn pink-btn w-25 mt-2">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
