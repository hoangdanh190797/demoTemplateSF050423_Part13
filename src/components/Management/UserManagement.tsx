import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getListUserManagement, deleteUserManagement, getUserSearchManagement, getListUserManagementTotal } from '../../store/slices/UserSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const {
    isGetListUserManagement,
    listUserManagement,
    isGetUserSearchManagement,
    listUserSearchManagement,
    isGetListUserManagementTotal,
    listUserManagementTotal,
  } = useAppSelector((state: any) => {
    return state.user
  })

  const [dataRender, setDataRender] = useState<any>()
  const [dataTotal, setDataTotal] = useState<any>()

  useEffect(() => {
    dispatch(getListUserManagementTotal(
      {
        pageIndex: 1,
        pageSize: 999
      }))
    if (isGetListUserManagementTotal) {
      const { data } = listUserManagementTotal
      setDataTotal(data)
    }
  }, [dispatch, setDataRender])

  const [current, setCurrent] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListUserManagement(
      {
        pageIndex: 1,
        pageSize: 10
      }))
    if (isGetListUserManagement) {
      const { data } = listUserManagement
      setDataRender(data)
    }
  }, [dispatch, setDataRender]);

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrent(page);
    setCurrentPageSize(pageSize)
    dispatch(getListUserManagement(
      {
        pageIndex: page,
        pageSize: pageSize
      }))
    if (isGetListUserManagement) {
      const { data } = listUserManagement
      setDataRender(data)
    }
  };

  useEffect(() => {
    let { data } = listUserManagement
    if (isGetListUserManagement) {
      setDataRender(data)
    }
  });

  // --- --- ---
  const handleDeleteUser = (idUserDelete: any) => {
    dispatch(deleteUserManagement(idUserDelete))
  }

  // --- --- ---
  const [idUser, setIdUser] = useState<any>();
  const [isloadingSearch, setIsLoadingSearch] = useState(false);
  const [itemSearch, setItemSearch] = useState<any | null>();

  const handleNameSearch = (event: any) => {
    setIdUser(event.target.value)
  }
  const handleSubmitNameSearch = (event: any) => {
    event.preventDefault();
    listUserManagementTotal?.data.map((items: any) => {
      if (items.id === idUser * 1) {
        setItemSearch(items)
        setIsLoadingSearch(true);
      }
    })
  }

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <div>
        <Link to='addUserManagement/0'>
          <button style={{ height: '30px', width: '180px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', margin: '0px 20px' }}>Thêm người dùng</button>
        </Link>
      </div>
      <div>
        <form action="" onSubmit={handleSubmitNameSearch}>
          <input style={{ width: '240px', margin: '20px', height: '30px', borderRadius: '0.25rem', color: 'black' }} type="text" placeholder='Nhập vào mã người dùng' onChange={handleNameSearch} />
          <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500' }} type='submit'>Tìm</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '90%' }}>
          <thead>
            <tr>
              <th>Mã người dùng</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Loại người dùng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isloadingSearch ?
                  <tr>
                    <td>{itemSearch.id}</td>
                    <td>{itemSearch.name}</td>
                    <td>{itemSearch.email}</td>
                    <td>{itemSearch.phone}</td>
                    <td>{itemSearch.birthday}</td>
                    <td>{itemSearch.role}</td>
                    <td>
                      <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', marginRight: '15px' }} onClick={() => handleDeleteUser(itemSearch.id)}>Xóa</button>
                      <Link to={`addUserManagement/${itemSearch.id}`}>
                        <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', }}>Sửa</button>
                      </Link>
                    </td>
                  </tr>
               :
              dataRender && dataRender?.map((user: any) => {
                return (
                  <tr>
                    <td style={{ textAlign: 'center' }}>{user.id}</td>
                    <td style={{ textAlign: 'left' }}>{user.name}</td>
                    <td style={{ textAlign: 'left' }}>{user.email}</td>
                    <td style={{ textAlign: 'left' }}>{user.phone}</td>
                    <td style={{ textAlign: 'center' }}>{user.birthday}</td>
                    <td style={{ textAlign: 'center' }}>{user.role}</td>
                    <td>
                      <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', marginRight: '15px' }} onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                      <Link to={`addUserManagement/${user.id}`}>
                        <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', }}>Sửa</button>
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <Pagination
            current={current}
            pageSize={currentPageSize}
            onChange={onChange}
            total={dataTotal?.length}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      </div>
    </div>
  )
}
