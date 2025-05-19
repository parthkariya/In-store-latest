import React, { useEffect, useState } from "react";
import { BsArrowRight, BsChevronDown } from "react-icons/bs";
import { MallHero, StoreDCard, StoreECard } from "../components";
import images from "../constants/images";
import ReactModal from "react-modal";
import { GrClose } from "react-icons/gr";
import { FaPhone } from "react-icons/fa";
import { useMallContext } from "../context/mall_context";
import { Link } from "react-router-dom";
import { ACCEPT_HEADER, get_delete_popup, get_eatery_mall_wise, mall_delete_eatery } from "../utils/Constant";
import axios from "axios";
import Notification from "../utils/Notification"


const StoresData = [
  {
    id: 1,
    img: images.et_logo1,
  },
  {
    id: 2,
    img: images.et_logo2,
  },
  {
    id: 3,
    img: images.et_logo3,
  },
  {
    id: 4,
    img: images.et_logo4,
  },
  {
    id: 5,
    img: images.et_logo5,
  },
  {
    id: 6,
    img: images.et_logo6,
  },
  {
    id: 7,
    img: images.et_logo7,
  },
  {
    id: 8,
    img: images.et_logo8,
  },
  {
    id: 9,
    img: images.et_logo9,
  },
  {
    id: 10,
    img: images.et_logo3,
  },
  {
    id: 11,
    img: images.et_logo11,
  },
  {
    id: 12,
    img: images.et_logo12,
  },
];

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

