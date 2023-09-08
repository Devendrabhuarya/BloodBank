import React, { useEffect, useState } from 'react'
import { getDonerOfOrgnization } from '../../../apicalls/user';
import { message, Table } from 'antd';
import { setLoader } from '../../../redux/loadersSlice';
import {  useDispatch } from 'react-redux';
import { getDateFormat } from '../../../utils/helper';
const Doner = () => {
    const [doner, setDoner] = useState();
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getDonerOfOrgnization();
            dispatch(setLoader(false));
            if (response.data.success) {
                message.success(response.data.message);
                setDoner(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    const column = [
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Email",
            dataIndex: 'email'
        },
        {
            title: "Phone",
            dataIndex: 'phone'
        },
        {
            title: "Address",
            dataIndex: 'address',
            render: (text, record) => {
                return getDateFormat(record.createdAt);
            }
        },

    ]
    return (
        <Table columns={column} dataSource={doner} />
    )
}

export default Doner;