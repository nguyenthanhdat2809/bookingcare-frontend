import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";

import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      position: "",
      gender: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: ""
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 && arrGender[0].keyMap
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (prevProps.users !== this.props.users) {
      this.setState({
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : "",
        gender: this.props.genderRedux && this.props.genderRedux.length > 0 && this.props.genderRedux[0].keyMap,
        role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : "",
        avatar: "",
      })
    }

    console.log("check param ", this.state.gender, this.state.role, this.state.position);
  }

  handleOnchangeImg = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      let ObjectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: ObjectUrl,
        avatar: base64,
      });
      console.log(base64);
    }
  };

  openPreviewImg = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }

    let { action } = this.state;

    // fire redux action create
    if (action === CRUD_ACTIONS.CREATE) {
      await this.props.createNewUser({
        email: this.state.email,
        firstName: this.state.firstName,
        password: this.state.password,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      });
    }

    // fire redux action udate
    if (action === CRUD_ACTIONS.EDIT) {
      await this.props.editAUser({
        id: this.state.userEditId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      })
    }

    await this.props.fetchUserRedux();
  };

  checkValidateInput = () => {
    let isValid = true;
    let arr = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]]) {
        isValid = false;
        alert("The input is require: " + arr[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };

  handleEditUserFromParent = async (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }

    await this.setState({
      email: user.email,
      password: "hashpassword",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      position: user.positionId,
      gender: user.gender,
      role: user.roleId,
      avatar: imageBase64,
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      position,
      gender,
      role,
      action,
      Avatar,
    } = this.state;

    let { language, isLoadingGender } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title">Manage User Using Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isLoadingGender === true ? "loading gender" : ""}
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => this.onChangeInput(e, "email")}
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                />
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => this.onChangeInput(e, "password")}
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                />
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => this.onChangeInput(e, "firstName")}
                />
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => this.onChangeInput(e, "lastName")}
                />
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => this.onChangeInput(e, "phoneNumber")}
                />
              </div>
              <div className="col-9">
                <label className="">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => this.onChangeInput(e, "address")}
                />
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(e) => this.onChangeInput(e, "gender")}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((gender, index) => {
                      return (
                        <option key={index} value={gender.keyMap}>
                          {language === LANGUAGES.VI
                            ? gender.valueVi
                            : gender.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  value={position}
                  onChange={(e) => this.onChangeInput(e, "position")}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((position, index) => {
                      return (
                        <option key={index} value={position.keyMap}>
                          {language === LANGUAGES.VI
                            ? position.valueVi
                            : position.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => this.onChangeInput(e, "role")}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((role, index) => {
                      return (
                        <option key={index} value={role.keyMap}>
                          {language === LANGUAGES.VI
                            ? role.valueVi
                            : role.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label className="">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    type="file"
                    id="previewImage"
                    className="form-control"
                    hidden
                    onChange={(e) => this.handleOnchangeImg(e)}
                  />
                  <label className="label-upload" htmlFor="previewImage">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  type="submit"
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning px-4 py-2"
                      : "btn btn-primary px-4 py-2"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen && this.state.previewImgUrl && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.position,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editAUser: (data) => dispatch(actions.editAUser(data)),
    //processLogout: () => dispatch(actions.processLogout()),
    //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
