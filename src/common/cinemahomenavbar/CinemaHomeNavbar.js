import React, { useEffect, useState } from "react";
import "./CinemaHomeNavbar.css";
import images from "../../constants/images";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useMallContext } from "../../context/mall_context";
import { useAuthContext } from "../../context/auth_context";
import { IoClose } from "react-icons/io5";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { AiOutlineClose } from "react-icons/ai";
import ReactModal from "react-modal";
import { ImGoogle } from "react-icons/im";
import { FaApple, FaFacebookF } from "react-icons/fa";
import Urls from "../../utils/Urls";
import { GrClose } from "react-icons/gr";
import Notification from "../../utils/Notification";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import {
  // AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  // AiOutlineGoogle,
} from "react-icons/ai";
import { useStoreContext } from "../../context/store_context";
import { ACCEPT_HEADER, dynamic_model_popup, get_mall, get_mall_from_region_for_store, get_mall_master, unregisterd_cinema_retailer } from "../../utils/Constant";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { RxCross2 } from "react-icons/rx";

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

const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "1rem",
    backgroundColor: "none",
    border: "none",
    borderRadius: "0px",
    maxHeight: "670px",
  },
  overlay: {
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
};

const animatedComponents = makeAnimated();

const CinemaHomeNavbar = ({ setTab, get_mall_auth_data }) => {
  const location = useLocation();

  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);
  const [mallsOption, setMallsOption] = useState([]);

  const [getmallname, setMallname] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  // const [getRegion, setRegion] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsidebarOpen, setSidebarOpen] = useState(false);
  const [getaccountOpen, setAccountOpen] = useState(false);
  const [getcondation, SetCondation] = useState(false);
  const [profile, setProfile] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(0);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(0);
  const [getrole, setrole] = useState();
  const [login, SetLogin] = useState("");
  const [getgender, setGender] = useState("");
  const { get_brand_data, getBrand } = useMallContext();

  const [getcustomerDropdown, setCustomerDropdown] = useState(false);
  const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);
  const [getModal, setModal] = useState(false);


  const [getvat_no, setvat_no] = useState("");
  const [getearh_no, setearh_no] = useState("");
  const [getmallarrayregion, SetMallArrayRegion] = useState([]);


  const [signButn, SetsignButn] = useState(1);
  const [regButn, SetregButn] = useState(1);
  const [boldButn, SetboldButn] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [brandModalIsOpen3, setbrandModalIsOpen3] = useState(false);
  const [registerModalIsOpenBrand, setRegisterModalIsOpenBrand] =
    useState(false);
  const [getmallarray, SetMallArray] = useState([]);
  const [getmallarray2, SetMallArray2] = useState([]);
  const [getmall, SetMall] = useState("");
  const [getmall2, SetMall2] = useState("");
  // const { retailer_data } = useStoreContext();
  const [getmallmasterid, setmallmasterid] = useState("");
  const [retailertype, setRetailertype] = useState("");

  const [getaddretailername, setAddRetailerName] = useState("");
  const [getMallModalData, setMallModalData] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpenForgot, setIsOpenForgot] = useState(false);
  const [getforgotemail, setForgotEmail] = useState("");
  const [getUnregisterRetailer, setUnregisterRetailer] = useState([]);

  const [getregion, setRegion] = useState("");
  const [getcompanyregnumber, setCompanyRegNumber] = useState("");
  const [mallsOption2, setMallsOption2] = useState([]);
  const [getDropDown, setDropDown] = useState(false);
  const [getDropDown2, setDropDown2] = useState(false);
  const [getBranddId, setBrandId] = useState("");
  const [getaddretailernamemain, setAddRetailerNameMain] = useState("");
  const [getaddretailermainbrand, setAddRetailerMainBrand] = useState("");
  const [getaddretailernamemaingroup, setAddRetailerNameMainGroup] = useState("");
  const [getaddretailermainbrandGroup, setAddRetailerMainBrandGroup] = useState("");
  
  const { setMallRegister, is_login, is_token, logoutUser, role, get_brand_data_multiple, getBrandMultiple } =
    useMallContext();



  const { setRegisterStore, retailer_data, getRetailerApi, setRegisterCinema, getCinemaNameApi, cinema_mall_data } = useStoreContext();

  const { setLogin, RegisterCustomer, region_data,forgotPassword } = useAuthContext();

  let navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // const redirect = "http://localhost:3000/account/login";

  function logout() {
    localStorage.clear();
    navigate("/mall");
    window.location.reload(false);
  }

  function closeModalFogot() {
    setIsOpenForgot(false);
  }

  const onHandleForgotEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setForgotEmail(email);
    } else {
      return;
    }
  };

  const handleOptionChange = (event) => {

    const value = event.target.value;

    const [id, brand_id] = value.split("_");
    console.log("ID:", id); // Output: ID: 39
    console.log("Brand ID:", brand_id); // Output: Brand ID: 101
    setRetailertype(id);
    if (getgender == 2) {
      getBrandMultiple(id);
    } else {
      getBrand(id);
    }



    // setMallname(brand_id);
    setMallname(brand_id.split(","));
  };
  useEffect(() => {
    token();
    // 
    let role = localStorage.getItem("role");
    setrole(role);
    var islogin = localStorage.getItem("is_login");
    SetLogin(islogin);
    // ("is login-----", login);
    // ("is role-----", getrole);
  }, []);

  const responseFacebook = (response) => {
    // 
  };
  const brandLoginModalOpen = () => {
    setModalIsOpenBrand(false);
    setIsOpen3(true);
  };
  const onLoginStart = () => {

  };

  const componentClicked = (click) => {
    // 
  };

  useEffect(() => {
    if (get_brand_data && get_brand_data.length > 0) {
      // setMallname(get_brand_data[0].id);
      setBrandId(get_brand_data[0].id);
    }
  }, [get_brand_data]);
  const token = async () => {
    // ("is_token", await localStorage.getItem("is_token"));

    const login = await localStorage.getItem("is_token");
    if (login) {
      SetCondation(true);
    } else {
      SetCondation(false);
    }
  };

  const onHandleEmailChange = (e) => {
    let email = e.target.value;

    if (email === "" || regEx.test(email)) {
      setEmail(email);
    } else {
      return;
    }
  };

  const SigninCustomerGoogle = async (gmail, type, data) => {
    if (gmail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(gmail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        role: 2,
        email: gmail,
        // password: "",
        type: type,
      };

      // 
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          setIsOpen3(false);
          navigate("/");
          setEmail("");
          window.location.reload(false);
        }
      }
    }
  };

  function closeModalRegisterNavbar() {
    setRegisterCustomerOpen(false);
  }

  const SigninCustomerFacebook = async (fdata, type) => {
    var params = {
      role: 2,
      fb_id: fdata.id,
      first_name: fdata.first_name,
      last_name: fdata.last_name,
      type: type,
      name: fdata.name,
    };

    // 
    const data = await setLogin(params);
    if (data) {
      if (data.success === 1) {
        setIsOpen3(false);
        navigate("/");
        setEmail("");
        window.location.reload(false);
      }
    }
  };

  // function logout() {
  //     localStorage.clear();
  //     window.location.reload(false);
  //     navigate("/");
  // }

  // let navigate = useNavigate();

  const mallLoginModalOpen = () => {
    setIsOpen(false);
    setIsOpen3(true);
  };

  function closeModal() {
    setIsOpen(false);
    // setModal(false);
  }

  function closeModalAfterCinema() {
    setModal(false);
    navigate('/');
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  // const onHandleEmailChange = (e) => {
  //     let email = e.target.value;

  //     if (email === "" || regEx.test(email)) {
  //         setEmail(email);
  //     } else {
  //         return;
  //     }
  // };

  // terms checkbox funtion

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTermChange = (e) => {
    setIsAcceptTerm(1);
    // ("e.targate.value");
  };
  const handleTermChange2 = (e) => {
    setIsAcceptTerm2(1);
    // ("e.targate.value");
  };

  // Signup Brand

  const SigninBrand = async (type) => {
    if (retailertype === "") {
      alert("Enter the Retailer Name......!");
      return;
    } else if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the FirstName No......!");
      return;
    } else if (getlastname === "") {
      alert("Enter the LastName No......!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        mall_id: getmallmasterid,
        // mall_master_id: getmallmasterid,
        retailer_id: retailertype,
        store_type: getgender,
        brand: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
        email: getemail,
        role: 3,
        password: getpassword,
        terms_condition: isAcceptTerm,
      };

      // 
      const data = await setRegisterStore(params);
      if (data) {
        if (data.success === 1) {
          // 
          // Notification("success", "Success!", "Brand Registerated Successfully!");
          setIsOpen3(false);
          setModalIsOpenBrand(false);
          setmallmasterid("");
          setRetailertype("");
          setGender("");
          setMallname("");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setIsAcceptTerm("");
          // window.location.reload(false);
        }
      }
    }
  };
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      // ("Geolocation is not available in your browser.");
    }
  }, []);
  const SigninMall = async (type) => {
    // if (getmallname === "") {
    //   alert("Enter the Mall Name......!");
    //   return;
    // }
    if (getvat_no === "") {
      alert("Enter the VAT No......!");
      return;
    } else if (getearh_no === "") {
      alert("Enter the earh No......!");
      return;
    } else if (getfirstname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getlastname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        mall_master_id: getmall,
        vat_no: getvat_no,
        earh_no: getearh_no,
        role: 2,
        email: getemail,
        password: getpassword,
        first_name: getfirstname,
        last_name: getlastname,
        terms_condition: isAcceptTerm,
        lat: position.latitude,
        log: position.longitude
      };

      const data = await setMallRegister(params);
      if (data) {
        if (data.success === 1) {
          // 
          Notification(
            "success",
            "Success!",
            "Mall Registerated Successfully!"
          );
          setIsOpen3(false);
          setIsOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  // Customer Signup

  const SigninCustomer = async (type) => {
    // if (getmallname === "") {
    //   alert("Enter the Mall Name......!");
    //   return;
    // }
    if (getfirstname === "") {
      alert("Enter the First Name....!");
      return;
    } else if (getlastname === "") {
      alert("Enter the Last Name....!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else {
      var params = {
        role: 4,
        email: getemail,
        // region_id: getRegioncus,
        password: getpassword,
        name: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
      };

      // 
      const data = await RegisterCustomer(params);
      if (data) {
        if (data.success === 1) {
          // 
          // Notification("success", "Success!", "Customer Registerated Successfully!");

          // setIsOpen(false);
          setIsOpen3(false);
          setRegisterCustomerOpen(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  // Mall Login

  const LoginMall = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 2,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      // 
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          //           setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/profile-page");
        }
      }
    }
  };

  // // terms checkbox funtion

  // const handleTermChange = (event) => {
  //     setIsAcceptTerm((current) => !current);
  // };


  const LoginCinema = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 6,
        email: getemail,
        password: getpassword,
        type: "1",
      };

      // 
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("cinema-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/CinemaDashboard");
        }
      }
    }
  };


  // const SigninCinema = async (type) => {
  //   if (getgender === "") {
  //     alert("Select Retailer type......!");
  //     return;
  //   } else if (getfirstname === "") {
  //     alert("Enter the FirstName No......!");
  //     return;
  //   } else if (getlastname === "") {
  //     alert("Enter the LastName No......!");
  //     return;
  //   } else if (getemail === "") {
  //     alert("Enter the Email......!");
  //     return;
  //   } else if (regEx.test(getemail) === false) {
  //     alert("Enter the valid Email....!");
  //     return;
  //   } else if (getpassword === "") {
  //     alert("Enter the password....!");
  //     return;
  //   } else {
  //     var params = {
  //       mall_id: getmallmasterid,
  //       // mall_master_id: getmallmasterid,
  //       retailer_id: retailertype,
  //       store_type: getgender,
  //       brand: getmallname,
  //       first_name: getfirstname,
  //       last_name: getlastname,
  //       email: getemail,
  //       // role: 3,
  //       password: getpassword,
  //       privacy_policy: isAcceptTerm,
  //       // terms_condition: isAcceptTerm2,
  //     };

  //     // 
  //     const data = await setRegisterCinema(params);
  //     if (data) {
  //       if (data.success === 1) {
  //         // 
  //         setIsOpen(false);
  //         setModalIsOpenBrand(false);
  //         setmallmasterid("");
  //         setRetailertype("");
  //         setGender("");
  //         setMallname("");
  //         setFirstname("");
  //         setLastname("");
  //         setEmail("");
  //         setPassword("");
  //         setIsAcceptTerm("");
  //         setIsAcceptTerm2("");
  //         setIsOpen3(false);
  //         // window.location.reload(false);
  //       }
  //     }
  //   }
  // };


  const SigninCinema = async (type) => {
    const errors = [];
    const minLength = 8;
    const hasNumber = /[0-9]/.test(getpassword);
    const hasUpperCase = /[A-Z]/.test(getpassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(getpassword);
    // if (getmallmasterid === "") {
    //   alert("Please Select Mall......!");
    //   return;
    // } else if (retailertype === "") {
    //   alert("Please Select Cinema Name......!");
    //   return;
    // } 
    if (getgender === "") {
      alert("Select Cinema type......!");
      return;
    }
    // else if (getgender == 2 && mallsOption.length <= 0) {
    //   alert("Please Select any Brand otherwise select Independent Retailer");
    //   return;
    // }

    else if ((retailertype === "" && getaddretailernamemain === "") && (getaddretailernamemaingroup === "")) {
      if (getgender == 1) {
        alert("Please Enter Retailer Name......!");
      } else if (getgender == 2) {
        alert("Please Enter Holding Company Name......!");
      } else {
        alert("Please Enter Retailer Name......!");
      }

      return;
    } else if (getgender === "") {
      alert("Select Retailer type......!");
      return;
    } else if (mallsOption.length === 0 && getaddretailername === "" && getgender == 2 && getaddretailermainbrandGroup === "") {
      alert("Please select any Retailer/Brand Name or Add New Retailer/Brand Name");
      return;
    } else if (getaddretailername === "" && getDropDown === true) {
      alert("Please Add New Retailer/Brand Name");
      return;
    }else if (getaddretailernamemain != "" && getaddretailermainbrand === "") {
      alert("Please Add New Brand Name");
      return;
    }else if (getcompanyregnumber === "") {
      alert("Please Enter Company Registration Number......!");
      return;
    } else if (getvat_no === "") {
      alert("Please Enter VAT Number......!");
      return;
    }
    // else if (getearh_no === "") {
    //   alert("Please Enter ERF Number......!");
    //   return;
    // }
    else if (getfirstname === "") {
      alert("Enter the FirstName No......!");
      return;
    } else if (getlastname === "") {
      alert("Enter the LastName No......!");
      return;
    } else if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
      return;
    } else if (getpassword.length < minLength || !hasNumber || !hasUpperCase || !hasSpecialChar) {
      alert("Password must be at least 8 characters long.Password must contain at least one number,Password must contain at least one uppercase letter & Password must contain at least one special character");
      return;
    } else if (files.length == 0) {
      alert("Please Upload Company Registration Document ....!");
      return;
    } else if (files2.length == 0) {
      alert("Please Upload VAT Registration Document ....!");
      return;
    } else {
      // var params = {
      //   mall_id: getmallmasterid,
      //   // mall_master_id: getmallmasterid,
      //   retailer_id: retailertype,
      //   store_type: getgender,
      //   brand: getmallname,
      //   first_name: getfirstname,
      //   last_name: getlastname,
      //   email: getemail,
      //   // role: 3,
      //   password: getpassword,
      //   privacy_policy: isAcceptTerm,
      //   terms_condition: isAcceptTerm2,
      // };

      const formdata = await new FormData();
      // if(getregion === ""){
      if (getregion == "") {
        await formdata.append("mall_id", getmallmasterid);
      } else { }

      if (getmallmasterid == "") {
        await formdata.append("mall_id", getmall2);
      } else { }

      // }else{}
      if (getaddretailernamemain == "" && getaddretailernamemaingroup == "") {
        await formdata.append("retailer_id", retailertype); 
      } else { }
      await formdata.append("store_type", getgender);
      if(getgender == 2){
        for (let i = 0; i < mallsOption.length; i++) {
          await formdata.append(`brand[${i}]`, mallsOption[i].value);
        }
      } else {
        if (getDropDown === false) {
          await formdata.append("brand", getBranddId);
        } else {
          await formdata.append("add_new_brand", getaddretailername);

        }

      }
      if (getDropDown === true && getaddretailername && getgender == 2) {
        await formdata.append("add_new_brand", getaddretailername);
      }

      if (getDropDown2 === true && getBranddId === "" && mallsOption2.length <= 0 && getgender == 1) {
        await formdata.append("retailer_name", getaddretailernamemain);

      }
      if (getDropDown2 === true && getaddretailermainbrand && mallsOption2.length <= 0 && getgender == 1) {
        await formdata.append("add_new_brand", getaddretailermainbrand);

      }

      if (getDropDown2 === true && getBranddId === "" && mallsOption2.length <= 0 && getgender == 2) {
        await formdata.append("retailer_name", getaddretailernamemaingroup);

      }
      if (getDropDown2 === true && getaddretailermainbrandGroup && mallsOption2.length <= 0 && getgender == 2) {
        await formdata.append("add_new_brand", getaddretailermainbrandGroup);

      }
      // await formdata.append("brand",getmallname);

      await formdata.append("company_reg_no", getcompanyregnumber);
      await formdata.append("vat_no", getvat_no);

      await formdata.append("role", 6);
      await formdata.append("email", getemail);
      await formdata.append("password", getpassword);
      await formdata.append("first_name", getfirstname);
      await formdata.append("last_name", getlastname);
      await formdata.append("privacy_policy", isAcceptTerm);
      await formdata.append("terms_condition", isAcceptTerm2);


      await formdata.append("company_reg_document", files[0]);
      await formdata.append("vat_document", files2[0]);

      // 


      // ("-=-=-=->", formdata);
      const data = await setRegisterCinema(formdata);
      if (data) {
        if (data.success === 1) {

          setIsOpen(false);
          setModalIsOpenBrand(false);
          setmallmasterid("");
          setRetailertype("");
          setGender("");
          setMallname("");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setIsAcceptTerm("");
          setIsAcceptTerm2("");
          setIsOpen3(false);
          setModal(true);
          // window.location.reload(false);
        }
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function closeModal4() {
    setIsOpen4(false);
  }

  function closeModalBrand() {
    setModalIsOpenBrand(false);
  }

  const ForgotPassApi = async (e) => {
    if (getforgotemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getforgotemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else {
      var params = {
        email: getforgotemail,
      };

      // 
      const data = await forgotPassword(params);
      if (data) {
        if (data.success === 1) {
          //           setIsOpenForgot(false);
          setEmail("");
          // setPassword("");
          // window.location.reload(false);
          // navigate("/profile-page");
        }
      }
    }
  };
  const LoginCustomer = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 4,
        email: getemail,
        password: getpassword,
        type: "1",
      };


      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("customer-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/mallnearme");
        }
      }
    }
  };

  const LoginBrand = async (e) => {
    if (getemail === "") {
      alert("Enter the Email......!");
      return;
    } else if (regEx.test(getemail) === false) {
      alert("Enter the valid Email....!");
      return;
    } else if (getpassword === "") {
      alert("Enter the password....!");
    } else {
      var params = {
        role: 3,
        email: getemail,
        password: getpassword,
        type: "1",
      };


      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          // ("brand-data", data);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(true);
          navigate("/branddashboard");
        }
      }
    }
  };

  const getMallMaster = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_mall_master, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetMallArray(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);

      });
  };

  const getMallMaster2 = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_mall, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("ggg", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetMallArray2(res.data.data);
          // Notification("success", "Success!", "Brand Registerated Successfully!");
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);

      });
  };

  const getMallModalApi = async () => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    setLoading(true);
    const formdata = await new FormData();
    await formdata.append("id", 3);
    axios
      .post(dynamic_model_popup, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          // Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === 1) {
          setLoading(false);
          setMallModalData(res.data.data);
          // Notification("success", "Success!", "Mall Registerated Successfully!");
        } else {
        }
      })
      .catch((err) => {
        console.log("err11", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMallMaster();
    getMallMaster2();
    getMallModalApi();
  }, []);

  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {

        {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }

      },
    });

  const { getRootProps: getRootMapProps, getInputProps: getInputMapProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {

        {
          setFiles2(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }

      },
    });


  const regionMallApi = async (id) => {

    const token = JSON.parse(localStorage.getItem("is_token"));
    const formdata = await new FormData();
    await formdata.append("region_id", id);
    // setLoading(true);
    axios
      .post(get_mall_from_region_for_store, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          // Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // ("get region mall resp", JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          SetMallArrayRegion(res.data.data);
          // setLoading(false);

        } else {
          // null;
        }
      })
      .catch((err) => {
        console.log("error11", err);

        // setLoading(false);
      });
  };

  const unRegisterRetailer = async (id) => {
    const token = JSON.parse(localStorage.getItem("is_token"));
    const formdata = await new FormData();
    await formdata.append("store_type", id);
    axios
      .post(unregisterd_cinema_retailer, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {

        if (res.data.success == 1) {
          setUnregisterRetailer(res.data.data);
        } else {
          null();
        }
      })
      .catch((err) => {
        console.log("error11", err);

      });
  };

  return (
    <>
      <nav className="nav_main_wrapp">
        <div className="container">
          <div className="nav_base_wrapp">
            <Link to={"/"}>
              <img src={images.brandlogo} alt="logo" className="nav_logo" />
            </Link>
            <div className="nav-links-mall">
              <Link
                to={"/"}
                style={{
                  color: location.pathname === "/" ? "#ff8b00" : "black",
                  fontWeight: location.pathname === "/" ? "600" : "400",
                }}>
                Home
              </Link>
              <NavLink
                to={"/about-instore"}
                style={{
                  color:
                    location.pathname === "/about-instore"
                      ? "#ff8b00"
                      : "black",
                  fontWeight:
                    location.pathname === "/about-instore" ? "600" : "400",
                }}>
                About In-store
              </NavLink>
              {/* <Link
                            // onClick={() => setIsOpen(true)}
                            to={"/mall"}
                            style={{ color: location.pathname === "/mall" ? "#ff8b00" : "black", fontWeight: location.pathname === "/mall" ? "600" : "400" }}
                        >
                            Mall Registration
                        </Link> */}

              {/* <Link
                            // onClick={() => setModalIsOpenBrand(true)}
                            to={"/retailer"}
                            style={{ color: location.pathname === "/retailer" ? "#ff8b00" : "black", fontWeight: location.pathname === "/retailer" ? "600" : "400" }}
                        >
                            Brand Registration
                        </Link> */}
              <div className="nav_myacc_wrapp">
                <NavLink
                  to={""}
                  style={{
                    color:
                      location.pathname === "/profile-page"
                        ? "#ff8b00"
                        : "black",
                    fontWeight:
                      location.pathname === "/profile-page" ? "600" : "400",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "5px",
                    }}>
                    <Link>
                      <img
                        src={
                          get_mall_auth_data
                            ? get_mall_auth_data.shopping_center_logo_mall_path
                              ? get_mall_auth_data.shopping_center_logo_mall_path
                              : images.profile_logo
                            : images.profile_logo
                        }
                        alt=""
                        className="nav_profile"
                      />
                    </Link>
                    {login === "true" && getrole == 2 ? (
                      <>
                        <Link
                          to={""}
                          onClick={() =>
                            setCustomerDropdown(!getcustomerDropdown)
                          }
                          className="my-acc-nav-flex">
                          My Account{" "}
                          {getcustomerDropdown ? (
                            <BsChevronUp style={{ marginTop: "1px" }} />
                          ) : (
                            <BsChevronDown style={{ marginTop: "1px" }} />
                          )}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={""}
                          onClick={() =>
                            setCustomerDropdown(!getcustomerDropdown)
                          }
                          className="my-acc-nav-flex">
                          Account{" "}
                          {getcustomerDropdown ? (
                            <BsChevronUp style={{ marginTop: "1px" }} />
                          ) : (
                            <BsChevronDown style={{ marginTop: "1px" }} />
                          )}
                        </Link>
                      </>
                    )}
                  </div>
                </NavLink>
                {/* <Link>
                  <img
                    src={
                      get_mall_auth_data
                        ? get_mall_auth_data.shopping_center_logo_mall_path
                          ? get_mall_auth_data.shopping_center_logo_mall_path
                          : images.profile_logo
                        : images.profile_logo
                    }
                    alt=""
                    className="nav_profile"
                  />
                </Link>
                <Link
                  to={""}
                  onClick={() => setCustomerDropdown(!getcustomerDropdown)}
                >
                  Account{" "}
                  {getcustomerDropdown ? <BsChevronUp /> : <BsChevronDown />}
                </Link> */}
                {getcustomerDropdown ? (
                  <>
                    <div className="navbar-acc-menu-open-warapp">
                      {/* <Link to="/mall" className="navbar-acc-menu-link">
                        Mall
                      </Link> */}
                      {/* <Link to="/retailer" className="navbar-acc-menu-link">
                        Brand
                      </Link> */}
                      {/* {is_login === true || role === 4 ? <Link to="/customer"
                                                className="navbar-acc-menu-link"
                                            >
                                                Customer
                                            </Link> : <Link to="/"
                                                className="navbar-acc-menu-link"
                                            >
                                                Customer
                                        </Link>} */}
                      {/* <Link to="/customer" className="navbar-acc-menu-link">
                        Customer
                      </Link> */}
                      {/* {login === "true" || getrole == 2 ? (
                        <Link
                          to="/profile-page"
                          className="navbar-acc-menu-link"
                        >
                          Mall Dashboard
                        </Link>
                      ) : null} */}

                      {login === false || login === null ? (
                        <>
                          <Link
                            to="/mall"
                            className="navbar-acc-menu-link"
                          // onClick={() => { setTab(1) }}
                          >
                            Mall
                          </Link>
                          <Link
                            to="/retailer"
                            className="navbar-acc-menu-link"
                          // onClick={() => { setTab(2) }}
                          >
                            Brand
                          </Link>
                          {/* Hide customer page */}

                          {/* <Link
                            to="/customer"
                            className="navbar-acc-menu-link"
                          // onClick={() => { setTab(2) }}
                          >
                            Customer
                          </Link> */}
                          {/* Hide customer page */}

                          <Link
                            className="navbar-acc-menu-link"
                            onClick={() => {
                              setIsOpen3(true); SetsignButn(4); SetboldButn(4);
                            }}>
                            {/* onClick={() =>{setIsOpen3(true),SetsignButn(1),SetboldButn(1)}}> */}
                            Login
                          </Link>
                          {login === "true" ? (
                            <button
                              style={{ textAlign: "start" }}
                              onClick={logout}>
                              Logout
                            </button>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {/* <Link
                            className="navbar-acc-menu-link"
                            onClick={() => setTab(2)}>
                            Account Setting
                          </Link> */}
                          {/* <Link className="navbar-acc-menu-link" onClick={() => setTab()}>Track Consumer Data</Link> */}
                          {/* <Link className="navbar-acc-menu-link" style={{ fontSize: "16px" }}>
                            Track Consumer Data
                          </Link> */}
                          {/* <Link className="navbar-acc-menu-link" style={{ fontSize: "16px" }}>Help</Link> */}
                          <a  className="navbar-acc-menu-link" style={{ fontSize: "14px" }} href="mailto:support@in-store.co.za">Help</a>

                          {/* {is_login === true ? (<><Link onClick={logout}>Logout</Link></>) : (<></>)} */}
                          {login === "true" ? (
                            <button
                              style={{ textAlign: "start" }}
                              onClick={logout}>
                              Logout
                            </button>
                          ) : null}
                        </>
                      )}
                      {/* <Link
                                                className="navbar-acc-menu-link"
                                                onClick={() => setRegisterCustomerOpen(true)}
                                            >
                                                Sign Up
                                            </Link> */}
                    </div>
                  </>
                ) : null}
                {login === "true" && role == 2 ? (
                  <div style={{ position: "relative" }}>
                    <Link to="">
                      <img src={images.cart_icon} className="cart-icon-img" />
                    </Link>
                    <div className="cart-digit-main">0</div>
                  </div>
                ) : null}
              </div>
              {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen3(true)}>
                  Sign Up <BsChevronDown />
                </Link>
              ) : null}
              {getcondation && (
                <>
                  <div className="nav_myacc_wrapp">
                    <Link>
                      <img
                        src={images.profile_logo}
                        alt=""
                        className="nav_profile"
                      />
                    </Link>
                    <Link
                      to={"/profile-page"}
                      onClick={() => setAccountOpen(!getaccountOpen)}
                    >
                      My Account
                      {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                    </Link>
                    {getaccountOpen ? (
                      <>
                        <div className="navbar-acc-menu-open-warapp">
                          <Link className="navbar-acc-menu-link">Login</Link>
                          <Link className="navbar-acc-menu-link">Sign Up</Link>
                          <Link className="navbar-acc-menu-link">
                            My profile
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            Account Setting
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Leaderboard Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Promotional Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Product Banners
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Product Tiles
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            -&nbsp;&nbsp;Track Analytics
                          </Link>
                          <Link className="navbar-acc-menu-link">
                            My Brand in malls
                          </Link>
                          <Link className="navbar-acc-menu-link">Help</Link>
                          <Link className="navbar-acc-menu-link">Logout</Link>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <Link onClick={logout}>
                    <IoIosLogOut size={20} />
                  </Link>
                </>
              )} */}
            </div>

            <button
              className="sidebar_logo"
              onClick={() => {
                setSidebarOpen(!getsidebarOpen);
                setAccountOpen(false);
              }}>
              {getsidebarOpen ? (
                <IoClose size={30} color="#000" />
              ) : (
                <img src={images.side_logo} alt="" />
              )}
            </button>
          </div>
          {getsidebarOpen && (
            <div className="nav_sidebar_wrapp">
              <Link to="/">Home</Link>
              {login === "true" && getrole == 2 ? (
                <Link to="/profile-page" className="navbar-acc-menu-link">
                  Mall Dashboard
                </Link>
              ) : null}

              {login === "true" && getrole == 3 ? (
                <Link to="/branddashboard" className="navbar-acc-menu-link">
                  Brand Dashboard
                </Link>
              ) : null}

              {login === "true" && getrole == 4 ? (
                <Link to="/mallnearme" className="navbar-acc-menu-link">
                  Malls Near Me
                </Link>
              ) : null}
              {login === "true" && getrole == 6 ? (
                <Link to="/CinemaDashboard" className="navbar-acc-menu-link">
                  Cinema Dashboard
                </Link>
              ) : null}

              <Link to="/about-instore">About In-store</Link>
              <Link to="/mall">Mall Registration</Link>

              <Link to="/retailer">Brand Registration</Link>
               {/* Hide customer page */}

              {/* <Link to="/customer">Customer Registraion</Link> */}
               {/* Hide customer page */}

              <Link to="/CinemaPage">Cinema Registraion</Link>

              {login === "true" || getrole === 2 ? (
                <></>
              ) : (
                <Link
                  onClick={() => {
                    setIsOpen3(true); SetsignButn(4); SetboldButn(4);
                    setSidebarOpen(!getsidebarOpen);
                  }}>
                  Login
                </Link>
              )}
              {/* <Link to="/mall">Mall </Link> */}
              {/* <Link to="/retailer">Brand Registration</Link> */}
              {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen2(true)}>Sign Up</Link>
              ) : null} */}

              {/* {getcondation === true ? ( */}
              {/* {is_login === true || role === 2 ? ( */}
              {login === "true" || getrole === 2 ? (
                <>
                  <Link onClick={() => setAccountOpen(!getaccountOpen)}>
                    My Account{" "}
                    {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                  </Link>
                </>
              ) : null}

              {/* ) : null} */}

              {/* ) : null} */}
              {/* <Link onClick={logout}>
                <IoIosLogOut size={20} />
              </Link> */}
              {getaccountOpen && (
                <>
                  {login === "true" && getrole == 2 ? (
                    <div className="accunt_sec_wrapp">
                      {/* <Link
                        onClick={() => {
                          setTab(1);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        My Profile
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(2);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Acccount Setting
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(3);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Brands
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(4);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Eateries
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(17);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Movies
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(5);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Events
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(6);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Facilities
                      </Link>
                      <Link
                        onClick={() => {
                          setTab(7);
                          setSidebarOpen(!getsidebarOpen);
                        }}>
                        Contact Details
                      </Link> */}
                      {/* <Link onClick={() => setTab(8)}></Link> */}

                      {/* <Link onClick={() => setRegisterCustomerOpen(true)}>Sign Up</Link> */}
                      {login === false || login === null ? (
                        <Link
                          onClick={() => {
                            setIsOpen(true);
                            setSidebarOpen(!getsidebarOpen);
                          }}>
                          Sign Up
                        </Link>
                      ) : null}
                      {login === "true" ? (
                        <Link onClick={logout}>Logout</Link>
                      ) : (
                        <></>
                      )}
                      {/* <Link>Help</Link> */}
                      <a href="mailto:support@in-store.co.za">Help</a>


                      {/* <Link> - Events</Link>
                  <Link> - Facilities</Link>
                  <Link> Contact Details</Link> */}
                    </div>
                  ) : (
                    <>
                      {login === "true" ? (
                        <Link onClick={logout}>Logout</Link>
                      ) : (
                        <></>
                      )}
                      {/* <Link>Help</Link> */}
                      <a href="mailto:support@in-store.co.za">Help</a>

                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mall Login Modal start*/}

      {/*Mall Login Modal end*/}

      {/* Mall Register*/}

      {/* Mall Register end */}

      {/* Brand Register Start */}
      <ReactModal
        isOpen={registerModalIsOpenBrand}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalBrand}
        style={customStyles}>
        <div className="home_model_4wrapp">
          <button
            className="signup_modal_close"
            onClick={() => {
              setRegisterModalIsOpenBrand(false);
            }}>
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt">
              {/* Cancel */}
            </span>{" "}
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Register to In-store
          </button>

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Mall Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setmallmasterid(e.target.value);
                getRetailerApi(e.target.value);
              }}>
              {getmallarray &&
                getmallarray.map((item, index) => {
                  return (
                    <>
                      {/* <option selected disabled value=""></option> */}
                      <option value={item.id} key={index}>
                        {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                        {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="mall">Retailer Name</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setRetailertype(e.target.value);
                // ("retailertype is", retailertype);
                getBrand(e.target.value);
                // (e.target.value);
              }}>
              <option defaultValue value=""></option>
              {retailer_data &&
                retailer_data.map((item, index) => {
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

          <div className="radio-btn-flex sign_input_wrapp_padding_less">
            {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="Online"
                name="gender"
                defaultValue={retailer_data.type}
                onChange={(e) => {
                  setGender(1);
                }}
              />
              <label className="brand-lable-radio-btn-txt" for="male">
                Independent Retailer
              </label>
            </div>

            <div className="radio-btn-inner-flex">
              <input
                type="radio"
                id="In-Person"
                name="gender"
                // value={2}
                // onChange={(e) => setMode(e.target.value)}
                value={getgender}
                onChange={(e) => setGender(2)}
              />
              <label className="brand-lable-radio-btn-txt" for="specifyColor">
                Group Retailer
              </label>
            </div>
          </div>

          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="first-name">Brands (if applicable)</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setMallname(e.target.value);
              }}>
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


          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="last-name">Account Manager First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label>Account Manager Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="email">Account Manager Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              value={getemail}
            />
          </div>
          <div className="sign_input_wrapp sign_input_wrapp_padding_less">
            <label htmlFor="password">Set a Password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
            <input
              type="checkbox"
              value={isAcceptTerm}
              onChange={handleTermChange}
              checked={isAcceptTerm}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}>
            Register
          </button>
          <p style={{ color: "black", fontWeight: "600", marginBottom: "5px" }}>
            OR
          </p>
          <p className="fs-des" style={{ paddingBottom: "20px" }}>
            If you are already registered, then{" "}
            <span
              // onClick={() => brandLoginModalOpen()}
              onClick={() => {
                brandLoginModalOpen(true);
                setRegisterModalIsOpenBrand(false);
                // setbrandModalIsOpen3(true);
              }}
              className="signup_terms_link">
              login
            </span>
          </p>
        </div>
      </ReactModal>
      {/* Brand Register Modal End */}

      {/* Customer Register start */}
      <ReactModal
        isOpen={getregisterCustomerOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalRegisterNavbar}
        style={customStyles}>
        <div className="home_model_4wrapp">
          <button
            className="signup_modal_close"
            onClick={closeModalRegisterNavbar}>
            <GrClose />
          </button>
          <button className="f-b900 fs-22 mb_16 signup_headign">
            Hi, nice to meet you!
          </button>
          <div className="sign_input_wrapp">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              value={getfirstname}
              onChange={(e) => setFirstname(e.target.value)}
              name=""
              id=""
              autoFocus="true"
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              value={getlastname}
              onChange={(e) => setLastname(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => onHandleEmailChange(e)}
              name=""
              id=""
            />
          </div>

          {/* <div className="sign_input_wrapp">
                        <label htmlFor="email">Region</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                setRegion(e.target.value);
                                (e.target.value);
                            }}
                        >
                            <option value="" selected disabled>
                                Select Region
                            </option>

                            {region_data &&
                                region_data.map((itm, ind) => {
                                    return (
                                        <option key={itm.id} value={itm.id}>
                                            {itm.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div> */}

          <div className="sign_input_wrapp">
            <label htmlFor="password">Set a password</label>
            <input
              type="password"
              value={getpassword}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="signup_terms_wrapp mb_16">
            <input
              type="checkbox"
              value={isAcceptTerm}
              onChange={handleTermChange}
              checked={isAcceptTerm}
            />
            <p className="fs-des">
              I have read and agree to the{" "}
              <a className="signup_terms_link">Terms and Conditions</a> &{" "}
              <a className="signup_terms_link">Privacy Policy</a>
            </p>
          </div>
          <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm ? false : true}
            onClick={() => SigninCustomer()}>
            Register
          </button>
          {/* <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => {
              ("bsdjhfgsjfhjksdfg");
              SigninCustomer();
            }}
          >
            Register
          </button> */}

          <p
            style={{
              alignSelf: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}>
            or
          </p>

          <div style={{ width: "100%" }}>
            {/* facebook button */}

            <LoginSocialFacebook
              appId="1377758369684897"
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
              // version={3}
              onLoginStart={(e) => (e)}
              onLogoutSuccess={(e) => (e)}
              redirect_uri={Urls.base_url}
              onResolve={({ data }: IResolveParams) => {
                // setProfile(data);
                // (data);
                SigninCustomerFacebook(data, "4");
              }}
              onReject={(err) => {
              }}>
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}>
                <FaFacebookF
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Facebook
              </button>
            </LoginSocialFacebook>

            {/* google button */}

            <LoginSocialGoogle
              // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
              client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
              onLoginStart={onLoginStart}
              redirect_uri={Urls.base_url}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ data }: IResolveParams) => {
                setProfile(data);
                // ("gdata", data);
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "4", data);
              }}
              onReject={(err) => {
                // (err);
              }}>
              <button
                className="mb_8 modal-social-btn "
                style={{
                  justifyContent: "center",
                  width: "100%",
                  color: "var(--color-gray)",
                  fontWeight: "600",
                  fontSize: "16px",
                }}>
                <ImGoogle
                  color="var(--color-gray)"
                  style={{
                    marginRight: "8px",
                    fontSize: "16px",
                    marginBottom: "-2px",
                  }}
                />
                Continue with Google
              </button>
              {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
            </LoginSocialGoogle>

            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "20px",
              }}>
              Already have an accouneet?
            </p>

            <button
              onClick={() => {
                setRegisterCustomerOpen(false);
                setIsOpen3(true);
              }}
              className="btn btn-orange"
              style={{ marginBottom: "20px" }}>
              Sign in
            </button>
          </div>
        </div>
      </ReactModal>
      {/* Customer Register End   */}



      {/* Login / signup modal live  start*/}

      {/* Register modal start */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}>
        <div className="model_sizing">
          <div style={{ backgroundColor: "transparent" }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={() => {
                  setIsOpen(false);
                }}>
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
            <div className="tab_btn_main" style={{ height: "0px" }}>
              {signButn == 4 ? null :
                <button
                  onClick={() => {
                    SetregButn(1);
                    SetboldButn(1);
                  }}
                  style={{
                    backgroundColor: regButn == 1 ? "white" : "#dad9d8",
                    fontWeight: boldButn == 1 ? "600" : "200",
                  }}
                  className="tab_btn_styling">
                  Mall Login / Sign Up
                </button>}

              {signButn == 4 ? null : <button
                onClick={() => {
                  // setbrandModalIsOpen3(true);
                  SetregButn(2);
                  SetboldButn(2);
                }}
                style={{
                  backgroundColor: regButn == 2 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 2 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Brand Login / Sign Up
              </button>
              }
              {signButn == 4 ? null : <button
                onClick={() => {
                  //  setCustLoginModalIsOpen3(true);
                  SetregButn(3);
                  SetboldButn(3);
                  // regButn(3);
                }}
                style={{
                  backgroundColor: regButn == 3 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 3 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Consumer Login / Sign Up
              </button>}
              {/* {signButn == 4  ?  <button
                onClick={() => {
                  //  setCustLoginModalIsOpen3(true);
                  SetregButn(4);
                  SetboldButn(4);
                  // regButn(3);
                }}
                style={{
                  backgroundColor: regButn == 4 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 4 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Cinema Login / Sign Up
              </button> : null} */}

            </div>
          </div>
          {regButn == 1 ? (
            <div className="home_model_4wrapp">
              {/* <button
                className="signup_modal_close"
                // onClick={closeModalRegisterNavbar}>
                onClick={() => {
                  setIsOpen(false);
                }}>
                <GrClose />
              </button> */}
              <h3 className="f-b900 fs-22 mb_16 signup_headign">
                Register Your Mall
              </h3>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">Mall Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    SetMall(e.target.value);
                    // (e.target.value);
                  }}>
                  <option selected disabled value=""></option>
                  {getmallarray &&
                    getmallarray.map((item, index) => {
                      return (
                        <>
                          {/* <option selected disabled value=""></option> */}
                          <option value={item.id} key={index}>
                            {item.name} &nbsp;&nbsp;&nbsp; {item.from_date}{" "}
                            &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>
                {/* <input
              type="text"
              value={getmallname}
              onChange={(e) => setMallname(e.target.value)}
              name=""
              id=""
            /> */}
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">VAT Number</label>
                <input
                  type="text"
                  value={getvat_no}
                  onChange={(e) => setvat_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="mall">ERF Number</label>
                <input
                  type="text"
                  value={getearh_no}
                  onChange={(e) => setearh_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Latitude</label>
                <input disabled
                  type=""
                  value={position.latitude}
                  // onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="password">Longitude</label>
                <input disabled
                  type=""
                  value={position.longitude}
                  // onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm === 1}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm === 1 ? false : true}
                onClick={() => SigninMall()}>
                Register
              </button>
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}>
                OR
              </p>
              <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  onClick={() => {
                    mallLoginModalOpen();
                    SetsignButn(1);
                  }}
                  // onClick={() => setModalIsOpen4(true)}
                  className="signup_terms_link">
                  login here
                </span>
              </p>
            </div>
          ) : regButn == 2 ? (
            <div className="home_model_4wrapp">
              <button
                className="signup_modal_close"
                //  onClick={closeModalBrand}>
                onClick={() => {
                  setRegisterModalIsOpenBrand(false);
                }}>
                <span
                  style={{ fontSize: "16px" }}
                  className="brand-lable-radio-btn-txt"></span>{" "}
                {/* <GrClose /> */}
              </button>
              <h3 className="f-b900 fs-22 mb_16 signup_headign">
                Register to In-store
              </h3>

              <div className="radio-btn-flex sign_input_wrapp_padding_less">
                {/* <label className="course-form-txt course-form-margin-right">
              Mode Of Delivery:
            </label> */}
                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="Online"
                    name="gender"
                    defaultValue={retailer_data.type}
                    onChange={(e) => {
                      setGender(1);
                    }}
                  />
                  <label className="brand-lable-radio-btn-txt" for="male">
                    Independent Retailer
                  </label>
                </div>

                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="In-Person"
                    name="gender"
                    // value={2}
                    // onChange={(e) => setMode(e.target.value)}
                    value={getgender}
                    onChange={(e) => setGender(2)}
                  />
                  <label
                    className="brand-lable-radio-btn-txt"
                    for="specifyColor">
                    Group Retailer
                  </label>
                </div>
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Mall Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setmallmasterid(e.target.value);
                    getRetailerApi(e.target.value);
                    // (e.target.value);
                  }}>
                  {getmallarray2 &&
                    getmallarray2.map((item, index) => {
                      return (
                        <>
                          {/* <option selected disabled value=""></option> */}
                          <option value={item.id} key={index}>
                            {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                            {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Retailer Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRetailertype(e.target.value);
                    // ("retailertype is", retailertype);
                    getBrand(e.target.value);
                    // (e.target.value);
                  }}>
                  <option defaultValue value=""></option>
                  {retailer_data &&
                    retailer_data.map((item, index) => {
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



              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="first-name">Brands (if applicable)</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setMallname(e.target.value);
                    // (e.target.value);
                  }}>
                  {get_brand_data &&
                    get_brand_data.map((item, index) => {
                      return (
                        <>
                          {/* <option selected disabled value="">
                      Auto-fill from database
                    </option> */}
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">Account Manager First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label>Account Manager Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="email">Account Manager Email Address</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="password">Set a Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm ? false : true}
                onClick={() => SigninBrand()}>
                Register Your Brand
              </button>
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}>
                OR
              </p>
              <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  // onClick={() => brandLoginModalOpen()}
                  onClick={() => {
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(2);
                    // brandLoginModalOpen(true);
                    // setRegisterModalIsOpenBrand(false);
                    // SetsignButn(2);

                    // setbrandModalIsOpen3(true);
                  }}
                  className="signup_terms_link">
                  login here
                </span>
              </p>
            </div>
          ) : regButn == 3 ? (
            <div className="home_model_4wrapp">
              <button
                className="signup_modal_close"
                onClick={closeModalRegisterNavbar}>
                {/* <GrClose /> */}
              </button>
              <button className="f-b900 fs-22 mb_16 signup_headign">
                Hi, nice to meet you!
              </button>
              <div className="sign_input_wrapp">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                  autoFocus="true"
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                />
              </div>

              {/* <div className="sign_input_wrapp">
                        <label htmlFor="email">Region</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                setRegion(e.target.value);
                                (e.target.value);
                            }}
                        >
                            <option value="" selected disabled>
                                Select Region
                            </option>

                            {region_data &&
                                region_data.map((itm, ind) => {
                                    return (
                                        <option key={itm.id} value={itm.id}>
                                            {itm.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div> */}

              <div className="sign_input_wrapp">
                <label htmlFor="password">Set a password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a>
                </p>
              </div>
              <div className="signup_terms_wrapp mb_16" style={{ marginTop: "0rem" }}>
                <input
                  type="checkbox"
                  value={isAcceptTerm2}
                  onChange={handleTermChange2}
                  checked={isAcceptTerm2}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-black mb_16"
                disabled={isAcceptTerm ? false : true}
                onClick={() => SigninCustomer()}>
                Sign Up
              </button>
              {/* <button
            className="btn btn-orange mb_16"
            disabled={isAcceptTerm === 1 ? false : true}
            onClick={() => {
              ("bsdjhfgsjfhjksdfg");
              SigninCustomer();
            }}
          >
            Register
          </button> */}

              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}>
                or
              </p>

              <div style={{ width: "100%" }}>
                {/* facebook button */}

                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  // version={3}
                  onLoginStart={(e) => (e)}
                  onLogoutSuccess={(e) => (e)}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // setProfile(data);
                    // (data);
                    // SigninCustomerFacebook(data, "4");
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                {/* google button */}

                <LoginSocialGoogle
                  // client_id="775372553139-o2l7tmtgohlmu3q31o0ufsfne62g47tk.apps.googleusercontent.com"
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                    // ("gdata", data);
                    // registerWithGoogle(data);
                    // registerWithGoogle(data);
                    // SigninCustomerGoogle(data.email, "4", data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                  {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
                </LoginSocialGoogle>

                <p
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}>
                  Already have an account?
                </p>

                <button
                  onClick={() => {
                    // setRegisterCustomerOpen(false);
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(3);
                  }}
                  className="btn btn-orange"
                  style={{ marginBottom: "20px" }}>
                  Sign in
                </button>
              </div>
            </div>
          ) : regButn == 4 ? (
            <div className="home_model_4wrapp">
              <button className="f-b900 fs-22 mb_16 signup_headign">
                Cinema Registration to In-store{" "}
              </button>

              <div className="radio-btn-flex radiobtnflex_homenav sign_input_wrapp_padding_less">


                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="Online"
                    name="gender"
                    defaultValue={retailer_data.type}
                    onChange={(e) => {
                      setGender(1);
                      unRegisterRetailer(1);
                       setAddRetailerName("");
                        setMallsOption2("");
                    }}
                  />
                  <label className="brand-lable-radio-btn-txt" for="male">
                    Independent Cinema
                  </label>
                </div>

                <div className="radio-btn-inner-flex">
                  <input
                    type="radio"
                    id="In-Person"
                    name="gender"
                    // value={2}
                    // onChange={(e) => setMode(e.target.value)}
                    value={getgender}
                    onChange={(e) =>{ setGender(2);
                      unRegisterRetailer(2);
                       setAddRetailerName(""); 
                       setMallsOption2("");
                    }}
                  />
                  <label
                    className="brand-lable-radio-btn-txt"
                    for="specifyColor"
                  >
                    Group Cinema
                  </label>
                </div>
              </div>

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Select Mall Name<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select
                    className="leaderboard-card-inp cons_select_nav"
                    onChange={(e) => {
                      setmallmasterid(e.target.value);
                      getCinemaNameApi(e.target.value, getgender);
                      // (e.target.value);
                    }}
                    disabled={getmall2 ? true : false}
                  >
                    <option selected value="">
                      select Mall{" "}
                    </option>
                    {getmallarray2 &&
                      getmallarray2.map((item, index) => {
                        return (
                          <>
                            <option value={item.id} key={index}>
                              {item.name}  &nbsp;&nbsp;&nbsp;{" "}
                              {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                            </option>
                          </>
                        );
                      })}

                  </select>
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "15px",
                    }}>
                    Select all your malls in all your regions
                  </div>
                </div>
              </div> */}
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                {getgender == 2 ? <>
                  <label htmlFor="mall">
                    Holding Company Name<span className="star_require">*</span>
                  </label>
                </> : <>
                  <label htmlFor="mall">
                  Cinema Name<span className="star_require">*</span>
                  </label>
                </>}

                {/* <div className="select-wrapper" style={{ width: "100%" }}> */}
                  {/* <select
                    className="leaderboard-card-inp cons_select_nav"
                    disabled={getgender ? false : true}
                    onChange={(e) => {
                      handleOptionChange(e);
                    }}>
                    <option defaultValue value=""></option>
                    {getUnregisterRetailer &&
                      getUnregisterRetailer.map((item, index) => {
                        return (
                          <>
                            <option
                              // value={`${item.id}_${item.brand_id}`}
                              value={item.id}
                              key={index}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select> */}

                  <Select
                  value={mallsOption2}
                  style={{ width: "100%", padding: "0px", maxHeight: "35px !important" }}
                  className="leaderboard-card-inp brand_reg_multi2"
                  components={animatedComponents}
                  placeholder=""
                  options={getUnregisterRetailer.map((item) => ({
                    value: `${item.value}`,
                    label: item.label,
                  }))}
                  onChange={(selectedOptions) => {
                    if (getaddretailernamemain || getaddretailermainbrand || getaddretailernamemaingroup || getaddretailermainbrandGroup) {
                      // If getaddretailernamemain has a value, do not allow change
                      return;
                    } else {
                      setMallsOption2(selectedOptions);
                      console.log("selected option", selectedOptions);

                      if (selectedOptions) {
                        // Get the value of the first selected option
                        const selectedValue = selectedOptions.value;
                        console.log("sss", selectedValue);
                        // Destructure the ID and brand_id
                        const [id, brand_id] = selectedValue.split("_");

                        console.log("ID:", id);
                        console.log("Brand ID:", brand_id);

                        setRetailertype(id);

                        // Call the appropriate function based on gender
                        if (getgender === 2) {
                          getBrandMultiple(id);
                        } else {
                          getBrand(id);
                        }
                      }
                    }
                  }}
                // isDisabled={!getgender}
                />

<div
                  style={{
                    // paddingTop: "0.5rem",
                    color: "gray",
                    fontSize: "12px",
                  }}
                >
                  If you don’t see your retailer listed above,
                  <span
                    onClick={() => {
                      setDropDown2(!getDropDown2);
                      if(getDropDown === true){
                            setDropDown(false);
                          }
                    }}
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    click here
                  </span>{" "}
                  to add new.
                  {/* Dont see your mall listed? Add your mall below.  */}
                </div>
                </div>

                {getDropDown2 === true && getgender == 1 ? (
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="last-name">
                      Add New Retailer Name
                      {/* <span className="star_require">*</span> */}
                    </label>
                    {/* <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[ ,]/g, ''); // Remove commas and spaces
                      setAddRetailerName(newValue);
                    }}
                    name=""
                    id=""
                  /> */}

                    <input
                      type="text"
                      value={getaddretailernamemain}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, ""); // Remove only commas
                        setAddRetailerNameMain(newValue);
                        if (getaddretailernamemain) {
                          setMallsOption2([]);
                          setBrandId("");
                          setMallname("");
                        }
                      }}
                      name=""
                      id=""
                    />
                  </div>


                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="last-name">
                      Add New Brand Name
                      {/* <span className="star_require">*</span> */}
                    </label>

                    <input
                      type="text"
                      value={getaddretailermainbrand}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/,/g, ""); // Remove only commas
                        setAddRetailerMainBrand(newValue);
                        if (getaddretailermainbrand) {
                          setMallsOption2([]);
                          setBrandId("");
                          setMallname("");
                        }
                      }}
                      name=""
                      id=""
                    />
                  </div>
                </>
              ) : (
                <>
                  {getDropDown2 === true && getgender == 2 ? (
                    <>
                      <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                        <label htmlFor="last-name">
                          Add New Holding Company Name
                          {/* <span className="star_require">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={getaddretailernamemaingroup}
                          onChange={
                            (e) => {
                              setAddRetailerNameMainGroup(e.target.value)
                              if (getaddretailernamemaingroup) {
                                setMallsOption2([]);
                                setMallsOption([]);
                                setBrandId("");
                                setMallname("");
                              }
                            }}
                          name=""
                          id=""
                        />
                      </div>
                      <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                        <label htmlFor="last-name">
                          Add New Brand Name
                          {/* <span className="star_require">*</span> */}
                        </label>
                        <input
                          type="text"
                          value={getaddretailermainbrandGroup}
                          onChange={(e) => {
                            setAddRetailerMainBrandGroup(e.target.value);
                            if (getaddretailermainbrandGroup) {
                              setMallsOption2([]);
                              setMallsOption([]);
                              setBrandId("");
                              setMallname("");
                            }
                          }}

                          name=""
                          id=""
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {getgender == 2 ?
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="" className="" style={{ minWidth: "148px" }}>Cinema Brand Name<span className="star_require">*</span></label>

                    <Select
                      value={mallsOption}
                      style={{
                        width: "100%",
                        padding: "0px",
                        maxHeight: "35px !important",
                      }}
                      className="leaderboard-card-inp brand_reg_multi"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder=""
                      isMulti
                      options={get_brand_data_multiple}
                      onChange={(selectedOptions) => {
                        if (
                          getaddretailernamemain ||
                          getaddretailermainbrand ||
                          getaddretailernamemaingroup ||
                          getaddretailermainbrandGroup
                        ) {
                          return; // Prevents changes if any of these values are truthy
                        } else {
                          setMallsOption(selectedOptions);
                        }
                      }}
                    />
                    <div
                      style={{
                        // paddingTop: "0.5rem",
                        color: "gray",
                        fontSize: "12px",
                      }}>
                      If you don’t see your brand listed above,
                      <span onClick={() => { setDropDown(!getDropDown);  if(getDropDown2 === true){
                            setDropDown2(false);
                          }}}
                        style={{ fontWeight: "700", cursor: "pointer" }}>click here</span> to add new.
                      {/* Dont see your mall listed? Add your mall below.  */}
                    </div>
                  </div>
                </> : <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="first-name">Cinema Brand Name<span className="star_require">*</span></label>
                    <div className="select-wrapper" style={{ width: "100%" }}>

                      <select
                        disabled={getaddretailername != "" || getaddretailernamemain != "" || getaddretailermainbrand != "" ? true : false}
                        className="leaderboard-card-inp cons_select_nav"
                        onChange={(e) => {
                          setMallname(e.target.value);
                          setBrandId(e.target.value);

                        }}>
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
                    <div
                      style={{
                        // paddingTop: "0.5rem",
                        color: "gray",
                        fontSize: "12px",
                      }}>
                      If you don’t see your brand listed above,
                      <span onClick={() => { setDropDown(!getDropDown);  if(getDropDown2 === true){
                            setDropDown2(false);
                          } }}
                        style={{ fontWeight: "700", cursor: "pointer" }}>click here</span> to add new.
                      {/* Dont see your mall listed? Add your mall below.  */}
                    </div>
                  </div>

                </>}
                
                {getDropDown === true && getgender == 1 ? <>
                <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                  <label htmlFor="last-name">
                    Add New Cinema Name

                  </label>
                  {/* <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[ ,]/g, ''); // Remove commas and spaces
                      setAddRetailerName(newValue);
                    }}
                    name=""
                    id=""
                  /> */}

                  <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/,/g, ''); // Remove only commas
                      setAddRetailerName(newValue);
                    }}
                    name=""
                    id=""
                  />
                </div>
              </> : <>{getDropDown === true && getgender == 2 ? <>
                <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                  <label htmlFor="last-name">
                  Add New Cinema Name
                    {/* <span className="star_require">*</span> */}
                  </label>
                  <input
                    type="text"
                    value={getaddretailername}
                    onChange={(e) => setAddRetailerName(e.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </> : <></>}

              </>}
              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Cinema Name<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select
                    className="leaderboard-card-inp cons_select_nav"
                    onChange={(e) => {
                      handleOptionChange(e);
                    }}>
                    <option defaultValue value=""></option>
                    {cinema_mall_data &&
                      cinema_mall_data.map((item, index) => {
                        return (
                          <>

                            <option value={`${item.id}_${item.brand_id}`} key={index}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
                    Dont see your cinema listed? Add your cinema below.
                  </div>
                </div>
              </div> */}

            

              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Cinema Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setmallmasterid(e.target.value);
                    getCinemaNameApi(e.target.value);
                    (e.target.value);
                  }}
                >
                  {getmallarray &&
                    getmallarray.map((item, index) => {
                      return (
                        <>
                          <option selected disabled value=""></option>
                          <option value={item.id} key={index}>
                            {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                            {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>


              </div> */}


              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="first-name">Cinema (if applicable)<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select
                    className="leaderboard-card-inp cons_select_nav"
                    onChange={(e) => {
                      setMallname(e.target.value);
                      (e.target.value);
                    }}
                  >
                    {get_brand_data &&
                      get_brand_data.map((item, index) => {
                        return (
                          <>
                            <option selected disabled value="">
                      Auto-fill from database
                    </option>
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div> */}

              {/* {getgender == 2 ?
                <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="" className="" style={{ minWidth: "148px" }}>Cinemas (if applicable)</label>

                    <Select
                      value={mallsOption}
                      styles={{ width: "100%", padding: "0px" }}
                      className="leaderboard-card-inp"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[colourOptions[4], colourOptions[5]]}
                      placeholder=""

                      isMulti
                      options={get_brand_data_multiple}
                      onChange={setMallsOption}
                    />
                  </div>
                </> : <>
                  <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                    <label htmlFor="first-name">Cinemas (if applicable)<span className="star_require">*</span></label>
                    <div className="select-wrapper" style={{ width: "100%" }}>

                      <select
                        className="leaderboard-card-inp cons_select_nav"
                        onChange={(e) => {
                          setMallname(e.target.value);
                        }}>
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
                  </div>

                </>} */}
              {/* <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">Add Cinema Name </label>
                <input
                  type="text"
                  value={getaddretailername}
                  onChange={(e) => setAddRetailerName(e.target.value)}
                  name=""
                  id=""
                />
              </div> */}

              {/* <div className="sign_input_wrapp">
                <label htmlFor="email">Select Your Region</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRegion(e.target.value);
                    (e.target.value);
                  }}
                >
                  <option value="" selected disabled>
                    Select Region
                  </option>

                  {region_data &&
                    region_data.map((itm, ind) => {
                      return (
                        <option key={itm.id} value={itm.id}>
                          {itm.name}
                        </option>
                      );
                    })}
                </select>
              </div> */}

              {/* Select Your Region* start*/}

              {/* <div className="sign_input_wrapp">
                <label htmlFor="email">Select Your Region<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select

                    className="leaderboard-card-inp"
                    onChange={(e) => {
                      setRegion(e.target.value);
                      regionMallApi(e.target.value);
                      (e.target.value);

                    }}
                    disabled={getmallmasterid ? true : false}

                  >
                    <option value="" >
                      Select Region
                    </option>

                    {region_data &&
                      region_data.map((itm, ind) => {
                        return (
                          <option key={itm.id} value={itm.id}>
                            {itm.name}
                          </option>
                        );
                      })}
                  </select>
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
                    Select all the regions where your stores are located
                  </div>
                </div>
              </div> */}
              {/* Select Your Region* end*/}

              {/* <div className="sign_input_wrapp">
                <label htmlFor="mall">Select Your Malls<span className="star_require">*</span></label>
                <div className="select-wrapper" style={{ width: "100%" }}>

                  <select
                    className="leaderboard-card-inp"
                    onChange={(e) => {
                      SetMall2(e.target.value);
                      (e.target.value);
                    }} disabled={getmallmasterid ? true : false}>
                    <option selected value="">
                      select Mall{" "}
                    </option>
                    {getmallarrayregion &&
                      getmallarrayregion.map((item, index) => {
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
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      color: "gray",
                      fontSize: "14px",
                    }}>
                    Select all your malls in all your regions.
                  </div>
                </div>
              </div> */}


              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Company Registration Number<span className="star_require">*</span></label>
                <input
                  type="text"
                  value={getcompanyregnumber}
                  onChange={(e) => setCompanyRegNumber(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">VAT Number<span className="star_require">*</span></label>
                <input
                  type="text"
                  value={getvat_no}
                  onChange={(e) => setvat_no(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="last-name">Account Manager First Name<span className="star_require">*</span></label>
                <input
                  type="text"
                  value={getfirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label>Account Manager Last Name<span className="star_require">*</span></label>
                <input
                  type="text"
                  value={getlastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="email">Email Address<span className="star_require">*</span></label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                />
              </div>
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="password">Set a Password<span className="star_require">*</span></label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>

              <div className="sign_input_wrapp">
                <label htmlFor="password">Company Registration Document<span className="star_require">*</span></label>
                <button className="btn btn-gray" {...getRootlogoProps()}>Upload
                  <input
                    {...getInputlogoProps()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                </button>
              </div>

              <div className="sign_input_wrapp">
                <label htmlFor="password">VAT Registration Document<span className="star_require">*</span></label>
                <button className="btn btn-gray" {...getRootMapProps()}>Upload
                  <input
                    {...getInputMapProps()}
                    accept="image/jpeg, image/jpg, image/png, image/eps"
                  />
                </button>
              </div>

              <span style={{ fontSize: "14px", color: "#bbb", alignSelf: "flex-start", marginBottom: "0.7rem" }}>*Required Fields including all document uploads.</span>

              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  value={isAcceptTerm2}
                  onChange={handleTermChange2}
                  checked={isAcceptTerm2}
                />
                <p className="fs-des">
                  I have read and agree to the{" "}
                  <a className="signup_terms_link">Terms and Conditions</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm == 1 && isAcceptTerm2 == 1 ? false : true}
                onClick={() => SigninCinema()}
              >
                Register Your Cinema
              </button>
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                OR
              </p>
              <p className="fs-des" style={{ paddingBottom: "20px" }}>
                If you are already registered, then{" "}
                <span
                  onClick={() => {
                    // brandLoginModalOpen();
                    setIsOpen3(true);
                    setIsOpen(false);
                    SetsignButn(4);
                  }}
                  className="signup_terms_link"
                >
                  login here
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </ReactModal>
      {/* Register modal end */}

      {/* Login modal start*/}
      <ReactModal
        isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        style={customStyles}>
        <div className="model_sizing">
          <div style={{ backgroundColor: "transparent" }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={closeModal3}>
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
            <div className="tab_btn_main" style={{ height: "0px" }}>
              {signButn == 4 ? null : <button
                onClick={() => {
                  SetsignButn(1);
                  SetboldButn(1);
                }}
                style={{
                  backgroundColor: signButn == 1 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 1 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Mall Login / Sign Up
              </button>}

              {signButn == 4 ? null : <button
                onClick={() => {
                  SetsignButn(2);
                  SetboldButn(2);
                }}
                style={{
                  backgroundColor: signButn == 2 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 2 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Brand Login / Sign Up
              </button>}

              {signButn == 4 ? null : <button
                onClick={() => {
                  SetsignButn(3);
                  SetboldButn(3);
                }}
                style={{
                  backgroundColor: signButn == 3 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 3 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Consumer Login / Sign Up
              </button>}

              {/* {signButn == 4 ? 
              <button
                onClick={() => {
                  SetsignButn(4);
                  SetboldButn(4);
                }}
                style={{
                  backgroundColor: signButn == 4 ? "white" : "#dad9d8",
                  fontWeight: boldButn == 4 ? "600" : "200",
                }}
                className="tab_btn_styling">
                Cinema Login / Sign Up
              </button> : null
             } */}

            </div>
          </div>
          {signButn == 1 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}>
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginMall()}
                disabled={isAcceptTerm ? false : true}>
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}>
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => (e)}
                  onLogoutSuccess={(e) => (e)}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                    // ("gdata", data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}>
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}>
                Not Registered Yet?
              </button>
              <h3
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(1);
                }}
                className="btn btn-orange">
                Register Your Mall
              </h3>
            </div>
          ) : signButn == 2 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}>
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                  value={getemail}
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginBrand()}
                disabled={isAcceptTerm ? false : true}>
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}>
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => (e)}
                  onLogoutSuccess={(e) => (e)}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}>
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}>
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(2);
                }}
                className="btn btn-orange">
                Register Your Brand
              </button>
            </div>
          ) : signButn == 3 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}>
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate">
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginCustomer()}
                disabled={isAcceptTerm ? false : true}>
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}>
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => (e)}
                  onLogoutSuccess={(e) => (e)}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                    // ("gdata", data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}>
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}>
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>

                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}>
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}>
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(3);
                }}
                className="btn btn-orange">
                Sign up
              </button>
            </div>
          ) : signButn == 4 ? (
            <div
              className="home_login_model_1sec_inner"
              style={{ maxWidth: "none" }}
            >
              <div className="f-b900 fs-22 mb_16 signup_headign">
                Welcome Back!
              </div>
              <div className="sign_input_wrapp">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  onChange={(e) => onHandleEmailChange(e)}
                  name=""
                  id=""
                  className="signup_input"
                  autoFocus="true"
                />
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    background: "#DAD9D8",
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="input_box-cus-pass"
                >
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="signup_input"
                    style={{
                      background: "#DAD9D8",
                      border: "none",
                      width: "100%",
                    }}
                  />
                  {passwordVisible === true ? (
                    <AiOutlineEye size={22} onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </AiOutlineEyeInvisible>
                  )}
                </div>
                <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div>
                <button className="signup_model_forgate" onClick={() => { setIsOpenForgot(true) }}>
                  Forgot your password?
                </button>
              </div>
              <button
                className="btn btn-black mb_16"
                onClick={() => LoginCinema()}
                disabled={isAcceptTerm ? false : true}
              >
                Login
              </button>
              <p
                style={{
                  alignSelf: "center",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                or
              </p>

              <div style={{ width: "100%" }}>
                <LoginSocialFacebook
                  appId="1377758369684897"
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={(e) => (e)}
                  onLogoutSuccess={(e) => (e)}
                  redirect_uri={Urls.base_url}
                  onResolve={({ data }: IResolveParams) => {
                    // (data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn "
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <FaFacebookF
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Facebook
                  </button>
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  client_id="826718979042-bhij4jt5s6p85n55hbuhh0v40i4b3ng4.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ data }: IResolveParams) => {
                    setProfile(data);
                    // ("gdata", data);
                  }}
                  onReject={(err) => {
                    // (err);
                  }}
                >
                  <button
                    className="mb_8 modal-social-btn"
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      color: "var(--color-gray)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <ImGoogle
                      color="var(--color-gray)"
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        marginBottom: "-2px",
                      }}
                    />
                    Continue with Google
                  </button>
                </LoginSocialGoogle>
                <button
                  className="mb_8 modal-social-btn "
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    color: "var(--color-gray)",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}>
                  <FaApple
                    color="var(--color-gray)"
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      marginBottom: "-2px",
                    }}
                  />
                  Continue with Apple
                </button>
              </div>
              <button
                className="h6 mb_10 mt_10"
                style={{ alignSelf: "center" }}
              >
                Not Registered Yet?
              </button>
              <button
                onClick={() => {
                  setIsOpen3(false);
                  setIsOpen(true);
                  SetregButn(4);
                }}
                className="btn btn-orange"
              >
                Register your Cinema{" "}
              </button>
            </div>
          ) : null}
        </div>
      </ReactModal>
      {/* Login modal end */}



      {/* Login / signup modal live start*/}

      {/* Afeter Sign up Modal start */}
      <ReactModal
        isOpen={getModal}
        onRequestClose={closeModalAfterCinema}
        style={customStyles1}
      >
        <div className="modal_thankyou">
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <RxCross2
              onClick={() => {
                closeModalAfterCinema();
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                maxWidth: "400px",
                textAlign: "center",
              }}
            >
              {/* <h2>Thank you for registering your Mall with In-store.</h2> */}
              <h2>{getMallModalData?.register_title}</h2>
            </div>
            <div style={{ maxWidth: "250px", textAlign: "center" }}>
              {/* <h2>Please allow up to 48 hours for registration approval...</h2> */}
              <h2>{getMallModalData?.register_description}</h2>
            </div>
            <div style={{ width: "100%" }}>
              <button
                className="btn btn-orange"
                onClick={() => {
                  closeModalAfterCinema();
                }}
              >
                {/* Back to Home */}
                {getMallModalData?.register_button}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
      {/* Afeter Sign up Modal end */}


           {/* Forgot password modal start */}

           <ReactModal
        isOpen={modalIsOpenForgot}
        onRequestClose={closeModalFogot}
        style={customStyles}
      >
        <div className="model_sizing">
          <div style={{
            // backgroundColor: "#dad9d8"
            backgroundColor: "var(--color-bg)"
          }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={closeModalFogot}
              >
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>

          </div>

          <div
            className="home_login_model_1sec_inner"
            style={{ maxWidth: "none" }}
          >
            <div className="f-b900 fs-22 mb_16 signup_headign">
              Forgot your password!
            </div>
            <div className="sign_input_wrapp" style={{ marginBottom: "2rem" }}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                onChange={(e) => onHandleForgotEmailChange(e)}
                name=""
                id=""
                className="signup_input"
                autoFocus="true"
              />

              {/* <div className="signup_terms_wrapp">
                  <input
                    type="checkbox"
                    value={isAcceptTerm}
                    onChange={handleTermChange}
                    checked={isAcceptTerm}
                  />
                  <p className="fs-des">
                    I have read and agree to the{" "}
                    <a className="signup_terms_link">Terms and Conditions</a> &{" "}
                    <a className="signup_terms_link">Privacy Policy</a>
                  </p>
                </div> */}

            </div>
            <button
              className="btn btn-black mb_16"
              onClick={() => ForgotPassApi()}
            // disabled={isAcceptTerm ? false : true}
            >
              Submit
            </button>

          </div>


        </div>
      </ReactModal>
      {/* Forgot password modal end */}

    </>
  );
};

export default CinemaHomeNavbar;
