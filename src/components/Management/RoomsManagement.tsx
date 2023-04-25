import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListRoomManagement, deleteRoomManagement } from '../../store/slices/RoomSlices';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

export default function RoomsManagement() {
  const dispatch = useAppDispatch();
  const { isGetListRoomManagement, listRoomManagement } = useAppSelector((state: any) => {
    return state.rooms
  })

  const [dataRender, setDataRender] = useState<any>()
  const [current, setCurrent] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListRoomManagement(
      {
        pageIndex: current,
        pageSize: currentPageSize
      }))
    setDataRender(listRoomManagement.data)
    
  }, [dispatch, setDataRender]);

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrent(page)
    setCurrentPageSize(pageSize)
    dispatch(getListRoomManagement(
      {
        pageIndex: `${page}`,
        pageSize: `${pageSize}`
      }))
      setDataRender(listRoomManagement.data)
  };

  

  const [statusSearch, setStatusSearch] = useState(false)

  const handleDeleteUser = (idUserDelete: any) => {
    dispatch(deleteRoomManagement(idUserDelete))
  }

  const [nameSearch, setNameSearch] = useState();
  const handleNameSearch = (event: any) => {
    setNameSearch(event.target.value)
  }
  const handleSubmitNameSearch = (event: any) => {
    event.preventDefault();
    dispatch(getUserSearchManagement(nameSearch))
    setStatusSearch(true);
  }
  // if(isGetUserSearchManagement){
  //     console.log(listUserSearchManagement);
  // }



  return (
    <div>
      <div>
      <h1>Quản lý phòng</h1>
        <Link to='addAndeditRoomManagement/0'>
          <button style={{ height:'30px', width:'180px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500', margin:'0px 20px'}}>Thêm phòng mới</button>
        </Link>
      </div>
      <div>
        <form action="" onSubmit={handleSubmitNameSearch}>
          <input style={{width:'240px', margin:'20px', height:'30px', borderRadius:'0.25rem', color:'black'}}  type="text" placeholder='Vui lòng nhập mã phòng' onChange={handleNameSearch} />
          <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500'}} type='submit'>Tìm</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width:'90%' }}>
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Hình ảnh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isGetListRoomManagement ?
            <>
              {dataRender && dataRender?.map((rooom: any) => {
                return (
                  <tr>
                    <td style={{textAlign:'center'}}>{rooom.id}</td>
                    <td style={{textAlign:'left'}}>{rooom.tenPhong}</td>
                    <td style={{textAlign:'center'}}>
                      <img style={{margin:'0px auto'}} src={rooom.hinhAnh} alt="" width={75} height={75} />
                    </td>
                    <td style={{textAlign:'center'}}>
                      <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500', marginRight:'15px'}} onClick={() => handleDeleteUser(rooom.id)}>Xóa</button>
                      <Link to={`addAndeditRoomManagement/${rooom.id}`}>
                        <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500',}}>Sửa</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}

            </>:
            <></>}

          </tbody>
        </table>
        <div style={{marginTop:'20px'}}>
          <Pagination
            current={current}
            onChange={onChange}
            total={dataRender?.length} 
            showTotal={(dataRender) => `Total ${dataRender} items`}/>
        </div>
      </div>
    </div>
  )
}
