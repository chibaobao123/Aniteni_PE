import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../../api/products";

export default function SearchProducts() {
  const { products, users } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

  const container = useRef();

  const [search, setSearch] = useState();

  const [searchResault, setSearchResault] = useState([]);

  const [chooseResault, setChooseResault] = useState();

  const [errMsg, setErrMsg] = useState();

  const [productSearch, setProductSearch] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    let messageError = "";

    if (value.trim() === "") {
      messageError = "Vui lòng nhập sản phẩm tìm kiếm!";
    }

    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (value.match(format)) {
      messageError = "Vui lòng không gỏ ký tự đặc biệt!";
    }

    setErrMsg(messageError);
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let err = errMsg;
    if (err !== "") {
      alert(err);
      return;
    }

    let value = search;
    // console.log(value)

    searchProduct(value)
      .then(async (res) => {
        console.log(res);
        let show = await setProductSearch(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });

    // const action = {
    //     type:'SEARCH_PRODUCT',
    //     value:value
    // }
    // dispatch(action);
  };

  const handleClickOutside = (e) => {
    if (container.current.contains(e.target)) return;

    setProductSearch(false);
  };

  const handleChoseProducts = (e) => {
    const { id } = e.target;
    console.log(id);
    let newChooseResault = chooseResault;

    if (id !== -1) {
      let products = searchResault;
      products = products.filter((u) => u._id == id);
      console.log(products);
      newChooseResault = products[0];
      setProductSearch(false);
      setSearchResault([]);
      setSearch("");
    }
    setChooseResault(newChooseResault);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="mt-3 px-3 mb-3">
        <div className="row">
          <div className="col-6">
            <h4 className="my-3">Tìm kiếm sản phẩm</h4>
            <form
              action=""
              method="GET"
              onSubmit={handleSubmit}
              ref={container}
            >
              <div className="inputSearchProduct">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm tại đây"
                    aria-label="Tìm kiếm sản phẩm tại đây"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="input-group-text"
                    id="basic-addon2"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
                {!productSearch ? (
                  ""
                ) : (
                  <div className="list-group-products">
                    <ul className="list-group">
                      {productSearch.length > 0 ? (
                        productSearch.map((e, index) => {
                          return (
                            <li
                              key={index}
                              id={e._id}
                              onClick={handleChoseProducts}
                              className="list-group-item"
                            >
                              {e.name}
                            </li>
                          );
                        })
                      ) : (
                        <li className="list-group-item">
                          <b>Không tìm thấy sản phẩm ...</b>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
