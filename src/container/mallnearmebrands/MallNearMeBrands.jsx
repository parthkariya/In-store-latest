import React, { useEffect, useState } from "react";
import "./MallNearMeBrands.css";
import { HiOutlineSearch } from "react-icons/hi";
import images from "../../constants/images";
import {
  BrandItmCard,
  CustomerHero,
  CustomerHeroSecond,
  MallHero,
} from "../../components";
import { BsChevronDown } from "react-icons/bs";
import { useMallContext } from "../../context/mall_context";
import ReactModal from "react-modal";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ACCEPT_HEADER, get_category, get_customer_retailer_brand, get_mall_customer_Brand } from "../../utils/Constant";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";

const BrandData = [
  {
    id: 1,
    img: images.sl1,
  },
  {
    id: 2,
    img: images.sl2,
  },
  {
    id: 3,
    img: images.sl3,
  },
  {
    id: 4,
    img: images.sl4,
  },
  ,
  {
    id: 5,
    img: images.sl5,
  },
  {
    id: 6,
    img: images.sl6,
  },
];

const MallNearMeBrands = ({ getsingalmalldata, setTab, setBDetalis, getRetailerBrandData, setRetailerBrandData, getRetailerBrandLoading, setRetailerBrandLoading, sidebaropen,SetNavBarData,
  SetNavBarDataName,
  SetNavBarData1,
  respSearch,
  setResponSearch, }) => {
  const { get_mall_auth_data, get_mall_store_data } = useMallContext();
  const [brandModalOpen, setBrandModalClose] = useState(false);
  const [getbranddata, SetBrandData] = useState("");
  const [getValue, setValue] = useState(false);
  const [getserach, setSerach] = useState("");


  function closeModal() {
    setBrandModalClose(false);
  }

  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      backgroundColor: "none",
      border: "none",
      borderRadius: "0px",
    },
    overlay: {
      zIndex: 10000,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);

  const [proList, setProList] = useState([]);
  const [proList2, setProList2] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // const [getRetailerBrandData, setRetailerBrandData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [getRetailerBrandLoading, setRetailerBrandLoading] = useState(false);

  const [filterClass, setFilterClass] = useState("hidden");
  const [isTransitionActive, setIsTransitionActive] = useState(false);

  useEffect(() => {
    if (respSearch) {
      setFilterClass("visible");
    } else {
      setFilterClass("hidden");
    }
  }, [respSearch]);

  useEffect(() => {
    BrandApi();
  }, [page]);

  const [catarray, SetArray] = useState([]);

  useEffect(()=>{
    getcat();

  },[])

  const getcat = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_category, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetArray(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("error11", err);
      });
  };

  const BrandApi = async () => {
    setValue(false);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    // await formdata.append("search", "");
    await formdata.append("mall_id", getsingalmalldata.id);
    setLoading(true);
    fetch(get_mall_customer_Brand + `per_page=${perPage}&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.data.last_page);
        setProList([...proList, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {});
  };

  const BrandApiserch = async (value) => {
    setValue(false);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    await formdata.append("search", value);
    await formdata.append("mall_id", getsingalmalldata.id);
    // setLoading(true);
    fetch(get_mall_customer_Brand + `per_page=3&page=${page}`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setTotalPages(res.data.last_page);
        console.log("ressss", res.data.data);
        setProList([...proList, ...res.data.data]);
        // setLoading(false);
      })
      .catch((err) => {});
  };

  const FilterApiserch = async (value) => {
    setValue(true);

    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    await formdata.append("orderBy", value);
    await formdata.append("mall_id", getsingalmalldata.id);
    // setLoading(true);
    fetch(get_mall_customer_Brand + `per_page2=3&page2=1`, {
      method: "POST",
      body: formdata,
      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages2(res.data.last_page);
        setProList2([...proList2, ...res.data.data]);
        // setLoading(false);
      })
      .catch((err) => {
        "err", err;
      });
  };

  const customerRetailerBrands = async (id) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    setRetailerBrandLoading(true);
    const formdata = new FormData();
    await formdata.append("mall_id", getsingalmalldata.id);
    await formdata.append("store_id", id);
    axios
      .post(get_customer_retailer_brand, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          // Notification("success", "Success!", "Update Successfully!");
          console.log("data are",res.data);
          setRetailerBrandData(res.data.data);
          setRetailerBrandLoading(false);
        }
      })
      .catch((err) => {
        console.log("error11", err);
        setRetailerBrandLoading(false);

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
    <div>
      {loading === true ? (
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
      ) : (
        <>
        <div
              className={`resp_cust_search_filter_main ${respSearch ? "open" : ""
                } ${isTransitionActive ? "transition-active" : ""} `}
            >
              <div className="cus-nav-filter-flex">
                <div
                  className="mm_form_single_input mm_form_single_input2"
                  style={{ gap: "7px" }}
                >
                  <label
                    className="leaderboard-card-lbl"
                    style={{ minWidth: "68px", fontWeight: "300" }}
                  >
                    Filter by:
                  </label>
                  <div
                    className="select-wrapper"
                    style={{ width: "100%", marginRight: "1.1rem" }}
                  >
                    <select
                      className="leaderboard-card-inp cons_select_nav"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        SetNavBarData(e.target.value.slice(0, 2));
                        SetNavBarDataName(e.target.value.slice(2));

                        setTab(35);
                      }}
                    >
                      <option selected disabled value="">
                        Select category
                      </option>
                      {catarray &&
                        catarray.map((item, index) => {
                          return (
                            <>
                              <option
                                value={`${item.id} ${item.name}`}
                                key={index}
                              >
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="mm_form_single_input mm_form_single_input2"
                style={{ gap: "7px", width: "100%" }}
              >
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "68px", fontWeight: "300" }}
                >
                  Search
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    // paddingLeft: "4.4rem"
                  }}
                >
                  <input
                    type="text"
                    className="cus-nav-search cus-nav-search2 leaderboard-card-inp"
                    style={{ paddingRight: "30px" }}
                    placeholder="Search Name & Tag"
                    onChange={(e) => {
                      setSerach(e.target.value);
                    }}
                  />
                  <HiOutlineSearch
                    onClick={() => {
                      SetNavBarData1(getserach);
                      setTab(35);
                    }}
                    color="var(--color-black)"
                    size={15}
                    style={{ position: "absolute", right: "30px" }}
                  />
                </div>
              </div>
            </div>
        <div className="mall_nearme_brand_main_wrapp">
          {/* <CustomerHero getsingalmalldata={getsingalmalldata} /> */}
          <CustomerHeroSecond getsingalmalldata={getsingalmalldata} sidebaropen={sidebaropen} />
          <div className="mm_main_wrapp" style={{ marginTop: "2.2rem" }}>
          <div className='edit-brand-back-iconbox' style={{width:"80px"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            {/* heading */}
            <div className="profile_head_center cus-brand-headd">
              <h4
                className="h3"
                style={{ textTransform: "capitalize", fontWeight: "600" }}
              >
                {getsingalmalldata.name}
              </h4>{" "}
              <span className="h3" style={{ fontWeight: "600" }}>
                Brands
              </span>
            </div>
            {/* filter */}
            <div
              className="mall_near_brand_filter_sec_wrap"
              style={{ marginTop: "40px" }}
            >
              <div className="mall_near_brand_searchbar">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    e.target.value.length > 0
                      ? (setProList([]),
                        setPage(1),
                        BrandApiserch(e.target.value))
                      : (setProList([]), setPage(1), BrandApi());
                  }}
                />
                <HiOutlineSearch color="var(--color-orange)" size={18} />
              </div>
              <div className="mall_near_brand_select_wrapp mallnearme-brand-filter-width">
                <p
                  className="mallnearme-brands-filter"
                  style={{ width: "initial" }}
                >
                  Filer by :
                </p>

                <select
                  className="mall_near_brand_selectbox"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    width: "80%",
                  }}
                  defaultValue="" // Use defaultValue instead of selected
                  onChange={(e) => {
                    if (e.target.value === "1") {
                      setProList2([]);
                      setPage2(1);
                      setProList([]);
                      setPage(1);
                      FilterApiserch("1");
                    } else if (e.target.value === "") {
                      setProList2([]);
                      setPage2(1);
                      setProList([]);
                      setPage(1);
                      BrandApi();
                    }
                  }}
                >
                  {/* <option value="" disabled>
                    A-Z
                  </option> */}
                  <option value="" disabled={getValue === true ? false : true}>
                    A-Z
                  </option>
                  <option
                    value="1"
                    disabled={getValue === false ? false : true}
                  >
                    Z-A
                  </option>{" "}
                  {/* No need for onChange here */}
                </select>
              </div>
            </div>
            {/* brands */}

            {getValue === true ? (
              <>
                <div className="mall_near_brand_list_wrapp">
                  {proList2 && proList2.length > 0
                    ? proList2.map((brndItm) => {
                        return (
                          <button
                            onClick={() => {
                              // setBrandModalClose(true);
                              SetBrandData(brndItm);
                              setBDetalis(brndItm);
                              customerRetailerBrands(brndItm.id);
                              setTab(26);
                            }}
                          >
                            <BrandItmCard
                              img={brndItm.store_logo_path}
                              key={brndItm.id}
                            />
                          </button>
                        );
                      })
                    : null}
                </div>
              </>
            ) : (
              <>
                <div className="mall_near_brand_list_wrapp">
                  {proList && proList.length > 0
                    ? proList.map((brndItm) => {
                        return (
                          <button
                            onClick={() => {
                              // setBrandModalClose(true);
                              SetBrandData(brndItm);
                              setBDetalis(brndItm);
                              customerRetailerBrands(brndItm.id)
                              setTab(26);
                            }}
                          >
                            <BrandItmCard
                              img={brndItm.store_logo_path}
                              key={brndItm.id}
                            />
                          </button>
                        );
                      })
                    : null}
                </div>
              </>
            )}

            {/* loadmore btn */}
            {getValue === true ? (
              <>
                {totalPages !== page2 && (
                  <button
                    className="view_more_btn"
                    onClick={() => setPage(page + 1)}
                  >
                    {loading ? "Loading..." : " Load More Brands"}
                    <BsChevronDown />
                  </button>
                )}
              </>
            ) : (
              <>
                {totalPages !== page && (
                  <button
                    className="view_more_btn"
                    onClick={() => setPage(page + 1)}
                  >
                    {loading ? "Loading..." : " Load More Brands"}
                    <BsChevronDown />
                  </button>
                )}
              </>
            )}

            {isVisible ? <>
              <div className='edit-brand-back-iconbox' style={{width:"80px",marginTop:"1.2rem"}} onClick={() => setTab(2)}><IoChevronBack className='edit-brand-back-icon' /> <p className='edit-brand-back-txt'>Back</p></div>

            </> : <></>}

          </div>
        </div>
        </>
      )}

      {/* store detail model */}

      <ReactModal
        isOpen={brandModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="sd_model_wrapp">
          {/* edit btn */}
          <div className="sd_model_edit_wrap">
            <button onClick={closeModal}>
              <img src={images.close} alt="" />
            </button>
          </div>

          {/* pert - 1 */}
          <div className="sd_model_sec1">
            <div className="sd_model_sec1_img_wrapp">
              <img
                src={
                  getbranddata.store_logo_path === null
                    ? images.et_logo2
                    : getbranddata.store_logo_path
                }
                alt=""
              />
            </div>
            <div className="sd_model_sec1_name_part">
              <h3
                className="h3 mb_8"
                style={{ letterSpacing: "1px", fontWeight: "800" }}
              >
                {getbranddata.category}
              </h3>
              <p>
                Shop no:{" "}
                <span>
                  {getbranddata.store_no ? getbranddata.store_no : ""}{" "}
                </span>
              </p>
              <p>
                Level:
                <span>{getbranddata.store_level}</span>
              </p>
              <p>
                Trading Hours:
                <span>
                  {getbranddata.mon_fri_from_time} -
                  {getbranddata.mon_fri_to_time}
                </span>
              </p>
            </div>
          </div>
          {/* pert - 2 */}
          <div className="sd_model_sec2">
            <div className="sd_model_sec2_sigle">
              <FaPhone color="var(--color-orange)" size={16} />
              <p> {getbranddata.number} </p>
            </div>
            <div className="sd_model_sec2_sigle">
              <img src={images.send} alt="" />
              <p>{getbranddata.email} </p>
            </div>
          </div>
          {/* pert - 3 */}
          <div className="sd_model_sec3">
            <p>
              Situated in the Clock Tower on the Fish Quay is Vida e Caffè.
              Inspired by the street cafés of Portugal, and infused with the
              vivacious energy of the people of Africa, Vida e Caffè is
              passionate about their coffee. Based on the fare typical of a
              street in Lisbon, Vida e Caffè allows you to enjoy a cup of Europe
              in Africa. A passion for perfection means this cafè always strives
              to serve the best espresso and espresso-based caffè beverages
              possible. The signature coffee bean has been meticulously selected
              and sourced from afar, taking up to three months to reach the
              stores. Here they’ve mastered the art of blending, discovered the
              ideal roasting time, and found the exact temperature to ensure
              your cup of Vida is the best quality it can possibly be. Also try
              some of the delectable desserts and light meals.
            </p>
          </div>
        </div>
        {/* </div> */}
      </ReactModal>
    </div>
  );
};

export default MallNearMeBrands;