import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListRoomManagement, deleteRoomManagement } from '../../store/slices/RoomSlices';
import { getListBookingManagement } from '../../store/slices/BookingSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { Room } from '@mui/icons-material';

export default function BookingManagement() {
  const dispatch = useAppDispatch();
  const { isGetListBookingManagement, listBookingManagement } = useAppSelector((state: any) => {
    return state.booking
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listBookingManagement.slice(indexOfFirstPost, indexOfLastPost)


  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page)
    // dispatch(getListRoomManagement(
    //   {
    //     pageIndex: `${current}`,
    //     pageSize: 10
    //   }))
  };

  useEffect(() => {
    // dispatch(getListRoomManagement(
    //   {
    //     pageIndex: `${current}`,
    //     pageSize: 10
    //   }))
    dispatch(getListBookingManagement())
  }, [dispatch]);

  // const { data } = listBookingManagement

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
              <th>Ngày đến</th>
              <th>Ngày đi</th>
              <th>Số lượng khách</th>
              <th>Mã người dùng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              currentPosts && currentPosts.map((booking: any) => {
                return (
                  <tr>
                    <td>{booking.id}</td>
                    <td>{booking.ngayDen}</td>
                    <td>{booking.ngayDi}</td>
                    <td>{booking.soLuongKhach}</td>
                    <td>{booking.maNguoiDung}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(booking.id)}>Xóa</button>
                      <Link to={`addAndeditBookingManagement/${booking.id}`}>
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
