import React, { useEffect, useState } from 'react'
import { getHospitalOfOrgnization } from '../../../apicalls/user';
import { message, Table } from 'antd';
import { setLoader } from '../../../redux/loadersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getDateFormat } from '../../../utils/helper';
const Hospital = () => {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getHospitalOfOrgnization();
            dispatch(setLoader(false));
            if (response.data.success) {
                message.success(response.data.message);
                setData(response.data.data);
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
            title: " Hospital Name",
            dataIndex: 'hospitalName'
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
            dataIndex: 'address'
        },
        {
            title: "Created At",
            dataIndex: 'createdAt',
            render: (text, record) => {
                return getDateFormat(record.createdAt);
            }

        },

    ]
    return (
        <Table columns={column} dataSource={data} />
    )
}

export default Hospital;