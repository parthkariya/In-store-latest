import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { MyArchiveRetailerProductTileCard, ProductTilesCard, RetailerNavigationBar } from "../../components";
import "./MyArchiveRetailerProductTile.css";
import {
  ACCEPT_HEADER,
  add_cart_productbannertile_batch_50,
  add_store_cart,
  dynamid_description,
  filter_producttilesbanner,
  get_producttilesbanner,
  get_region_mall,
  get_store_region_authwise,
  store_mall_from_region,
} from "../../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import ReactModal from "react-modal";
import { BiSearch } from "react-icons/bi";
import { useStoreContext } from "../../context/store_context";
import { useAuthContext } from "../../context/auth_context";
import axios from "axios";
import Notification from "../../utils/Notification";
import EmptyProductTilesCard from "../../components/producttilescard/EmptyProductTilesCard";

const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// model style

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

const AccordionData = [
  {
    id: 1,
    city: "Western Cape",
    mall: [
      {
        id: 1,
        name: "Bayside Mall",
      },
      {
        id: 2,
        name: "Blue Route Mall",
      },
      {
        id: 3,
        name: "Boulevard Square",
      },
    ],
  },
  {
    id: 2,
    city: "KZN",
    mall: [
      {
        id: 1,
        name: "Brackenfell Centre",
      },
      {
        id: 2,
        name: "Brackenfell Corner",
      },
      {
        id: 3,
        name: "Brackenfell Shopping Centre",
      },
    ],
  },
  {
    id: 3,
    city: "Eastern Cape",
    mall: [
      {
        id: 1,
        name: "Canal Walk",
      },
      {
        id: 2,
        name: "Cape Quarter",
      },
      {
        id: 3,
        name: "Cape Gate",
      },
    ],
  },
  {
    id: 4,
    city: "Free State",
    mall: [
      {
        id: 1,
        name: "Delft Mall",
      },
      {
        id: 2,
        name: "De Ville Centre",
      },
      {
        id: 3,
        name: "Durbanville Town Centre",
      },
    ],
  },
];

