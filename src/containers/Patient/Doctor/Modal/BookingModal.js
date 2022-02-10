import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions/";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { toast } from "react-toastify";
import { postPatientBookingAppointment } from "../../../../services/userService";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: [],
      doctorId: "",
      timeType: "",
      selectedGender: "",
    };
  }

  async componentDidMount() {
    this.props.getGender();

    let doctorId =
      this.props.dataTime && !_.isEmpty(this.props.dataTime)
        ? this.props.dataTime.doctorId
        : "";

    this.setState({
      doctorId: doctorId,
      timeType: this.props.dataTime.timeType,
    });
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;

        result.push(object);
      });
    }

    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({ genders: this.buildDataGender(this.props.genders) });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({ genders: this.buildDataGender(this.props.genders) });
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      let doctorId =
        this.props.dataTime && !_.isEmpty(this.props.dataTime)
          ? this.props.dataTime.doctorId
          : "";

      let timeType = this.props.dataTime.timeType;

      this.setState({
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }

  handleOnchangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };

    stateCopy[id] = valueInput;

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = async (selectedGender) => {
    this.setState({ selectedGender });
    console.log("selected gender: ", selectedGender);
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    // Validate

    // call api
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      doctorId: this.state.doctorId,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    });

    if (res && res.errCode === 0) {
      toast.info("successfully");
      this.props.closeBookingModal();
    } else {
      toast.error("failed");
    }
    console.log("result: ", this.state);
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;

    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    return (
      <Modal
        centered
        backdrop={true}
        isOpen={isOpenModal}
        size="lg"
        className="booking-modal-container"
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="booking-modal-body">
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowPrice={true}
                isShowLinkDetail={false}
              />
            </div>

            <div className="row my-2">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.full-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.fullName}
                  onChange={(e) => this.handleOnchangeInput(e, "fullName")}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.email}
                  onChange={(e) => this.handleOnchangeInput(e, "email")}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.handleOnchangeInput(e, "address")}
                />
              </div>

              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reasion" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.reason}
                  onChange={(e) => this.handleOnchangeInput(e, "reason")}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.date-of-birth" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                  placeholder="Chọn ngày sinh..."
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>

          <div className="booking-modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button
              className="btn btn-danger btn-booking-cancel"
              onClick={closeBookingModal}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
