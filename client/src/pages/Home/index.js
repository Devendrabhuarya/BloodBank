import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { GetAllBloodGroups } from '../../apicalls/dashBoard';
import { setLoader } from '../../redux/loadersSlice';
import { message } from 'antd';
import { helper } from '../../utils/helper';
import InventoryTable from '../../component/InventoryTable'
const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [allBlood = [], setAllBlood] = useState([]);
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBloodGroups();
      dispatch(setLoader(false));
      setAllBlood(response.data.data);
      console.log(response.data.data);
      if (response.data.success) {
        message.success(response.data.message);
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


  const color = [
    "0D1282", "176B87", '504099', "A73121", "FF9B50", "4D2DB7", "7091F5", "183D3D"
  ]
  return (

    <>
      <div className='flex justify-center'>
        <h1><b>WELCOME  {helper(currentUser)}</b></h1>
      </div>
      {
        currentUser.userType === 'orgnization' && <>
          <div className=" grid grid-cols-4 gap-4 m-4 text-white" style={{ backgroundColor: color[2] }}>
            {
              allBlood?.map((val, ind) => {
                const bgColor = '#' + color[ind];
                console.log(typeof bgColor)
                return (

                  <div className='flex  justify-around py-2' style={{ backgroundColor: bgColor }}>
                    <div className='flex justify-center text-center'>
                      <h1 className='text-3xl my-auto'>{val.bloodGroup}</h1>
                    </div>
                    <div className='flex flex-col '>
                      <div className='flex justify-between gap-5'>
                        <span>Total In</span>
                        <span>{val.totalIn}Ml</span>
                      </div>
                      <div className='flex justify-between gap-5'>
                        <span>Total Out</span>
                        <span>{val.totalOut}Ml</span>
                      </div>
                      <div className='flex justify-between gap-5'>
                        <span>Availble</span>
                        <span>{val.available}Ml</span>
                      </div>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <InventoryTable filter={{ filter: { orgnization: currentUser._id }, limit: 5 }} />
        </>
      }
      {
        currentUser.userType === 'doner' && <>
          <InventoryTable filter={{ filter: { doner: currentUser._id, inventoryType: "In" }, limit: 5 }} />
        </>

      }
      {

        currentUser.userType === 'hospital' && <InventoryTable filter={{ filter: { hospital: currentUser._id, inventoryType: "Out" }, limit: 5 }} />

      }
    </>

  )
}

export default Home;