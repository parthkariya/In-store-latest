import React, { useEffect, useState } from "react";
// import "./AddLeaderBoardCard.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useStoreContext } from "../../context/store_context";
import { useMallContext } from "../../context/mall_context";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Notification from "../../utils/Notification";
import { DateRangePicker } from "rsuite";
import { ACCEPT_HEADER, create_landingpagetile } from "../../utils/Constant";
import axios from "axios";
// import DatePicker from 'rsuite/DatePicker';

// import 'rsuite/dist/rsuite.min.css';

const animatedComponents = makeAnimated();

const AddCinemaLandingPageTileCard = ({
  openMallModal,
  setTab,
  gatweek,
  setweek,
  peopleInfo,
  mallidarray,
  regionidarray,
  selectedMalls,
}) => {
  useEffect(() => {
    // ("mallidarray", mallidarray);
  }, [gatweek]);

  const { CreateLeaderBoardApi, category_data, multiple_week_data,cinema_category_data,CreateLandingPageTileApi } =
    useStoreContext();
  const { get_brand_data, get_mall_data } = useMallContext();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [MallName, setMallName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDiscription] = useState("");
  const [mallsOption, setMallsOption] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

  const [Week, setWeek] = useState("");
  const [Region, setRegion] = useState([]);

  // select date funtion is start

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onDateChage = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const mmm = moment(start).format("MMM");
    // ("s", mmm);

    if (montharray.includes(start)) {
      // ("yesss");
    } else {
      // ("nooooo");
    }
  };

  // const handleDateChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const handleDateChange = (startDate, endDate) => {
    // ("==>", startDate, endDate);
    setSelectedDates({ startDate, endDate });
  };



  const maxDate = startDate ? new Date(startDate) : null;
  if (maxDate) {
    maxDate.setDate(maxDate.getDate() + 7);
  }

  // Calculate the minimum and maximum dates for a one-week range
  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const { getBrand } = useMallContext();
  // Helper function to check if a date is a Monday
  const isMonday = (date) => {
    return moment(date).isoWeekday() === 1;
  };

  // Helper function to check if a date is a Sunday
  const isSunday = (date) => {
    return moment(date).isoWeekday() === 7;
  };

  // Helper function to check if the selected range is valid
  const isRangeValid = (start, end) => {
    if (!start || !end) {
      return false; // No selection made
    }

    // Check if the range is exactly 7 days
    return moment(end).diff(moment(start), "days") === 6;
  };

  // Event handler for selecting the start date
  const handleStartDateChange = (date) => {
    setStartDate(date);

    // Calculate the end date based on the selected start date
    const nextSunday = moment(date).endOf("isoWeek").toDate();
    if (isRangeValid(date, nextSunday)) {
      setEndDate(nextSunday);
    } else {
      setEndDate(null);
    }
  };

  // Event handler for selecting the end date
  const handleEndDateChange = (date) => {
    if (isRangeValid(startDate, date)) {
      setEndDate(date);
    }
  };

  const [montharray, SetMonthArray] = useState([]);

  function getMondaysInMonth(month) {
    // ("month-->", month);
    const firstDayOfMonth = moment().month(month).startOf("month");
    const lastDayOfMonth = moment().month(month).endOf("month");

    const mondaysInMonth = [];

    // Iterate over the days in the month and add the Mondays to the array.
    for (
      let day = firstDayOfMonth;
      day.isSameOrBefore(lastDayOfMonth);
      day.add(1, "day")
    ) {
      if (day.day() === 1) {
        // (JSON.stringify(day.clone(), null, 2));
        mondaysInMonth.push(day.clone());
      }
    }
    // ("mondaysInMonth-->", mondaysInMonth);
    SetMonthArray(mondaysInMonth);
    // Return the array of Mondays in the month.
    return mondaysInMonth;
  }

  useEffect(() => {
    getMondaysInMonth("");
  }, []);

  // select date funtion is end

  // logo dropzon

  // const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
  //   useDropzone({
  //     onDrop: (acceptedFiles) => {
  //       ("file type", files[0]);
  //       ("acceptedFiles", acceptedFiles[0].File);
  //       const filteredFiles = acceptedFiles.filter(file => file.size <= 100000); // Limit size to 200KB (in bytes)

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
  //           Notification("error", "Error!", "Some files exceed the maximum size limit of 100KB and will not be uploaded.");
  //         }
  //       }
  //       if (acceptedFiles.length === 0) {
  //         window.location.reload(true);
  //       }
  //     },
  //   });

  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
  useDropzone({
    onDrop: async (acceptedFiles) => {
      // SetCondation(true);

      const maxSizeKB = 100; // Maximum size limit in KB
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

  // Create Promotion Banner Api

  // const CreateLeaderBoardBanner = async () => {
  //   const { startDate, endDate } = selectedDates;
  //   if (title == "" || undefined) {
  //     Notification("error", "Error!", "Please Enter Title!");
  //   } else if (mallidarray == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Mall!");
  //   } else if (regionidarray == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Region!");
  //   } else if (startDate == "" || startDate == undefined) {
  //     Notification("error", "Error", "Please Enter Start Date");
  //   } else if (endDate == "" || endDate == undefined) {
  //     Notification("error", "Error", "Please Enter End Date");
  //   } else if (BrandName == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Brand!");
  //   } else if (Category == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Category!");
  //   } else {
  //     const formdata = await new FormData();
    
  //     await formdata.append("title", title);
  //     for (var i = 0; i < regionidarray.length; i++) {
  //       await formdata.append("region_id[" + i + "]", regionidarray[i].id);
  //     }
  //     for (var i = 0; i < mallidarray.length; i++) {
  //       await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
  //     }

  //     await formdata.append("brand_id", BrandName);
  //     await formdata.append("cinema_category_id", Category);
  //     // await formdata.append("week_id", gatweek);
  //     await formdata.append(
  //       "from_date",
  //       moment(startDate[0]).format("YYYY-MM-DD")
  //     );
  //     await formdata.append("to_date", moment(startDate[1]).format("YYYY-MM-DD"));

  //     if (files[0] !== undefined) {
  //       await formdata.append("image", files[0]);
  //     }

      
  //     const token = JSON.parse(localStorage.getItem("is_token"));
     
  //     try {
  //       const response = await axios.post(create_landingpagetile, formdata, {
  //         headers: {
  //           Accept: ACCEPT_HEADER,
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       const createlandingtiledata = response.data;
     
  //       if (createlandingtiledata.success == 1) {
  //             Notification(
  //           "success",
  //           "Success!",
  //           "Landing Page Tile 1/2 Added Successfully!"
  //         );
  //         setTab(40);
  //       }else{
  //              Notification(
  //           "error",
  //           "Error!",
  //           data.message
  //         );
  //       }
      
  //     } catch (error) {
  //       ("errr", error);
      
  //     }

  //     // const data = await CreateLandingPageTileApi(formdata);
  //     // if (data) {
  //     //   if (data.success === 1) {
  //     //     ("category-data", data);
  //     //     Notification(
  //     //       "success",
  //     //       "Success!",
  //     //       "Landing Page Tile 1/2 Added Successfully!"
  //     //     );
  //     //     setTab(40);
  //     //     // getLeaderboard();
  //     //     // window.location.reload();
  //     //   } else if (data.success === 0){
  //     //     Notification(
  //     //       "error",
  //     //       "Error!",
  //     //       data.message
  //     //     );
  //     //   }
  //     // }
  //   }
  // };

  const CreateLeaderBoardBanner = async () => {
    const { startDate, endDate } = selectedDates;
   if (startDate == "" || startDate == undefined) {
      Notification("error", "Error", "Please Enter Start Date");
    } else if (endDate == "" || endDate == undefined) {
      Notification("error", "Error", "Please Enter End Date");
    } else if (files == "" || undefined) {
      Notification("error", "Error!", "Please Upload Image!");
    } else {
      const formdata = await new FormData();
    
      
      

    
      // await formdata.append("week_id", gatweek);
      await formdata.append(
        "from_date",
        moment(startDate[0]).format("YYYY-MM-DD")
      );
      await formdata.append("to_date", moment(startDate[1]).format("YYYY-MM-DD"));

      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }

      
      const token = JSON.parse(localStorage.getItem("is_token"));
     
      try {
        const response = await axios.post(create_landingpagetile, formdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: "Bearer " + token,
          },
        });
        const createlandingtiledata = response.data;
     
        if (createlandingtiledata.success == 1) {
              Notification(
            "success",
            "Success!",
            "Landing Page Tile 1/2 Added Successfully!"
          );
          setTab(40);
        } else if (createlandingtiledata.success == 0){
          Notification(
            "error",
            "Error!",
            createlandingtiledata.message
          );
        }else{
               Notification(
            "error",
            "Error!",
            createlandingtiledata.message
          );
        }
      
      } catch (error) {
        console.log("error11",error);

      
      }

      // const data = await CreateLandingPageTileApi(formdata);
      // if (data) {
      //   if (data.success === 1) {
      //     ("category-data", data);
      //     Notification(
      //       "success",
      //       "Success!",
      //       "Landing Page Tile 1/2 Added Successfully!"
      //     );
      //     setTab(40);
      //     // getLeaderboard();
      //     // window.location.reload();
      //   } else if (data.success === 0){
      //     Notification(
      //       "error",
      //       "Error!",
      //       data.message
      //     );
      //   }
      // }
    }
  };

  // New Datepicker

  const [objWeek, setObjWeek] = useState({
    date: new Date(),
    dateFrom: null,
    dateTo: null,
    weekNumber: null,
  });

  const onChange = (date) => {
    const weekNumber = moment(date).isoWeek();
    const dateFrom = moment(date).startOf("isoWeek").toDate();
    const dateTo = moment(date).endOf("isoWeek").toDate();

    setObjWeek({
      date,
      dateFrom,
      dateTo,
      weekNumber,
    });
  };

  const renderValue = (date) => {
    const weekNumber = moment(date).isoWeek();
    const year = moment(date).year();

    return `W${weekNumber}, ${year}`;
  };

  return (
    <div className="leaderboard-card-main-wrapp">
      {/* Leaderboard flex start */}
      <div className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp-half">
        {/* Leaderboard first part responsive side start */}
        <div className="leaderboard-card-first-resp-main-wrapp">
          <p className="leaderboard-last-part-txt">
            {/* Service fee will apply if canceled */}
          </p>
          {/* <Link className="leaderboard-delete-icon-btn">
                        cancel{" "}
                        <img src={images.delete_icon} className="leaderboard-delete-icon" />
                    </Link> */}
        </div>
        {/* Leaderboard first part responsive side end*/}

        {/* Leaderboard part first start */}
        <div className="leaderboard-card-part-first leaderboard-card-part-first-half">
          {/* Leaderboad form start */}

          {/* Leaderboard inputbox start */}
         {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Titles:</label>
            <input
              type="text"
              className="leaderboard-card-inp"
              placeholder="Summer Campaign 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div> */}
          {/* Leaderboard inputbox end */}

          {/* Leaderboard inputbox start */}
          {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Mall(s):</label>
            <div
              onClick={() => openMallModal()}
              className="leaderboard-card-inp"
              style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {selectedMalls && selectedMalls.length > 0
                ? selectedMalls.map((mall, mindx) => {
                  return <p className="mall-lib-font">{mall}</p>;
                })
                : null}
            
            </div>
          
          </div> */}
          {/* Leaderboard inputbox end */}

          <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl" htmlFor="">
              Week:<span className="star_require">*</span>
            </label>
            {/* <input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              name=""
              id=""
              className="input_box"
            /> */}
            <DateRangePicker
              style={{ color: "#111" }}
              oneTap
              hoverRange="week"
              isoWeek
              placeholder="Select your Week"
              className="leaderboard-card-inp DateRangePicker_LeaderboardCard"
              onChange={handleDateChange}
              disabledDate={combine(allowedMaxDays(7), beforeToday())}
            />
            {/* <DatePicker
                            selected={startDate}
                            onChange={onDateChage}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            monthsShown={2}
                            minDate={startDate} 
                            maxDate={maxDate}   
                            calendarStartDay={1}
                            className="leaderboard-card-inp"
                            placeholderText="Select your week"
                        /> */}
            {/* <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            minDate={today}
                            maxDate={oneWeekLater}
                            monthsShown={2}
                            calendarStartDay={1}
                            className="leaderboard-card-inp"
                            placeholderText="Select your week"
                        /> */}

            {/* <DatePicker
                            placeholder='Week picker'
                            isoWeek
                            // showWeekNumbers
                            value={objWeek.date}
                            onChange={onChange}
                            renderValue={renderValue}
                        /> */}
          </div>

          {/* Leaderboard inputbox start */}
          {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Brand(s):</label>
            <div className="select-wrapper" style={{ width: "100%" }}>
              <select
                className="leaderboard-card-inp"
                onChange={(e) => {
                  ("rrr", e.target.value);

                  setBrandName(e.target.value);
                  // getBrand(e.target.value);
                }}>
                <option selected disabled value="">
                  Select Brand
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
          {/* Leaderboard inputbox end */}

          {/* Leaderboard inputbox start */}
          {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Categories:</label>
            <div className="select-wrapper" style={{ width: "100%" }}>
              <select
                className="leaderboard-card-inp cons_select_nav"
                onChange={(e) => {
                  ("rrr", e.target.value);
                  setCategory(e.target.value);
                }}>
                <option selected disabled value="">
                  Select Category
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
          </div> */}
          {/* Leaderboard inputbox end */}

          {/* <button
            onClick={() => openMallModal()}
            className="leaderboard-delete-icon-btn"
          >
            <span className="leaderboard-extend-txt">Chose Date</span>{" "}
            <img
              src={images.banner_cal_img}
              className="leaderboard-delete-icon"
              style={{ width: "42px", height: "42px" }}
            />
          </button> */}

          {/* start date and end date demo start */}
          {/* <div>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select start date (Monday)"
              filterDate={isMonday}
              calendarStartDay={1}
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Select end date (Sunday)"
              filterDate={isSunday}
              disabled={!startDate}
              calendarStartDay={1}
            />
          </div> */}
          {/* start date and end date demo end */}

          {/* Leaderboard inputbox start */}
          {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Start:</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select start date (Monday)"
              filterDate={isMonday}
              calendarStartDay={1}
              className="leaderboard-card-inp"
              dateFormat="dd/MM/yyyy"
            />
          </div> */}
          {/* Leaderboard inputbox end */}

          {/* Leaderboard inputbox start */}
          {/* <div className="leaderboard-card-inpbox-wrapp">
            <label className="leaderboard-card-lbl">Until:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Select end date (Sunday)"
              filterDate={isSunday}
              disabled={true}
              calendarStartDay={1}
              className="leaderboard-card-inp"
              dateFormat="dd/MM/yyyy"
            />
          </div> */}
          {/* Leaderboard inputbox end */}

          {/* Leaderboad form end */}
        </div>
        {/* Leaderboard part first end */}

        {/* Leaderboard part second start */}
        <div className="leaderboard-card-part-sec leaderboard-card-part-sec-chng leaderboard-card-part-sec-half">
          {/* <div className="myprofile_inner_sec2"> */}

          {files && files.length > 0 ? (
            <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border">
              {thumbs}
            </div>
          ) : (
            <div style={{ width: "100%" }} {...getRootlogoProps()}>
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
                <p>max 100kb</p>
                <p>You can also upload file by</p>
                <input
                  {...getInputlogoProps()}
                  accept="image/jpeg, image/jpg, image/png, image/eps"
                />
                <button
                  type="button"
                  className="click_upload_btn"
                  style={{ marginBottom: "10px",color:"var(--color-orange)",fontWeight:"600" }}>
                  click here
                </button>
                {/* <a href="">clicking here</a> */}
              </div>
            </div>
          )}

          {/* </div> */}
        </div>
        {/* Leaderboard part second end */}

        {/* Leaderboard part third start */}
        <div className="leaderboard-card-part-third leaderboard-card-part-third-chng" style={{justifyContent:"flex-end",marginBottom:"0.5rem"}}>
          {/* <Link className="leaderboard-delete-icon-btn">
                        cancel{" "}
                        <img src={images.delete_icon} className="leaderboard-delete-icon" />
                    </Link> */}
          <p className="leaderboard-last-part-txt">
            {/* Service fee will apply if canceled */}
          </p>
          {/* <Link className="leaderboard-delete-icon-btn">
                        <span className="leaderboard-extend-txt">Extend</span>{" "}
                        <img src={images.extend_icon} className="leaderboard-delete-icon" />
                    </Link> */}
          <div className="leaderboard-btn-box">
            <button style={{fontSize:"16px",padding:"0.4rem" }}
              className="btn btn-orange"
              onClick={() => CreateLeaderBoardBanner()}>
              Publish
            </button>
          </div>
        </div>
        {/* Leaderboard part third end */}

        {/* Leaderboard last part responsive side start */}
        <div className="leaderboard-card-sec-resp-main-wrapp">
          {/* <Link className="leaderboard-delete-icon-btn">
                        <span className="leaderboard-extend-txt">Extend</span>{" "}
                        <img src={images.extend_icon} className="leaderboard-delete-icon" />
                    </Link> */}
          <div className="leaderboard-btn-box">
            <button
              className="btn btn-orange"
              onClick={() => CreateLeaderBoardBanner()}>
              Publish
            </button>
          </div>
        </div>
        {/* Leaderboard last part responsive side end */}
      </div>
      {/* Leaderboard flex start */}
    </div>
  );
};

export default AddCinemaLandingPageTileCard;
