import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import "./MallCart.css";
import { ACCEPT_HEADER, get_analytic_bundle, get_mall_analytic, get_mall_cart, mall_cart_remove_item } from "../../utils/Constant";
import axios from "axios";
import Item from "antd/es/list/Item";
import Notification from "../../utils/Notification"
import { useMallContext } from "../../context/mall_context";




const MallCart = ({ setTab,get_mall_auth_data}) => {

  const [getCartData, setCartData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [getCartTotal, setCartTotal] = useState();
  const [loading, setLoading] = useState(false);
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { getBrand,getMallCartApi } = useMallContext();



  useEffect(() => {
    getCartDataApi();
  }, [])

  // const getCartDataApi = async () => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));
  //   setLoading(true);
  //   axios
  //     .get(get_mall_cart, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       ("ggg", JSON.stringify(res.data, null, 2));
  //       if (res.data.success == 1) {
  //         setCartData(res.data.data);
  //         setCartTotal(getCartData.length * res.data.data[0].price);
  //         ("mall cart data are",getCartData);
  //         setLoading(false);
  //       } else {
  //         null;
  //       }
  //     })
  //     .catch((err) => {
  //      console.log("err11", err);
  //       setLoading(false);
  //     });
  // };


  const checkout = (price) => {

    localStorage.setItem('checkoutproce', JSON.stringify(price))
    setTab(24);
  }


  // const getCartDataApi = async () => {
  //   const token = await JSON.parse(localStorage.getItem("is_token"));
  //   setLoading(true);
  //   fetch(get_analytic_bundle + `?per_page=${perPage}&page=${page}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: ACCEPT_HEADER,
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       ('re754775775675', res.data);
  //       setTotalPages(res.data.last_page);
  //       setEventList([...eventList, ...res.data.data]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       ("err", err);
  //     });
  // };

  const getCartDataApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
  
    try {
      const response = await axios.get(get_mall_cart, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success === 1) {
        const cartData = response.data.data;
        setCartData(cartData);
        setCartTotal(cartData.length * cartData[0].price);
        ("mall cart data are", cartData);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const removeMallCartApi = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    await formdata.append("id", id);


    ("-=-=-=->", formdata);
    axios
      .post(mall_cart_remove_item, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          getMallCartApi();
          Notification("success", "Success!", "Remove to Cart Successfully!");
          setTab(21);
          getCartDataApi();
        } else {

          null;
        }
      })
      .catch((err) => {
       console.log("err11", err);
      });
  };

  return (
    <>
      {loading === true ? (

        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="MallCart_main">
            <div>
              <h1 className="h1" style={{ fontWeight: "600" }}>
                {get_mall_auth_data.name}: My Cart
              </h1>
            </div>
            <div>
              <h5 className="h5" style={{ fontWeight: "700",color:"var(--color-orange)" }}>Analytics Bundle ({getCartData.length}) {}
              </h5>
            </div>

            {getCartData.map((item) => {
              return (
                <>
                  <div className="mallcart_items_main">

                    <div>
                      <h6 className="h6 mall_cart_head_box" style={{ fontWeight: "600" }}>
                       {item?.malls?.name}  Analytics Bundle
                      </h6>

                      <h6 className="h6 mall_cart_head_box" style={{ fontWeight: "400",color:"red",fontSize:"14px",marginTop:"0.5rem" }}>
                       {item?.analyticbundles?.from_date} - {item?.analyticbundles
                        ?.to_date}  
                      </h6>
                    </div>
                    <div className="mallcart_items_inner">
                      <div className="mall_cart_price_box">
                        <h6 className="h6" style={{ fontWeight: "600" }}>
                          R {item && item.price}
                        </h6>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center",cursor:"pointer" }} onClick={() => { removeMallCartApi(item.id) }}>
                        <p>Remove</p>
                        <div className="cartdelete_icon_main" >
                          <img
                            src={images.delete_icon}
                            alt="delete_icon"
                            className="cartdelete-icon_inner"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mallcart_carttotal_checkoutbtn">
                    <div>
                      <h4 className="h4">Total R {item && item.price}
                      </h4>
                    </div>

                    <div style={{ alignSelf: "flex-end" }}>
                      <button className="btn btn-black" onClick={() => { checkout(item.price) }}>Proceed to checkout</button>
                    </div>
                  </div> */}
                </>
              )
            })}

              <div className="mallcart_carttotal_checkoutbtn">
                    <div>
                      <h4 className="h4">Total R &nbsp;
                      {/* {item && item.price} */}
                      {getCartTotal == undefined || getCartData.length <= 0 ? 0 : getCartTotal}
                      </h4>
                    </div>

                    <div style={{ alignSelf: "flex-end" }}>
                      <button className="btn btn-black" disabled={getCartData.length <= 0 ? true : false}
                      onClick={() => {setTab(24)
                       }}
                       >Proceed to checkout</button>
                    </div>
                  </div>
            {/* <div className="mallcart_items_main">

        <div>
          <h6 className="h6" style={{ fontWeight: "600" }}>
            V&A Warterfront Mall Analytics Bundle
          </h6>
        </div>
        <div className="mallcart_items_inner">
          <div>
            <h6 className="h6" style={{ fontWeight: "600" }}>
              R 4800
            </h6>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <p>Remove</p>
            <div className="cartdelete_icon_main">
              <img
                src={images.delete_icon}
                alt="delete_icon"
                className="cartdelete-icon_inner"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mallcart_carttotal_checkoutbtn">
        <div>
          <h4 className="h4">Total R4800</h4>
        </div>

        <div style={{ alignSelf: "flex-end" }}>
          <button className="btn btn-black">Proceed to checkout</button>
        </div>
      </div> */}
          </div>
        </>)}
    </>
  );
};

export default MallCart;