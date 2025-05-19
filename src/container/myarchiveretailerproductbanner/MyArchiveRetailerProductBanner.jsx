import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyArchiveRetailerProductBannerCard, ProductBannerCard, RetailerNavigationBar } from "../../components";
import images from "../../constants/images";
import {
  ACCEPT_HEADER,
  dynamid_description,
  filter_leaderboard,
  filter_productbanner,
  get_productbanner,
  get_region_mall,
  get_store_region_authwise,
  store_mall_from_region,
} from "../../utils/Constant";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactModal from "react-modal";
import { useStoreContext } from "../../context/store_context";
import { useAuthContext } from "../../context/auth_context";
import axios from "axios";
import EmptyProductBannerCard from "../../components/productbannercard/EmptyProductBannerCard";

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

const MyArchiveRetailerProductBanner = ({ get_mall_auth_data, setTab, gettab,getExtendId,setExtendId }) => {
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const perPage2 = 3;
  const [totalPages2, setTotalPages2] = useState(1);
  const [page2, setPage2] = useState(1);
  const [getliast, SetLiast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getMallDisclaimerData, setMallDisclaimerData] = useState("");

  const [regionsOption, setregionsOption] = useState([]);
  const [mallsOption, setMallOptions] = useState([]);

  const [getMallsOptions, setMallsOptions] = useState([]);
  const [getfilterData, setfilterData] = useState([]);
  const [getMallsRegion2, setMallsRegion2] = useState([]);

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

  const { week_data, getCategoryApi, getWeekApi } = useStoreContext();
  const { region_data } = useAuthContext();

  useEffect(() => {
    getPromation();
  }, [page]);

  const stateMultipleChange = async (selectedOption) => {
    setregionsOption(selectedOption);

    await UpdateRegionFilter(selectedOption);
    await setMallsRegion2(selectedOption);
  };

  const stateMultipleChange2 = async (selectedOption) => {
    setMallOptions(selectedOption);

    await LeaderboadFilter(selectedOption);
  };

  const getPromation = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    setLoading(true);
    SetLiast([]);
    fetch(get_productbanner + `per_page=${perPage}&page=${page}`, {
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
    fetch(filter_productbanner + `per_page=${perPage2}&page=${page2}`, {
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
  //   setCheckboxChecked(event.target.checked);
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
    GetRegionFilter();
    GetRegion();
    getCategoryApi();
    getWeekApi();
    getMallDescliemerApi();
  }, []);

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

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedMalls, setSelectedMalls] = useState([]);

  const [mallidarray, SetMallidarray] = useState([]);
  const [regionidarray, SetRegionidarray] = useState([]);

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
      mallidarray.push({ id: id, reid:regionId });
    }

    setSelectedMalls(updatedSelectedMalls);
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
              title="Account Management"
              setTabType={gettab == 35 ? "In Mall Brand Banner Slider" : ""}
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
                  In Mall Brand Banner Slider
                </span>
              </div>
              {/* <button onClick={() => setTab(22)} className="leaderboard-btn">
                Add new{" "}
                <img
                  src={images.add_new}
                  alt=""
                  className="leaderboard-btn-icon"
                />
              </button> */}
            </div>
            <p>
              {/* Purchase marketing space through our In Mall Brand Banner Slider below (max 1 In Mall Brand Banner Slider per Retailer per mall). There is a limited 
            amount of 5 banners per mall. First come, first serve. */}
              {getMallDisclaimerData?.product_banner1}
            </p>
            <p style={{ color: "gray" }}>
              {/* Limited to three banner images per slider (If only one image is
              uploaded, the banner will remain static). */}
              {getMallDisclaimerData?.product_banner2}
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
            {/* Leaderboard Filter End */}

            {/* LeaderBoard subheading start */}

            {/* <p className="leaderboard-sub-heading">Purchase marketing space through our Leaderboard Banner below (max 1 Leaderboard Banner per Brand)</p> */}

            {/* LeaderBoard subheading end */}

            {/* LeaderBoard Card Component start */}
            {/* <LeaderBoardCard /> */}
            {/* {getliast && getliast.length > 0 ? (
              getliast.map((mall, mindx) => {
                return ( */}
                  <MyArchiveRetailerProductBannerCard
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
                    getPromation={getPromation}
                  />
                {/* );
              })
            ) : (
              <EmptyProductBannerCard
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
                getPromation={getPromation}
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
                {loading ? "Loading..." : " Load More Brand Banner"}
                <BsChevronDown />
              </button>
            )}
            {/* LeaderBoard Card Component end */}

            {/* LeaderBoard Add New Button start */}

            {/* {getliast.length > 0 ? ( */}
            {/* <Link to="" onClick={() => setTab(22)} className="leaderboard-btn">
              Add new{" "}
              <img src={images.add_new} className="leaderboard-btn-icon" />
            </Link> */}
            {/* ) : null} */}

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

                {/* <div
                  className="leaderboard-card-inpbox-wrapp"
                  style={{ alignItems: "center" }}
                >
                  <label className="leaderboard-card-lbl">Slect Weeks:</label>
                  <select
                    className="leaderboard-card-inp"
                    // value={MallName}
                    onChange={(e) => {
                      setWeek(e.target.value);
                      (e.target.value);
                    }}
                  >
                    <option selected disabled value="">
                      Select Week
                    </option>

                    {week_data &&
                      week_data.map((item, index) => {
                        return (
                          <>
                          
                            <option value={item.id} key={index}>
                              {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                              &nbsp;&nbsp;&nbsp; {item.to_date}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div> */}

                {/* mall selected tag */}
                <div className="select_mall_tag_btns_wrapp">
                  {selectedMalls && selectedMalls.length > 0
                    ? selectedMalls.map((mall, mindx) => {
                        // ("gggg", mall);
                        return (
                          <button
                            className="select_mall_tag_single_btn"
                            style={{ backgroundColor: "#4FBB10" }}
                            key={mindx}
                            // onClick={() => {
                            //   handleMallChange(mall);
                            //   // setPeopleInfo(
                            //   //   peopleInfo.filter(
                            //   //     (people) => people.name !== mall.name
                            //   //   )
                            //   // );
                            // }}
                          >
                            {mall}
                            {/* <IoIosClose className="select_mall_tag_single_btn_close" /> */}
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

                                          // type="checkbox"
                                          // checked={
                                          //   getcheck[(itm, ind, "", item.region_id)]
                                          // }
                                          // onChange={(e) => {
                                          //   check(itm, ind, "", item.region_id);
                                          // }}
                                          // value={peopleInfo}
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

export default MyArchiveRetailerProductBanner;
