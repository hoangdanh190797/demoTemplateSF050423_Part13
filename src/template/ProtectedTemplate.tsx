import React from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { Outlet, Navigate } from 'react-router-dom'
import PageAdmin from 'pages/PageAdmin';
interface propsProtected {
    isAuth: string | null;
    component: JSX.Element;
}

export default function ProtectedTemplate(props: propsProtected) {
    const{isAuth, component} = props
    return (
        <>
            {isAuth === 'ADMIN' ? component : <></>}
        </>
    )
}