const MyArchiveRetailerProductTile = ({ get_mall_auth_data, setTab, gettab, getExtendId, setExtendId }) => {
  const { getCategoryApi, getWeekApi, getStoreCartApi } = useStoreContext();

  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const perPage2 = 3;
  const [totalPages2, setTotalPages2] = useState(1);
  const [page2, setPage2] = useState(1);

  const [getliast, SetLiast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getMallDisclaimerData, setMallDisclaimerData] = useState("");
  const [getBatchWiseData, setBatchWiseData] = useState({});

  // const [mainName, setMainName] = useState(
  //   get_mall_auth_data &&
  //     get_mall_auth_data.retailers &&
  //     get_mall_auth_data.retailers.name !== null
  //     ? get_mall_auth_data.retailers.name
  //     : ""
  // );
  const [mainName, setMainName] = useState(
    get_mall_auth_data &&
      get_mall_auth_data &&
      get_mall_auth_data.name !== null
      ? get_mall_auth_data.name
      : ""
  );
  useEffect(() => {
    getProductTiles();
  }, [page]);

  // console.log("getliast", getliast);

  const getProductTiles = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    setLoading(true);
    SetLiast([]);
    fetch(get_producttilesbanner + `per_page=${perPage}&page=${page}`, {
      method: "GET",

      headers: {
        Accept: ACCEPT_HEADER,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.data.last_page);
        // SetLiast([...getliast, ...res.data.data]);
        SetLiast(res.data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const UpdateRegionFilter = async (selectedOption) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    selectedOption.forEach((option, index) => {
      formdata.append(`region_id[${index}]`, option.value);
    });

    try {
      const res = await axios.post(store_mall_from_region, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      });
      setMallsOptions(res.data.data);
    } catch (err) {
      console.log("err11", err);
    }
  };

  // const LeaderboadFilter = async (selectedOption) => {
  //   const token = JSON.parse(localStorage.getItem("is_token"));

  //   const formdata = new FormData();
  //   getMallsRegion2.forEach((option, index) => {
  //     formdata.append(`region_id[${index}]`, option.value);
  //   });
  //   selectedOption.forEach((option, index) => {
  //     formdata.append(`mall_id[${index}]`, option.value);
  //   });

  //   try {
  //     const res = await axios.post(filter_leaderboard, formdata, {
  //       headers: {
  //         Accept: ACCEPT_HEADER,
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     (JSON.stringify(res, null, 2));
  //     setfilterData(res.data.data);
  //   } catch (err) {
  //    console.log("err11", err);
  //   }
  // };

  const LeaderboadFilter = async (selectedOption) => {
    const token = await JSON.parse(localStorage.getItem("is_token"));
    const formdata = new FormData();
    getMallsRegion2.forEach((option, index) => {
      formdata.append(`region_id[${index}]`, option.value);
    });
    selectedOption.forEach((option, index) => {
      formdata.append(`mall_id[${index}]`, option.value);
    });

    setLoading(true);
    fetch(filter_producttilesbanner + `per_page=${perPage2}&page=${page2}`, {
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
        // setProList2([...getfilterData, ...res.data.data]);
        SetLiast([...getfilterData, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Modal

  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  const [getweek, setWeek] = useState("");

  function closeMallModal() {
    setMallModalIsOpen(false);
  }

  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  // select chackbox functionality
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // const handleCheckboxChange = (event) => {
  //     setCheckboxChecked(event.target.checked);
  // };

  const handleCheckboxChange = (event, itm, ind) => {
    if (
      event.target.checked === true &&
      itm.region_id === toggle &&
      !peopleInfo.includes(itm.region_id)
    ) {
      setPeopleInfo([
        ...peopleInfo,
        {
          id: itm.id,
          name: itm.name,
          checked: event.target.checked,
          region_id: itm.region_id,
        },
      ]);
    } else {
      let result = peopleInfo.filter((item, key) => item.id != itm.id);
      setPeopleInfo(result);
    }
  };

  useEffect(() => {
    GetRegion();
    getCategoryApi();
    GetRegionFilter();
  }, []);

  // useEffect(() => {
  //   const newFilteredData = {};

  //   getliast.forEach(item => {
  //     const batchNo = item.batch_no;

  //     if (!newFilteredData[batchNo]) {
  //       newFilteredData[batchNo] = []; // Initialize an array for each unique batch_no
  //     }

  //     newFilteredData[batchNo].push(item); // Add item to the corresponding batch_no array
  //   });

  //   setBatchWiseData(newFilteredData);
  // }, [getliast]); // Re-run the effect whenever dataArray changes

  // console.log("filteredArrays",getBatchWiseData);

  const [getregion_array, SetRigion_Array] = useState([]);
  const [getregion_arrayfilter, SetRigion_Arrayfilter] = useState([]);

  const GetRegion = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_region_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          SetRigion_Array(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const GetRegionFilter = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_store_region_authwise, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          SetRigion_Arrayfilter(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const stateMultipleChange = async (selectedOption) => {
    setregionsOption(selectedOption);

    await UpdateRegionFilter(selectedOption);
    await setMallsRegion2(selectedOption);
  };

  const stateMultipleChange2 = async (selectedOption) => {
    setMallOptions(selectedOption);

    await LeaderboadFilter(selectedOption);
  };

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);
  const [regionsOption, setregionsOption] = useState([]);
  const [mallsOption, setMallOptions] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);
  const [getMallsOptions, setMallsOptions] = useState([]);
  const [getfilterData, setfilterData] = useState([]);
  const [getMallsRegion2, setMallsRegion2] = useState([]);

  const handleRegionChange = (regionName, id) => {
    const updatedSelectedRegions = [...selectedRegions];
    const index = updatedSelectedRegions.indexOf(regionName);

    if (index > -1) {
      updatedSelectedRegions.splice(index, 1);
    } else {
      updatedSelectedRegions.push(regionName);
      regionidarray.push({ id: id });
    }

    setSelectedRegions(updatedSelectedRegions);
  };

  const handleMallChange = (mallName, id) => {
    const updatedSelectedMalls = [...selectedMalls];
    const index = updatedSelectedMalls.indexOf(mallName);

    if (index > -1) {
      updatedSelectedMalls.splice(index, 1);
    } else {
      updatedSelectedMalls.push(mallName);
      mallidarray.push({ id: id });
    }

    setSelectedMalls(updatedSelectedMalls);
  };

  useEffect(() => {
    getWeekApi();
    getMallDescliemerApi();
  }, []);

  const Addtocart = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = await new FormData();
    await formdata.append("qty", 1);
    // await formdata.append("product_banner_tile_id", item.id);
    // for (var i = 0; i < getliast.length; i++) {
    //   if(getliast[i].cart_status == 0)
    //   await formdata.append("product_banner_tile_id[" + i + "]", getliast[i].id);
    // }
    // for (let i = 0, j = 0; i < getliast.length; i++) {
    //   if (getliast[i].cart_status === 0) {
    //     await formdata.append(
    //       "product_banner_tile_id[" + j + "]",
    //       getliast[i].id
    //     );
    //     j++; // Increment j only when an item is appended
    //   }
    // }

    await formdata.append("product_banner_tile_id[" + 0 + "]", getExtendId.id);
    axios
      .post(add_cart_productbannertile_batch_50, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // (JSON.stringify(res, null, 2));
        // window.location.reload(true);
        if (res.data.success == 1) {
          // window.location.reload(true);
          // setTab(1);
          setTab(31);
          getProductTiles();
          getStoreCartApi();

          // Notification("success", "Success!", "Add to cart Successfully!");
          Notification("success", "Success!", res.data.message);
        } else if (res.data.success == 0) {
          Notification("error", "Error!", res.data.message);
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const getMallDescliemerApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 2);
    axios
      .post(dynamid_description, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          setMallDisclaimerData(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

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
        <div className="mm_main_wrapp">
          <div className="leaderboard-sub-wrapp" style={{ gap: "1rem" }}>
            <RetailerNavigationBar
              title="My Archive"
              setTabType={gettab == 36 ? " In Mall Product Tiles" : ""}
            />
            {/* LeaderBoard name start */}
            <div
              className="mall_name_wrapp mall_name_wrapp-spacebetween"
              style={{ marginTop: "0px", paddingLeft: "0px" }}
            >
              <div className="leaderboard-inner-namebox">
                <p className="mall_name_heading">{mainName}:</p>
                <span
                  className="leaderboard-span"
                  style={{ fontWeight: "600" }}
                >
                  In Mall Product Tiles
                </span>
              </div>
            </div>
            {/* <p>
              Purchase marketing space through our Leaderboard Banners below
              (max 1 Leaderboard Banner per Reteiler per mall). There is a
              limited amount of 5 banners per mall. Fist come, first serve.
            </p> */}
            <p style={{ color: "gray" }}>
              {/* Maximum of 50 Product Tiles have been allocated for you to
              populate. */}
              {getMallDisclaimerData?.product_banner_tile}
            </p>
            <div className="mm_horizontal_line"></div>
            {/* LeaderBoard  name end */}

            {/* Leaderboard Filter Start */}
            {/* <div className="leaderboard-filter-main-wrapp">
              <div className="leaderboard-filter-part-first">
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "125px" }}
                >
                  Filter by region:
                </label>
                <div
                  style={{ width: "100%" }}
                >
                  <Select
                    value={regionsOption}
                    styles={{
                      width: "100%",
                      padding: "0px",
                      borderRadius: "4px",
                    }}
                    className="leaderboard-card-inp"
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    isMulti
                    options={getregion_arrayfilter}
                    onChange={stateMultipleChange}
                  />
                </div>
              </div>

              <div className="leaderboard-filter-part-sec">
                <label
                  className="leaderboard-card-lbl"
                  style={{ minWidth: "125px" }}
                >
                  Filter by mall:
                </label>
                <div
                  // className="select-wrapper"
                  style={{ width: "100%" }}
                >
                  <Select
                    value={mallsOption}
                    styles={{
                      width: "100%",
                      padding: "0px",
                      borderRadius: "4px",
                    }}
                    className="leaderboard-card-inp"
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    isMulti
                    options={getMallsOptions}
                    onChange={stateMultipleChange2}
                  />
                  
                </div>
              </div>
            </div> */}

            {/* <button className="leaderboard-btn" onClick={() => setTab(23)}>
              Add new{" "}
              <img
                src={images.add_new}
                alt=""
                className="leaderboard-btn-icon"
              />
            </button> */}

            {/* <button onClick={() => setTab(23)} className="leaderboard-btn">
              Add new{" "}
              <img
                src={images.add_new}
                alt=""
                className="leaderboard-btn-icon"
              />
            </button> */}

            {/* {getliast.length > 0 ? <>
            
              <button style={{ padding: "0.4rem", fontSize: "16px",width: "165px",alignSelf:"end" }}
                    className="btn btn-black"
                  
                    onClick={() => {
                      Addtocart();
                    }}>
                    
                    Add To Cart
                  </button>
            </> : <></>} */}


            {getExtendId.cart_status === 0 ? (
              <button
                style={{
                  padding: "0.4rem",
                  fontSize: "16px",
                  width: "165px",
                  alignSelf: "end",
                }}
                className="btn btn-black"
                onClick={() => {
                  Addtocart();
                }}
              >
                Add to Cart
              </button>
            ) : (
              <></>
            )}



            {/* {getliast && getliast.length > 0 ? (
              getliast.map((mall, mindx) => {
                return ( */}
            <MyArchiveRetailerProductTileCard
              openMallModal={openMallModal}
              item={getExtendId}
              setExtendId={setExtendId}
              // mindx={mindx}
              setTab={setTab}
              getweek={getweek}
              setWeek={setWeek}
              peopleInfo={peopleInfo}
              regionidarray={regionidarray}
              mallidarray={mallidarray}
              selectedMalls={selectedMalls}
              getregion_array={getregion_array}
              getProductTiles={getProductTiles}
            />
            {/* );
              })
            ) : (
              <EmptyProductTilesCard
                openMallModal={openMallModal}
                item={""}
                mindx={""}
                setTab={setTab}
                getweek={getweek}
                setWeek={setWeek}
                peopleInfo={peopleInfo}
                regionidarray={regionidarray}
                mallidarray={mallidarray}
                selectedMalls={selectedMalls}
                getregion_array={getregion_array}
                getProductTiles={getProductTiles}
              />
            )} */}
            <span
              style={{
                fontSize: "14px",
                color: "#bbb",
                alignSelf: "flex-start",
                marginBottom: "0.7rem",
              }}
            >
              *Required Fields including all image uploads.
            </span>
            {totalPages !== page && (
              <button
                className="view_more_btn"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : " Load More Product Tiles"}
                <BsChevronDown />
              </button>
            )}

            {totalPages2 !== page2 && (
              <button
                className="view_more_btn"
                onClick={() => setPage(page2 + 1)}
              >
                {loading ? "Loading..." : " Load More Product Tile"}
                <BsChevronDown />
              </button>
            )}
            {/* LeaderBoard Card Component end */}

            {/* LeaderBoard Add New Button start */}

            {/* <button style={{ padding: "0.4rem", fontSize: "16px",width: "165px",alignSelf:"end" }}
                    className="btn btn-black"
                  
                    onClick={() => {
                      Addtocart();
                    }}>
                    Add To Cart
                  </button> */}

            {/* <button onClick={() => setTab(23)} className="leaderboard-btn">
                  Add new{" "}
                  <img
                    src={images.add_new}
                    alt=""
                    className="leaderboard-btn-icon"
                  />
                </button> */}
            {getExtendId.cart_status === 0 ? (
              <button
                style={{
                  padding: "0.4rem",
                  fontSize: "16px",
                  width: "165px",
                  alignSelf: "end",
                }}
                className="btn btn-black"
                onClick={() => {
                  Addtocart();
                }}
              >
                Add to Cart
              </button>
            ) : (
              <></>
            )}



            {/* LeaderBoard Add New Button end */}
          </div>

          {/* select mall modal start */}
          <ReactModal
            isOpen={mallMolalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeMallModal}
            style={customStyles}
          >
            <div className="select_mall_main_wrapp">
              <div className="select_mall_base_wrapp">
                {/* mall heading */}
                <p className="select_mall_heading">
                  Select the malls that your brand features in:
                </p>

                {/* mall search */}
                <div className="select_mall_serch_wrapp">
                  <input
                    type="search"
                    placeholder="Search"
                    className="input_box"
                  />
                  <BiSearch
                    className="select_mall_search_icon"
                    size={25}
                    color="var(--color-orange)"
                  />
                </div>

                <div className="select_mall_tag_btns_wrapp">
                  {selectedMalls && selectedMalls.length > 0
                    ? selectedMalls.map((mall, mindx) => {
                      // ("gggg", mall);
                      return (
                        <button
                          className="select_mall_tag_single_btn"
                          style={{ backgroundColor: "#4FBB10" }}
                          key={mindx}
                        >
                          {mall}
                        </button>
                      );
                    })
                    : null}
                </div>

                <div className="mall_Select_wrapp">
                  <p
                    style={{
                      fontSize: "18px",
                      alignSelf: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    Region
                  </p>

                  {getregion_array && getregion_array.length > 0
                    ? getregion_array.map((item, index) => {
                      return (
                        <div
                          className="bim_accordian_wrapp"
                          style={{ marginBottom: "6px" }}
                          key={item.region_id}
                        >
                          <button
                            className="bim_accordian_btn"
                            onClick={() => {
                              setToggle(item.region_id);
                              handleRegionChange(
                                item.region_name,
                                item.region_id
                              );
                            }}
                          >
                            <p
                              style={{
                                color:
                                  item.region_id === toggle
                                    ? "#ff8b00"
                                    : "#000",
                                fontWeight:
                                  item.region_id === toggle ? "500" : "300",
                              }}
                            >
                              {item.region_name}
                            </p>

                            {item.region_id == toggle ? (
                              <IoIosArrowUp size={20} color="#ff8b00" />
                            ) : (
                              <IoIosArrowDown size={20} />
                            )}
                          </button>
                          {item.region_id == toggle ? (
                            <div className="bim_accordian_mall_wrapp">
                              {item.malls.map((itm, ind) => {
                                return (
                                  <>
                                    <div
                                      key={itm.id}
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedMalls.includes(
                                          itm.name
                                        )}
                                        // value={peopleInfo}
                                        onChange={(e) => {
                                          // handleCheckboxChange(e, itm, ind);
                                          handleMallChange(itm.name, itm.id);
                                        }}
                                      />
                                      <label htmlFor={itm.id}>
                                        {itm.name}
                                      </label>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                    : null}
                </div>

                <div className="leaderboard-btn-box">
                  <button
                    className="btn btn-orange"
                    onClick={() => {
                      closeMallModal();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </ReactModal>
          {/* select mall modal end */}
        </div>
      )}
    </div>
  );
};

export default MyArchiveRetailerProductTile;
