import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, message } from 'antd';
import { Link } from 'react-router-dom';
import OrgHospital from './OrgHospital';
import '../pages.css';
import { RegisterUser } from '../../apicalls/user';
import { useNavigate } from 'react-router-dom';
import { getAntdInputValidation } from '../../utils/helper';
import { setLoader } from '../../redux/loadersSlice';
import { useSelector, useDispatch } from 'react-redux';


const Register = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState('doner');
    const nevigate = useNavigate();
    const onSubmit = async (value) => {
        try {
            dispatch(setLoader(true));
            const response = await RegisterUser({ ...value, userType: type });
            dispatch(setLoader(false));
            if (response.data.success) {
                console.log('success fully logi9n');
                message.success(response.data.message);
            } else {
                console.log('error from server');
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
                <h1 className='uppercase col-span-2 border-b-2 border-black w-full text-2xl'> Register- {type} </h1>
                <Radio.Group className='col-span-2 my-2' name='type' value={type} onChange={(e) => {
                    setType(e.target.value);
                }}>
                    <Radio value='doner'>Doner</Radio>
                    <Radio value='orgnization'>Orgnization</Radio>
                    <Radio value='hospital'>Hospital</Radio>
                </Radio.Group>
                {
                    type === 'doner' && <>
                        <Form.Item label='Name' name='name'>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Phone' name='phone'>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input></Input>
                        </Form.Item>
                    </>
                }
                {
                    type !== 'doner' && <>
                        <OrgHospital type={type} />
                    </>
                }

                <button className='col-span-2 bg-primary w-full item-center'>Register</button>
                <Link to='/login' className='col-span-2  w-full text-center underline'>Already have account ? login</Link>
            </Form>
        </div>
    )
}

export default Register;