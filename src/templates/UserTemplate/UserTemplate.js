import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import HeaderHome from '../../Component/HeaderHome/HeaderHome'

export default function UserTemplate(props) { //{component,path}
    return (
        <Route path={props.path} render={(propsRoute) => {
            return <Fragment>
                <HeaderHome />
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50'>
                        <img src='https://picsum.photos/2000' alt="..." style={{ height: '100vh' }} />
                    </div>
                    <div className='content1 w-50'>
                        <props.component {...propsRoute} />
                    </div>

                </div>
            </Fragment>
        }} />
    )
}
