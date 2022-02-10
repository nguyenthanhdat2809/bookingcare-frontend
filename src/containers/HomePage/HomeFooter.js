import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="home-footer">
          <p>&copy; 2021 nguyenthanhdat2809. <a target="_blank" href="https://github.com/nguyenthanhdat2809">nguyenthanhdat.com</a></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
