import React from 'react'
import ListRooms from '../components/ListRooms'
import LocationComponent from 'components/LocationComponent'
import Banner from 'components/Banner'
import HeaderExtra from 'components/HeaderExtra'


export default function Home() {
  return (
    <>
      <HeaderExtra></HeaderExtra>
      <Banner></Banner>
      <ListRooms></ListRooms>
      <LocationComponent></LocationComponent>
    </>
  )
}
