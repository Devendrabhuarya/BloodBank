import React from 'react';
import { Tabs } from 'antd';
import Inventory from './inventory/inventory';
import { useSelector, useDispatch } from 'react-redux';
import Doner from './doner/doner';
import Hospital from './hospital/hospital';
import Orgnization from './orgnization/orgnization';
import InventoryTable from '../../component/InventoryTable';
const Profile = () => {
    const { currentUser } = useSelector((state) => state.users);
    return (
        <>
            {currentUser.userType === 'orgnization' && <div>
                <Tabs className='mx-10'>
                    <Tabs.TabPane tab="Invenrory" key="item-1">
                        <Inventory />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Doner" key="item-2">
                        <Doner />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hospital" key="item-3">
                        <Hospital />
                    </Tabs.TabPane>
                </Tabs>
            </div>}
            {currentUser.userType === 'doner' && <div>
                <Tabs className='mx-10'>
                    <Tabs.TabPane tab="Donation" key="item-4">
                        <InventoryTable filter={{ filter: { doner: currentUser._id, inventoryType: "In" }}} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Orgnization" key="item-5">
                        <Orgnization userType='doner' />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            }
            {currentUser.userType === 'hospital' && <div>
                <Tabs className='mx-10'>
                    <Tabs.TabPane tab="Consumption" key="item-6">
                        <InventoryTable filter={{filter:{ hospital: currentUser._id, inventoryType: "Out" }}} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Orgnization" key="item-7">
                        <Orgnization userType='hospital' />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            }
        </>

    )
}

export default Profile