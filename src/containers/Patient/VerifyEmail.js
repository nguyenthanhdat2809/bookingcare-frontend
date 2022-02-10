import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusVerify: false,
      errCode: 0
    };
  }

  async componentDidMount() {
    console.log("check:",this.props.location.search);
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await postVerifyBookingAppointment({
        token: token,
        doctorId: doctorId
      })

      if (res && res.errCode === 0) {
        this.setState({ statusVerify: true, errCode: res.errCode })
      } else {
        this.setState({ statusVerify: true, errCode: res && res.errCode ? res.errCode : -1 })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) { }

  render() {
    let { statusVerify, errCode } = this.state;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        {statusVerify === false ? (
          <div>Loading...</div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className="title" style={{ color: "green" }}>Xác nhận lịch hẹn thành công!</div>
            ) : (
              <div className="title" style={{ color: "red" }}>Lịch hẹn đã được xác nhận!</div>
            )}
          </div>
        )}
      </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
