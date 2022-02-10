import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { userService } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });
    try {
      const data = await userService(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errorMessage: data.message,
        });
      }

      if (data && data.errCode === 0) {
        // todo
        this.props.userLoginSuccess(data.userData)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errorMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowhidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  handlerKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) this.handleLogin();
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>

            <div className="col-12 form-group login-input">
              <label className="">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(e) => this.handleOnchangeUsername(e)}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label className="">Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(e) => this.handleOnchangePassword(e)}
                  value={this.state.password}
                  onKeyDown={(e) => this.handlerKeyDown(e)}
                />
                <span onClick={() => this.handleShowhidePassword()}>
                  {this.state.isShowPassword ? (
                    <i className="far fa-eye"></i>
                  ) : (
                    <i className="fas fa-eye-slash"></i>
                  )}
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>

            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>

            <div className="col-12 forgot">
              <span className="text-social">Forgot your password?</span>
            </div>

            <div className="col-12 text-center">
              <span className="text-other-login">Or Login With: </span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
