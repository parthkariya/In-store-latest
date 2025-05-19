import React, { useEffect, useState } from "react";
import "./CinemaTilesCard.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMallContext } from "../../context/mall_context";
import { useStoreContext } from "../../context/store_context";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Notification from "../../utils/Notification";
import axios from "axios";
import {
  ACCEPT_HEADER,
  add_store_cart,
  get_age_restriction,
  get_region_mall,
} from "../../utils/Constant";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReactModal from "react-modal";
import moment from "moment";
import { DateRangePicker } from "rsuite";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const animatedComponents = makeAnimated();

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

const EmptyCinemaProducttileCard = ({
  item,
  mindx,
  getLeaderboard,
  setTab,
  peopleInfo,
  setPeopleInfo,
  getProductTiles,
  getweek,
}) => {
  const {
    DeleteProductTileApi,
    category_data,
    cinema_category_data,
    UpdateProductTilesApi,
    multiple_week_data,
    week_data,
    getStoreCartApi,
    CreateProductTileApi,
  } = useStoreContext();
  const { get_brand_data, get_mall_data } = useMallContext();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [MallName, setMallName] = useState("");
  const [Category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [ageId, setAgeId] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDiscription] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [BrandId, setBrandId] = useState("");
  const [mallid, SetMaillId] = useState("");
  const [Week, setWeek] = useState("");
  const [weekname, SetWeekName] = useState("");
  const [weekname1, SetWeekName1] = useState("");
  const [weekname2, SetWeekName2] = useState("");
  const [getTag, setTag] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [qrDiscount, setQrDiscount] = useState("");


  const [Region, setRegion] = useState([]);
  const [mallsOption, setMallsOption] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  // const [deletemodalstate, setDleteModalstate] = useState(false);
  const [getcondition, setCondition] = useState(false);

//   console.log("image path",item.image_path);
  
  
  useEffect(() => {
    GetRegion();
 
    setTitle(item.title ? item.title : "");
    SetMaillId(item.malls ? item.malls.id : "");
    setMallName(
      item.malls == null ||
        item.malls == "" ||
        item.malls.name == null ||
        item.malls.name == ""
        ? ""
        : item.malls.name
    );
    setBrandName(
      item.brands == null ||
        item.brands == "" ||
        item.brands.name == null ||
        item.brands.name == ""
        ? ""
        : item.brands.name
    );
    setBrandId(
      item.brands == null ||
        item.brands == "" ||
        item.brands.id == null ||
        item.brands.id == ""
        ? ""
        : item.brands.id
    );
    setCategory(
      item.cinema_categorys == null ||
        item.cinema_categorys == "" ||
        item.cinema_categorys.name == null ||
        item.cinema_categorys.name == ""
        ? ""
        : item.cinema_categorys.name
    );
    setCategoryId(
      item.cinema_categorys == null ||
        item.cinema_categorys == "" ||
        item.cinema_categorys.id == null ||
        item.cinema_categorys.id == ""
        ? ""
        : item.cinema_categorys.id
    );
    setAge(
      item.age_restrictions == null ||
        item.age_restrictions == "" ||
        item.age_restrictions.name == null ||
        item.age_restrictions.name == ""
        ? ""
        : item.age_restrictions.name
    );
    setAgeId(
      item.age_restrictions == null ||
        item.age_restrictions == "" ||
        item.age_restrictions.id == null ||
        item.age_restrictions.id == ""
        ? ""
        : item.age_restrictions.id
    );
    setDiscription(item.description ? item.description : item.description);
    setTag(item.tag ? item.tag : "");
    setPrice(item.price ? item.price : "");
    setBookingUrl(item.booking_url ? item.booking_url : "");
    SetWeekName(item.weeks ? item.weeks.name : "");
    SetWeekName1(item.weeks ? item.weeks.from_date : "");
    SetWeekName2(item.weeks ? item.weeks.to_date : "");
    SetMallArray(item.multiple_malls ? item.multiple_malls : "");
  }, []);

  // logo dropzon

  // const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
  //   useDropzone({
  //     onDrop: (acceptedFiles) => {
  //       const filteredFiles = acceptedFiles.filter(file => file.size <= 50000); // Limit size to 200KB (in bytes)

  //       {
  //         setFiles(
  //           filteredFiles.map((file) =>
  //             Object.assign(file, {
  //               preview: URL.createObjectURL(file),
  //             })
  //           )
  //         );
  //         if (filteredFiles.length !== acceptedFiles.length) {
  //           // Notification('');
  //           Notification("error", "Error!", "Some files exceed the maximum size limit of 50KB and will not be uploaded.");
  //         }
  //       }
  //       ("---->>>", files);

  //       setCondition(true);
  //       if (acceptedFiles.length === 0) {
  //         window.location.reload(true);
  //       }
  //     },
  //   });

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
  useDropzone({
    onDrop: async (acceptedFiles) => {  
      setCondition(true);

      const maxSizeKB = 50; // Maximum size limit in KB
      const maxSizeBytes = maxSizeKB * 1024; // Convert KB to bytes

      const filteredFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const isSizeValid = file.size <= maxSizeBytes; // Limit size to 50KB (in bytes)
          const isImage = file.type.startsWith("image/"); // Check if it's an image file

          if (!isImage || !isSizeValid) {
            return null; // Skip files that are not images or exceed size limit
          }

          // Load image and wait for it to load
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          // Check image dimensions
          const isDimensionsValid = img.width == 418 && img.height == 590;

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
          "Some files exceed the maximum size limit of 50KB or do not meet the dimension requirements of 418x590 pixels and will not be uploaded."
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

  const handleDateChange = (startDate, endDate) => {
    // ("==>", startDate, endDate);
    if ((startDate && endDate !== "") || (startDate && endDate !== null)) {
      SetWeekCondation(true);
    } else {
      SetWeekCondation(false);
    }
    setSelectedDates({ startDate, endDate });
  };

  const [getSearchQuery, setSearchQuery] = useState("");
  const [getFilterData, setFilterData] = useState("");

  // const SearchFilter = (text) => {
  //   setSearchQuery(text);

  //   const searchText = text.toLowerCase();
  //   const newData = getregion_array.filter(item => {
  //     const itemName = item.region_name.toLowerCase();
  //     return itemName.includes(searchText);
  //   });

  //   setFilterData(newData);
  // };

  const SearchFilter = (text) => {
    setSearchQuery(text);
  
    const searchText = text.toLowerCase();
    const newData = getregion_array.filter(item => {
      const regionName = item.region_name.toLowerCase();
      const mallMatch = item.malls.some(mall => mall.name.toLowerCase().includes(searchText));
  
      // Return true if either the region name or any mall name matches the search text
      return regionName.includes(searchText) || mallMatch;
    });
  
    setFilterData(newData);
  };

  // Update Promotion Banner Api

  const [getweekcondation, SetWeekCondation] = useState(false);

  const AddProductTilesBanner = async () => {
    // ("test");
    const { startDate, endDate } = selectedDates;
    // ("==>11", selectedDates);

    if (title == "" || undefined) {
      Notification("error", "Error!", "Please Enter Title!");
      return;
    } else if (mallidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Mall!");
      return;
    } else if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
      return;
    } else if (regionidarray == "" || undefined) {
      Notification("error", "Error!", "Please Select Region!");
    }
    // else if (BrandName == "" || undefined) {
    //   Notification("error", "Error!", "Please Select Brand!");
    // } 
    else if (ageId == "" || undefined) {
      Notification("error", "Error!", "Please Select Age!");
    } else if (files == "" || undefined) {
      Notification("error", "Error", "Please Upload Image");
      return;
    } else {
      const formdata = await new FormData();
      await formdata.append("title", title);
      await formdata.append("booking_url", bookingUrl);
      await formdata.append("age_restriction_id", ageId);
      // for (var i = 0; i < regionidarray.length; i++) {
      //   await formdata.append("region_id[" + i + "]", regionidarray[i].id);
      // }
      // for (var i = 0; i < mallidarray.length; i++) {
      //   await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
      // }

      for (var i = 0; i < mallidarray.length; i++) {
        await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
        await formdata.append("region_id[" + i + "]", mallidarray[i].reid);
      }
      // await formdata.append("brand_id", BrandName);
      await formdata.append("cinema_category_id", Category);
      //   await formdata.append("price", Price);
      //   await formdata.append("description", Description);
      //   await formdata.append("tag", getTag);
      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append("to_date", moment(startDate[1]).format("YYYY-MM-DD"));
      await formdata.append("region_child_id[0]", "");
      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }

      // ("-=-=-=->", formdata);
      const data = await CreateProductTileApi(formdata);
      if (data) {
        if (data.success === 1) {
          // ("category-data", data);
          Notification(
            "success",
            "Success!",
            "Product Tiles Added Successfully!"
          );

          setTab(3);
          getProductTiles();
          // window.location.reload();
        }else if (res.data.success == 0) {
          Notification("success", "Success!", res.data.message);
        }
      }
    }
  };

  const DeleteProductTilesboard = async () => {
    const formdata = await new FormData();
    await formdata.append("id", item.id);

    const data = await DeleteProductTileApi(formdata);
    if (data) {
      if (data.success === 1) {
        // ("mall-data", data);
        Notification(
          "success",
          "Success!",
          "Product Tiles Deleted Successfully!"
        );

        setTab(3);
        getProductTiles();
      }
    }
  };

  const Addtocart = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = await new FormData();
    await formdata.append("qty", 1);
    await formdata.append("product_banner_tile_id", item.id);

    axios
      .post(add_store_cart, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // (JSON.stringify(res, null, 2));
        // window.location.reload(true);
        getProductTiles();
        getStoreCartApi();

        Notification("success", "Success!", "Add to cart Successfully!");

      })
      .catch((err) => {
        console.log("err11", err);
      });
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
  const [agearray, SetAgeArray] = useState([]);

  // const handleRegionChange = (regionName, id) => {
  //   const updatedSelectedRegions = [...selectedRegions];
  //   const index = updatedSelectedRegions.indexOf(regionName);

  //   if (index > -1) {
  //     updatedSelectedRegions.splice(index, 1);
  //   } else {
  //     updatedSelectedRegions.push(regionName);
  //     regionidarray.push({ id: id });
  //   }

  //   setSelectedRegions(updatedSelectedRegions);
  // };

  // const handleMallChange = (mallName, id) => {
  //   const updatedSelectedMalls = [...selectedMalls];
  //   const index = updatedSelectedMalls.indexOf(mallName);

  //   if (index > -1) {
  //     updatedSelectedMalls.splice(index, 1);
  //   } else {
  //     updatedSelectedMalls.push(mallName);
  //     mallidarray.push({ id: id });
  //   }

  //   setSelectedMalls(updatedSelectedMalls);
  // };

  const handleMallChange = (
    checked,
    mallName,
    mallId,
    regionId,
    regionName
  ) => {
    const updatedSelectedMalls = checked
      ? [...selectedMalls, mallName]
      : selectedMalls.filter((name) => name !== mallName);
    const updatedMallIdArray = checked
      ? [...mallidarray, { id: mallId, reid: regionId }]
      : mallidarray.filter((mall) => mall.id !== mallId);

    setSelectedMalls(updatedSelectedMalls);
    SetMallidarray(updatedMallIdArray);

    updateSelectedRegions(regionId, regionName, updatedSelectedMalls);
  };

  const updateSelectedRegions = (
    regionId,
    regionName,
    updatedSelectedMalls
  ) => {
    const mallsInRegion = getregion_array
      .find((region) => region.region_id === regionId)
      .malls.map((mall) => mall.name);

    const isAnyMallSelected = mallsInRegion.some((mall) =>
      updatedSelectedMalls.includes(mall)
    );

    const updatedSelectedRegions = isAnyMallSelected
      ? [...selectedRegions, regionName]
      : selectedRegions.filter((name) => name !== regionName);
    const updatedRegionIdArray = isAnyMallSelected
      ? [...regionidarray, { id: regionId }]
      : regionidarray.filter((region) => region.id !== regionId);

    setSelectedRegions([...new Set(updatedSelectedRegions)]);
    SetRegionidarray(
      [...new Set(updatedRegionIdArray.map((region) => region.id))].map(
        (id) => ({ id })
      )
    );
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
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  const [toggle, setToggle] = useState(null);
  let handleToggle = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  const onDateChage = (dates) => {
    const [start, end] = dates;
    // setStartDate(start);
    // setEndDate(end);
  };

  useEffect(() => {
    getAge();
  }, []);

  const getAge = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_age_restriction, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetAgeArray(res.data.data);
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
      <div
        className="leaderboard-card-main-wrapp product-tiles-card-main-wrapp product-tiles-card-main-wrapp-cinema {
"
      >
        {/* Leaderboard flex start */}
        <div
          className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp-cinema"
          style={{ gap: "4%" }}
        >
          {/* Leaderboard first part responsive side start */}
          <div className="leaderboard-card-first-resp-main-wrapp">
            <p className="leaderboard-last-part-txt">
              {/* Service fee will apply if canceled */}
            </p>
            <button
              className="leaderboard-delete-icon-btn"
            //   onClick={() => DeleteProductTilesboard()}
            >
              {/* cancel{" "} */}
              {/* <img
                src={images.delete_icon}
                className="leaderboard-delete-icon"
              /> */}
            </button>
          </div>
          {/* Leaderboard first part responsive side end*/}

          {/* Leaderboard part first start */}
          <div className="leaderboard-card-part-first leaderboard-card-part-first-cinema">
            {/* Leaderboad form start */}

            {/* Leaderboard inputbox start */}
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Title:<span className="star_require">*</span></label>
              <input
                type="text"
                className="leaderboard-card-inp"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Mall(s):<span className="star_require">*</span></label>
              <div
                onClick={() => openMallModal()}
                className="leaderboard-card-inp"
                style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
              >
                {gettrue === true ? (
                  <>
                    {/* {selectedMalls && selectedMalls.length > 0
                      ? selectedMalls.map((mall, mindx) => {
                        return <p className="mall-lib-font">{mall}</p>;
                      })
                      : null} */}
                      {selectedMalls && selectedMalls.length > 0
                      ? selectedMalls.map((mall, mindx) => {
                        return (
                          <p className="mall-lib-font" key={mindx}>
                            {mall}
                            {mindx !== selectedMalls.length - 1 ? "," : ""}
                          </p>
                        );
                      })
                      : null}
                  </>
                ) : (
                  <>
                    {/* {getmallarray && getmallarray.length > 0
                      ? getmallarray.map((itm, mindx) => {
                        return (
                          <p className="mall-lib-font">
                            {itm.malls ? itm.malls.name : ""}
                          </p>
                        );
                      })
                      : null} */}
                      {getmallarray && getmallarray.length > 0
                      ? getmallarray.map((itm, mindx) => {
                        return (
                          <p className="mall-lib-font" key={mindx}>
                            {itm.malls ? itm.malls.name : ""}
                            {itm.malls && mindx !== getmallarray.length - 1 ? "," : ""}
                          </p>
                        );
                      })
                      : null}
                  </>
                )}
              </div>
            </div>
            {/* Leaderboard inputbox end */}
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl" htmlFor="">
                Week<span className="star_require">*</span>
              </label>
              {/* <input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              name=""
              id=""
              className="input_box"
            /> */}
              {/* <DatePicker
                selected={startDate}
                onChange={onDateChage}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                // selectsDisabledDaysInRange
                // inline
                monthsShown={2}


                calendarStartDay={1}
                className="leaderboard-card-inp"
                placeholderText="Select your week"
              /> */}
              <DateRangePicker
                oneTap
                hoverRange="week"
                isoWeek
                placeholder={`${weekname1} - ${weekname2}`}
                className="leaderboard-card-inp DateRangePicker_LeaderboardCard"
                startDate={selectedDates.startDate} // Set the initial start date
                endDate={selectedDates.endDate}
                onChange={handleDateChange}
                disabledDate={combine(allowedMaxDays(7), beforeToday())}
              />
            </div>
            {/* Leaderboard inputbox start */}

            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}

            {/* <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Brand(s):</label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setBrandName(e.target.value);
                    setBrandId(e.target.value);
                  }}>
                  <option selected disabled value="">
                    {BrandName}
                  </option>
                  {get_brand_data &&
                    get_brand_data.map((item, index) => {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div> */}

            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Categories:<span className="star_require">*</span></label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCategoryId(e.target.value);
                  }}
                >
                  <option selected disabled value="">
                    {Category}
                  </option>
                  {cinema_category_data &&
                    cinema_category_data.map((item, index) => {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Age restriction:<span className="star_require">*</span></label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setAge(e.target.value);
                    setAgeId(e.target.value);
                  }}
                >
                  <option selected disabled value="">
                    {age}
                  </option>
                  {agearray &&
                    agearray.map((item, index) => {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Booking URL:<span className="star_require">*</span></label>
              <input
                type="text"
                className="leaderboard-card-inp"
                placeholder="Enter URL"
                value={bookingUrl}
                onChange={(e) => setBookingUrl(e.target.value)}
              />
            </div>
            {/* Leaderboard input
            {/* <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">From:</label>
                        <DatePicker
                            // selected={birthDate}
                            // onChange={(date) => setBirthDate(date)}
                            className="red-border leaderboard-card-inp"
                            placeholderText="Date Of Birth"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div> */}
            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}
            {/* <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Until:</label>
                        <DatePicker
                            // selected={birthDate}
                            // onChange={(date) => setBirthDate(date)}
                            className="red-border leaderboard-card-inp"
                            placeholderText="Date Of Birth"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div> */}
            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}
            {/* <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Booking URL:</label>
              <input
                type="text"
                className="leaderboard-card-inp"
                placeholder="Rxxx"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div> */}
            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}

            {/* Leaderboard inputbox end */}

            {/* Leaderboad form end */}
          </div>
          {/* Leaderboard part first end */}

          {/* Leaderboard part second start */}

          <div
            className="leaderboard-card-part-sec product-tiles-card-sec-part cinema_pro_tile_sec"
            style={{ width: "260px", height: "260px",
            // paddingLeft:"1.1rem",
            // paddingRight:"1.1rem",
            textAlign:"center" }}
            {...getRootlogoProps()}
          >
            <input
              {...getInputlogoProps()}
              accept="image/jpeg, image/jpg, image/png, image/eps"
            />

            
            {getcondition === true ? (
              <>
                {files && files.length > 0 ? (
                  <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl leaderboard-card-part-img-upl-cinema myprofile_inner_sec2_img_upload_border">
                    {thumbs}
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <div className="leaderboard-card-part-sec2 leaderboard_tile_sec_part_height">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                     <h4 style={{ fontSize: "14px" }}>.JPG .PNG (418 x 590 pixels)</h4>
                    <p style={{ fontSize: "14px" }}>    
                      (max 50kb)
                    </p>
                      <p style={{ fontSize: "14px" }}>
                        You can also upload file by
                      </p>

                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{ marginBottom: "10px",fontWeight:"600",color:"var(--color-orange)" }}
                      >
                        click here
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
              
                {/* {item.image_path === null ? (
                  <div style={{ width: "100%" }}>
                    <div className="leaderboard-card-part-sec2 leaderboard_tile_sec_part_height">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4 style={{ fontSize: "14px" }}>.JPG .PNG</h4>
                      <p style={{ fontSize: "14px" }}>
                        You can also upload file by
                      </p>

                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{ marginBottom: "10px" }}
                      >
                        click here
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl leaderboard-card-part-img-upl-cinema myprofile_inner_sec2_img_upload_border">
                    <img
                      src={item.image_path}
                      style={{ width: "100%", height: "100%" }}
                      className="img-fluidb"
                    />
                  </div>
                )} */}

                <div style={{ width: "100%" }}>
                <div className="leaderboard-card-part-sec2" style={{ height: "255px", textAlign: "center", paddingLeft: "1.1rem", paddingRight: "1.1rem" }}>

                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                     <h4 style={{ fontSize: "14px" }}>.JPG .PNG (418 x 590 pixels)</h4>
                    <p style={{ fontSize: "14px" }}>    
                      (max 50kb)
                    </p>
                      <p style={{ fontSize: "14px" }}>
                        You can also upload file by
                      </p>

                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{ marginBottom: "10px",fontWeight:"600",color:"var(--color-orange)" }}
                      >
                        click here
                      </button>
                    </div>
                  </div>
              </>
            )}
          </div>

          {/* Leaderboard part second end */}

          {/* Leaderboard part third start */}
          <div className="leaderboard-card-part-third leaderboard-card-part-third-half_tile">
            <button
              className="leaderboard-delete-icon-btn"
            //   onClick={() => DeleteProductTilesboard()}
            >
              {/* cancel{" "}
              <img
                src={images.delete_icon}
                className="leaderboard-delete-icon"
              /> */}
            </button>
            <p
              className="leaderboard-last-part-txt"
              style={{ marginBottom: "75px" }}
            >
              {/* Service fee will apply if canceled */}
            </p>
            <div className="leaderboard-btn-box">
              {/* {item.cart_status === 0 ? (
                <>
                  <button style={{fontSize:"16px",padding:"0.4rem"}}
                    className="btn btn-black"
                    onClick={() => {
                      Addtocart();
                      // window.location.reload(true);
                    }}
                  >
                    Add To Cart
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-black"
                >
                  Added
                </button>
              )} */}

              <button
                  style={{
                    padding: "0.4rem",
                    fontSize: "16px",
                    width: "165px",
                    alignSelf: "end",
                  }}
                  className="btn btn-black"
                  onClick={() => {
                    alert("First Update After Add to Cart");
                  }}
                >
                  Add to Cart
                </button>
            </div>

            {/* <div className="leaderboard-btn-box">


              <button
                className="btn btn-green"
                style={{ backgroundColor: "#000" }}
                onClick={() => {
                  Addtocart();
                  // window.location.reload(true);
                }}
              >
                Add To Cart
              </button>

            </div> */}

            <div className="leaderboard-btn-box">
              <button 
                className="btn btn-blue"
                style={{ backgroundColor: "#ff8b00",fontSize:"16px",padding:"0.4rem" }}
                onClick={() => AddProductTilesBanner()}
              >
                Update
              </button>
            </div>
          </div>
          {/* Leaderboard part third end */}

          {/* Leaderboard last part responsive side start */}
          <div className="leaderboard-card-sec-resp-main-wrapp" style={{ gap: "0.5rem" }}>
            <div className="leaderboard-btn-box">
              {/* {item.cart_status === 0 ? (
                <>
                  <button style={{ width: "165px" }}
                    className="btn btn-black"
                    onClick={() => {
                      Addtocart();
                      // window.location.reload(true);
                    }}
                  >
                    Add To Cart
                  </button>
                </>
              ) : (
                <button style={{ width: "165px" }}
                  className="btn btn-black"
                // onClick={() => {
                //   window.location.reload(true);
                //   Addtocart();
                // }}
                >
                  Added
                </button>
              )} */}
              <button
                  style={{
                    padding: "0.4rem",
                    fontSize: "16px",
                    width: "165px",
                    alignSelf: "end",
                  }}
                  className="btn btn-black"
                  onClick={() => {
                    alert("First Update After Add to Cart");
                  }}
                >
                  Add to Cart
                </button>
            </div>

            {/* <div className="leaderboard-btn-box">
              <button
                className="btn btn-black"
                onClick={() => {
                  Addtocart();
                  // window.location.reload(true);
                }}
              >
                Add To Cart
              </button>
            </div> */}
            {/* <Link className="leaderboard-delete-icon-btn">
              <span className="leaderboard-extend-txt">Extend</span>{" "}
              <img
                src={images.extend_icon}
                className="leaderboard-delete-icon"
              />
            </Link> */}
            <div className="leaderboard-btn-box">
              <button
                className="btn btn-blue"
                style={{ backgroundColor: "#ff8b00", width: "165px" }}
                onClick={() => AddProductTilesBanner()}
              >
                Update
              </button>
            </div>
          </div>
          {/* Leaderboard last part responsive side end */}
        </div>
        {/* Leaderboard flex start */}
      </div>
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

            <div className="select_mall_serch_wrapp">
              {/* <input type="search" placeholder="Search" className="input_box" /> */}
              <input
                type="text"
                placeholder="Search"
                className="input_box"
                value={getSearchQuery}
                onChange={(e) => SearchFilter(e.target.value)}
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
                }}
              >
                <option selected disabled value="">
                  {weekname} {weekname1} {weekname2}
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

              {getSearchQuery ? <>
                {getFilterData && getFilterData.length > 0
                ? getFilterData.map((item) => {
                  const isRegionSelected = selectedRegions.includes(
                    item.region_name
                  );

                  return (
                    <div
                      className="bim_accordian_wrapp"
                      style={{ marginBottom: "6px" }}
                      key={item.region_id}
                    >
                      <button
                        className="bim_accordian_btn"
                        onClick={() => setToggle(item.region_id)}
                      >
                        <p
                          style={{
                            color: isRegionSelected ? "#ff8b00" : "#000",
                            fontWeight: isRegionSelected ? "500" : "300",
                          }}
                        >
                          {item.region_name}
                        </p>

                        {item.region_id === toggle ? (
                          <IoIosArrowUp size={20} color="#ff8b00" />
                        ) : (
                          <IoIosArrowDown size={20} />
                        )}
                      </button>
                      {item.region_id === toggle && (
                        <div className="bim_accordian_mall_wrapp">
                          {item.malls.map((itm) => (
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
                                onChange={(e) =>
                                  handleMallChange(
                                    e.target.checked,
                                    itm.name,
                                    itm.id,
                                    item.region_id,
                                    item.region_name
                                  )
                                }
                              />
                              <label htmlFor={itm.id}>{itm.name}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
                : null}
              </> : <>
                {getregion_array && getregion_array.length > 0
                ? getregion_array.map((item) => {
                  const isRegionSelected = selectedRegions.includes(
                    item.region_name
                  );

                  return (
                    <div
                      className="bim_accordian_wrapp"
                      style={{ marginBottom: "6px" }}
                      key={item.region_id}
                    >
                      <button
                        className="bim_accordian_btn"
                        onClick={() => setToggle(item.region_id)}
                      >
                        <p
                          style={{
                            color: isRegionSelected ? "#ff8b00" : "#000",
                            fontWeight: isRegionSelected ? "500" : "300",
                          }}
                        >
                          {item.region_name}
                        </p>

                        {item.region_id === toggle ? (
                          <IoIosArrowUp size={20} color="#ff8b00" />
                        ) : (
                          <IoIosArrowDown size={20} />
                        )}
                      </button>
                      {item.region_id === toggle && (
                        <div className="bim_accordian_mall_wrapp">
                          {item.malls.map((itm) => (
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
                                onChange={(e) =>
                                  handleMallChange(
                                    e.target.checked,
                                    itm.name,
                                    itm.id,
                                    item.region_id,
                                    item.region_name
                                  )
                                }
                              />
                              <label htmlFor={itm.id}>{itm.name}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
                : null}
              </>}

            
            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeMallModal();
                  SetTrue(true);
                  setSearchQuery("");
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

export default EmptyCinemaProducttileCard;