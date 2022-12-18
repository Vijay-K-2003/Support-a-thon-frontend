import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { useAuthContext } from "../../context/AuthProvider";
import "./Login.scss";

const Login = () => {
  const { setAuth } = useAuthContext;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent reloading
    try {
      const response = await axios.post(
        "https://0867-2405-201-2010-5080-714f-def4-fb26-d729.in.ngrok.io/api/authenticate",
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //   console.log(JSON.stringify(response));

      setAuth({ email, pwd });
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  const togglePassword = (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordButton.textContent = "Hide password";
      togglePasswordButton.setAttribute("aria-label", "Hide password.");
    } else {
      passwordInput.type = "password";
      togglePasswordButton.textContent = "Show password";
      togglePasswordButton.setAttribute(
        "aria-label",
        "Show password as plain text. " +
          "Warning: this will display your password on the screen."
      );
    }
  };

  return (
    <main className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <div className="password_header">
          <label htmlFor="password">Password:</label>
          <button
            id="toggle-password"
            type="button"
            aria-label="Show password as plain text. Warning: this will display your password on the screen."
            onClick={togglePassword}
          >
            Show password
          </button>
        </div>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <button>Sign In</button>
      </form>
      <p>
        Need an Account? <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </main>
  );
};

export default Login;
