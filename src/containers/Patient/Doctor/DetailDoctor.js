import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.id);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      console.log(res);
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    console.log("check state", this.state.detailDoctor);
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (this.state.detailDoctor && this.state.detailDoctor.positionData) {
      nameVi = `${this.state.detailDoctor.positionData.valueVi}, ${this.state.detailDoctor.lastName} ${this.state.detailDoctor.firstName}`;
      nameEn = `${this.state.detailDoctor.positionData.valueEn}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  this.state.detailDoctor && this.state.detailDoctor.image
                    ? this.state.detailDoctor.image
                    : ""
                })`,
                cursor: "pointer",
              }}
            ></div>

            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {this.state.detailDoctor &&
                  this.state.detailDoctor.Markdown &&
                  this.state.detailDoctor.Markdown.description && (
                    <span>{this.state.detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>

          <div className="schedule-doctor">
            <div className="content-left">
                    <DoctorSchedule doctorId={this.props.match.params.id}/>
            </div>

            <div className="content-right">
                    <DoctorExtraInfor doctorId={this.props.match.params.id}/>
            </div>
          </div>

          <div className="detail-infor-doctor">
            {this.state.detailDoctor &&
              this.state.detailDoctor.Markdown &&
              this.state.detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>

          <div className="comment-doctor"></div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
