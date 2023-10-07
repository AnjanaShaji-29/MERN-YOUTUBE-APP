import React from 'react';
import styled from 'styled-components';

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
  return (
    <Container>
        <Wrapper> 
        <Title> Sign in </Title>
        <SubTitle> to continue to Youtube </SubTitle>
        <Input placeholder='username'/>
        <Input type="password" placeholder='password'/>
        <Button> Sign in </Button>
        <Title> Sign up </Title>
        <Input placeholder='username'/>
        <Input placeholder='email'/>
        <Input type="password" placeholder='password'/>
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