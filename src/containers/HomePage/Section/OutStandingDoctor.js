import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("check doctor", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`)
    
  }

  render() {
    console.log("check prop", this.props.topDoctors);
    let { arrDoctors } = this.state;
    let { language } = this.props;
    return (
      <div className="section-share outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="homepage.outstanding-doctor" /></span>
            <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="section-customize" onClick={() => this.handleViewDetailDoctor(item)}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-out-standing-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                              cursor: "pointer",
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div className="section-text">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div className="section-text">Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctors: state.admin.topDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
