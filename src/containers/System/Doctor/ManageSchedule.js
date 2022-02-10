import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { dateFormat, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkCreateScheduleService } from "../../../services/userService";

class manageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => {
          return { ...item, isSelected: false };
        });
      }
      this.setState({
        rangeTime: data,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickButtonTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
      let { rangeTime, selectedDoctor, currentDate } = this.state;
      let result = [];
      if (!currentDate) {
        toast.error("Invalid date!!!")
        return;
      }

      if (selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error("Invalid selected doctor!!!")
        return;
      }

      let formattedDate = new Date(currentDate).getTime();

      if (rangeTime && rangeTime.length > 0) {
          let selectedTime = rangeTime.filter(item => item.isSelected === true);
          if (selectedTime && selectedTime.length > 0) {
              selectedTime.map(schedule => {
                let obj = {};
                obj.doctorId = selectedDoctor.value;
                obj.date = formattedDate;
                obj.timeType = schedule.keyMap;

                result.push(obj);
              })
          } else {
            toast.error("Invalid selected time!!!")
            return;
          }
      }
      let res = await saveBulkCreateScheduleService({
          arrSchedule: result,
          doctorId: selectedDoctor.value,
          date: formattedDate
      });

      if (res && res.errCode === 0) {
        toast.info("Save successfully!!")
      } else {
        toast.error("Save failed !")
        console.log(res);
      }
  }

  render() {
    // console.log("state", this.state);
    // console.log("props", this.props.allScheduleTime);
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title title">
          <FormattedMessage id="manage-schedule.title" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        item.isSelected ? "btn btn-info mr-1" : "btn mr-1"
                      }
                      onClick={() => this.handleClickButtonTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                type="submit"
                onClick={() => this.handleSaveSchedule()}
                className="btn-save-schedule btn btn-info mt-4"
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    systemMenuPath: state.app.systemMenuPath,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);
