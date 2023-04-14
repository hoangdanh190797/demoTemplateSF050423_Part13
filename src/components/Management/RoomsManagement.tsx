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

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
    dispatch(getListRoomManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  };
  useEffect(() => {
    dispatch(getListRoomManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  }, [dispatch]);

  const { data } = listRoomManagement

  // const [contentRender, SetContentRender] = useState<any>();
  // useEffect(() => {
  //   SetContentRender(data)
  // },[])

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
        <Link to='addAndeditRoomManagement/0'>
          <button>Thêm phòng mới</button>
        </Link>
      </div>
      <div>
        <form action="" onSubmit={handleSubmitNameSearch}>
          <input type="text" placeholder='Nhập vào họ tên người dùng' onChange={handleNameSearch} />
          <button type='submit'>Tìm</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Hình ảnh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((rooom: any) => {
                return (
                  <tr>
                    <td>{rooom.id}</td>
                    <td>{rooom.tenPhong}</td>
                    <td>
                      <img src={rooom.hinhAnh} alt="" width={50} height={50} />
                    </td>

                    <td>
                      <button onClick={() => handleDeleteUser(rooom.id)}>Xóa</button>
                      <Link to={`addAndeditRoomManagement/${rooom.id}`}>
                        <button>Sửa</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}

          </tbody>
        </table>
        <div>
          <Pagination
            current={current}
            onChange={onChange}
            total={500} />
        </div>
      </div>
    </div>
  )
}
