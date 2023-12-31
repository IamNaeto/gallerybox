import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye,  AiOutlineEyeInvisible } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #fff;
  margin-bottom: 1rem;
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
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #ff5722;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const LinkText = styled.p`
  margin-right: 0.5rem;
  font-weight: bold;
`;

const LoginLink = styled(Link)`
  color: #ff5722;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #ff5722;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleRegistration = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill in your email and password to continue!")
      return;
    }


  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Account created successfully")
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log("Registration error:", error);
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid Email format");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters");
        } else if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use");
        } else {
          toast.error("Authentication failed");
          return;
        }
      });
  };

  return (
    <SignupContainer>
      <ToastContainer/>
        <h2>Sign Up</h2>
      <SignupForm onSubmit={handleRegistration}>
      <p style={{marginBottom: '10px'}}>Sign up for an account today. It's cost-free and can be completed in just a few minutes.</p>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordFieldContainer>
        <InputField
          type={showPassword ? "true ": "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordToggleContainer onClick={handlePasswordToggle}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </PasswordToggleContainer>
          </PasswordFieldContainer>
        <SubmitButton type="submit">Register Now</SubmitButton>
      </SignupForm>
      <LinkContainer>
        <LinkText>Already have an account?</LinkText>
        <LoginLink to="/login">Log in</LoginLink>
      </LinkContainer>
    </SignupContainer>
  );
};

export default Signup;

