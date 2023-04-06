import React from 'react'
import ListRooms from '../components/ListRooms'
import LocationComponent from 'components/LocationComponent'
import Banner from 'components/Banner'


export default function Home() {
  return (
    <>
      <Banner></Banner>
      <ListRooms></ListRooms>
      <LocationComponent></LocationComponent>
    </>
  )
}
