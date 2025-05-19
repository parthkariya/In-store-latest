import React, { useEffect, useState } from "react";
import "./ProductBannerCard.css";

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
import Notification from "../../utils/Notification";

import {
  ACCEPT_HEADER,
  add_store_cart,
  get_region_mall,
} from "../../utils/Constant";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DateRangePicker } from "rsuite";

const animatedComponents = makeAnimated();
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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ProductBannerCard = ({
  item,
  mindx,
  getLeaderboard,
  setTab,
  peopleInfo,
  setPeopleInfo,
  getPromation,
  getweek,
}) => {
  const eateryvalue = JSON.parse(localStorage.getItem("iseatery"));

  useEffect(() => {
    GetRegion();
  }, []);

  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
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

  // const [deletemodalstate, setDleteModalstate] = useState(false);
  const [getcondition, setCondition] = useState(false);
  const [getcondition2, setCondition2] = useState(false);
  const [getcondition3, setCondition3] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

  useEffect(() => {
    setTitle(item.description ? item.description : "");
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
      item.categorys == null ||
        item.categorys == "" ||
        item.categorys.name == null ||
        item.categorys.name == ""
        ? ""
        : item.categorys.name
    );
    setCategoryId(
      item.categorys == null ||
        item.categorys == "" ||
        item.categorys.id == null ||
        item.categorys.id == ""
        ? ""
        : item.categorys.id
    );
    SetWeekName(item.weeks ? item.weeks.name : "");
    SetWeekName1(item.weeks ? item.weeks.from_date : "");
    SetWeekName2(item.weeks ? item.weeks.to_date : "");
    SetMallArray(item.multiple_malls ? item.multiple_malls : "");
  }, []);

  const {
    UpdateProductBoardApi,
    category_data,
    category_eatery_data,
    deleteProductBannerApi,
    multiple_week_data,
    week_data,
    getStoreCartApi,
    getCategoryEateryApi,
    getCategoryApi,
  } = useStoreContext();
  const { get_brand_data, get_mall_data } = useMallContext();

  // select date funtion is start

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

  const [gettitle, SetTitile] = useState(item.title ? item.title : "");
  // select date funtion is end

  const onDateChage = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateChange = (startDate, endDate) => {
    if ((startDate && endDate !== "") || (startDate && endDate !== null)) {
      SetWeekCondation(true);
    } else {
      SetWeekCondation(false);
    }
    setSelectedDates({ startDate, endDate });
  };

  useEffect(()=>{
    if(eateryvalue == 1){
      getCategoryEateryApi();
    }else{
      getCategoryApi();
  
    }
  },[])

  // logo dropzon

  // const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
  //   useDropzone({
  //     onDrop: (acceptedFiles) => {
  //       const filteredFiles = acceptedFiles.filter(file => file.size <= 200000); // Limit size to 200KB (in bytes)

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
  //           Notification("error","Error!", "Some files exceed the maximum size limit of 200KB and will not be uploaded.");
  //         }
  //       }
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
            const isDimensionsValid = img.width == 2176 && img.height == 590;

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
            "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 2176x590 pixels and will not be uploaded."
          );
        }

        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const { getRootProps: getRootlogoProps2, getInputProps: getInputlogoProps2 } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        setCondition2(true);

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
            const isDimensionsValid = img.width == 2176 && img.height == 590;

            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        // Filter out null values (files that were skipped)
        const validFiles = filteredFiles.filter((file) => file !== null);

        setFiles2(
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
            "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 2176x590 pixels and will not be uploaded."
          );
        }

        if (acceptedFiles.length === 0) {
          window.location.reload(true);
        }
      },
    });

  const { getRootProps: getRootlogoProps3, getInputProps: getInputlogoProps3 } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        setCondition3(true);

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
            const isDimensionsValid = img.width == 2176 && img.height == 590;

            return isDimensionsValid ? file : null; // Return file if dimensions are valid, otherwise skip it
          })
        );

        // Filter out null values (files that were skipped)
        const validFiles = filteredFiles.filter((file) => file !== null);

        setFiles3(
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
            "Some files exceed the maximum size limit of 200KB or do not meet the dimension requirements of 2176x590 pixels and will not be uploaded."
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

  const thumbs2 = files2.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%" }}
      className="img-fluidb"
      alt="file"
    />
  ));

  const thumbs3 = files3.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%" }}
      className="img-fluidb"
      alt="file"
    />
  ));

  // Update Product Banner Api

  const [getweekcondation, SetWeekCondation] = useState(false);

  // const UpdateProductBanner = async () => {
  //   const { startDate, endDate } = selectedDates;
  //   ("==>11", selectedDates);

  //   if (title == "" || undefined) {
  //     Notification("error", "Error!", "Please Enter Title!");
  //     return;
  //   }  else if (weekname1 === "")  {
  //     Notification("error", "Error", "Please Enter Start Date");
  //     return;
  //   } else if (weekname2 === "") {
  //     Notification("error", "Error", "Please Enter End Date");
  //     return;
  //   } else if (getmallarray.length < 0) {
  //     Notification("error", "Error!", "Please Select Mall!");
  //     return;
  //   } else if (BrandName == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Brand!");
  //     return;
  //   } else if (Category == "" || undefined) {
  //     Notification("error", "Error!", "Please Select Category!");
  //     return;
  //   } else {
  //     const formdata = await new FormData();
  //     await formdata.append("id", item.id);
  //     await formdata.append("title", title);
  //     if (gettrue === true) {
  //       for (var i = 0; i < regionidarray.length; i++) {
  //         await formdata.append("region_id[" + i + "]", regionidarray[i].id);
  //       }
  //       for (var i = 0; i < mallidarray.length; i++) {
  //         await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
  //       }
  //     } else {
  //       for (var i = 0; i < getmallarray.length; i++) {
  //         await formdata.append(
  //           "region_id[" + i + "]",
  //           getmallarray[i].region_id
  //         );
  //       }
  //       for (var i = 0; i < getmallarray.length; i++) {
  //         await formdata.append("mall_id[" + i + "]", getmallarray[i].mall_id);
  //       }
  //     }
  //     await formdata.append("brand_id", BrandId);
  //     await formdata.append("category_id", CategoryId);
  //     // await formdata.append("week_id", Week);
  //     if (getweekcondation === true) {
  //       await formdata.append(
  //         "from_date",
  //         moment(startDate[0]).format("YYYY-MM-DD")
  //       );
  //       await formdata.append(
  //         "to_date",
  //         moment(startDate[1]).format("YYYY-MM-DD")
  //       );
  //     } else {
  //       await formdata.append("from_date", weekname1);
  //       await formdata.append("to_date", weekname2);
  //     }
  //     await formdata.append("region_child_id[0]", "");
  //     if (files[0] !== undefined) {
  //       await formdata.append("image", files[0]);
  //     }

  //     const data = await UpdateProductBoardApi(formdata);
  //     if (data) {
  //       if (data.success === 1) {
  //         ("category-data", data);
  //         Notification(
  //           "success",
  //           "Success!",
  //           "Product Banner Updated Successfully!"
  //         );

  //         setTab(1);
  //         // getLeaderboard();
  //         // window.location.reload();
  //       }
  //     }
  //   }
  // };

  // Deleate Leaderboard Api

  const UpdateProductBanner = async () => {
    const { startDate, endDate } = selectedDates;

    if (title == "" || undefined) {
      Notification("error", "Error!", "Please Enter Title!");
      return;
    } else if (weekname1 === "") {
      Notification("error", "Error", "Please Enter Start Date");
      return;
    } else if (weekname2 === "") {
      Notification("error", "Error", "Please Enter End Date");
      return;
    } else if (getmallarray.length < 0) {
      Notification("error", "Error!", "Please Select Mall!");
      return;
    } else if (Category == "" || undefined) {
      Notification("error", "Error!", "Please Select Category!");
      return;
    } else {
      const formdata = await new FormData();
      await formdata.append("id", item.id);
      await formdata.append("title", title);
      if (gettrue === true) {
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
      } else {
        for (var i = 0; i < getmallarray.length; i++) {
          await formdata.append(
            "region_id[" + i + "]",
            getmallarray[i].region_id
          );
        }
        for (var i = 0; i < getmallarray.length; i++) {
          await formdata.append("mall_id[" + i + "]", getmallarray[i].mall_id);
        }
      }
      await formdata.append("category_id", CategoryId);
      // await formdata.append("week_id", Week);
      if (getweekcondation === true) {
        await formdata.append(
          "from_date",
          moment(startDate[0]).format("YYYY-MM-DD")
        );
        await formdata.append(
          "to_date",
          moment(startDate[1]).format("YYYY-MM-DD")
        );
      } else {
        await formdata.append("from_date", weekname1);
        await formdata.append("to_date", weekname2);
      }
      await formdata.append("region_child_id[0]", "");
      if (files[0] !== undefined) {
        await formdata.append("image", files[0]);
      }
      if (files2[0] !== undefined) {
        await formdata.append("image2", files2[0]);
      }
      if (files3[0] !== undefined) {
        await formdata.append("image3", files3[0]);
      }

      const data = await UpdateProductBoardApi(formdata);
      if (data) {
        if (data.success === 1) {
          // ("category-data", data);
          Notification(
            "success",
            "Success!",
            "Product Banner Updated Successfully!"
          );

          // setTab(1);
          getPromation();

          // getLeaderboard();
          // window.location.reload();
        } else if (data.success === 0) {
          Notification("error", "Error!", data.message);
        }
      }
    }
  };

  const DeleteProductBanner = async () => {
    const formdata = await new FormData();
    await formdata.append("id", item.id);

    const data = await deleteProductBannerApi(formdata);
    if (data) {
      if (data.success === 1) {
        // ("mall-data", data);
        Notification(
          "success",
          "Success!",
          "Product Banner Deleted Successfully!"
        );
        // setTab(1);
        getPromation();
        // getStore();
      }
    }
  };

  // Update Promotion Banner Api

  const Addtocart = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = await new FormData();
    await formdata.append("qty", 1);
    await formdata.append("product_banner_id", item.id);

    axios
      .post(add_store_cart, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success == 1) {
          // (JSON.stringify(res, null, 2));
          // window.location.reload(true);
          // setTab(1);
          Notification("success", "Success!", "Add to Cart Successfully");
          getPromation();
          getStoreCartApi();
        } else if (res.data.success == 0) {
          Notification("error", "Error!", data.message);
        }
      })
      .catch((err) => {
        console.log("err11", err);
      });
  };

  // madhav
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

  // const SearchFilter = (text) => {
  //   setSearchQuery(text);

  //   const searchText = text.toLowerCase();
  //   const newData = getregion_array.filter(item => {
  //     const regionName = item.region_name.toLowerCase();
  //     const mallMatch = item.malls.some(mall => mall.name.toLowerCase().includes(searchText));

  //     // Return true if either the region name or any mall name matches the search text
  //     return regionName.includes(searchText) || mallMatch;
  //   });

  //   setFilterData(newData);
  // };

  const SearchFilter = (text) => {
    setSearchQuery(text);

    const searchText = text.toLowerCase();
    const newData = getregion_array.filter((item) => {
      const regionName = item.region_name.toLowerCase();
      const mallMatch = item.malls.some((mall) =>
        mall.name.toLowerCase().includes(searchText)
      );

      // Return true if either the region name or any mall name matches the search text
      return regionName.includes(searchText) || mallMatch;
    });

    setFilterData(newData);
  };

  return (
    <>
      <div className="leaderboard-card-main-wrapp">
        {/* Leaderboard flex start */}
        <div className="leaderboard-card-flex-wrapp leaderboard-card-flex-wrapp-half">
          {/* Leaderboard first part responsive side start */}
          <div className="leaderboard-card-first-resp-main-wrapp">
            <p className="leaderboard-last-part-txt">
              {/* Service fee will apply if canceled */}
            </p>
            <button className="leaderboard-delete-icon-btn"  onClick={() => {
                DeleteProductBanner();
              }}>
              cancel{" "}
              <img
                src={images.delete_icon}
                className="leaderboard-delete-icon"
              />
            </button>
          </div>
          {/* Leaderboard first part responsive side end*/}

          {/* Leaderboard part first start */}
          <div className="leaderboard-card-part-first">
            {/* Leaderboad form start */}

            {/* Leaderboard inputbox start */}
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">
                Title:<span className="star_require">*</span>
              </label>
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
              <label className="leaderboard-card-lbl">Mall(s):</label>
              <div
                onClick={() => openMallModal()}
                className="leaderboard-card-inp"
                style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
              >
                {gettrue === true ? (
                  <>
                    {/* {selectedMalls && selectedMalls.length > 0
                      ? selectedMalls.map((mall, mindx) => {
                          return <p className="">{mall}</p>;
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
                onChange={handleDateChange}
                disabledDate={combine(allowedMaxDays(7), beforeToday())}
              />
            </div>
            {/* Leaderboard inputbox start */}
            {/* <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">Brand(s):</label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setBrandName(e.target.value);
                    setBrandId(e.target.value);
                  }}
                >
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
            {/* Leaderboard inputbox end */}

            {/* Leaderboard inputbox start */}
            <div className="leaderboard-card-inpbox-wrapp">
              <label className="leaderboard-card-lbl">
                Categories:<span className="star_require">*</span>
              </label>
              <div className="select-wrapper" style={{ width: "100%" }}>
                <select
                  className="leaderboard-card-inp cons_select_nav"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCategoryId(e.target.value);
                  }}
                >
                  <option selected disabled value="">
                    {Category}
                  </option>
                  {eateryvalue == 1 ? (
                    <>
                      {category_eatery_data &&
                        category_eatery_data.map((item, index) => {
                          return (
                            <>
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {category_data &&
                        category_data.map((item, index) => {
                          return (
                            <>
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </>
                  )}
                </select>
              </div>
            </div>
            {/* Leaderboard inputbox end */}

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
          <div className="brand_banner_img_main">
            <div
              className="leaderboard-card-part-sec"
              {...getRootlogoProps()}
              style={{ width: "100%" }}
            >
              <input
                {...getInputlogoProps()}
                accept="image/jpeg, image/jpg, image/png, image/eps"
              />
              {/* <div className="myprofile_inner_sec2"> */}
              {getcondition === true ? (
                <>
                  {files && files.length > 0 ? (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      {thumbs}
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  {item.image_path === null || item.image_path === "" ? (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  ) : (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      <img
                        alt=""
                        src={item.image_path}
                        style={{ width: "100%", height: "100%" }}
                        className="img-fluidb"
                      />
                    </div>
                  )}
                </>
              )}

              {/* </div> */}
            </div>

            <div
              className="leaderboard-card-part-sec"
              {...getRootlogoProps2()}
              style={{ width: "100%" }}
            >
              <input
                {...getInputlogoProps2()}
                accept="image/jpeg, image/jpg, image/png, image/eps"
              />
              {/* <div className="myprofile_inner_sec2"> */}
              {getcondition2 === true ? (
                <>
                  {files2 && files2.length > 0 ? (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      {thumbs2}
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG .GIF (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  {item.image2_path === null || item.image2_path === "" ? (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  ) : (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      <img
                        alt=""
                        src={item.image2_path}
                        style={{ width: "100%", height: "100%" }}
                        className="img-fluidb"
                      />
                    </div>
                  )}
                </>
              )}

              {/* </div> */}
            </div>

            <div
              className="leaderboard-card-part-sec"
              {...getRootlogoProps3()}
              style={{ width: "100%" }}
            >
              <input
                {...getInputlogoProps3()}
                accept="image/jpeg, image/jpg, image/png, image/eps"
              />
              {/* <div className="myprofile_inner_sec2"> */}
              {getcondition3 === true ? (
                <>
                  {files3 && files3.length > 0 ? (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      {thumbs3}
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG .GIF (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  {item.image3_path === null || item.image3_path === ""? (
                    <div style={{ width: "100%" }}>
                      <div
                        className="leaderboard-card-part-sec2"
                        style={{ height: "100%" }}
                      >
                        <AiOutlineCloudUpload
                          style={{
                            width: "60px",
                            height: "60px",
                            color: "var(--color-orange)",
                            marginBottom: "10px",
                          }}
                        />
                        <h4>.JPG .PNG (2176 x 590 pixels)</h4>
                        <p>(max 200kb)</p>
                        <p>You can also upload file by</p>

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
                  ) : (
                    <div
                      className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl myprofile_inner_sec2_img_upload_border"
                      style={{ marginBottom: "0rem" }}
                    >
                      <img
                        alt=""
                        src={item.image3_path}
                        style={{ width: "100%", height: "100%" }}
                        className="img-fluidb"
                      />
                    </div>
                  )}
                </>
              )}

              {/* </div> */}
            </div>
          </div>
          {/* Leaderboard part second end */}

          {/* Leaderboard part third start */}
          <div className="leaderboard-card-part-third leaderboard-card-part-third-half">
            <button
              onClick={() => {
                DeleteProductBanner();
              }}
              className="leaderboard-delete-icon-btn"
            >
              cancel{" "}
              <img
                alt=""
                src={images.delete_icon}
                className="leaderboard-delete-icon"
              />
            </button>
            <p className="leaderboard-last-part-txt">
              {/* Service fee will apply if canceled */}
            </p>
            <div className="leaderboard-btn-box">
              {item.cart_status === 0 ? (
                <>
                  <button
                    style={{ padding: "0.4rem", fontSize: "16px" }}
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
                <button className="btn btn-black">Added</button>
              )}
            </div>

            <div className="leaderboard-btn-box">
              <button
                className="btn btn-orange"
                onClick={() => UpdateProductBanner()}
              >
                Update
              </button>
            </div>
          </div>
          {/* Leaderboard part third end */}

          {/* Leaderboard last part responsive side start */}
          <div className="leaderboard-card-sec-resp-main-wrapp  leaderboard-card-sec-resp-main-wrapp_edited">
            <div className="leaderboard-btn-box">
              {item.cart_status === 0 ? (
                <>
                  <button
                    className="btn btn-black cartbtnblack"
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
                  className="btn btn-black cartbtnblack"
                  // onClick={() => {
                  //   window.location.reload(true);
                  //   Addtocart();
                  // }}
                >
                  Added
                </button>
              )}
            </div>

            <div className="leaderboard-btn-box updatebtnorg">
              <button
                className="btn btn-orange"
                onClick={() => UpdateProductBanner()}
              >
                Update
              </button>
            </div>
          </div>
          {/* Leaderboard last part responsive side end */}
        </div>

        {/* Leaderboard flex start */}

        {/* select mall modal start */}

        {/* select mall modal end */}
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
              {getSearchQuery ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
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

export default ProductBannerCard;
