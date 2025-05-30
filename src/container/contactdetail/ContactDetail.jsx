import React from "react";
import "./ContactDetail.css";
import images from "../../constants/images";
import { FaPhone } from "react-icons/fa";
import { MallHero } from "../../components";

const ContactDetail = ({ get_mall_auth_data }) => {
  return (
    <>
      <div className="">
        <MallHero get_mall_auth_data={get_mall_auth_data} />
      </div>

      <div className="mm_main_wrapp">
        {/* mall management name start */}
        <div className="mall_name_wrapp mall_con_wrapp mall_mall_name_wrapp">
          <p className="mall_name_heading mall_mall_name_heading mall_cad_headdd">{get_mall_auth_data.name}:</p>
          <span className="mall_mall_name_heading mall_cad_headdd2" style={{fontWeight:"600"}}>Contact Details</span>
        </div>
        {/* <div className="mm_horizontal_line"></div> */}
        <div className="" style={{marginTop:"2rem"}}></div>

        <div className="cd_main_wrapp cd_main_wrapp_mall_head1">
          {/* <h5 className="cd_heading cd_main_wrapp_mall_head2" style={{fontWeight:"600"}}>We would love to hear from you!</h5> */}
          {/* <p className="cd_des">
            The V&A Waterfront Information Kiosks in Victoria Wharf Shopping
            Centre are conveniently located to serve and welcome local and
            international visitors. Our friendly Customer Service team is
            dedicated to provide you with the best possible service.
            {get_mall_auth_data.description}
          </p> */}

          <h5 className="cd_heading" style={{fontWeight:"600"}}> Contact The {get_mall_auth_data.name}</h5>
          <p className="cd_des">
            {/* The V&A Waterfront Information Kiosks in Victoria Wharf Shopping
            Centre are conveniently located to serve and welcome local and
            international visitors. Our friendly Customer Service team is
            dedicated to provide you with the best possible service. */}
            {get_mall_auth_data.description}
          </p>
          {/* <p className="cd_des">
            Both of our Information Kiosk are situated in the Victoria Wharf
            Shopping Centre. The first is opposite Nespresso and the second
            Information kiosk is situated close to the Clicks store near Entrance
            1.
          </p> */}
          <div className="cd_address_wrapp">
            {/* about address 1 */}
            {/* <div className="cd_address_wrapp_inner_part">
            <h5>Information Kiosk</h5>
            <div className="cd_add_time_wrapp">
              <img src={images.clock} alt="" />
              <p
                style={{
                  color: "var(--color-black)",
                  fontSize: "1rem",
                  fontWeight: "300",
                }}
              >
                Trading hours: 9am - 9pm (Mon-Sun)
              </p>
            </div>
            <div className="cd_add_time_wrapp">
              <FaPhone color="var(--color-orange)" size={16} />
              <a
                style={{
                  color: "var(--color-orange)",
                  fontSize: "1rem",
                  fontWeight: "300",
                }}
              >
                +27 21 408 7600
              </a>
            </div>
            <div className="cd_add_time_wrapp">
              <img src={images.send} alt="" />
              <a
                style={{
                  color: "var(--color-orange)",
                  fontSize: "1rem",
                  fontWeight: "300",
                }}
              >
                enquiries@waterfront.co.za
              </a>
            </div>
          </div> */}
            {/* about address 2 */}
            <div style={{display:"flex",gap:"7rem",width:"100%",marginTop:"2rem"}} className="mall_con_detailss_main">
            <div className="cd_address_wrapp_inner_part">
              <h5>{get_mall_auth_data.name} Head Office</h5>
              <div className="cd_add_time_wrapp">
                <img src={images.clock} alt="" />
                <p
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Trading hours: {get_mall_auth_data.mon_fri_from_time && get_mall_auth_data.mon_fri_from_time}am - {get_mall_auth_data.mon_fri_to_time && get_mall_auth_data.mon_fri_to_time}pm (Mon-Fri)
                </p>
              </div>

              <div className="cd_add_time_wrapp">
                <img src={images.clock} alt="" />
                <p
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Trading hours: {get_mall_auth_data.sat_from_time
                    && get_mall_auth_data.mon_fri_from_time}am - {get_mall_auth_data.mon_fri_to_time && get_mall_auth_data.sat_to_time
                  }pm (Saturday)
                </p>
              </div>

              <div className="cd_add_time_wrapp">
                <img src={images.clock} alt="" />
                <p
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Trading hours: {get_mall_auth_data.holiday_from_time && get_mall_auth_data.holiday_from_time}am - {get_mall_auth_data.holiday_to_time
                    && get_mall_auth_data.holiday_to_time
                  }pm (Public Holiday)
                </p>
              </div>
              <div className="cd_add_time_wrapp">
                <FaPhone color="var(--color-orange)" size={16} />
                <a href={"tel:" + `${get_mall_auth_data.ho_number && get_mall_auth_data.ho_number}`}
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {get_mall_auth_data.ho_number && get_mall_auth_data.ho_number}
                </a>
              </div>
              <div className="cd_add_time_wrapp">
                <img src={images.send} alt="" />
                <a href={"mailto:" + `${get_mall_auth_data.email && get_mall_auth_data.email}`}
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {get_mall_auth_data.email && get_mall_auth_data.email}
                </a>
              </div>
              <div className="cd_add_time_wrapp">
                <img src={images.location} alt="" />
                <a
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {get_mall_auth_data.address && get_mall_auth_data.address}
                </a>
              </div>
            </div>
            <div>
            <h5 className="mall_con_lease">Lease request</h5>
            <div className="cd_add_time_wrapp">
                <FaPhone color="var(--color-orange)" size={16} />
                <a href={ "tel:" + `${get_mall_auth_data.ho_number && get_mall_auth_data.ho_number}`}
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {get_mall_auth_data.ho_number && get_mall_auth_data.ho_number}
                </a>
              </div>
              <div className="cd_add_time_wrapp">
                <img src={images.send} alt="" />
                <a href={"mailto:" + `${get_mall_auth_data.email && get_mall_auth_data.email}`}
                  style={{
                    color: "var(--color-black)",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {get_mall_auth_data.email && get_mall_auth_data.email}
                </a>
              </div>
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
