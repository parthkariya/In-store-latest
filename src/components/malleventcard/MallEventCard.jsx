import React, { useState } from "react";
import "./MallEventCard.css";
import moment from "moment";
import images from "../../constants/images";
import { useMallContext } from "../../context/mall_context";
import Notification from "../../utils/Notification";
import ReactModal from "react-modal";

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
const MallEventCard = ({
  id,
  img,
  name,
  location,
  start_date,
  end_date,
  description,
  edit_btns,
  setTab,
  EventApi,
  setEventId,
}) => {
  const { get_mall_auth_data, get_mall_store_data, DeleteEventApi } =
    useMallContext();

  const [deletemodal, setDeleteModal] = useState(false);
  const [readMore, setReadMore] = useState(false);

  function closeModal() {
    setDeleteModal(false);
  }
  // Delete Mall Event Api Call

  const DeleteMallEventData = async () => {
    {
      const formdata = await new FormData();
      await formdata.append("event_id", id);

      const data = await DeleteEventApi(formdata);
      if (data) {
        if (data.success === 1) {
                    Notification("success", "Success!", "Event Deleted Successfully!");
          setTab(1);
          // EventApi();
        }else if(data.success === 0){
          Notification("error", "Error!", data.message);

        }
      }
    }
  };

  return (
    <>
      <ul className="event_main_wrapp">
        {/* edit buttons start*/}
        {edit_btns && (
          <div className="stored_card_edit_wrapp stored_card_edit_wrapp_position">
            <button
              className="stored_card_edit_btn"
              onClick={() => {
                setTab(11);
                setEventId(id);
              }}>
              <img src={images.card_edit} alt="" />
            </button>
            {/* <button className="stored_card_edit_btn" onClick={() => DeleteMallEventData()}>
              <img src={images.card_cancle} alt="" />
            </button> */}
            <button
              className="stored_card_edit_btn"
              onClick={() => setDeleteModal(true)}>
              <img src={images.card_cancle} alt="" />
            </button>
          </div>
        )}
        {/* edit buttons end */}
        <div className="event_single_wrapp cus_event_card_txt_main">
          <img src={img} alt="" />
          <div className="event_single_inner_text_wrapp cus_event_card_txt_main">
            <div>
              <h5 className="h5" style={{ textTransform: "capitalize",fontWeight:"600" }}>
                {name}
              </h5>
            </div>
            <h6>
              {moment(start_date).format("DD MMM YY")} &nbsp;-&nbsp;
              {end_date === "" ? "" : moment(end_date).format("DD MMM YY")}
            </h6>
            {description.length > 200 ? (
              <p style={{ fontWeight: "400" }} className="cus_event_card_txt">
                {description == "" ||
                description == null ||
                description == undefined ? null : (
                  <>
                    {readMore
                      ? description
                      : `${description.substring(0, 200)}...`}
                    <button
                      className="btn-readmore"
                      style={{
                        background: "none",
                        color: "#ff8b00",
                        border: "none",
                        cursor: "pointer",
                        // marginTop: "10px",
                        padding: "0px",
                        fontWeight: "600",
                        paddingLeft:"0.4rem"
                      }}
                      onClick={() => setReadMore(!readMore)}>
                      {readMore ? "Show less" : "  Read more"}
                    </button>
                  </>
                )}
              </p>
            ) : (
              <p style={{ fontWeight: "400" }} className="cus_event_card_txt">
                {description == "" ||
                description == null ||
                description == undefined ? null : (
                  <>{description}</>
                )}
              </p>
            )}
            <div className="event_location_wrapp">
              <h5 className="event_single_span">Location:</h5>
              <p className="event_location_name" style={{ fontWeight: "400" }}>
                {location}
              </p>
            </div>
          </div>
        </div>
      </ul>

      {/* store delete model */}

      <ReactModal
        isOpen={deletemodal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="sd_model_wrapp sd_model_wrapp-delete">
          {/* edit and delete orange btns start */}
          <div className="sd_model_edit_wrap">
            <button onClick={closeModal}>
              <img src={images.close} alt="" />
            </button>
          </div>
          {/* edit and delete orange btns end */}

          <p>Are you sure you want to delete ?</p>
          <div className="delete-modal-btn-box">
            <button
              onClick={() => {
                // setStore_id(itm.id);
                DeleteMallEventData();
                setDeleteModal(false);
              }}
              className="delete-modal-btn">
              Yes
            </button>
            {/* onClick={() => {
              // setStore_id(itm.id);
              // DeleteMallStoreData(itm.id);
              setDeleteModal(true);
            }} */}

            <button onClick={closeModal} className="delete-modal-btn">
              No
            </button>
          </div>
        </div>
        {/* </div> */}
      </ReactModal>
    </>
  );
};

export default MallEventCard;