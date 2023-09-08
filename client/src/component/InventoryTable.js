import React, { useState, useEffect } from 'react';
import { GetInventoryForDonerOrHospital } from '../apicalls/addInventory';
import { message, Table } from 'antd';
import { setLoader } from '../redux/loadersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getDateFormat } from '../utils/helper';

const InventoryTable = (props) => {

    const { filter } = props;
    console.log(filter.filter);
    const [data, setData] = useState();
    const [openForm, setopenForm] = useState(false);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await GetInventoryForDonerOrHospital(filter);
            console.log(response);
            if (response.data.success) {
                message.success(response.data.success);
                setData(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    };
    const column = [
        {
            title: "Inventory Type",
            dataIndex: "inventoryType"
        },
        {
            title: "Blood Group",
            dataIndex: "bloodGroup"
        },
        {
            title: "Quantity",
            dataIndex: "quantity"
        },
        {
            title: "Refrence",
            dataIndex: "orgnization",
            render: (text, record) => {
                if (filter.filter.orgnization)
                    return record.donerName || record.hospitalName;
                else
                    return record.orgnization.orgnizationName;

            }

        },
        {
            title: "Address",
            dataIndex: "orgnization",
            render: (text, record) => {
                return record.orgnization.address;
            }

        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (text, record) => {
                return getDateFormat(record.createdAt);
            }
        },
    ];
    if (filter.filter.doner || filter.filter.hospital) {
        column[3].title = 'Orgnization';
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [filter.filter.orgnization])
    return (

        <>

            <Table columns={column} dataSource={data} />
        </>

    )

}
export default InventoryTable;