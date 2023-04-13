import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getListUserManagement, deleteUserManagement, getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListLocationManagement, deleteLocationManagement} from '../../store/slices/LocationSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

export default function LocationManagement() {

  const dispatch = useAppDispatch();
  const { isGetListUserManagement, listUserManagement, isGetUserSearchManagement, listUserSearchManagement } = useAppSelector((state: any) => {
    return state.user
  })

  const {isGetListLocationManagement ,listLocationManagement } = useAppSelector((state:any) => {
    return state.location
  })

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
    dispatch(getListLocationManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  };
  useEffect(() => {
    dispatch(getListLocationManagement(
      {
        pageIndex: `${current}`,
        pageSize: 10
      }))
  }, [dispatch]);

  const { data } = listLocationManagement

  // const [contentRender, SetContentRender] = useState<any>();
  // useEffect(() => {
  //   SetContentRender(data)
  // },[])

  const [statusSearch, setStatusSearch] = useState(false)

  const handleDeleteUser = (idUserDelete: any) => {
    dispatch(deleteLocationManagement(idUserDelete))
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
        <Link to='addAndeditLocationManagement/0'>
          <button>Thêm vị trí</button>
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
              <th>Mã vị trí</th>
              <th>Tên vị trí</th>
              <th>Tỉnh thành</th>
              <th>Quốc gia</th>
              <th>Hình ảnh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {statusSearch ?
              listUserSearchManagement.map((user: any) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthday}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                      <Link to={`addAndeditLocationManagement/${user.id}`}>
                        <button>Sửa</button>
                      </Link>
                    </td>
                  </tr>
                )
              }) :
              data && data.map((location: any) => {
                return (
                  <tr>
                    <td>{location.id}</td>
                    <td>{location.tenViTri}</td>
                    <td>{location.tinhThanh}</td>
                    <td>{location.quocGia}</td>
                    <td>
                      <img src={location.hinhAnh} alt="" width={50} height={50}/>
                      </td>

                    <td>
                      <button onClick={() => handleDeleteUser(location.id)}>Xóa</button>
                      <Link to={`addAndeditLocationManagement/${location.id}`}>
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
