import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getListUserManagement } from '../../store/slices/UserSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const { isGetListUserManagement, listUserManagement } = useAppSelector((state: any) => {
    return state.user
  })

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
    dispatch(getListUserManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  };
  useEffect(() => {
    dispatch(getListUserManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  }, [dispatch]);

  const { data } = listUserManagement

  return (
    <div>
      <div>
        <Link to='addUserManagemet/0'>
          <button>Thêm quản trị viên</button>
        </Link>
      </div>
      <div>
        <form action="">
          <input type="text" placeholder='Nhập vào họ tên người dùng' />
          <button>Tìm</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
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
            {data && data.map((user: any) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.birthday}</td>
                  <td>{user.role}</td>
                  <td>
                    <button>Xóa</button>
                    <Link to={`addUserManagemet/${user.id}`}>
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
