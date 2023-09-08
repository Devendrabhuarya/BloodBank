import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, message } from 'antd';
import { Link } from 'react-router-dom';
import '../pages.css';
import { LoginUser } from '../../apicalls/user';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { getAntdInputValidation } from '../../utils/helper';

const Login = () => {
    const [type, setType] = useState('doner');
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const onSubmit = async (value) => {
        try {
            dispatch(setLoader(true));
            const response = await LoginUser({ ...value, userType: type });
            dispatch(setLoader(false));
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem('token', response.data.data);
                nevigate('/');
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token'))
            nevigate('/');
    }, [])
    return (
        <div className='flex justify-center items-center w-screen h-screen bg-primary '>
            <Form action="" method='post' layout='vertical' className='grid grid-cols-2   gap-x-5 '
                onFinish={onSubmit}
            >
                <h1 className='uppercase col-span-2 border-b-2 border-black w-full text-2xl'> Login- {type} </h1>
                <Radio.Group className='col-span-2 my-2' name='type' value={type} onChange={(e) => {
                    setType(e.target.value);
                }}>
                    <Radio value='doner'>Doner</Radio>
                    <Radio value='orgnization'>Orgnization</Radio>
                    <Radio value='hospital'>Hospital</Radio>
                </Radio.Group>

                <Form.Item label='Email' name='email' rules={getAntdInputValidation()}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Password' name='password' rules={getAntdInputValidation()}>
                    <Input></Input>
                </Form.Item>


                <button className='col-span-2 bg-primary w-full item-center'>Login</button>
                <Link to='/register' className='col-span-2  w-full text-center underline'>not have account ? Register</Link>
            </Form>
        </div>
    )
}

export default Login;