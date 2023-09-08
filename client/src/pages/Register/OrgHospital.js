import React from 'react'
import { Form, Input, Radio } from 'antd';
import { getAntdInputValidation } from '../../utils/helper';
const { TextArea } = Input;
const OrgHospital = ({ type }) => {
    return (
        <>
            <Form.Item label={type === 'orgnization' ? 'orgnizationName' : 'hospitalName'} name={type === 'orgnization' ? 'orgnizationName' : 'hospitalName'}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Owner' name='owner'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Email' name='email' >
                <Input></Input>
            </Form.Item>
            <Form.Item label='Phone' name='phone'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Website' name='website'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Password' name='password' >
                <Input></Input>
            </Form.Item>
            <Form.Item label='Address' className='col-span-2' name='address'>
                <TextArea></TextArea>
            </Form.Item>
        </>
    )
}

export default OrgHospital