import React, { useState, useEffect } from 'react';
import InventoryForm from './InventoryForm';
import { GetInventory } from '../../../apicalls/addInventory';
import { message, Table } from 'antd';
import { setLoader } from '../../../redux/loadersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getDateFormat } from '../../../utils/helper';

const Inventory = () => {
    const [data, setData] = useState();
    const [openForm, setopenForm] = useState(false);
    const dispatch = useDispatch();
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
            dataIndex: "refrence",
            render: (text, record) => {
                if (record.inventoryType === 'In') {
                    return record.donerName;
                }
                else {
                    return record.hospitalName;
                }
            }
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (text, record) => {
                return getDateFormat(record.createdAt);
            }
        },
    ]
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await GetInventory();
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

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div className="flex justify-end">
                <button className='border border-2 border-primary hover:shadow-xl  shadow-black hover:bg-blue-500 px-4'
                    onClick={() => setopenForm(true)}
                > Add inventory</button>

            </div>
            <Table columns={column} dataSource={data} />
            <InventoryForm open={openForm}
                setOpen={setopenForm}
                relodData={getData}
            ></InventoryForm>
        </div>
    )
}

export default Inventory