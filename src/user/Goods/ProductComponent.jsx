import React from 'react'
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';


export default function ProductComponent(props) {
    const dispatch = useDispatch();

    const showDetaile = (id) => {
        const action = {
            type: 'SHOW_DETIAL',
            id: id
        }
        dispatch(action)
    }
    return (
        <tr style={{ verticalAlign: 'middle' }} onClick={() => showDetaile(props.product._id)}>
            <td>
                <Image src={`http://localhost:4000/${props.product.image}`} rounded width={150} height={100} />
            </td>
            <td><span className='text'>{props.product.name}</span></td>
            <td>{props.product.price}</td>
            <td>{props.product.quantity}</td>
            <td>{props.product.unit.name}</td>
            <td>{props.product.category.name}</td>
            <td><span className='text'>{props.product.description}</span></td>
        </tr>
    )
}
