import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'






export default function HomeTemplate(props) { //{path:'/home', component:Home}

    console.log(props.path)

    const [screen,setScreen] = useState({
        width:window.innerWidth,
        height:window.innerHeight
    })

    useEffect(()=>{
        //Bắt sự kiện thay đổi kích thước màn hình
        window.onload = ()=>{
            setScreen({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        window.onresize = () => {
            setScreen({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        //Xoá 2 sự kiện onload và onresize nếu người dùng chuyển template
        return () => {
            window.removeEventListener('onload');
            window.removeEventListener('onresize');

        }
    },[])
    //Mặc định Component là props.component
    let Component = props.component;
    if(props.componentMobile) { //nếu có component mobile thì sẽ xem kích thước để gán lại component
        if(screen.width <= 765) {
            Component = props.componentMobile;
        }

    }


    return (
        // <Route path={props.path} render={(propsRoute) => {
        //     console.log(propsRoute)
        //     return <div>
        //          <Component {...propsRoute} />
        //         <footer className='text-center p-5 bg-dark text-white'>Footer @cybersoft</footer>
        //     </div>

        // }} />

        <Route path={props.path} element= {(propsRoute) => <Component {...propsRoute} />}/>
    )
}
