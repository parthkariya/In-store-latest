import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMallContext } from "../context/mall_context";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Notification from "../utils/Notification";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import {
  ACCEPT_HEADER,
  get_brand_multiple,
  get_category,
  mall_create_store,
} from "../utils/Constant";
import { MallHero } from "../components";
import { IoChevronBack } from "react-icons/io5";

const animatedComponents = makeAnimated();

const MallAddStore = ({
  getsingleStoreData,
  getstore_is,
  get_mall_auth_data,
  setTab,
  getStoreList,
}) => {
  const { UpdateMallStore, get_brand_data, AddMallStore } = useMallContext();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  // update store states
  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [storeContactPersoon, setStoreContactPerson] = useState("");
  const [storeNumber, setStoreNumber] = useState("");
  const [storeLevel, setStoreLevel] = useState("");
  const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [storeDes, setStoreDes] = useState("");
  const [storeLogo, setStoreLogo] = useState();
  const [retailerType, setRetailerType] = useState(1);
  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);
  const [mallsOption, setMallsOption] = useState([]);

  // trnding hours
  // trnding hours states
  const [monFromTime, setMonFromTime] = useState();
  const [monToTime, setMonToTime] = useState();
  const [satFromTime, setSatFromTime] = useState();
  const [satToTime, setSatToTime] = useState();
  const [sunFromTime, setSunFromTime] = useState();
  const [sunToTime, setSunToTime] = useState();
  const [holidayFromTime, setHolidayFromTime] = useState();
  const [holidayToTime, setHolidayToTime] = useState();
  const [imagecheck, setImageCheck] = useState(false);

  useEffect(() => {
    files.length > 0 &&
      files.map((item) => {
        setStoreLogo(item);
        // ("files", item);
      });
  }, [files]);


  useEffect(() => {
    files2.length > 0 &&
      files2.map((item) => {
        setStoreLogo(item);
        // ("files", item);
      });
  }, [files2]);

  const onHandleEmailChange = (e) => {
    let email = e.target.value;
    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const onHandleNumberChange = (e) => {
    let number = e.target.value;
    if (number === "" || re.test(number)) {
      setNumber(number);
    } else {
      return;
    }
  };

  const handleTermChange = (event) => {
    // setRetailerType((current) => !current);
    if (retailerType == 1) {
      setRetailerType(2);
    } else {
      setRetailerType(1);
    }

    // ("retailer type is", retailerType);
  };

  const handleTermChange2 = (e) => {
    setIsAcceptTerm(1);
    // ("e.targate.value");
  };
  const handleTermChange3 = (e) => {
    setIsAcceptTerm2(1);
    // ("e.targate.value");
  };
  // update mall store api

  const AddStoreNallData = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    if (storeName == "" || undefined) {
      Notification("error", "Error!", "Please Enter Brand Name!");
      return;
    } else if (retailerType == "" || undefined) {
      Notification("error", "Error!", "Please Select any one retailer type!");
      return;
    } else if (mallsOption.length <= 0 && retailerType == 2) {
      Notification(
        "error",
        "Error!",
        "Please Select any Brand otherwise select Independent Retailer!"
      );
      return;
    } else if (storeCategory == "" || undefined) {
      Notification("error", "Error!", "Please Select Store Category!");
      return;
    } else if (storeNumber == "" || undefined) {
      Notification("error", "Error!", "Please Enter Store Number!");
      return;
    }
    // else if (storeLevel == "" || undefined) {
    //     Notification("error", "Error!", "Please Select Store Level!");
    //     return;
    // }
    // else if (storeContactPersoon == "" || undefined) {
    //     Notification("error", "Error!", "Please Enter Contact Person Name!");
    //     return;
    // }
    else if (number == "" || undefined) {
      Notification("error", "Error!", "Please Enter Number!");
      return;
    } else if (email == "" || undefined) {
      Notification("error", "Error!", "Please Enter Email!");
      return;
    } else if (regEx.test(email) == false) {
      Notification("error", "Error!", "Please enter valid email id!");
      return;
    } else if (
      monFromTime == "" ||
      monFromTime == undefined ||
      monFromTime == "undefined"
    ) {
      Notification("error", "Error!", "Please Enter Trading Hours!");
      return;
    } else if (
      monToTime == "" ||
      monToTime == undefined ||
      monFromTime == "undefined"
    ) {
      Notification("error", "Error!", "Please Enter Trading Hours!");
      return;
    } else if (storeDes == "" || undefined) {
      Notification("error", "Error!", "Please Enter some Description!");
      return;
    } else {
      const formdata = await new FormData();
      await formdata.append("name", storeName);
      await formdata.append("category_id", storeCategory);
      await formdata.append("store_no", storeNumber);
      await formdata.append("store_level", storeLevel);
      await formdata.append("contact_person", storeContactPersoon);
      await formdata.append("number", number);
      await formdata.append("email", email);
      await formdata.append("description", storeDes);
      if(monFromTime){
        await formdata.append("mon_fri_from_time", monFromTime);
      }if(monToTime){
        await formdata.append("mon_fri_to_time", monToTime);
      }if(satFromTime){
        await formdata.append("sat_from_time", satFromTime);
      }if(satToTime){
        await formdata.append("sat_to_time", satToTime);
      }if(sunFromTime){
        await formdata.append("sun_from_time", sunFromTime);
      }if(sunToTime){
        await formdata.append("sun_to_time", sunToTime);
      }if(holidayFromTime){
        await formdata.append("holiday_from_time", holidayFromTime);
      }if(holidayToTime){
        await formdata.append("holiday_to_time", holidayToTime);
      }
      await formdata.append("store_type", retailerType);
      await formdata.append("terms_condition", isAcceptTerm);
      await formdata.append("privacy_policy", isAcceptTerm2);
      if (retailerType == 2) {
        for (var i = 0; i < mallsOption.length; i++) {
          await formdata.append("brand_id[" + i + "]", mallsOption[i].value);
        }
      }

      if (files && files.length > 0) {
        await formdata.append("store_logo", files[0]);
      }

      if (files2 && files2.length > 0) {
        await formdata.append("banner_store", files2[0]);
      }



      

      axios
        .post(mall_create_store, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // ("create_movie", JSON.stringify(res.data, null, 2));
          if (res.data.success == 1) {
            Notification("success", "Success!", "Brand Added Successfully!");
            setTab(3);
            getStoreList();
          } else if (res.data.success == 0) {
            Notification("error", "Error!", res.data.message);
            // setTab(3);
            // getStoreList();
          } else {
            null;
          }
        })
        .catch((err) => {
          console.log("err11", err);
        });
    }
  };

  const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } =
    useDropzone({
      accept: "image/*",
      onDrop: async (acceptedFiles) => {
        // ("acceptedFiles", acceptedFiles);
        {
          const maxSizeKB = 40; // Maximum size limit in KB
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
              const isDimensionsValid = img.width == 200 && img.height == 200;
              if (isDimensionsValid) {
                setImageCheck(true);
              } else {
                setImageCheck(false);
              }
              return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
            })
          );

          // Filter out null values (files that were skipped)
          const validFiles = filteredFiles.filter((file) => file !== null);
          {
            setFiles(
              validFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
            if (validFiles.length !== acceptedFiles.length) {
              if (validFiles.length !== acceptedFiles.length) {
                setImageCheck(false);
              } else {
                setImageCheck(true);
              }
              Notification(
                "error",
                "Error!",
                "Some files exceed the maximum size limit of 40KB or do not meet the dimension requirements of 200x200 pixels and will not be uploaded."
              );
            }
          }
        }
        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      // ("acceptedFiles", acceptedFiles);
      {
        const maxSizeKB = 200; // Maximum size limit in KB
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
            const isDimensionsValid = img.width == 1050 && img.height == 284;
            if (isDimensionsValid) {
              setImageCheck(true);
            } else {
              setImageCheck(false);
            }
            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        const validFiles = filteredFiles.filter((file) => file !== null);
        {
          setFiles2(
            validFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
          if (validFiles.length !== acceptedFiles.length) {
            if (validFiles.length !== acceptedFiles.length) {
              setImageCheck(false);
            } else {
              setImageCheck(true);
            }
            Notification(
              "error",
              "Error!",
              "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 1050x284 pixels and will not be uploaded."
            );
          }
        }
      }
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "175px",
        filter: "grayscale(100%)",
      }}
      className="img-fluid"
      alt="file"
    />
  ));

  const thumbs2 = files2.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  useEffect(() => {
    // ("get_brand_data", get_brand_data);
    getcat();
    getMutipleBrand();
  }, []);

  const [catarray, SetArray] = useState([]);
  const [getMultipleBrand, setMultipleBrand] = useState([]);

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
          null;
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };
  const getMutipleBrand = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_brand_multiple, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          setMultipleBrand(res.data.data);
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
      <MallHero get_mall_auth_data={get_mall_auth_data} />

      <div className="mm_main_wrapp">
        <div className="edit-brand-back-iconbox" onClick={() => setTab(3)}>
          <IoChevronBack className="edit-brand-back-icon" />{" "}
          <p className="edit-brand-back-txt">Back</p>
        </div>
        {/* mall management name start */}
        <div className="mall_name_wrapp mm_form_wrapp_name_padding">
          <p className="mall_name_heading">
            {get_mall_auth_data.name ? get_mall_auth_data.name : ""}:
          </p>
          <span style={{ fontWeight: 600 }}>Add Brand</span>
        </div>
        {/* <div className="mm_horizontal_line"></div> */}
        <div className="" style={{ marginTop: "2rem" }}></div>
        {/* mall management name end */}

        {/* mall management form start */}
        <div className="mm_form_wrapp mm_form_wrapp_add_brand_mall mm_form_wrapp_padding">
          {/* text-input wrapp start */}
          <div className="mm_form_input_wrapp">
            {/* single text-input */}

            <div className="signup_terms_wrapp">
              <div className="mm_form_single_input">
                <label htmlFor="" style={{ minWidth: "157px" }}>
                  Retailer type
                </label>

                <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
                  <div className="radio-btn-inner-flex">
                    <input
                      type="radio"
                      id="Online"
                      name="gender"
                      value="1"
                      onChange={(e) => {
                        setRetailerType(e.target.value);
                        // ("-->", retailerType);
                      }}
                      // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}
                    />
                    <label className="course-form-txt" for="male">
                      Independent Retailer
                    </label>
                  </div>

                  <div className="radio-btn-inner-flex">
                    <input
                      type="radio"
                      id="In-Person"
                      name="gender"
                      value="2"
                      onChange={(e) => {
                        setRetailerType(e.target.value);
                        // ("-->", retailerType);
                      }}
                    />
                    <label className="course-form-txt" for="specifyColor">
                      Group Retailer
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mm_form_single_input">
              {retailerType == 2 ? (
                <>
                  <label htmlFor="" style={{ minWidth: "157px" }}>
                    Holding Company<span className="star_require">*</span>
                  </label>
                </>
              ) : (
                <>
                  <label htmlFor="" style={{ minWidth: "157px" }}>
                    Brand Name<span className="star_require">*</span>
                  </label>
                </>
              )}

              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                name=""
                id=""
                className="input_box"
              />

              {/* <select className="leaderboard-card-inp" onChange={(e) => {
                            setStoreName(e.target.value);
                            (e.target.value);
                        }}>
                            {get_brand_data && get_brand_data.map((item, index) => {
                                return (
                                    <>
                                        <option selected disabled value="">
                                            Auto-fill from database
                                        </option>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    </>
                                )
                            })}

                        </select> */}
            </div>

            {retailerType == 2 ? (
              <>
                <div className="mm_form_single_input">
                  <label htmlFor="" className="" style={{ minWidth: "157px" }}>
                    Select Brands
                  </label>

                  <Select
                    value={mallsOption}
                    styles={{ width: "100%", padding: "0px" }}
                    className="leaderboard-card-inp"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}

                    isMulti
                    options={getMultipleBrand}
                    onChange={setMallsOption}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Category<span className="star_require">*</span>
              </label>
              <div className="sselect-wrapper" style={{ width: "100%" }}>
                <select
                  className="input_box cons_select_nav"
                  onChange={(e) => {
                    setStoreCategory(e.target.value);
                    // (e.target.value);
                  }}
                >
                  <option defaultValue value=""></option>
                  {catarray &&
                    catarray.map((item, index) => {
                      return (
                        <>
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              {/* <input
              type="text"
              value={storeCategory}
              //   onChange={(e) => setStoreName(e.target.value)}
              name=""
              id=""
              className="input_box"
              placeholder="Fashion, homeware, audio visual"
            /> */}
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Store Number(ID)<span className="star_require">*</span>
              </label>
              <input
                type="text"
                value={storeNumber}
                onChange={(e) => setStoreNumber(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Store Level
              </label>
              <input
                type="text"
                value={storeLevel}
                onChange={(e) => setStoreLevel(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Contact Person
              </label>
              <input
                type="text"
                value={storeContactPersoon}
                onChange={(e) => setStoreContactPerson(e.target.value)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Contact Number<span className="star_require">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => onHandleNumberChange(e)}
                name=""
                id=""
                className="input_box"
              />
            </div>
            {/* single text-input */}
            <div className="mm_form_single_input">
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Email Address<span className="star_require">*</span>
              </label>
              <input
                type="email"
                onChange={(e) => onHandleEmailChange(e)}
                name=""
                id=""
                className="input_box"
              />
            </div>

            {/* tranding sec strat */}
            <div className="mm_tranding_wrapp">
              <label
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  minWidth: "157px",
                }}
                htmlFor=""
              >
                Trading Hours<span className="star_require">*</span>
              </label>
              <div className="tranding_times_wrapp">
                {/* single time */}
                <div className="tranding_times_wrapp_sec">
                  <label
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      minWidth: "157px",
                    }}
                    htmlFor=""
                  >
                    Monday - Friday
                  </label>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={monFromTime}
                      onChange={(e) => setMonFromTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      {/* am */}
                    </p>
                  </div>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={monToTime}
                      onChange={(e) => setMonToTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                </div>
                {/* single time */}
                <div className="tranding_times_wrapp_sec">
                  <label
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      minWidth: "157px",
                    }}
                    htmlFor=""
                  >
                    Saturday
                  </label>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={satFromTime}
                      onChange={(e) => setSatFromTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={satToTime}
                      onChange={(e) => setSatToTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                </div>
                {/* single time */}
                <div className="tranding_times_wrapp_sec">
                  <label
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      minWidth: "157px",
                    }}
                    htmlFor=""
                  >
                    Sunday
                  </label>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={sunFromTime}
                      onChange={(e) => setSunFromTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={sunToTime}
                      onChange={(e) => setSunToTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                </div>
                {/* single time */}
                <div className="tranding_times_wrapp_sec">
                  <label
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      minWidth: "157px",
                    }}
                    htmlFor=""
                  >
                    Public Holidays
                  </label>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">09:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={holidayFromTime}
                      onChange={(e) => setHolidayFromTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                  <div
                    className="tranding_sigle_time_wrapp"
                    style={{ gap: "0px", width: "138px" }}
                  >
                    {/* <select className="input_box">
                    <option value="1">21:00</option>
                  </select> */}
                    <input
                      type="time"
                      name=""
                      value={holidayToTime}
                      onChange={(e) => setHolidayToTime(e.target.value)}
                      id=""
                      className="input_box"
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
            {/* tranding sec end */}

            {/* text-area sec start */}
            <div
              className="mm_form_single_input"
              style={{ alignItems: "flex-start" }}
            >
              <label htmlFor="" style={{ minWidth: "157px" }}>
                Brand Description<span className="star_require">*</span>
              </label>
              <textarea
                type="text"
                value={storeDes}
                onChange={(e) => setStoreDes(e.target.value)}
                name=""
                id=""
                className="input_box"
                rows={8}
              />
            </div>
            <div
              className="mm_form_single_input"
              style={{ alignItems: "flex-start" }}
            >
              <label htmlFor="" style={{ minWidth: "157px" }}></label>
              <span style={{ fontSize: "14px", color: "#bbb" }}>
                *Required Fields including all image uploads.
              </span>
            </div>

            {/* <div className="signup_terms_wrapp indep-side">
                            <div className="mm_form_single_input">
                                <label htmlFor="">Retailer type</label>

                                <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
                                    <div className="radio-btn-inner-flex">
                                        <input
                                            type="radio"
                                            id="Online"
                                            name="gender"
                                            value="1"
                                            onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                                        // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}

                                        />
                                        <label className="course-form-txt" for="male">
                                            Independent Retailer
                                        </label>
                                    </div>

                                    <div className="radio-btn-inner-flex">
                                        <input
                                            type="radio"
                                            id="In-Person"
                                            name="gender"
                                            value="2"
                                            onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                                        />
                                        <label className="course-form-txt" for="specifyColor">
                                            Group Retailer
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div> */}

            {/* <div className="signup_terms_wrapp indep-side">
                            <div className="mm_form_single_input mb_8">
                                <label htmlFor="" style={{ minWidth: "157px" }}></label>
                                <input
                                    type="checkbox"
                                    value={retailerType}
                                    onChange={handleTermChange}
                                // checked={retailerType}
                                />
                                {retailerType == 1 ? <p className="fs-des ">
                                    Independed Retailer
              
                                </p> : <p>Group Retailer</p>}
                            </div>
                        </div> */}

            {/* <div className="signup_terms_wrapp indep-side-show">
                            <div className="mm_form_single_input" style={{ flexDirection: "column", alignItems: "start" }}>
                                <label htmlFor="">Retailer type</label>

                                <div className="radio-btn-flex-brand radio-btn-flex-brand-mall">
                                    <div className="radio-btn-inner-flex">
                                        <input
                                            type="radio"
                                            id="Online"
                                            name="gender"
                                            value="1"
                                            onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                                        // onChange={(e) => { setRetailerType(1); ("-->", retailerType); }}

                                        />
                                        <label className="course-form-txt" for="male">
                                            Independent Retailer
                                        </label>
                                    </div>

                                    <div className="radio-btn-inner-flex">
                                        <input
                                            type="radio"
                                            id="In-Person"
                                            name="gender"
                                            value="2"
                                            onChange={(e) => { setRetailerType(e.target.value); ("-->", retailerType); }}
                                        />
                                        <label className="course-form-txt" for="specifyColor">
                                            Group Retailer
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div> */}

            <div className="mm_form_single_input mb_8">
              <label htmlFor="" style={{ minWidth: "157px" }}></label>
              <div className="signup_terms_wrapp indep-side">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange2}
                  checked={isAcceptTerm}
                />

                <p
                  className="fs-des"
                  style={{ fontWeight: "400", fontSize: "14px" }}
                >
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
            </div>
            <div className="mm_form_single_input mb_8">
              <label htmlFor="" style={{ minWidth: "157px" }}></label>
              <div
                className="signup_terms_wrapp indep-side"
                style={{ marginTop: "-12px" }}
              >
                <input
                  type="checkbox"
                  value={isAcceptTerm2}
                  onChange={handleTermChange3}
                  checked={isAcceptTerm2}
                />

                <p
                  className="fs-des"
                  style={{ fontWeight: "400", fontSize: "14px" }}
                >
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a>
                </p>
              </div>
            </div>
            {/* text-area sec end */}
            <div className="mm_form_single_input mb_8">
              <label htmlFor="" style={{ minWidth: "157px" }}></label>
              <div className="mm_form_single_input brand-resp-btn">
                <button
                  className="btn btn-black"
                  onClick={() => AddStoreNallData()}
                  style={{ width: "200px" }}
                  disabled={
                    isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* text-input wrapp end */}
          <div className="brand-add-img-flex">
            {/* upload images wrapp start */}
            <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
              {/* single upload image */}
              <div className="myprofile_inner_sec2">
                <h5
                  style={{
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Upload black and white <br />
                  Brand logo <br /> (200 x 200 pixels) <br /> (max 40kb)
                  <span className="star_require">*</span>
                </h5>
                {files && files.length > 0 ? (
                  <div className="myprofile_inner_sec2_img_upload">
                    {thumbs}
                  </div>
                ) : (
                  <div
                    style={{ width: "100%" }}
                    {...getRootLogoProps({ className: "dropzone" })}
                  >
                    <div className="myprofile_inner_sec2_img_upload">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4>.JPG .PNG</h4>
                      <p>You can also upload file by</p>
                      <input
                        {...getInputLogoProps()}
                        accept="image/jpeg, image/jpg, image/png, image/eps"
                        type="file"
                        name="photos"
                        style={{display:"none"}}
                      />
                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{ marginBottom: "10px" }}
                      >
                        click here
                      </button>
                      {/* <a href="">clicking here</a> */}
                    </div>
                    <div className="btnn-main">
                      <button
                        className="btn btn-black"
                        type="button"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          // setFiles([]);
                        }}
                      >
                        Upload File
                      </button>
                    </div>
                  </div>
                )}
                {/* <div className="myprofile_upload_img_btn_wrapp"> */}
                <button className="btn" onClick={() => setFiles([])}>
                  Cancel
                </button>
                {/* </div> */}
              </div>
            </div>
            {/* upload images wrapp end */}
            <p className="upload_img_instr">
              All Brand logo’s to be uploaded <br />
              in black and white format <br />
              (no colour logo’s)
            </p>
            {/* upload images wrapp start */}
            <div className="mm_img_upload_wrapp" style={{ width: "100%" }}>
              {/* single upload image */}
              <div className="myprofile_inner_sec2">
                <h5
                  style={{
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Upload black and white <br />
                  Brand banner <br /> (1050 x 284 pixels) <br /> (max 200kb)
                  <span className="star_require">*</span>
                </h5>
                {files2 && files2.length > 0 ? (
                  <div className="myprofile_inner_sec2_img_upload">
                    {thumbs2}
                  </div>
                ) : (
                  <div
                    style={{ width: "100%" }}
                    {...getRootBannerProps({ className: "dropzone" })}
                  >
                    <div className="myprofile_inner_sec2_img_upload">
                      <AiOutlineCloudUpload
                        style={{
                          width: "60px",
                          height: "60px",
                          color: "var(--color-orange)",
                          marginBottom: "10px",
                        }}
                      />
                      <h4>.JPG .PNG</h4>
                      <p>You can also upload file by</p>
                      <input
                        {...getInputBannerProps()}
                        accept="image/jpeg, image/jpg, image/png, image/eps"
                        type="file"
                        name="photos"
                        style={{display:"none"}}
                      />
                      <button
                        type="button"
                        className="click_upload_btn"
                        style={{ marginBottom: "10px" }}
                      >
                        click here
                      </button>
                      {/* <a href="">clicking here</a> */}
                    </div>
                    <div className="btnn-main">
                      <button
                        className="btn btn-black"
                        type="button"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          // setFiles([]);
                        }}
                      >
                        Upload File
                      </button>
                    </div>
                  </div>
                )}
                {/* <div className="myprofile_upload_img_btn_wrapp"> */}
                <button className="btn" onClick={() => setFiles2([])}>
                  Cancel
                </button>
                {/* </div> */}
              </div>
            </div>
            {/* upload images wrapp end */}
          </div>
        </div>
        {/* <div className="signup_terms_wrapp indep-side-show">
                    <input
                        type="checkbox"
                        value={retailerType}
                        onChange={handleTermChange}
                    // checked={retailerType}
                    />
                    {retailerType == 1 ? <p className="fs-des ">
                        Independed Retailer
                       
                    </p> : <p>Group Retailer</p>}

                </div> */}

        <div className="signup_terms_wrapp indep-side-show">
          <input
            type="checkbox"
            value={isAcceptTerm}
            onChange={handleTermChange2}
            checked={isAcceptTerm}
          />

          <p className="fs-des" style={{ fontWeight: "400", fontSize: "14px" }}>
            I have read and agree to the{" "}
            <a className="signup_terms_link">Privacy Policy</a>
          </p>
        </div>
        <div
          className="signup_terms_wrapp indep-side-show"
          style={{ marginTop: "-12px" }}
        >
          <input
            type="checkbox"
            value={isAcceptTerm2}
            onChange={handleTermChange3}
            checked={isAcceptTerm2}
          />

          <p className="fs-des" style={{ fontWeight: "400", fontSize: "14px" }}>
            I have read and agree to the{" "}
            <a className="signup_terms_link">Terms and Conditions</a>{" "}
          </p>
        </div>
        {/* text-area sec end */}
        <div className="mm_form_single_input brand-resp-show-btn">
          <button
            className="btn btn-black"
            onClick={() => AddStoreNallData()}
            disabled={isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true}
            style={{ width: "200px" }}
          >
            Submit
          </button>
        </div>
        {/* mall management form end */}
      </div>
    </>
  );
};

export default MallAddStore;
