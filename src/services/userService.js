import axios from "../axios";

const handleLogin = async (email, password) => {
  return await axios.post("/api/login", {
    email: email,
    password: password,
  });
};

export const getAllUsers = async (id) => {
  return await axios.get(`/api/get-all-users?id=${id}`);
};

export const createNewUserApi = async (data) => {
  return await axios.post("/api/create-new-user", data);
};

export const deleteUserApi = async (id) => {
  return await axios.delete("/api/delete-user", {
    data: { id: id },
  });
};

export const editUserApi = async (data) => {
  return await axios.put("/api/edit-user", data);
};

export const getAllCodeServices = async (type) => {
  return await axios.get(`/api/allcode?type=${type}`);
}

export const getTopDoctorHomeService = async (limit) => {
  return await axios.get(`/api/top-doctor-home?limit=${limit}`);
}

export const getAllDoctorServices = async () => {
  return await axios.get(`/api/all-doctors`);
}

export const saveDetailDoctorService = async (data) => {
  return await axios.post("/api/save-info-doctors", data);
}

export const getDetailInforDoctorService = async (id) => {
  return await axios.get(`/api/get-detail-doctor?id=${id}`);
}

export const saveBulkCreateScheduleService = async (data) => {
  return await axios.post("/api/bulk-create-schedule", data);
}

export const getScheduleDoctorByDateService = async (doctorId, date) => {
  return await axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

export const getExtraInforDoctorByIdService = async (doctorId) => {
  return await axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

export const getProfileDoctorByIdService = async (doctorId) => {
  return await axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

export const postPatientBookingAppointment = async (data) => {
  return await axios.post("/api/patient-book-appointment", data);
}

export const postVerifyBookingAppointment = async (data) => {
  return await axios.post("/api/verify-book-appointment", data);
}

export const createNewSpecialtyService = async (data) => {
  return await axios.post("/api/create-new-specialty", data);
}

export const getAllSpecialtyService = async () => {
  return await axios.get("/api/get-all-specialty");
}

export const getAllDetailSpecialtyByIdService = async (data) => {
  return await axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

export default handleLogin;
