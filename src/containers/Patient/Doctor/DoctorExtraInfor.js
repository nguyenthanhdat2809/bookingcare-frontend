import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    let res = await getExtraInforDoctorByIdService(this.props.doctorId);
    this.setState({
      extraInfo: res.data ? res.data : {},
    });
    console.log("check data", res.data);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      // let data = await getExtraInforDoctorByIdService(this.props.doctorId);
      // console.log("check data",data);
    }

    // if (this.props.doctorId !== prevProps.doctorId) {

    // }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-doctor-infor.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>

        <div className="content-down">
          {isShowDetailInfo === false ? (
            <div className="short-info">
              <span className="short-price-title">
                <FormattedMessage id="patient.extra-doctor-infor.price" />:
              </span>{" "}
              <span className="short-price-value">
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={extraInfo.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                      className="currency"
                    />
                  )}

                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={extraInfo.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                      className="currency"
                    />
                  )}
              </span>
              <span
                className="see-detail"
                onClick={() => this.showHideDetailInfor(true)}
              >
                <FormattedMessage id="patient.extra-doctor-infor.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-doctor-infor.price" />:
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-doctor-infor.price" />:
                  </span>
                  <span className="right">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                          className="currency"
                        />
                      )}

                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                          className="currency"
                        />
                      )}
                  </span>
                </div>

                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>
              <div className="payment">
                <span>
                  <FormattedMessage id="patient.extra-doctor-infor.payment" />{" "}
                </span>
                {extraInfo &&
                extraInfo.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfo.paymentTypeData.valueVi
                  : extraInfo.paymentTypeData.valueEn}
              </div>

              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="patient.extra-doctor-infor.hide-price" />
                </span>
              </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
