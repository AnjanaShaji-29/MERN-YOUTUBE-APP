import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    color: ${({ theme }) => theme.soft};
`;

const Links = styled.div`
    margin-left: 30px;
`;

const Link = styled.span`
    margin-left: 20px;
`;

const SignIn = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch(); // For calling actions 

    const handleLogin = async (e) => {
        e.preventDefault(); // Preventing the page reload on button submit
        dispatch(loginStart()); // Calling loginStart

        try{
            const res = await axios.post("auth/signin", {name, password}); // Sending the name & password for signin
            console.log(res.data); 
            dispatch(loginSuccess(res.data)); // Calling loginSuccess if fetch successfull
        } catch(err){
            dispatch(loginFailure()); // Calling loginFailure if fetch not successfull
        }

    }

  return (
    <Container>
        <Wrapper> 
        <Title> Sign in </Title>
        <SubTitle> to continue to Youtube </SubTitle>
        <Input placeholder='username' onChange={(e)=> setName(e.target.value)}  />
        <Input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)}  />
        <Button onClick={handleLogin}> Sign in </Button>
        <Title> Sign up </Title>
        <Input placeholder='username' onChange={(e)=> setName(e.target.value)} />
        <Input placeholder='email' onChange={(e)=> setEmail(e.target.value)} />
        <Input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} />  
        <Button>Sign up</Button>
        </Wrapper>
        <More> 
            English(USA)
            <Links>
                <Link> Help </Link>
                <Link> Privacy </Link>
                <Link> Terms </Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn;