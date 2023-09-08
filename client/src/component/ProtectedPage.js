import { message } from 'antd'
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../apicalls/user';
import { useNavigate } from 'react-router-dom';
import { helper } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { setLoader } from '../redux/loadersSlice';
const ProtectedPage = ({ children }) => {

    const { currentUser } = useSelector((state) => state.users);
    const nevigate = useNavigate();
    const dispatch = useDispatch();

    const GetCurrentUser = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getCurrentUser();
            dispatch(setLoader(false));
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(setCurrentUser(response.data.data));
            } else {

                throw new Error(response.data.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            GetCurrentUser();
        } else {
            nevigate('/login');
        }
    }, [])
    return (
        currentUser && (
            <div>
                <div className='flex bg-primary justify-between px-5'>
                    <div className='flex flex-col '>
                        <span className='text-3xl uppercase' onClick={()=>nevigate('/')}>Blood Bank</span>
                        <span className='text-xs uppercase'>{currentUser.userType}</span>
                    </div>
                    <div className='my-auto uppercase flex gap-4 underline' >
                        <span className='flex cursor-pointer items-center'
                            onClick={() => {
                                nevigate('/profile');
                            }}
                        ><AiOutlineUser className='h-full underline' />{helper(currentUser)}</span>
                        <span className='my-auto cursor-pointer'
                            onClick={() => {
                                localStorage.removeItem('token');
                                nevigate('/login');
                            }}
                        > <BiLogIn /></span>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        )
    )
}

export default ProtectedPage;