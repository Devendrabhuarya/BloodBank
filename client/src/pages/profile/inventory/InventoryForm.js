import React, { useState } from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
import { getAntdInputValidation } from '../../../utils/helper';
import { AddInventory } from '../../../apicalls/addInventory';
import { setLoader } from '../../../redux/loadersSlice';
import { useSelector, useDispatch } from 'react-redux';


const InventoryForm = ({ open, setOpen, relodData }) => {

    const [inventoryType, setInventoryType] = useState();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.users);
    const [form] = Form.useForm();
    const onFinish = async (val) => {
        try {
            dispatch(setLoader(true));
            const response = await AddInventory({ ...val, orgnization: currentUser._id });
            if (response.data.success) {
                relodData();
                message.success(response.data.message);
            }
            else {
                message.error(response.data.message);
            }
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    return (
        <Modal
            title="Add inventory"
            open={open}
            onCancel={() => {
                setOpen(false);
            }}
            onOk={() => {
                form.submit();
            }}
        >
            <Form className='w-full' layout='vertical'
                form={form} onFinish={onFinish}>
                <Form.Item label='Inventory Type' name='inventoryType' rules={getAntdInputValidation()}>
                    <Radio.Group value={inventoryType}
                        onChange={(e) => setInventoryType(e.target.value)}>
                        <Radio value='In'>In</Radio>
                        <Radio value='Out'>Out</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label='Blood Group' name='bloodGroup'
                    rules={getAntdInputValidation()}>
                    <select name="bloodGroup" id="" className='w-full py-2 bg-white border border-1'
                    >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </Form.Item>

                <Form.Item name='email' label={inventoryType === "In" ? 'Doner Email' : "Hospital Email"}
                    rules={getAntdInputValidation()}>
                    <Input></Input>
                </Form.Item>

                <Form.Item name='quantity' label='Quantity(ML)' rules={getAntdInputValidation()}>
                    <Input></Input>
                </Form.Item>


            </Form>

        </Modal>
    )
}

export default InventoryForm