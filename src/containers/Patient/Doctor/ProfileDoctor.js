import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProfile: {},
      price: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);

    await this.setState({
      dataProfile: data,
    });

    if (
      this.state.dataProfile &&
      this.state.dataProfile.Doctor_Infor &&
      this.state.dataProfile.Doctor_Infor.priceTypeData
    ) {
      this.setState({
        price: this.state.dataProfile.Doctor_Infor.priceTypeData,
      });
    }
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByIdService(id);

      if (res && res.errCode === 0) {
        result = res.data;
      }
    }

    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.doctorId !== prevProps.doctorId) {
    }

    if (prevProps.language !== this.props.language) {
      if (
        this.state.dataProfile &&
        this.state.dataProfile.Doctor_Infor &&
        this.state.dataProfile.Doctor_Infor.priceTypeData
      ) {
        this.setState({
          price: this.state.dataProfile.Doctor_Infor.priceTypeData,
        });
      }
    }
  }

  capitallizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return (
        <>
          <div><FormattedMessage id="patient.booking-modal.price-booking" /></div>
          <div>{time} - {this.capitallizeFirstLetter(date)}</div>
          <div><FormattedMessage id="patient.booking-modal.free-booking" /></div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile, price } = this.state;
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
    console.log("ckeck state profile: ", dataProfile);
    console.log("ckeck props datatime: ", dataTime);
    let nameVi = "";
    let nameEn = "";

    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
              cursor: "pointer",
            }}
          ></div>

          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>

        <div className="price">
          <span><FormattedMessage id="patient.booking-modal.price" />: </span>
          {price && language === LANGUAGES.VI && (
            <NumberFormat
              value={price.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
              className="currency"
            />
          )}
          {price && language === LANGUAGES.EN && (
            <NumberFormat
              value={price.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
              className="currency"
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
