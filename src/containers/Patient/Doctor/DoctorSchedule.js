import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorByDateService(
        this.props.doctorId,
        allDays[0].value
      );
      this.setState({
        allDays: allDays,
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
  }

  capitallizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          obj.label = this.capitallizeFirstLetter(today);
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          obj.label = this.capitallizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Today - ${ddMM}`;
          obj.label = this.capitallizeFirstLetter(today);
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(obj);
    }

    return allDays;
  };

  handleOnchangeSelect = async (e) => {
    if (this.props.doctorId) {
      let doctorId = parseInt(this.props.doctorId);
      let date = e.target.value;
      let res = await getScheduleDoctorByDateService(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select className="" onChange={(e) => this.handleOnchangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, i) => {
                  return (
                    <option value={item.value} key={i}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>

            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                      }
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  );
                })
              ) : (
                <div className="text-notification">
                  <FormattedMessage id="patient.detail-doctor.no-data" />
                </div>
              )}
            </div>

            <div>
              <div
                className={language === LANGUAGES.VI ? "text-vi" : "text-en"}
              >
                <p>
                  <span className="text-small">
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <span>
                      <i class="far fa-hand-point-up"></i>
                    </span>{" "}
                    <FormattedMessage id="patient.detail-doctor.place" /> (
                    <FormattedMessage id="patient.detail-doctor.free" /> 0
                    <sup>đ</sup>)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
