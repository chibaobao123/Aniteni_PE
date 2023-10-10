import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getCategory, getUnits, add1Product } from '../../api/products.js'

export default function ImportGoods() {
    const { allProducts } = useSelector(state => state.productsReducer);
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null);

    const [units, setUnits] = useState(null);

    const [category, setCategory] = useState(null);

    const [products, setProducts] = useState({
        name: '',
        price: 0,
        unit: '',
        quantity: 0,
        description: '',
        category: '',
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { value, name } = e.target;
        let newProducts = products;
        value.trim()

        newProducts[name] = value
        setProducts(newProducts)
    }

    const handleAddOneProduct = (e) => {
        const img = selectedImage;
        const { name, price, unit, quantity, description, category } = products;

        if (name === '' || price === 0 || unit === '' || quantity === 0) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const formData = new FormData();
        formData.append('photoProduct', img);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('unit', unit);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('category', category);


        const token = JSON.parse(localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN))[0];


        add1Product(formData, token).then(res => {
            const action = {
                type: 'ALL_PRODUCTS',
                products: res.data.products
            }
            dispatch(action)
        }).catch(err => {
            console.log(err)
        })

        // add1Product(formData, token).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    useEffect(() => {
        getCategory().then(res => {
            // console.log(res)
            setCategory(res.data.category)
        })
        getUnits().then(res => {
            // console.log(res)
            setUnits(res.data.units)
        })
    }, [])

    return (
        <div className='container my-5'>
            <Button className='btn btn-primary' type="button" variant="" onClick={handleShow}>
                Thêm 1 sản phẩm <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><h5>Tên sản phẩm</h5></label>
                        <input type="text" className="form-control" id="name" name='name' placeholder="Tên sản phẩm" onChange={handleChange} />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label"><h5>Gía sản phẩm</h5></label>
                                <input type="number" className="form-control" id="price" name='price' placeholder="Gía sản phẩm" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unit" className="form-label"><h5>Đơn vị tính</h5></label>
                                {
                                    (units != null) ? <select className="form-control" onChange={handleChange} name='unit'>
                                        <option value='-1'>--Lựa chọn đơn vị tính--</option>
                                        {
                                            units.map((u, index) => {
                                                return <option value={u._id} key={index}>{u.name}</option>
                                            })
                                        }
                                    </select>
                                        : ''
                                }
                                <p className="text-danger"></p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label"><h5>Số lượng</h5></label>
                                <input type="number" className="form-control" id="quantity" name='quantity' placeholder="Số lượng" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label"><h5>Loại</h5></label>
                                {
                                    (category != null) ? <select className="form-control" onChange={handleChange} name='category'>
                                        <option value='-1'>--Lựa chọn loại sản phẩm--</option>
                                        {
                                            category.map((u, index) => {
                                                return <option value={u._id} key={index}>{u.name}</option>
                                            })
                                        }
                                    </select>
                                        : ''
                                }
                                <p className="text-danger"></p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label"><h5>Hình ảnh</h5></label>
                        <input
                            className='btn'
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                // console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }} />
                        {selectedImage && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button className='btn btn-danger mt-4' onClick={() => setSelectedImage(null)}>Remove</button>
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><h5>Mô tả</h5></label><br />
                        <textarea name='description' className="form-control" onChange={handleChange} placeholder='nhập miêu tả sản phảm tại đây'></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAddOneProduct}>
                        Thêm sản phẩm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
