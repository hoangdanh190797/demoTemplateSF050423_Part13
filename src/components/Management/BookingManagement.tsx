import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListBookingManagement, deleteBookingManagement } from '../../store/slices/BookingSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function BookingManagement() {
  const dispatch = useAppDispatch();
  const { isGetListBookingManagement, listBookingManagement } = useAppSelector((state: any) => {
    return state.booking
  })

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page);
    setPostsPerPage(pageSize)
  };

  useEffect(() => {
    dispatch(getListBookingManagement())
    setPosts(listBookingManagement)
  }, [dispatch]);

  const [statusSearch, setStatusSearch] = useState(false)

  const handleDeleteBooking = (idBookingDelete: number) => {
    dispatch(deleteBookingManagement(idBookingDelete))
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
              <th>Mã đặt phòng</th>
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
                const { ngayDen, ngayDi } = booking;
                let newNgayDen = dayjs(new Date(ngayDen));
                let newNgayDi = dayjs(new Date(ngayDi));
                return (
                  <>
                    <tr>
                      <td>{booking.id}</td>
                      <td>{newNgayDen.format('DD-MM-YYYY')}</td>
                      <td>{newNgayDi.format('DD-MM-YYYY')}</td>
                      <td>{booking.soLuongKhach}</td>
                      <td>{booking.maNguoiDung}</td>
                      <td>
                        <button onClick={() => handleDeleteBooking(booking.id)}>Xóa</button>
                        <Link to={`addAndeditBookingManagement/${booking.id}`}>
                          <button>Sửa</button>
                        </Link>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
        <div>
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={posts?.length}
            showTotal={(posts) => `Total ${posts} items`}
          />
        </div>
      </div>
    </div>
  )
}
