import React, { useEffect, useState } from 'react'
import { getOrgnizationForDoner, getOrgnizationForHospital } from '../../../apicalls/user';
import { message, Modal, Table } from 'antd';
import { setLoader } from '../../../redux/loadersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDateFormat } from '../../../utils/helper';
import InventoryTable from '../../../component/InventoryTable';

const Orgnization = ({ userType }) => {

    const [data, setData] = useState();
    const [showHistoryModel, setShowHistoryModel] = useState(false);
    const [selectedOrgnization, setSelectedOrgnization] = useState()
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(setLoader(true));
            let response = null;
            if (userType === 'hospital')
                response = await getOrgnizationForHospital();
            else
                response = await getOrgnizationForDoner();
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
            title: "Orgnization Name",
            dataIndex: 'orgnizationName'
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

        },
        {
            title: "Created At",
            dataIndex: 'createdAt',
            render: (text, record) => {
                return getDateFormat(record.createdAt);
            }

        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text, record) => (
                <span className='underline '
                    onClick={() => {
                        setSelectedOrgnization(record);
                        setShowHistoryModel(true)

                    }}
                >
                    <button> History</button>
                </span>
            )
        },
    ];

    return (
        <>
            <Table columns={column} dataSource={data} />
            {
                setShowHistoryModel && <Modal
                    title={userType === 'doner' ? "donation History of " + selectedOrgnization?.orgnizationName : "Consumption History" + selectedOrgnization?.orgnizationName}
                    open={showHistoryModel}
                    width={1000}
                    onCancel={() => {
                        setShowHistoryModel(false);
                    }}
                    onClose={() => {
                        setShowHistoryModel(false);
                    }}
                >
                    <InventoryTable filter={{ filter: { orgnization: selectedOrgnization?._id, [userType]: currentUser._id } }} />
                </Modal>
            }
        </>
    )
}

export default Orgnization;