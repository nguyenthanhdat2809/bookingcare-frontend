import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    })
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
    console.log("ok");
  };

  handleOnChangeInput = (event, id) => {
    // goodcode
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    const isValid = this.checkValidateInput();
    if (isValid) {
      // call api create user
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} size="lg" toggle={() => this.toggle()}>
        <ModalHeader
          close={
            <button
              style={{ color: "white" }}
              className="btn close"
              onClick={() => this.toggle()}
            >
              <span className="can">x</span>
            </button>
          }
          toggle={() => this.toggle()}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label className="">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>

              <div className="col-6 form-group">
                <label className="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
              </div>

              <div className="col-6 form-group mt-2">
                <label className="">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "firstName")
                  }
                />
              </div>

              <div className="col-6 form-group mt-2">
                <label className="">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "lastName")
                  }
                />
              </div>

              <div className="col-12 form-group mt-2">
                <label className="">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn btn-primary px-2"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>{" "}
          <Button className="btn px-2" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
