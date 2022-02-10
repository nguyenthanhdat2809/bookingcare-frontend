import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  createNewUserApi,
  getAllUsers,
  deleteUserApi,
  editUserApi,
  getTopDoctorHomeService,
  getAllDoctorServices,
  saveDetailDoctorService,
  getAllSpecialtyService
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = async () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeServices("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFaided());
      }
    } catch (error) {
      dispatch(fetchGenderFaided());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFaided = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});

// position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositonFaided());
      }
    } catch (error) {
      dispatch(fetchPositonFaided());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositonFaided = () => ({
  type: actionTypes.FETCH_POSITION_FAIDED,
});

// role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFaided());
      }
    } catch (error) {
      dispatch(fetchRoleFaided());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});

export const fetchRoleFaided = () => ({
  type: actionTypes.FETCH_ROLE_FAIDED,
});

// Create a new user

export const createNewUser = (data) => {
  console.log(data);
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserApi(data);
      if (res && res.errCode === 0) {
        toast.info("Create new user successfully ✔");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart())
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});

// Fetch user info
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        let users = res.users.reverse();
        dispatch(fetchAllUserSuccess(users));
      } else {
        dispatch(fetchAllUserFaided());
      }
    } catch (error) {
      dispatch(fetchAllUserFaided());
      console.log(error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFaided = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIDED,
});

// Delete user
export const deleteAUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(id);
      if (res && res.errCode === 0) {
        toast.info("Delete this user successfully ✔");
        dispatch(deleteUserSuccess());
        //dispatch(fetchAllUserStart())
      } else {
        toast.error("Delete this user failed !");
        dispatch(deleteUserFaided());
      }
    } catch (error) {
      toast.error("Server Failure: " + error);
      dispatch(deleteUserFaided());
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFaided = () => ({
  type: actionTypes.DELETE_USER_FAIDED,
});


// Update user
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserApi(data);
      if (res && res.errCode === 0) {
        toast.info("Update this user successfully ✔");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart())
      } else {
        toast.error("Update this user failed !");
        dispatch(editUserFaided());
      }
    } catch (error) {
      toast.error("Server Failure: " + error);
      dispatch(editUserFaided());
      console.log(error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFaided = () => ({
  type: actionTypes.EDIT_USER_FAIDED,
});

// Top doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("10");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
        })
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
      })
    }
  };
}

// Get aLL doctor
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorServices();
      console.log("load ok", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
        })
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
      })
    }
  };
}


// Save Detail doctor
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.info(res.errMessage);
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        })
      } else {
        toast.error("Save infor doctor Failure !!!!!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED
        })
      }
    } catch (error) {
      toast.error("Save infor doctor Failure !!!!!!");
      console.log(error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
      })
    }
  };
}


// Get aLL CODE
export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("TIME");
      console.log("load ok", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDED,
        })
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDED,
      })
    }
  };
}



// get doctor price
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeServices("PRICE");
      let resPayment = await getAllCodeServices("PAYMENT");
      let resProvince = await getAllCodeServices("PROVINCE");
      let resSpecialty = await getAllSpecialtyService();
      

      if (resPrice && resPrice.errCode === 0 
          && resPayment && resPayment.errCode === 0
          && resProvince && resProvince.errCode === 0
          && resSpecialty && resSpecialty.errCode === 0
        ) {
          let data = {
            resPrice: resPrice.data,
            resPayment: resPayment.data,
            resProvince: resProvince.data,
            resSpecialty: resSpecialty.data
          }
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log(error);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED,
});