import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUser();
  }

  getAllUser = async () => {
    const res = await getAllUsers("All");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };

  handleAllNewUsers = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUsersModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUsersEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      const res = await createNewUserApi(data);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.getAllUser();
        this.toggleUsersModal();
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      const ask = window.confirm("Are you sure you want to delete");
      if (ask) {
        const res = await deleteUserApi(user.id);
        if (res && res.errCode === 0) {
          await this.getAllUser();
        } else {
          alert(res.message);
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      const res = await editUserApi(user);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.getAllUser();
        this.toggleUsersEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUsersModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUsersEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center mt-4">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAllNewUsers()}
          >
            <i className="fas fa-plus" style={{ marginRight: "4px" }}></i>
            Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th className="text-center">Sort</th>
                <th className="text-center">Email</th>
                <th className="text-center">First name</th>
                <th className="text-center">Last name</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Address</th>
                <th className="text-center">phone number</th>
                <th className="text-center">Action</th>
              </tr>
              {this.state.arrUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.firstName}</td>
                    <td className="text-center">{user.lastName}</td>
                    <td className="text-center">
                      {user.gender ? "Nam" : "Nữ"}
                    </td>
                    <td className="text-center">{user.address}</td>
                    <td className="text-center">{user.phoneNumber}</td>
                    <td className="text-center">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.handleEditUser(user);
                        }}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(user)}
                      >
                        <i className="fas fa-user-times"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
