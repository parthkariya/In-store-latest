import React, { useEffect, useState } from "react";
import "./Navbar.css";
import images from "../../constants/images";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { ImGoogle } from "react-icons/im";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";
import { useMallContext } from "../../context/mall_context";
import FacebookLogin from "react-facebook-login";
import ReactModal from "react-modal";
import {
  GrClose,
  GrFacebook,
  GrFacebookOption,
  GrGoogle,
} from "react-icons/gr";
import { FaApple, FaFacebookF } from "react-icons/fa";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  IResolveParams,
} from "reactjs-social-login";
import Urls from "../../utils/Urls";
import { useAuthContext } from "../../context/auth_context";
import { useStoreContext } from "../../context/store_context";
import { ACCEPT_HEADER, get_mall, get_mall_master } from "../../utils/Constant";
import axios from "axios";

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

const Navbar = (
  {
    // getcustomerDropdown,
    // setCustomerDropdown,
    // setRegisterCustomerOpen,
  }
) => {
  const location = useLocation();

  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);
  const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);

  const [getmallname, setMallname] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getRegion, setRegion] = useState("");
  const [getRegioncus, setRegioncus] = useState("");
  const [getemail, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsidebarOpen, setSidebarOpen] = useState(false);
  const [getaccountOpen, setAccountOpen] = useState(false);
  const [getcondation, SetCondation] = useState(false);
  const [profile, setProfile] = useState("");
  const [isAcceptTerm, setIsAcceptTerm] = useState(false);
  const [isAcceptTerm2, setIsAcceptTerm2] = useState(false);
  const [isAcceptTermRegisterCustomer, setIsAcceptTermRegisterCustomer] =
    useState(false);
  const [getrole, setrole] = useState();
  const [login, SetLogin] = useState("");
  const [getcustomerDropdown, setCustomerDropdown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const [signButn, SetsignButn] = useState(3);
  const [regButn, SetregButn] = useState(3);
  const [boldButn, SetboldButn] = useState(3);

  const [registerModalIsOpenBrand, setRegisterModalIsOpenBrand] =
    useState(false);
  const [getmallarray, SetMallArray] = useState([]);
  const [getmallarray2, SetMallArray2] = useState([]);
  // const { retailer_data } = useStoreContext();
  const [getgender, setGender] = useState("");
  const { get_brand_data, getBrand } = useMallContext();

  const [getvat_no, setvat_no] = useState("");
  const [getearh_no, setearh_no] = useState("");
  const [getmall, SetMall] = useState("");
  const [getmallmasterid, setmallmasterid] = useState("");
  const [retailertype, setRetailertype] = useState("");

  // const [getregisterCustomerOpen, setRegisterCustomerOpen] = useState(false);
  const [brandModalIsOpen3, setbrandModalIsOpen3] = useState(false);

  const { setMallRegister, is_login, is_token, logoutUser, role } =
    useMallContext();
  const { RegisterCustomer, region_data } = useAuthContext();
  const { setRegisterStore, retailer_data, getRetailerApi, setRegisterCinema, getCinemaNameApi, cinema_mall_data } = useStoreContext();

  const { setLogin } = useAuthContext();

  let navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // const redirect = "http://localhost:3000/account/login";

  function logout() {
    localStorage.clear();
    // navigate("/customer");
    navigate("/");
    window.location.reload(false);
  }

  useEffect(() => {
    token(); 
    let role = localStorage.getItem("role");
    setrole(role);
    var islogin = localStorage.getItem("is_login");
    SetLogin(islogin);
  }, []);
 
  const onLoginStart = () => {
    //
  };

  const brandLoginModalOpen = () => {
    setModalIsOpenBrand(false);
    setIsOpen3(true);
  };

  const componentClicked = (click) => {
   };

  const token = async () => {
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
        if (res.data.success == 1) {
          SetMallArray(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("error11",err);

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
        if (res.data.success == 1) {
          SetMallArray2(res.data.data);
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log("error11",err);

      });
  };

  useEffect(() => {
    getMallMaster();
    getMallMaster2();
  }, []);

  const SigninCustomerGoogle = async (gmail, type, data) => {
    // if (gmail === "") {
    //     alert("Enter the Email......!");
    //     return;
    // } else if (regEx.test(gmail) === false) {
    //     alert("Enter the valid Email....!");
    //     return;
    // }
    {
      var params = {
        role: 4,
        email: gmail,
        type: type,
      };


      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          console.log("Login with google successfully");
          // setIsOpen3(false);
          navigate("/mallnearme");
          // setEmail("");
          // window.location.reload(false);
        } else if (data.success === 0) {
          console.log("Login with google unsuccessfully");
        }
      }
    }
  };
  const SigninCustomerFacebook = async (fdata, type) => {
    var params = {
      role: 4,
      fb_id: fdata.id,
      first_name: fdata.first_name,
      last_name: fdata.last_name,
      type: type,
      name: fdata.name,
    };
 
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

  const SigninCustomer = async (type) => {
    // if (getmallname === "") {
    //   alert("Enter the Mall Name......!");
    //   return;
    // }

    const errors = [];
    const minLength = 8;
    const hasNumber = /[0-9]/.test(getpassword);
    const hasUpperCase = /[A-Z]/.test(getpassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(getpassword);
    if (getfirstname === "") {
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
    }else if (getpassword.length < minLength || !hasNumber || !hasUpperCase || !hasSpecialChar) {
      alert("Password must be at least 8 characters long.Password must contain at least one number,Password must contain at least one uppercase letter & Password must contain at least one special character");
      return;
     } else {
      var params = {
        role: 4,
        email: getemail,
        region_id: getRegioncus,
        password: getpassword,
        name: getmallname,
        first_name: getfirstname,
        last_name: getlastname,
      };
 
      const data = await RegisterCustomer(params);
      if (data) {
        if (data.success === 1) {
           setIsOpen(false);
          setIsOpen3(false);
          setRegisterCustomerOpen(false);
          
          setEmail("");
          setPassword("");
          // window.location.reload(false);
        }
      }
    }
  };

  const mallLoginModalOpen = () => {
    setIsOpen(false);
    setIsOpen3(true);
  };

  // Mall Signup Google/facebook

  const SigninMallGoogle = async (gmail, type, data) => {
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

  const SigninMallFacebook = async (fdata, type) => {
    var params = {
      role: 2,
      fb_id: fdata.id,
      first_name: fdata.first_name,
      last_name: fdata.last_name,
      type: type,
      name: fdata.name,
    };
 
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
      ("Geolocation is not available in your browser.");
    }
  }, []);
  const SigninMall = async (type) => {
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
      alert("Enter the Last        Name....!");
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
           setIsOpen(false);
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
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
           setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/mallnearme");
        }
      }
    }
  };

  // terms checkbox funtion

  const handleTermChange = (event) => {
    setIsAcceptTerm((current) => !current);
  };
  const handleTermChange2 = (event) => {
    setIsAcceptTerm2((current) => !current);
  };

  const handleTermChanged = (event) => {
    setIsAcceptTerm(1); 
  };
  const handleTermChangeRegisterCustomerNavbar = (event) => {
    setIsAcceptTermRegisterCustomer((current) => !current);
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
  function closeModalRegisterNavbar() {
    setRegisterCustomerOpen(false);
  }

  function closeModalBrand() {
    setModalIsOpenBrand(false);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

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
 
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
           setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/profile-page");
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
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(true);
          navigate("/branddashboard");
        }
      }
    }
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

      
      const data = await setRegisterStore(params);
      if (data) {
        if (data.success === 1) {
          
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
          setIsOpen3(false);
          // window.location.reload(false);
        }
      }
    }
  };

  // Signup Cinema

  const SigninCinema = async (type) => {
    if (getgender === "") {
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
        // role: 3,
        password: getpassword,
        privacy_policy: isAcceptTerm,
        terms_condition: isAcceptTerm2,
      };

      
      const data = await setRegisterCinema(params);
      if (data) {
        if (data.success === 1) {
          
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
          // window.location.reload(false);
        }
      }
    }
  };

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

      
      const data = await setLogin(params);
      if (data) {
        if (data.success === 1) {
          setIsOpen3(false);
          setEmail("");
          setPassword("");
          // window.location.reload(false);
          navigate("/CinemaDashboard");
        }
      }
    }
  };
  return (
    <>
      <nav className="nav_main_wrapp">
        <div className="container">
          <div className="nav_base_wrapp">
            <Link to={"/"}>
              <img src={images.brandlogo} alt="logo" className="nav_logo" />
            </Link>
            <div className="nav_links">
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
                style={{
                  color: location.pathname === "/mall" ? "#ff8b00" : "black",
                  fontWeight: location.pathname === "/mall" ? "600" : "400",
                }}>
                Mall Registration
              </Link> */}

              {/* <Link
                // onClick={() => setModalIsOpenBrand(true)}
                to={"/retailer"}
                style={{
                  color:
                    location.pathname === "/retailer" ? "#ff8b00" : "black",
                  fontWeight: location.pathname === "/retailer" ? "600" : "400",
                }}>
                Brand Registration
              </Link> */}
              <div className="nav_myacc_wrapp">
                <Link>
                  <img
                    src={images.profile_logo}
                    alt=""
                    className="nav_profile"
                  />
                </Link>
                <Link
                  to={""}
                  onClick={() => setCustomerDropdown(!getcustomerDropdown)}
                  className="my-acc-nav-flex">
                  Account{" "}
                  {getcustomerDropdown ? <BsChevronUp /> : <BsChevronDown />}
                </Link>
                {/* {getcustomerDropdown ? <BsChevronUp style={{ marginTop: "1px" }} /> : <BsChevronDown style={{ marginTop: "1px" }} />} */}
                {getcustomerDropdown ? (
                  <>
                    <div className="navbar-acc-menu-open-warapp">
                      {/* <Link to="/mall" className="navbar-acc-menu-link">
                        Mall Registration
                      </Link>
                      <Link to="/retailer" className="navbar-acc-menu-link">
                        Brand Registration
                      </Link> */}
                      {/* {is_login === true || role === 4 ? <Link to="/customer"
                        className="navbar-acc-menu-link"
                      >
                        Customer
                      </Link> : <Link to="/"
                        className="navbar-acc-menu-link"
                      > */}
                      {/* Customer */}
                      {/* </Link>} */}

                      {login === "true" && getrole == 2 ? (
                        <Link
                          to="/profile-page"
                          className="navbar-acc-menu-link">
                          Mall Dashboard
                        </Link>
                      ) : null}

                      {login === "true" && getrole == 3 ? (
                        <Link
                          to="/branddashboard"
                          className="navbar-acc-menu-link">
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

                          {/* Hide Customer Page */}
                          {/* <Link
                            to="/customer"
                            className="navbar-acc-menu-link"
                          // onClick={() => { setTab(2) }}
                          >
                            Customer
                          </Link> */}
                          {/* Hide Customer Page */}

                          <Link
                            to="/CinemaPage"
                            className="navbar-acc-menu-link"
                          // onClick={() => { setTab(2) }}
                          >
                            Cinema
                          </Link>

                          <Link
                            className="navbar-acc-menu-link"
                            onClick={() => {
                              setIsOpen3(true), SetsignButn(3), SetboldButn(3);
                            }}>
                            Consumer Login / SignUp
                          </Link>
                        </>
                      ) : null}
                      {/* {login === false || login === null ? (
                        <Link
                          className="navbar-acc-menu-link"
                          onClick={() => setRegisterCustomerOpen(true)}
                        >
                          Sign Up
                        </Link>
                      ) : null} */}
                      {/* <Link className="navbar-acc-menu-link">My profile</Link> */}
                      {/* <Link to="/customer" className="navbar-acc-menu-link">
                        Customer Registration
                      </Link> */}
                      {/* <Link className="navbar-acc-menu-link">Help</Link> */}
                      <a  className="navbar-acc-menu-link" style={{ fontSize: "14px" }}href="mailto:support@in-store.co.za">Help</a>

                      {/* {is_login === true ? (<><Link onClick={logout}>Logout</Link></>) : (<></>)} */}
                      {login === "true" ? (
                        <button style={{ textAlign: "start" }} onClick={logout}>
                          Logout
                        </button>
                      ) : null}
                    </div>
                  </>
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
              <Link to="/about-instore"  style={{
                  color:
                    location.pathname === "/about-instore"
                      ? "#ff8b00"
                      : "black",
                  fontWeight:
                    location.pathname === "/about-instore" ? "600" : "400",
                }}>About In-store</Link>
              {/* <Link to="/mall">Mall </Link> */}
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
                <Link to="/Cinema Dashboard" className="navbar-acc-menu-link">
                  Cinema Dashboard
                </Link>
              ) : null}

              <Link to="/mall">Mall Registration</Link>
              <Link to="/retailer">Brand Registration</Link>
              <Link to="/CinemaPage">Cinema Registration</Link>

              {/* {getcondation === false ? (
                <Link onClick={() => setIsOpen2(true)}>Sign Up</Link>
              ) : null} */}

              {/* {getcondation === true ? ( */}
              <>
                <Link onClick={() => setAccountOpen(!getaccountOpen)}>
                  My Account{" "}
                  {getaccountOpen ? <BsChevronUp /> : <BsChevronDown />}
                </Link>
              </>
              {/* ) : null} */}
              {/* <Link onClick={logout}>
                <IoIosLogOut size={20} />
              </Link> */}
              {getaccountOpen && (
                <div className="accunt_sec_wrapp">
                  {login === "true" ? (
                    <></>
                  ) : (
                    <Link onClick={() => setIsOpen3(true)}>Login</Link>
                  )}

                  {/* <Link onClick={() => setRegisterCustomerOpen(true)}>Sign Up</Link> */}
                  {/* <Link onClick={() => modalIsOpen(true)}>Sign Up</Link> */}
                  {login === "true" ? (
                    <></>
                  ) : (
                    <></>
                   
                  )}
                   {/* <Link
                      className="navbar-acc-menu-link"
                      onClick={() => setRegisterCustomerOpen(true)}>
                      Sign Up
                    </Link> */}
                  {/* <Link>Help</Link> */}
                  <a href="mailto:support@in-store.co.za">Help</a>

                  {login === "true" ? (
                    <Link
                      style={{ textAlign: "end", alignSelf: "end" }}
                      onClick={logout}>
                      Logout
                    </Link>
                  ) : (
                    <></>
                  )}
                  {/* <Link onClick={logout}>Logout</Link> */}

                  {/* <Link> - Events</Link>
                  <Link> - Facilities</Link>
                  <Link> Contact Details</Link> */}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* model 1 */}
      {/* <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="home_model_wrapp">
          <div className="home_model_1sec">
            <h4 className="h4">Hi, nice to meet you!</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut
              quidem voluptatibus.
            </p>
            <button
              className="btn btn1"
              onClick={() => {
                setIsOpen(false);
                setIsOpen2(true);
              }}
            >
              YES
            </button>
            <button className="btn btn1" style={{ opacity: "0.8" }}>
              No
            </button>
            <a href="">Learn More</a>
          </div>
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-laughing-young-woman-royalty-free-image-1592844146.jpg?crop=0.668xw:1.00xh;0.167xw,0"
            alt=""
            className="home_model_2sec"
          />
        </div>
      </ReactModal> */}


      {/* model 4 */}
      <ReactModal
        isOpen={modalIsOpen4}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal4}
        style={customStyles}>
        <div className="home_model_4wrapp">
          <button className="signup_modal_close" onClick={closeModal4}>
            <GrClose />
          </button>
          <button className="btn btn4 mb_16">Forgot your password?</button>
          <div className="sign_input_wrapp">
            <label htmlFor="email">Email</label>
            <input type="email" name="" id="" />
          </div>
          <button className="btn btn3 mb_16">Submit</button>
          <h6 className="h6 mb_8">
            If you already have an account, click the button below to log in.
          </h6>
          <button className="btn btn4 mb_8">Login</button>
          <h6 className="h6 mb_8">or</h6>

          {/* <FacebookLogin
            appId="1377758369684897" //APP ID NOT CREATED YET
            fields="name,email,picture"
            // autoLoad={true}
            onClick={componentClicked}
            callback={responseFacebook}
          /> */}
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
              SigninCustomerFacebook(data, "3");
            }}
            onReject={(err) => {
              (err);
            }}>
            <button
              className="btn btn5 mb_8 modal-social-btn"
              style={{
                justifyContent: "flex-start",
                gap: "25%",
                width: "100%",
              }}>
              <FaFacebookF />
              Continue with Facebook
            </button>
          </LoginSocialFacebook>
          {/* <button
            className="btn btn5 mb_8 modal-social-btn "
            style={{ justifyContent: "flex-start", gap: "25%" }}
          >
            <FaFacebookF />
            Continue with Facebook
          </button> */}
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID}
            onLoginStart={onLoginStart}
            redirect_uri={Urls.base_url}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ data }: IResolveParams) => {
              setProfile(data); 
              // registerWithGoogle(data);
              // registerWithGoogle(data);
              SigninCustomerGoogle(data.email, "2", data);
            }}
            onReject={(err) => {
              (err);
            }}>
            <button
              className="btn btn5 mb_8 modal-social-btn"
              style={{ justifyContent: "flex-start", gap: "25%" }}>
              <GrGoogle style={{}} />
              Continue with Google
            </button>
            {/* <button onClick={() => {}} className="twitter-btn w-100">
              <i className="fab fa-google"></i> Google
            </button> */}
          </LoginSocialGoogle>
        </div>
      </ReactModal>



      {/* Register Customer modal */}
      <ReactModal
        isOpen={getregisterCustomerOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
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
            <label htmlFor="email">Region</label>
            <select
              className="leaderboard-card-inp"
              onChange={(e) => {
                setRegioncus(e.target.value);
               }}>
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
          </div>

          <div className="sign_input_wrapp">
            <label htmlFor="password">Set a password</label>
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
                type={passwordVisible1 ? "text" : "password"}
                value={getpassword}
                onChange={(e) => setPassword(e.target.value)}
                name=""
                id=""
                style={{
                  background: "#DAD9D8",
                  border: "none",
                  width: "100%",
                }}></input>

              {passwordVisible1 === true ? (
                <AiOutlineEye size={22} onClick={togglePasswordVisibility1}>
                  {passwordVisible1 ? "Hide" : "Show"}
                </AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible
                  size={22}
                  onClick={togglePasswordVisibility1}>
                  {passwordVisible1 ? "Hide" : "Show"}
                </AiOutlineEyeInvisible>
              )}
            </div>
          </div>
          <div className="sign_input_wrapp">
            <label htmlFor="password">Set a confirm password</label>
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
                type={passwordVisible2 ? "text" : "password"}
                value={getpassword}
                onChange={(e) => setPassword(e.target.value)}
                name=""
                id=""
                style={{
                  background: "#DAD9D8",
                  border: "none",
                  width: "100%",
                }}></input>
              {passwordVisible2 === true ? (
                <AiOutlineEye size={22} onClick={togglePasswordVisibility2}>
                  {passwordVisible2 ? "Hide" : "Show"}
                </AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible
                  size={22}
                  onClick={togglePasswordVisibility2}>
                  {passwordVisible2 ? "Hide" : "Show"}
                </AiOutlineEyeInvisible>
              )}
            </div>
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
                 SigninCustomerFacebook(data, "4");
              }}
              onReject={(err) => {
                (err);
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
                // registerWithGoogle(data);
                // registerWithGoogle(data);
                SigninCustomerGoogle(data.email, "4", data);
              }}
              onReject={(err) => {
                (err);
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
                setRegisterCustomerOpen(false);
                setIsOpen3(true);
              }}
              className="btn btn-blue"
              style={{ marginBottom: "20px" }}>
              Sign in
            </button>
          </div>
        </div>
      </ReactModal>
      {/* End Register Customer modal */}

      {/* Brand Register Modal Start */}
      <ReactModal
        isOpen={registerModalIsOpenBrand}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModalBrand}
        style={customStyles}>
        <div className="home_model_4wrapp">
          {/* <button className="signup_modal_close" onClick={closeModalBrand}> */}
          <button
            className="signup_modal_close"
            onClick={() => {
              setRegisterModalIsOpenBrand(false);
            }}>
            {/* onClick={() => {
              setIsOpen(false);
            }}> */}
            <span
              style={{ fontSize: "16px" }}
              className="brand-lable-radio-btn-txt">
              {/* Cancel */}
            </span>
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
                 getBrand(e.target.value);
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
              login here
            </span>
          </p>
        </div>
      </ReactModal>
      {/* Brand Register Modal End */}


      {/* Login / sign up modal start active */}

      {/* Register modal start */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}>
        <div className="model_sizing">
          <div style={{ backgroundColor: "var(--color-bg)" }}>
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
            <div className="tab_btn_main" style={{height:"0px"}}>
            {signButn == 3 ? null : <button
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
              
              {signButn == 3 ? null :  <button
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
              </button>}
             
             {signButn == 3 ?   <button
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
              </button> : null }
            
            {signButn == 3 ? null :  <button
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
              </button> }
             
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
                     getBrand(e.target.value);
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
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div>

              {/* <div className="sign_input_wrapp">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  value={getpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
              </div> */}
              <div className="signup_terms_wrapp mb_16" style={{ marginBottom: "0rem" }}>
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the
                  <a className="signup_terms_link">Terms and Conditions</a>
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
                  I have read and agree to the
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <button
                className="btn btn-black mb_16" style={{marginTop:"1rem"}}
                disabled={isAcceptTerm &&  isAcceptTerm2 ? false : true}
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
                     // SigninCustomerFacebook(data, "4");
                  }}
                  onReject={(err) => {
                    (err);
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
                  client_id={"525200835554-hg6ns479e682j1dk5d5oh3ttkpdfgngj.apps.googleusercontent.com"}
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  // access_type="offline"
                  onResolve={({ provider,data }) => {
                    setProfile(data);
                    console.log("gdata",provider, data);
                    SigninCustomerGoogle(data.email, "2", data);
                  }}
                  onReject={(err) => {
                    console.log(err);
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
                    for="specifyColor"
                  >
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
                    getCinemaNameApi(e.target.value); 
                  }}
                >
                  {getmallarray2 &&
                    getmallarray2.map((item, index) => {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.name} {item.id} &nbsp;&nbsp;&nbsp;{" "}
                            {item.from_date} &nbsp;&nbsp;&nbsp; {item.to_date}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>


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
              <div className="sign_input_wrapp sign_input_wrapp_padding_less">
                <label htmlFor="mall">Cinema Name</label>
                <select
                  className="leaderboard-card-inp"
                  onChange={(e) => {
                    setRetailertype(e.target.value);
                    getBrand(e.target.value); 
                  }}>
                  <option defaultValue value=""></option>
                  {cinema_mall_data &&
                    cinema_mall_data.map((item, index) => {
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
                  }}
                >
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
              <div className="signup_terms_wrapp">
                <input
                  type="checkbox"
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />
                <p className="fs-des">
                  I have read and agree to the
                  <a className="signup_terms_link">Privacy Policy</a>
                </p>
              </div>
              <div className="signup_terms_wrapp mb_16">
                <input
                  type="checkbox"
                  // value={isAcceptTerm2}
                  value={isAcceptTerm}
                  onChange={handleTermChange}
                  checked={isAcceptTerm}
                />

                <p className="fs-des">
                  I have read and agree to the
                  <a className="signup_terms_link">Terms and Conditions</a>
                </p>
              </div>
              <button
                className="btn btn-orange mb_16"
                disabled={isAcceptTerm ? false : true}
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
          <div style={{ backgroundColor: "var(--color-bg)" }}>
            <div style={{ height: "25px" }}>
              <button
                className="signup_modal_close"
                style={{ right: "7px", top: "9px" }}
                onClick={closeModal3}>
                <span style={{ fontSize: "16px" }}></span>
                <IoClose />
              </button>
            </div>
            <div className="tab_btn_main" style={{height:"0px"}}>
            {signButn == 3 ? null : <button
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

              {signButn == 3 ? null :  <button
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
              
             {signButn == 3 ? <button
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
              </button> : null}
              
              {signButn == 3 ? null : <button
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
              </button>}
              
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
                   }}
                  onReject={(err) => {
                    (err);
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
                    (err);
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
                   }}
                  onReject={(err) => {
                    (err);
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
                    (err);
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
                  }}
                  onReject={(err) => {
                    (err);
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
                  client_id={"525200835554-hg6ns479e682j1dk5d5oh3ttkpdfgngj.apps.googleusercontent.com"}
                  onLoginStart={onLoginStart}
                  redirect_uri={Urls.base_url}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  // access_type="offline"
                  onResolve={({ provider,data }) => {
                    setProfile(data);
                    console.log("gdata",provider, data);
                    SigninCustomerGoogle(data.email, "2", data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}>
                {/* <LoginSocialGoogle
                  client_id={"525200835554-hg6ns479e682j1dk5d5oh3ttkpdfgngj.apps.googleusercontent.com"}
                  scope="openid profile email"
                  onResolve={({ provider, data }) => {
                    console.log(provider, data);  // This should now include user details like email, name, etc.
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                > */}

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
                <button className="signup_model_forgate">
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
                  }}
                  onReject={(err) => {
                    (err);
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
                  }}
                  onReject={(err) => {
                    (err);
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
      {/* Login modal end  */}
      {/* Login / sign up modal end active */}
    </>
  );
};

export default Navbar;
