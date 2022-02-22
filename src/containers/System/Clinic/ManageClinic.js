import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { createNewSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";
import { createNewClinicService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: ""
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleOnchageInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;

    this.setState({
      ...stateCopy
    })
  }

  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImg = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      this.setState({
        imageBase64: base64,
      });
      console.log(base64);
    }
  };

  handleOnSaveClinic = async () => {
    let res = await createNewClinicService(this.state);
    if (res && res.errCode === 0) {
      toast.info("Add new clinic successfully!")
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      })
    } else {
      toast.error("Add new specialty failed!")
      console.log("ERROR >>> ",res);
    }
  }

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="title">Quản lý phòng khám</div>

        <div className="add-new-specialty row mt-4">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnchageInput(e, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input type="file" className="form-control-file" onChange={(e) => this.handleOnchangeImg(e)} />
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleOnchageInput(e, "address")}
            />
          </div>

          <div className="col-12 markdown">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-info" onClick={() => this.handleOnSaveClinic()}>Save</button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