const Eateries = ({
  setTab,
  getsingleStoreData,
  setSingleStoreData,
  get_mall_auth_data,
  eaterypage,
  setEateryPage,
  eaterytotalPages,

  setStore_id,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [get_main_name, Set_Main_Name] = useState('');
  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [getdelete_popup_data, setdelete_popup_data] = useState({});

  const { DeleteStoreApi } = useMallContext();



  // const [getsingleStoreData, setSingleStoreData] = useState({});
  const { DeleteEateriesApi } = useMallContext();

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    // ("123", getsingleStoreData);
    getEateryList();
    DeleteMallStoreModalData();
    const name = localStorage.getItem("mallmainname")

    Set_Main_Name(name)
  }, []);

  const [eateryList, setEateryList] = useState([]);
  const [eateryloading, setEateryLoading] = useState(false);

  const getEateryList = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    setEateryLoading(true);

    axios
      .get(get_eatery_mall_wise, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // (
        //   "get_eatery_mall_wise--->>",
        //   JSON.stringify(res.data, null, 2)
        // );

        setEateryList(res.data.data);
        setEateryLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setEateryLoading(false);
      });
  };
  // const DeleteMallEateriesData = async () => {
  //   {
  //     const formdata = await new FormData();
  //     await formdata.append("eatery_id", getsingleStoreData.id);

  //     // ("-=-=-=->", formdata);
  //     const data = await DeleteEateriesApi(formdata);
  //     if (data) {
  //       if (data.success == 1) {
  //         //           Notification("success", "Success!", "Eateries Deleted Successfully!");
  //         setIsOpen(false);

  //         getEateryList();
  //         setTab(4);
  //         // getStore();
  //       } else {
  //         // null;
  //       }
  //     }
  //   }
  // };

  // const DeleteMallEateriesData = async () => {
  //   // Validate inputs


  //   try {
  //     const formdata = await new FormData();
  //     await formdata.append("eatery_id", getsingleStoreData.id);

  //     const token = JSON.parse(localStorage.getItem("is_token"));

  //     const response = await axios.post(mall_delete_eatery, formdata, {
  //       headers: {
  //         Accept: "application/x.inapp.v1+json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data.success === 1) {
  //       Notification("success", "Success!", "Eateries Deleted Successfully!");
  //       setIsOpen(false);

  //       getEateryList();
  //       setTab(4);
  //     } else {
  //       Notification("error", "Error!", "Failed to Delete Eatery!");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting eatery:", error);
  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //     }
  //     Notification("error", "Error!", "An error occurred while deleting the eatery.");
  //   }
  // };

  const DeleteMallEateriesData = async () => {
    {
      const formdata = await new FormData();
      await formdata.append("store_id", getsingleStoreData.id);

      // ("-=-=-=->", formdata);
      const data = await DeleteStoreApi(formdata);
      if (data) {
        if (data.success === 1) {
                    setIsOpen(false);

          Notification("success", "Success!", "Eatery Deleted Successfully!");
          setTab(4);
          // getStore();
         getEateryList();

        }
      }
    }
  };

  

  const DeleteMallStoreModalData = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));


    const formdata = await new FormData();
    await formdata.append("type", 1);

    // ("-=-=-=->", formdata);


    setEateryLoading(true);

    axios
      .post(get_delete_popup, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        // ("get delete modal data---->>>>", res);
        // setStoreTotalPages(res.data.last_page);
        setdelete_popup_data(res.data.data);
        setEateryLoading(false);
      })
      .catch((err) => {
        ("err", err);
      });


  };


  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
  };
  return (
    <>
      {eateryloading === true ? (
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
          <div className="">
            <MallHero get_mall_auth_data={get_mall_auth_data} />
          </div>

          <div className="mm_main_wrapp">
            <div className="mall_name_wrapp mall_name_wrapp_brand_mall mall_mall_name_wrapp">
              {/* <p className="mall_name_heading">{get_mall_auth_data.name}:</p> */}
              <p className="mall_name_heading mall_mall_name_heading">{get_main_name}:</p>
              <span className="mall_mall_name_heading" style={{ fontWeight: "600" }}>Eateries</span>
            </div>
            <button onClick={() => setTab(34)} className="upload_retail_btn">
              Upload Eatery Directory{" "}
              <BsArrowRight size={20} style={{ marginLeft: "10px" }} />
            </button>
            {/* <div className="mm_horizontal_line"></div> */}
            {/*  Add New Button start */}
            {/*  Add New Button end */}
            <div className="sd_cards_grid">
              {eateryList && eateryList.length > 0
                ? eateryList.map((item, index) => {
                  return (
                    <StoreECard
                      key={item.id}
                      img={item.store_logo_path}
                      itm={item}
                      setSingleStoreData={setSingleStoreData}
                      setIsOpen={setIsOpen}
                      setTab={setTab}
                      setStore_id={setStore_id}
                      getEateryList={getEateryList}
                      getdelete_popup_data={getdelete_popup_data}
                    />
                  );
                })
                : null}
              {/* <Link
              to=""
              className="leaderboard-btn"
              style={{ justifyContent: "flex-end" }}
              onClick={() => setTab(15)}
            >
              Add new{" "}
              <img src={images.add_new} className="leaderboard-btn-icon" />
            </Link> */}

            </div>
            {/*  Add New Button start */}
            <div className="mall-store-directory-add-btn"
              style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "2rem", paddingRight: "5rem" }}
            >
              <button
                onClick={() => setTab(15)}
                className="leaderboard-btn"
                style={{ justifyContent: "flex-end" }}
              >
                Add new single eatery{" "}
                <img src={images.add_new} className="leaderboard-btn-icon" />
              </button>
            </div>
            {eateryList && eateryList.length > 9 ? (
              <Link
                to=""
                className="leaderboard-btn"
                style={{ justifyContent: "flex-end" }}
              >
                Add new{" "}
                <img src={images.add_new} className="leaderboard-btn-icon" />
              </Link>
            ) : null}
            {/* {eaterytotalPages !== eaterypage && (
          <button
            className="view_more_btn"
            onClick={() => setEateryPage(eaterypage + 1)}
          >
            {eateryloading ? "Loading..." : "Load More Eateries"}
            <BsChevronDown />
          </button>
        )} */}

            {/* store detail model */}

            <ReactModal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="sd_model_wrapp">
                {/* edit btn */}
                {/* <div className="sd_model_edit_wrap">
              <button onClick={closeModal}>
                <img src={images.close} alt="" />
              </button>
            </div> */}

                {/* pert - 1 */}
                <div className="sd_model_sec1">
                  {/* edit and delete orange btns start */}
                  <div className="sd_model_edit_wrap">
                    <button style={{ paddingTop: "2rem" }}
                      className="sd_modal_edit_btn_wrapp"
                      onClick={() => {
                        setTab(8);
                        setStore_id(getsingleStoreData.id);
                      }}
                    >
                      <img src={images.edit_icon1} alt="" />
                      <p style={{ color: "#000" }}>Edit</p>
                    </button>
                    <button style={{ paddingTop: "2rem" }}
                      className="sd_modal_edit_btn_wrapp"
                      onClick={() => {
                        DeleteMallEateriesData();
                      }}
                    >
                      <img src={images.delete_icon1} alt="" />
                      <p style={{ color: "#000" }}>Remove</p>
                    </button>

                    <button onClick={closeModal}>
                      <img src={images.close} alt="" />
                    </button>
                  </div>
                  {/* edit and delete orange btns end */}
                  <div className="sd_model_sec1_img_wrapp">
                    <img src={getsingleStoreData.store_logo_path} alt="" style={{ filter: "grayscale(100%)" }} />
                  </div>

                  <div className="sd_model_sec1_name_part">
                    <h3
                      className="mb_8"
                      style={{
                        letterSpacing: "1px", fontWeight: "600", fontSize: "26px"
                      }}
                    >
                      {getsingleStoreData.name}
                    </h3>
                    <p>
                      Shop no: <span style={{ fontSize: "14px", fontWeight: "400" }}>{getsingleStoreData.store_no}</span>
                    </p>
                    <p>
                      Level:
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>{getsingleStoreData.store_level}</span>
                    </p>
                    <div className="sd_model_sec2" style={{ marginTop: "12px", flexDirection: "column", gap: "8px" }}>
                      <div className="sd_model_sec2_sigle">
                        <FaPhone color="var(--color-orange)" size={16} />
                        <p style={{ fontSize: "14px", fontWeight: "400" }}>+{getsingleStoreData.number}</p>
                      </div>
                      <div className="sd_model_sec2_sigle">
                        <img src={images.send} alt="" />
                        <p style={{ fontSize: "14px", fontWeight: "400" }}>{getsingleStoreData.email}</p>
                      </div>
                    </div>
                    {/* <p>
                      Trading Hours:
                      <span>
                        {getsingleStoreData.mon_fri_from_time} -{" "}
                        {getsingleStoreData.mon_fri_to_time}
                      </span>
                    </p> */}
                  </div>
                  <div className="sd_modal_time">
                    <p className="sd_modal_time_head">Trading Hours:</p>
                    <div className="sd_modal_time_inner">
                      <p>
                        <span style={{ fontSize: "14px", fontWeight: "400" }}>Mon - Fri: {getsingleStoreData.mon_fri_from_time === "" ||
                          getsingleStoreData.mon_fri_from_time == null ||
                          getsingleStoreData.mon_fri_from_time == "undefined"
                          ? ""
                          : getsingleStoreData.mon_fri_from_time}am - {getsingleStoreData.mon_fri_to_time === "" ||
                            getsingleStoreData.mon_fri_to_time == null ||
                            getsingleStoreData.mon_fri_to_time == "undefined"
                            ? ""
                            : getsingleStoreData.mon_fri_to_time}pm</span></p>

                      <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Sat: {getsingleStoreData.sat_from_time === "" ||
                        getsingleStoreData.sat_from_time == null ||
                        getsingleStoreData.sat_from_time == "undefined"
                        ? ""
                        : getsingleStoreData.sat_from_time}am - {getsingleStoreData.sat_to_time === "" ||
                          getsingleStoreData.sat_to_time == null ||
                          getsingleStoreData.sat_to_time == "undefined"
                          ? ""
                          : getsingleStoreData.sat_to_time}pm</span></p>

                      <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Sun: {getsingleStoreData.sun_from_time === "" ||
                        getsingleStoreData.sun_from_time == null ||
                        getsingleStoreData.sun_from_time == "undefined"
                        ? ""
                        : getsingleStoreData.sun_from_time}am - {getsingleStoreData.sun_to_time === "" ||
                          getsingleStoreData.sun_to_time == null ||
                          getsingleStoreData.sun_to_time == "undefined"
                          ? ""
                          : getsingleStoreData.sun_to_time}pm</span></p>


                      <p><span style={{ fontSize: "14px", fontWeight: "400" }}>Public Holiday: {getsingleStoreData.holiday_from_time === "" ||
                        getsingleStoreData.holiday_from_time == null ||
                        getsingleStoreData.holiday_from_time == "undefined"
                        ? ""
                        : getsingleStoreData.holiday_from_time}am - {getsingleStoreData.holiday_to_time === "" ||
                          getsingleStoreData.holiday_to_time == null ||
                          getsingleStoreData.holiday_to_time == "undefined"
                          ? ""
                          : getsingleStoreData.holiday_to_time}pm</span></p>


                    </div>
                  </div>
                </div>
                {/* pert - 2 */}
                {/* <div className="sd_model_sec2">
                  <div className="sd_model_sec2_sigle">
                    <FaPhone color="var(--color-orange)" size={16} />
                    <p>+{getsingleStoreData.number}</p>
                  </div>
                  <div className="sd_model_sec2_sigle">
                    <img src={images.send} alt="" />
                    <p>{getsingleStoreData.email}</p>
                  </div>
                </div> */}
                {/* pert - 3 */}
                <div className="sd_model_sec3">
                  <p style={{ fontSize: "14px", fontWeight: "400" }}>{getsingleStoreData.description}</p>
                </div>
              </div>
              {/* </div> */}
            </ReactModal>
          </div >
        </>
      )}
    </>
  );
};

export default Eateries;