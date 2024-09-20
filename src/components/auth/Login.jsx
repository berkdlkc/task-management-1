import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const users = [
    {
      username: 'admin_berk',
      password: 'admin123',
      role: 'admin'
    },
    {
      username: 'user_berk',
      password: 'user123',
      role: 'user'
    }
  ];

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #4e4376, #2b5876); 
`;

const FormWrapper = styled.div`
    background: aliceblue;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 1.5rem;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
    background: white;
    color: black;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const foundUser = users.find(
            (user) => user.username === data.username 
            && user.password === data.password
        );

        if(foundUser){
            if(foundUser.role === "admin"){
                navigate('/AdminDashboard', {state:{username: foundUser.username}});
            } else if (foundUser.role === "user"){
                navigate('/UserDashboard', {state: {username: foundUser.username}});
            } 
        } else {
            alert("Invalid username or password")
            reset();
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Task Management</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('username')} placeholder="Username" />
                    <Input {...register('password')} type="password" placeholder="Password" />
                    <Button type="submit">Login</Button>
                </form>
            </FormWrapper>
        </Container>
    );
};

export default Login;