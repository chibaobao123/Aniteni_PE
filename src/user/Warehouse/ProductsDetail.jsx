import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getCategory, getUnits, updateProduct } from "../../api/products.js";

export default function ProductsDetail({ showDeitail, showDeitailId }) {
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState({
        url: "https://via.placeholder.com/",
        oldPic: true,
    });

    const [products, setProducts] = useState({
        _id: -1,
        name: "",
        price: 0,
        unit: "",
        quantity: 0,
        description: "",
        category: "",
    });

    const [units, setUnits] = useState(null);

    const [category, setCategory] = useState(null);

    const [disabled, setDisabled] = useState("disabled");

    const handleClose = () => {
        const action = {
            type: "CLOSE_DETAIL",
        };
        dispatch(action);
    };

    const handleChange = (e) => {
        let { value, name } = e.target;
        // console.log(value);

        let newProduct = products;
        value.trim()

        newProduct[name] = value
        setProducts(newProduct)
        setDisabled('')
    };

    const handleAddOneProduct = (e) => {
        const { url, oldPic } = selectedImage;
        const { _id, name, price, unit, quantity, description, category } = products;
        const Products = products;

        console.log(oldPic);

        const token = JSON.parse(
            localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
        )[0];

        if (name === "" || price === 0 || unit === "" || quantity === 0) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (!oldPic) {
            const formData = new FormData();
            formData.append("photoProduct", url);
            formData.append("_id", _id);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("unit", unit);
            formData.append("quantity", quantity);
            formData.append("description", description);
            formData.append("category", category);

            // updateProduct(formData, token).then(res => {
            //         console.log(res.data.products)
            //         const action = {
            //             type: 'ALL_PRODUCTS',
            //             products: res.data.products
            //         }
            //         dispatch(action)
            //     }).catch(err => {
            //         console.log(err)
            //     })
        } else {
            updateProduct(Products, token).then(res => {
                // const action = {
                //     type: 'ALL_PRODUCTS',
                //     products: res.data.products
                // }
                // dispatch(action)
            }).catch(err => {
                console.log(err)
            })
        }
    };

    useEffect(() => {
        setSelectedImage({
            url: `http://localhost:4000/${showDeitailId.image}`,
            oldPic: true,
        });
        setProducts(showDeitailId);
        getCategory().then((res) => {
            // console.log(res)
            setCategory(res.data.category);
        });
        getUnits().then((res) => {
            // console.log(res)
            setUnits(res.data.units);
        });
    }, [showDeitail]);

    return (
        <Modal show={showDeitail} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            <h5>Tên sản phẩm</h5>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Tên sản phẩm"
                            defaultValue={products.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    <h5>Gía sản phẩm</h5>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    defaultValue={products.price}
                                    placeholder="Gía sản phẩm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unit" className="form-label">
                                    <h5>Đơn vị tính</h5>
                                </label>
                                <select
                                    className="form-control"
                                    onChange={handleChange}
                                    name="unit"
                                >
                                    <option value="-1">--Lựa chọn đơn vị tính--</option>
                                    {units != null
                                        ? units.map((u, index) => {
                                            return (
                                                <option value={u._id} key={index}>
                                                    {u.name}
                                                </option>
                                            );
                                        })
                                        : ""}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    <h5>Số lượng</h5>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Số lượng"
                                    defaultValue={products.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    <h5>Loại</h5>
                                </label>
                                <select
                                    className="form-control"
                                    onChange={handleChange}
                                    name="category"
                                >
                                    <option value="-1">--Lựa chọn loại sản phẩm--</option>
                                    {category != null
                                        ? category.map((u, index) => {
                                            return (
                                                <option value={u._id} key={index}>
                                                    {u.name}
                                                </option>
                                            );
                                        })
                                        : ""}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            <h5>Hình ảnh</h5>
                        </label>
                        <input
                            className="btn"
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage({
                                    url: event.target.files[0],
                                    oldPic: false,
                                });
                            }}
                        />
                        <div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={
                                    selectedImage.oldPic
                                        ? selectedImage.url
                                        : selectedImage.url == undefined
                                            ? (selectedImage.url =
                                                "https://via.placeholder.com/250x150")
                                            : URL.createObjectURL(selectedImage.url)
                                }
                            />
                            <br />
                            {!selectedImage.oldPic ? (
                                <button
                                    className="btn btn-danger mt-4"
                                    onClick={() =>
                                        setSelectedImage({
                                            url: `http://localhost:4000/${products.image}`,
                                            oldPic: true,
                                        })
                                    }
                                >
                                    Remove
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            <h5>Mô tả</h5>
                        </label>
                        <br />
                        <textarea
                            name="description"
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={products.description}
                            placeholder="nhập miêu tả sản phảm tại đây"
                        ></textarea>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button
                    variant="primary"
                    onClick={handleAddOneProduct}
                    disabled={disabled}
                >
                    Cập nhật sản phẩm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
