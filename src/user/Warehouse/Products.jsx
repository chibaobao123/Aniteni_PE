import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import ProductsDetail from './ProductsDetail';
import { getProducts } from '../../api/products';
import ProductComponent from './ProductComponent';

export default function Products() {
    const { allProducts, showDeitail, showDeitailId } = useSelector(state => state.productsReducer);
    const dispatch = useDispatch();

    const renderProducts = (products) => {
        if (products.length === 0) {
            return <tr>
                <td colSpan={7}>Không có sản phẩm nào </td>
            </tr>
        }
        return products.map((e, index) => {
            return (
                <ProductComponent product={e} key={index} />
            )
        })
    }

    useEffect(() => {
        getProducts().then(res => {
            const action = {
                type: 'ALL_PRODUCTS',
                products: res.data.products
            }
            dispatch(action)
        })
    }, [])

    return (
        <div className='container'>
            <Table striped bordered hover style={{ backgroundColor: 'white' }} className='text-center'>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Gía tiền</th>
                        <th>Số lượng</th>
                        <th>Đơn vị</th>
                        <th>Phân loại</th>
                        <th>Miêu tả</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProducts(allProducts)}
                </tbody>
            </Table>
            <ProductsDetail showDeitail={showDeitail} showDeitailId={showDeitailId} />
        </div>
    )
}
