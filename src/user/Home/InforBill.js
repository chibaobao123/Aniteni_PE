import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faXmark, faMoneyBill, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { searchUsers, createNewCustomer } from "../../api/users";
import { createBills } from "../../api/bills";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function InforBill() {
    const [show, setShow] = useState(false);

    const container = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { allProducts } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [customerSearch, setCustomerSearch] = useState(false)


    const [searchResault, setSearchResault] = useState([]);

    const [errMsg, setErrMsg] = useState();
    const [errMsgModals, setErrMsgModals] = useState();

    const [bills, setBills] = useState({
        custumer: {
            _id: '-1',
        },
        products: allProducts,
        cast: {
            PhuongThucThanhToan: 0,
            Soluong: 0,
            TongTien: 0,
        },
        note: '',
    });

    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
    });


    const handleChoseCustomer = (e) => {
        const { id } = e.target;
        console.log(id)
        let bill = bills;

        if (id !== -1) {
            let user = searchResault;
            user = user.filter((u) => u._id == id);
            console.log(user)
            bill.custumer = user[0];
            setCustomerSearch(false);
            setSearchResault([])
            setSearch('')
        }
        setBills(bill)
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        let messageError = "";
        let bill = bills;

        if (value.trim() === "") {
            messageError = "Vui lòng nhập sản phẩm tìm kiếm!";
        }

        var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

        if (value.match(format)) {
            messageError = "Vui lòng không gỏ ký tự đặc biệt!";
        }

        if (name == 'ThanhToan') {
            bill.cast.PhuongThucThanhToan = value
        }

        if (name == 'SoLuong') {
            bill.cast.Soluong = value
        }

        if (name == 'TongTien') {
            bill.cast.TongTien = value
        }

        if (name == 'note') {
            bill.note = value
        }

        setBills(bill)

        setErrMsg(messageError);
        setSearch(value);
    };

    const handleChangeModals = (e) => {
        const { value, name } = e.target;
        let newCustomer = customer;

        let messageError = '';

        if (name === 'phone') {
            let regexPhone = /^(\s*|(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b)$/;

            if (!regexPhone.test(value)) {
                messageError = 'Số điện thoại không đúng định dạng !';
                setErrMsgModals(messageError)
            } else {
                setErrMsgModals('')
            }
        }

        newCustomer[name] = value
        setCustomer(newCustomer)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        let value = search;
        // console.log(value)

        if (value == '') {
            alert('Vui lòng điền thông tin cần tìm kiếm');
            return;
        }

        let resault = await searchUsers(value)
            .then((res) => {
                // console.log(res);
                if (res.data.users.length === 0) {
                    alert("không tìm thấy khách hàng !!");
                    return
                }
                setCustomerSearch(true)
                setSearchResault(res.data.users)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = bills;
        let token = JSON.parse(localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN))[0];

        createBills(data, token).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }

    const handleSubmitCreateNewCustomer = (e) => {
        e.preventDefault();

        let err = errMsgModals;
        if (err !== '') {
            alert(err);
            return
        }

        createNewCustomer(customer).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClickOutside = (e) => {
        if (container.current.contains(e.target)) return;

        setCustomerSearch(false)

    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="col-4">
            <div className="ThongTin">
                <form className="p-3 shadow text-dark" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <p>
                            <FontAwesomeIcon icon={faUser} />
                            <span className="m-3">
                                <b>Khách hàng</b>
                            </span>
                        </p>
                    </div>
                    <div className="KhachHang input-group mb-3" ref={container}>
                        <span className="input-group-text p-0 m-0">
                            <button className="btn" type="button" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm khách hàng - Nhập ít nhất 4 kí tự"
                            name="searchUser"
                            autoComplete="off"
                            onChange={handleChange}
                            value={search}
                            required
                        />
                        <span className="input-group-text p-0 m-0">
                            <Button className='btn' type="button" variant="" onClick={handleShow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </span>
                        {
                            customerSearch ? <div className='list-group-customer'>
                                <ul className="list-group">
                                    {searchResault.map((e, index) => {
                                        return <li key={index} id={e._id} onClick={handleChoseCustomer} name='KhachHang' className="list-group-item form-control">
                                            {e.firstName + e.lastName + '-' + e.phone}
                                        </li>
                                    })}
                                </ul>
                            </div>
                                : ''
                        }

                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>ANTENI - CHUYÊN ĐỒ DA HANDMAKE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label"><h5>Họ</h5></label>
                                <input type="text" className="form-control" id="firstName" name='firstName' placeholder="Họ người dùng" required onChange={handleChangeModals} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label"><h5>Tên</h5></label>
                                <input type="text" className="form-control" id="lastName" name='lastName' placeholder="Tên người dùng" required onChange={handleChangeModals} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label"><h5>Số điện thoại</h5></label>
                                <input type="text" className="form-control" id="phone" name='phone' placeholder="Số điện thoại" required onChange={handleChangeModals} />
                                <p className="text-danger">{errMsgModals}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label"><h5>Địa chỉ</h5></label>
                                <input type="text" className="form-control" id="address" name='address' placeholder="Địa chỉ" required onChange={handleChangeModals} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={handleSubmitCreateNewCustomer}>
                                Tạo người dùng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row">
                        <div className="col-5">
                            <p>Mã khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Doanh số tích lũy:</p>
                            <p>địa chỉ:</p>
                        </div>
                        <div className="col-5">
                            <p><b>{bills.custumer._id}</b></p>
                            <p><b>{bills.custumer.phone}</b></p>
                            <p><b>{bills.custumer.accumulation}</b></p>
                            <p><b>{bills.custumer.address}</b></p>
                        </div>
                    </div>
                    <hr />
                    <div className="ThanhToan">
                        <p>
                            <FontAwesomeIcon icon={faWallet} />
                            <span className="m-3">
                                <b>Thanh toán</b>
                            </span>
                        </p>
                        <select className="form-select mb-3" onChange={handleChange} name="ThanhToan">
                            <option defaultValue value="0">
                                Thanh toán khi nhận hàng
                            </option>
                            <option value="1">Chuyển khoản</option>
                        </select>
                        <div className="row">
                            <div className="col-5">
                                <p>Số lượng sản phẩm:</p>
                                <p>Tạm tính:</p>
                            </div>
                            <div className="col-5">
                                <p onChange={handleChange} name='SoLuong'>{bills.cast.Soluong}</p>
                                <p onChange={handleChange} name='TongTien'>{bills.cast.TongTien}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="GhiChu" className="form-label">
                            Ghi chú
                        </label>
                        <textarea className="form-control" id="GhiChu" rows="3" onChange={handleChange} name='note'></textarea>
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <span className="mx-3">Thanh toán</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
