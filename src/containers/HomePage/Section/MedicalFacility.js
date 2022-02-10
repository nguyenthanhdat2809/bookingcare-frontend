import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div className="section-text">Hệ thống y tế Thu Cúc</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
