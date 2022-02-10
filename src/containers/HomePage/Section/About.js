import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import imgs from "../../../assets/vtv.png"

class About extends Component {
  constructor(props) {
    super(props);
  }

  redirectPage = () => {
    console.log("ok");
    window.location.href = "https://github.com/nguyenthanhdat2809"
  }

  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <span>Truyền thông nói về BookingCare</span>
        </div>
        <div className="section-about-content">
          <div className="about-left">
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/Eaznul-J5d4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="about-right" onClick={() => this.redirectPage()} style={{cursor: "pointer"}}>
            <img src={imgs}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
