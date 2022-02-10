import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        userRedux: this.props.users,
      });
    }
  }

  deleteAUser = async (id) => {
    await this.props.deleteAUser(id);
    await this.props.fetchUserRedux();
  };

  handleEditUser = async (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUser = this.state.userRedux;
    return (
      <React.Fragment>
        <table id="customers" className="mb-4">
          <tbody>
            <tr>
              <th className="text-center">Sort</th>
              <th className="text-center">Email</th>
              <th className="text-center">avatar</th>
              <th className="text-center">First name</th>
              <th className="text-center">Last name</th>
              <th className="text-center">Address</th>
              <th className="text-center">phone number</th>
              <th className="text-center">Action</th>
            </tr>
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-center">
                      <img className="imgData"
                        src={
                          item.image
                            ? new Buffer(item.image, "base64").toString("binary")
                            : ""
                        }
                      />
                    </td>
                    <td className="text-center">{item.firstName}</td>
                    <td className="text-center">{item.lastName}</td>
                    <td className="text-center">{item.address}</td>
                    <td className="text-center">{item.phoneNumber}</td>
                    <td className="text-center">
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.deleteAUser(item.id)}
                      >
                        <i className="fas fa-user-times"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
