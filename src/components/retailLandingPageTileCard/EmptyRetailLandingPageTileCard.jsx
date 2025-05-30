import React, { useEffect, useState } from "react";
import "./RetailLandingPageTileCard.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { BsChevronDown } from "react-icons/bs";
import { useStoreContext } from "../../context/store_context";
import ReactModal from "react-modal";
import { useMallContext } from "../../context/mall_context";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

import {
  ACCEPT_HEADER,
  add_store_cart,
  create_landingpagetile,
  get_region_mall,
} from "../../utils/Constant";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Notification from "../../utils/Notification";
import { DateRangePicker } from "rsuite";

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

const EmptyRetailLandingPageTileCard = ({
  item,
  mindx,
  getLeaderboard,
  setTab,
  peopleInfo,
  setPeopleInfo,
  getLandingpageTile,
  getweek,
  SetLiast,
  page,
  setPage,
}) => {
  const { get_brand_data, get_mall_data } = useMallContext();
  const { retailer_data, getRetailerApi, week_data, getStoreCartApi } =
    useStoreContext();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [BrandId, setBrandId] = useState("");
  const [MallName, setMallName] = useState("");
  const [MallId, SetMaillId] = useState("");
  const [Category, setCategory] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [Week, setWeek] = useState("");
  const [weekname, SetWeekName] = useState("");
  const [weekname1, SetWeekName1] = useState("");
  const [weekname2, SetWeekName2] = useState("");
  const [Region, setRegion] = useState([]);
  const [mallsOption, setMallsOption] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  //   useEffect(() => {
  //     getBrand(item.stores.retailer_id);
  //     GetRegion();
  //   }, []);

  const { UpdateLandingpageTileApi, deleteLandingpageTileApi } =
    useStoreContext();

  const { getBrand } = useMallContext();

  const [getcondation, SetCondation] = useState(false);

  const handleDateChange = (startDate, endDate) => {
    if ((startDate && endDate !== "") || (startDate && endDate !== null)) {
      SetWeekCondation(true);
    } else {
      SetWeekCondation(false);
    }
    setSelectedDates({ startDate, endDate });
  };

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        SetCondation(true);

        const maxSizeKB = 100; // Maximum size limit in KB
        const maxSizeBytes = maxSizeKB * 1024; // Convert KB to bytes

        const filteredFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const isSizeValid = file.size <= maxSizeBytes; // Limit size to 50KB (in bytes)
            const isImage = file.type.startsWith("image/"); // Check if it's an image file

            if (!isImage || !isSizeValid) {
              return null;
            }

            // Load image and wait for it to load
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });

            // Check image dimensions
            const isDimensionsValid = img.width == 689 && img.height == 474;

            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        // Filter out null values (files that were skipped)
        const validFiles = filteredFiles.filter((file) => file !== null);

        setFiles(
          validFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        if (validFiles.length !== acceptedFiles.length) {
          Notification(
            "error",
            "Error!",
            "Some files exceed the maximum size limit of 100KB or do not meet the dimension requirements of 689x474 pixels and will not be uploaded."
          );
        }

        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%" }}
      className="img-fluidb"
      alt="file"
    />
  ));

  const [getweekcondation, SetWeekCondation] = useState(false);

  const CreateLeaderBoardBanner = async () => {
    const token = await JSON.parse(localStorage.getItem("is_token"));

    const { startDate, endDate } = selectedDates;

    if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
      return;
    } else if (files == "" || undefined) {
      Notification("error", "Error!", "Please Upload Image!");
    } else {
      const formdata = await new FormData();
      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append(
        "to_date",
        moment(startDate[1]).format("YYYY-MM-DD")
      );

      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }

      axios
        .post(create_landingpagetile, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        })

        .then((res) => {
          if (res.data.success === 1) {
            Notification(
              "success",
              "Success!",
              "Landing Page Tile 1/2 Added Successfully!"
            );
            setTab(40);
            getLandingpageTile();
            getStoreCartApi();
          } else if (res.data.success === 0) {
            Notification("error", "Error!", res.data.message);
          }
        })
        .catch((err) => {
          console.log("error11", err);
        });
    }
  };

  const [mallMolalOpen, setMallModalIsOpen] = useState(false);
  function closeMallModal() {
    setMallModalIsOpen(false);
  }
  function openMallModal() {
    setMallModalIsOpen(true);
  }

  const [getmallarray, SetMallArray] = useState([]);

  const [gettrue, SetTrue] = useState(false);

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
      mallidarray.push({ id: id });
    }

    setSelectedMalls(updatedSelectedMalls);
  };

  const [getregion_array, SetRigion_Array] = useState([]);

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
      .catch((err) => {});
  };

  const [toggle, setToggle] = useState(null);

  return (
    <>
      <div className="leaderboard-card-main-wrapp">
        <div className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp-half">
          <div className="leaderboard-card-first-resp-main-wrapp">
            <p className="leaderboard-last-part-txt"></p>
          </div>

          <div className="leaderboard-card-part-first leaderboard-card-part-first-half">
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl" htmlFor="">
                Week:<span className="star_require">*</span>
              </label>

              <DateRangePicker
                oneTap
                hoverRange="week"
                isoWeek
                placeholder="Select your Week"
                className="leaderboard-card-inp DateRangePicker_LeaderboardCard"
                startDate={selectedDates.startDate} // Set the initial start date
                endDate={selectedDates.endDate}
                onChange={handleDateChange}
                disabledDate={combine(allowedMaxDays(7), beforeToday())}
              />
            </div>
          </div>

          <div
            className="leaderboard-card-part-sec leaderboard-card-part-sec-chng leaderboard-card-part-sec-half"
            {...getRootlogoProps()}
          >
            <input
              {...getInputlogoProps()}
              accept="image/jpeg, image/jpg, image/png, image/eps"
            />

            {getcondation === true ? (
              <>
                {files && files.length > 0 ? (
                  <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border">
                    {thumbs}
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <div className="leaderboard-card-part-sec2">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4>.JPG .PNG .GIF (689 x 474 pixels)</h4>
                      <p>(max 100kb)</p>

                      <p>You can also upload file by</p>
                      {/* <input
                      {...getInputlogoProps()}
                      accept="image/jpeg, image/jpg, image/png, image/eps"
                    /> */}
                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{
                          marginBottom: "10px",
                          color: "var(--color-orange)",
                          fontWeight: "600",
                        }}
                      >
                        click here
                      </button>
                      {/* <a href="">clicking here</a> */}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ width: "100%" }}>
                  <div className="leaderboard-card-part-sec2">
                    <AiOutlineCloudUpload
                      style={{
                        width: "60px",
                        height: "60px",
                        color: "var(--color-orange)",
                        marginBottom: "10px",
                      }}
                    />
                    <h4>.JPG .PNG .GIF (689 x 474 pixels)</h4>
                    <p>(max 100kb)</p>

                    <p>You can also upload file by</p>

                    <button
                      type="button"
                      className="click_upload_btn"
                      style={{ marginBottom: "10px", color: "var(--color-orange)",
                        fontWeight: "600", }}
                    >
                      click here
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="leaderboard-card-part-third leaderboard-card-part-third-chng leaderboard-card-part-third-half">
            <button className="leaderboard-delete-icon-btn"></button>
            <p className="leaderboard-last-part-txt"></p>
            <div className="leaderboard-btn-box">
              <button
                className="btn btn-black"
                style={{ padding: "0.4rem", fontSize: "16px" }}
                onClick={() => {
                  alert("First Update After Add to Cart");
                }}
              >
                Add To Cart
              </button>
            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                style={{ padding: "0.4rem", fontSize: "16px" }}
                onClick={() => {
                  CreateLeaderBoardBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>

          <div
            className="leaderboard-card-sec-resp-main-wrapp"
            style={{ gap: "0.5rem" }}
          >
            <div className="leaderboard-btn-box">
              <button
                style={{ width: "165px" }}
                className="btn btn-black"
                onClick={() => {
                  alert("First Update After Add to Cart");
                }}
              >
                Add To Cart
              </button>
            </div>

            <div className="leaderboard-btn-box">
              <button
                style={{ width: "165px" }}
                className="btn btn-orange"
                onClick={() => {
                  CreateLeaderBoardBanner();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={mallMolalOpen}
        onRequestClose={closeMallModal}
        style={customStyles}
      >
        <div className="select_mall_main_wrapp">
          <div className="select_mall_base_wrapp">
            {/* mall heading */}
            <p className="select_mall_heading">
              Select the malls that your brand features in:
            </p>

            <div className="select_mall_serch_wrapp">
              <input type="search" placeholder="Search" className="input_box" />
              <BiSearch
                className="select_mall_search_icon"
                size={25}
                color="var(--color-orange)"
              />
            </div>

            <div className="select_mall_tag_btns_wrapp">
              {/* {selectedMalls && selectedMalls.length > 0
                ? selectedMalls.map((mall, mindx) => {
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
                : null} */}
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

              {/* {getregion_array && getregion_array.length > 0
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
                                item.region_id === toggle ? "#ff8b00" : "#000",
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
                                      checked={selectedMalls.includes(itm.name)}
                                      onChange={(e) => {
                                        // handleCheckboxChange(e, itm, ind);
                                        handleMallChange(itm.name, itm.id);
                                      }}
                                    />
                                    <label htmlFor={itm.id}>{itm.name}</label>
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
                : null} */}
            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeMallModal();
                  SetTrue(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default EmptyRetailLandingPageTileCard;
