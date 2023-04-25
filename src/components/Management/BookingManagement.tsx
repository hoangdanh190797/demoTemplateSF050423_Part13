import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListBookingManagement, deleteBookingManagement } from '../../store/slices/BookingSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { checkDeleteBooking } from '../../store/slices/BookingSlices';
import { object } from 'yup';

export default function BookingManagement() {
  const dispatch = useAppDispatch();
  const { isGetListBookingManagement, listBookingManagement, isDeleteBookingRejected, isDeleteBookingManagement } = useAppSelector((state: any) => {
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
    setTimeout(() => {
      dispatch(checkDeleteBooking())
    }, 3000)
  }

  //Search by IdBooking
  const [idBooking, setIdBooking] = useState<any>();
  const [isloadingSearch, setIsLoadingSearch] = useState(false);
  const [itemSearch, setItemSearch] = useState<any | null>();

  const handleNameSearch = (event: any) => {
    // setNameSearch(event.target.value)
    setIdBooking(event.target.value);
  }
  const handleSubmitNameSearch = (event: any) => {
    event.preventDefault();
    listBookingManagement.map((items: any) => {
      if (items.id === idBooking * 1) {
        setItemSearch(items)
        setIsLoadingSearch(true);
      }
    })
    
  }
  return (
    <div>
      <div>
        <h1>Quản lý đặt phòng</h1>
        {/*  */}
        {isDeleteBookingManagement ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
          <Alert severity="success">Xóa thành công</Alert>
        </Stack> : ''}
        {isDeleteBookingRejected ? <Stack sx={{ width: '32%' }} spacing={2} style={{ position: 'absolute', right: '0px' }}>
          <Alert severity="error">Xóa thất bại</Alert>
        </Stack> : ''}
      </div>
      <div>
        <form action="" onSubmit={handleSubmitNameSearch}>
          <input style={{width:'240px', margin:'20px', height:'30px', borderRadius:'0.25rem', color:'black'}} type="text" placeholder='Vui lòng nhập mã đặt phòng' onChange={handleNameSearch} />
          <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500'}} type='submit'>TÌM</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width:'90%' }}>
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
            {isloadingSearch ? <>
                <tr >
                  <td style={{textAlign:'center'}}>{itemSearch.id}</td>
                  <td style={{textAlign:'center'}}>{itemSearch.ngayDen}</td>
                  <td style={{textAlign:'center'}}>{itemSearch.ngayDi}</td>
                  <td style={{textAlign:'center'}}>{itemSearch.soLuongKhach}</td>
                  <td style={{textAlign:'center'}}>{itemSearch.maNguoiDung}</td>
                  <td>
                    <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500', marginRight:'15px'}} onClick={() => handleDeleteBooking(itemSearch.id)}>Xóa</button>
                    <Link to={`addAndeditBookingManagement/${itemSearch.id}`}>
                      <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500',}}>Sửa</button>
                    </Link>
                  </td>
                </tr>
            </> :
              <>
                {
                  currentPosts && currentPosts.map((booking: any) => {
                    const { ngayDen, ngayDi } = booking;
                    let newNgayDen = dayjs(new Date(ngayDen));
                    let newNgayDi = dayjs(new Date(ngayDi));
                    return (

                      <tr>
                        <td style={{textAlign:'center'}}>{booking.id}</td>
                        <td style={{textAlign:'center'}}>{newNgayDen.format('DD-MM-YYYY')}</td>
                        <td style={{textAlign:'center'}}>{newNgayDi.format('DD-MM-YYYY')}</td>
                        <td style={{textAlign:'center'}}>{booking.soLuongKhach}</td>
                        <td style={{textAlign:'center'}}>{booking.maNguoiDung}</td>
                        <td style={{textAlign:'center'}}>
                          <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500', marginRight:'15px'}} onClick={() => handleDeleteBooking(booking.id)}>Xóa</button>
                          <Link to={`addAndeditBookingManagement/${booking.id}`}>
                            <button style={{ height:'30px', width:'60px', backgroundColor:'#fc4e71', borderRadius:'0.25rem', fontWeight:'500'}}>Sửa</button>
                          </Link>
                        </td>
                      </tr>

                    )
                  })
                }
              </>
            }
          </tbody>
        </table>
        <div style={{marginTop:'20px'}}>
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
