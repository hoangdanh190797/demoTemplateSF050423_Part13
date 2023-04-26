import React from 'react'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { getListUserManagement, deleteUserManagement, getUserSearchManagement } from '../../store/slices/UserSlices'
import { getListLocationManagement, deleteLocationManagement, getListLocationManagementTotal } from '../../store/slices/LocationSlices'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

export default function LocationManagement() {

  const dispatch = useAppDispatch();
  const { isGetListUserManagement,
    listUserManagement,
    isGetUserSearchManagement,
    listUserSearchManagement } = useAppSelector((state: any) => {
      return state.user
    })

  const { isGetListLocationManagement,
    listLocationManagement,
    isGetListLocationManagementTotal,
    listLocationManagementTotal } = useAppSelector((state: any) => {
      return state.location
    })

  const [dataRender, setDataRender] = useState<any>()
  const [dataTotal, setDataTotal] = useState<any>()

  useEffect(() => {
    dispatch(getListLocationManagementTotal(
      {
        pageIndex: 1,
        pageSize: 100
      }))
    if (isGetListLocationManagementTotal) {
      const { data } = listLocationManagementTotal
      setDataTotal(data)
    }
  }, [dispatch, setDataRender])

  const [current, setCurrent] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListLocationManagement(
      {
        pageIndex: 1,
        pageSize: 10
      }))
    if (isGetListLocationManagement) {
      const { data } = listLocationManagement
      setDataRender(data)
    }
  }, [setDataRender]);

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrent(page);
    setCurrentPageSize(pageSize)
    dispatch(getListLocationManagement(
      {
        pageIndex: page,
        pageSize: pageSize
      }))
    if (isGetListLocationManagementTotal) {
      const { data } = listLocationManagement
      setDataRender(data)
    }
  }

  useEffect(() => {
    let { data } = listLocationManagement
    if (isGetListLocationManagement) {
      setDataRender(data)
    }
  })

  // --- --- ---
  const handleDeleteUser = (idUserDelete: any) => {
    dispatch(deleteLocationManagement(idUserDelete))
  }

  // --- --- ---
  const [idLocation, setIdLocation] = useState<any>();
  const [isloadingSearch, setIsLoadingSearch] = useState(false);
  const [itemSearch, setItemSearch] = useState<any | null>();

  const handleNameSearch = (event: any) => {
    setIdLocation(event.target.value)
  }
  const handleSubmitNameSearch = (event: any) => {
    event.preventDefault();
    listLocationManagementTotal?.data.map((items: any) => {
      if (items.id === idLocation * 1) {
        setItemSearch(items)
        setIsLoadingSearch(true);
      }
    })
  }

  return (
    <div>
      <div>
        <h1>Quản lý vị trí</h1>
        <Link to='addAndeditLocationManagement/0'>
          <button style={{ height: '30px', width: '180px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', margin: '0px 20px' }} >Thêm vị trí</button>
        </Link>
      </div>
      <div>
        <form action="" onSubmit={handleSubmitNameSearch}>
          <input style={{ width: '240px', margin: '20px', height: '30px', borderRadius: '0.25rem', color: 'black' }} type="text" placeholder='Vui lòng nhập mã vị trí' onChange={handleNameSearch} />
          <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500' }} type='submit'>Tìm</button>
        </form>
      </div>
      <div>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '90%', tableLayout: 'auto' }}>
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
            {isloadingSearch ?
              <tr>
                <td style={{ textAlign: 'center' }}>{itemSearch.id}</td>
                <td style={{ textAlign: 'center' }}>{itemSearch.tenViTri}</td>
                <td style={{ textAlign: 'center' }}>{itemSearch.tinhThanh}</td>
                <td style={{ textAlign: 'center' }}>{itemSearch.quocGia}</td>
                <td style={{ textAlign: 'center' }}>
                  <img style={{ margin: '0px auto' }} src={itemSearch.hinhAnh} alt="" width={75} height={75} />
                </td>
                <td>{itemSearch.role}</td>
                <td>
                  <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', marginRight: '15px' }} onClick={() => handleDeleteUser(itemSearch.id)}>Xóa</button>
                  <Link to={`addAndeditLocationManagement/${itemSearch.id}`}>
                    <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', }}>Sửa</button>
                  </Link>
                </td>
              </tr>
              :
              dataRender && dataRender.map((location: any) => {
                return (
                  <tr>
                    <td style={{ textAlign: 'center' }}>{location.id}</td>
                    <td style={{ textAlign: 'center' }}>{location.tenViTri}</td>
                    <td style={{ textAlign: 'center' }}>{location.tinhThanh}</td>
                    <td style={{ textAlign: 'center' }}>{location.quocGia}</td>
                    <td style={{ textAlign: 'center' }}>
                      <img style={{ margin: '0px auto' }} src={location.hinhAnh} alt="" width={75} height={75} />
                    </td>

                    <td>
                      <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', marginRight: '15px' }} onClick={() => handleDeleteUser(location.id)}>Xóa</button>
                      <Link to={`addAndeditLocationManagement/${location.id}`}>
                        <button style={{ height: '30px', width: '60px', backgroundColor: '#fc4e71', borderRadius: '0.25rem', fontWeight: '500', }}>Sửa</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}

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
