import React, { useEffect, useState } from "react";
import "./WishlistPage.css";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CustomerBrandCard, CustomerBrandCardWishlist } from "../../components";
import axios from "axios";
import { ACCEPT_HEADER, get_wishlist } from "../../utils/Constant";
import { IoChevronBack } from "react-icons/io5";

const AccordionData = [
    {
        id: 1,
        mall: "Western Cape mall",
        brand: [
            {
                id: 1,
                name: "Guess",
            },
            {
                id: 2,
                name: "Gucci",
            },
        ],
    },
    {
        id: 2,
        mall: "V&A Waterfront Mall",
        brand: [
            {
                id: 1,
                name: "LV",
            },
            {
                id: 2,
                name: "prada",
            },
        ],
    },
];

const WishlistPage = ({ setTab, sidebaropen, setMapUrl }) => {
    const [getDropDownOpen, setDropDownOoen] = useState(false);
    const [toggle, setToggle] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    let handleToggle = (id) => {
        if (toggle === id) {
            setToggle(null);
            return false;
        }
        setToggle(id);
    };

    useEffect(() => {
        getWishlist();
    }, []);

    const [getlist, SetList] = useState([]);
    const [getseclist, SetsecList] = useState([]);
    const [getitem, SetItem] = useState("");
    const [loading, setLoading] = useState(false);

    const getWishlist = async () => {
        const token = JSON.parse(localStorage.getItem("is_token"));
        setLoading(true);
        axios
            .get(get_wishlist, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                // ("ggg", JSON.stringify(res.data, null, 2));
                if (res.data.success == 1) {
                    SetList(res.data.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    
                }
            })
            .catch((err) => {
                console.log("err11", err);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;

            // Show the button when the user scrolls down (e.g., more than 100px)
            if (scrollTop > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {loading === true ? <>
                <div
                    style={{
                        width: "100%",
                        height: "80vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div className="loader"></div>
                </div>
            </> : <>
                <div className="mm_main_wrapp wishlist-page-padding mm_main_wrapp_22">
                    <Link to="/mallnearme" className='edit-brand-back-iconbox' style={{ width: "80px" }}
                    // onClick={() => setTab(2)}

                    ><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></Link>

                    <div className="mall_name_wrapp mall_name_wrapp_cus_wishlist" style={{ paddingLeft: "0rem" }}>
                        <p className="mall_name_heading">My wishlist</p>
                    </div>
                    <span></span>
                    {/* </div> */}
                    {/* <div className="mm_horizontal_line"></div> */}
                    <p className="cus-wishlist-sub-heading">
                        You can only purchase these products in store.
                    </p>
                    <p style={{ marginBottom: "0rem", marginTop: "1rem", color: "#bbb", fontSize: "16px", }}>Please note: Products will be removed from the Wishlist page when the brand promotion has expired.</p>
                    {/* First DropDown Start */}
                    {getlist && getlist.length > 0
                        ? getlist.map((item, index) => {
                            return (
                                <div style={{ marginBottom: "20px" }} key={item.id}>
                                    <div
                                        className="wishlist-head-btn-flex wishlist-find-way-flex"
                                    // style={{
                                    //   display: "flex",
                                    //   justifyContent: "space-between",
                                    //   alignItems: "flex-end",
                                    // }}
                                    >
                                        <div style={{ width: "100%" }}>
                                            <div className="cus-wishlist-dropdown-erapp">
                                                {/* {item.products && item.products.length > 0
                        ? item.products.map((itm, inx) => {
                            return ( */}
                                                <p
                                                    className="cus-wishlist-dropdown-heading"
                                                    style={{
                                                        color: item.id === toggle ? "#ff8b00" : "#000",
                                                        fontWeight: item.id === toggle ? "800" : "800",
                                                        fontSize: "20px",
                                                    }}>
                                                    {item.name ? item.name : ""}
                                                </p>
                                                {/* );
                          })
                        : null} */}

                                                <button
                                                    to={""}
                                                    onClick={() => {
                                                        handleToggle(item.id);
                                                        // SetsecList(item.stores);
                                                        // SetItem(item);
                                                    }}>
                                                    {item.id === toggle ? (
                                                        <BsChevronUp />
                                                    ) : (
                                                        <BsChevronDown />
                                                    )}
                                                </button>
                                            </div>

                                            {/* </div> */}

                                            {item.stores && item.stores.length > 0
                                                ? item.stores.map((itm2, inx) => {
                                                    return (

                                                        <>
                                                            {item.id === toggle ? (
                                                                <>
                                                                    <div className="wish_find_way_flex" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                                                        <p className="cus-wishlist-dropdown-sub-heading">
                                                                            {itm2.name ? itm2.name : ""}
                                                                        </p>

                                                                        <div className="find-my-way-btn-flex">
                                                                            <button
                                                                                className="find-my-way-btn wish_btn_find_way"
                                                                                onClick={() => {
                                                                                    setTab(29);
                                                                                    setMapUrl(item);
                                                                                }}
                                                                            >
                                                                                Find my way
                                                                            </button>
                                                                            <BsArrowRight className="find-my-way-btn-arrow find-my-way-btn-arrow_wish" />
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            height: "2px",
                                                                            width: "100%",
                                                                            backgroundColor: "#ddd",
                                                                            marginTop: "10px",
                                                                        }}></div>
                                                                    <div className="cus-wishlist-dropdown-prod-wrapp">
                                                                        {itm2.wishlists && itm2.wishlists.length > 0
                                                                            ? itm2.wishlists.map((itm1, inx1) => {
                                                                                return (
                                                                                    <div className="cus-wishlist-dropdown-prod-wrapp">
                                                                                        <CustomerBrandCardWishlist
                                                                                            data={itm1}
                                                                                            replce={2}
                                                                                            mainitem={item}
                                                                                            getWishlist={getWishlist}
                                                                                            setTab={setTab}
                                                                                        />
                                                                                    </div>
                                                                                );
                                                                            })
                                                                            : null}
                                                                    </div>
                                                                </>
                                                            ) : null}
                                                        </>
                                                    );
                                                })
                                                : null}
                                        </div>
                                        {/* <p className="cus-wishlist-dropdown-sub-heading">GUESS</p> */}

                                    </div>
                                    <div
                                        style={{
                                            height: "2px",
                                            width: "100%",
                                            backgroundColor: "#ddd",
                                            marginTop: "10px",
                                        }}></div>
                                    {item.id === toggle ? (
                                        <div className="cus-wishlist-dropdown-main-wrapp">
                                            {getseclist && getseclist.length > 0
                                                ? getseclist.map((itm2, inx2) => {
                                                    return (
                                                        {/* <>
                              {itm2.wishlists && itm2.wishlists.length > 0
                                ? itm2.wishlists.map((itm1, inx1) => {
                                    return (
                                      <div className="cus-wishlist-dropdown-prod-wrapp">
                                        <CustomerBrandCardWishlist
                                          data={itm1}
                                          replce={2}
                                          mainitem={item}
                                          getWishlist={getWishlist}
                                        />
                                      </div>
                                    );
                                  })
                                : null}
                            </> */}
                                                    );
                                                })
                                                : null}

                                            {/* <div className="cus-wishlist-dropdown-sec-part">
                      <p className="cus-wishlist-dropdown-sub-heading-sec">
                        Incredible Connections
                      </p>
                      <div className="cus-wishlist-dropdown-prod-wrapp">
                        <CustomerBrandCard />
                      </div>
                    </div> */}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })
                        : null}

                    {/* First DropDown end */}

                    {/* Second DropDown start */}
                    {/* <div className="cust-wishlist-main-wrapp">
           <div className="cus-wishlist-dropdown-erapp">
             <p
               className="cus-wishlist-dropdown-heading"
               style={{
                 color: getDropDownOpen ? "#ff8b00" : "#000",
                 fontWeight: getDropDownOpen ? "800" : "800",
                 fontSize: "20px",
               }}
             >
               Tygervalley
             </p>
             <button to={""} onClick={() => setDropDownOoen(!getDropDownOpen)}>
               {getDropDownOpen ? <BsChevronUp /> : <BsChevronDown />}
             </button>
           </div>
           <p className="cus-wishlist-dropdown-sub-heading">GAME</p
           {getDropDownOpen ? (
             <div className="cus-wishlist-dropdown-main-wrapp">
               <div className="cus-wishlist-dropdown-prod-wrapp">
                 <CustomerBrandCard />
                 <CustomerBrandCard />
                 <CustomerBrandCard />
               </div
               <div className="cus-wishlist-dropdown-sec-part">
                 <p className="cus-wishlist-dropdown-sub-heading-sec">
                   Incredible Connections
                 </p>
                 <div className="cus-wishlist-dropdown-prod-wrapp">
                   <CustomerBrandCard />
                 </div>
               </div>
             </div>
           ) : null}
         </div> */}
                    {/* Second DropDown end */}
                    {isVisible ? <>
                        <Link to="./mallnearme" className='edit-brand-back-iconbox' style={{ width: "80px", marginTop: "2rem" }}
                        // onClick={() => setTab(2)}
                        ><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></Link>

                    </> : <></>}

                </div>
            </>}

        </>
    );
};

export default WishlistPage;
