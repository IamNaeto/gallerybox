import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { AiOutlineEye,  AiOutlineEyeInvisible } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: #ff5722;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #ff5722;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const RegistrationText = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const RegisterLink = styled(Link)`
  color: #ff5722;
  text-decoration: none;
  font-weight: bold;
`;

const PasswordFieldContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
position: relative;
`;

const PasswordToggleContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1rem;
  color: #333;
`;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!")
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Login Successful")
        setTimeout(() => {
          navigate("/gallery");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password")
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid Email format");
        } else if (error.code === "auth/invalid-login-credentials") {
          toast.error("Invalid login credentials, register");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too-many-requests, try in the next 2mins");
        } else {
          toast.error("Authentication failed");
          return;
        }
      });
  };

  return (
    <LoginPageContainer>
    <ToastContainer/>
    <h2>Login</h2>
    <LoginForm onSubmit={handleLogin}>
      <p style={{ marginBottom: "10px" }}>
        If you are already signed up, easily log in
      </p>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordFieldContainer>
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggleContainer onClick={handlePasswordToggle}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </PasswordToggleContainer>
        </PasswordFieldContainer>

        <LoginButton type="submit">Log In</LoginButton>
      </LoginForm>

    <RegistrationText>
      Don't have an account?{" "}
      <RegisterLink to="/signup">Register</RegisterLink>
    </RegistrationText>
  </LoginPageContainer>
);
};

export default Login;