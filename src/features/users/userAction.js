import { toast } from "react-toastify";
import {
  changePassword,
  editUserProfile,
  fetchSingleUserProfile,
  fetchUserProfile,
  getNewAccessJWT,
  logoutUser,
  postNewUser,
  uploadProfilePic,
  userLogin,
  verifyUserLink,
} from "./userAxios";
import { setUser } from "./userSlice";

const apiProcessWithToast = async (obj, func) => {
  const pending = func(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });
  const response = await pending;
  toast[response.status](response.message);
  return response;
};

export const createNewUserAction = async (userData) => {
  apiProcessWithToast(userData, postNewUser);
  // further stuff
};

export const verifyUserLinkAction = async (data) => {
  return apiProcessWithToast(data, verifyUserLink);
};

export const loginUserAction = (data) => async (dispatch) => {
  const { status, jwts } = await userLogin(data);

  if (jwts?.accessJWT && jwts?.refreshJWT) {
    sessionStorage.setItem("accessJWT", jwts.accessJWT);
    localStorage.setItem("refreshJWT", jwts.refreshJWT);

    dispatch(fetchUserProfileAction());
  }

  //  if login success
};

export const fetchUserProfileAction = () => async (dispatch) => {
  const { status, userInfo } = await fetchUserProfile();

  if (status === "success") {
    //mount user in the redux store

    dispatch(setUser(userInfo));
  }
};
export const fetchSingleUserProfileAction = (_id) => async (dispatch) => {
  const { status, user } = await fetchSingleUserProfile(_id);

  if (status === "success") {
    //mount user in the redux store

    dispatch(setUser(user));
  }
};
export const editUserProfileAction = (userObj) => async (dispatch) => {
  const { status, userInfo } = await editUserProfile(userObj);

  if (status === "success") {
    //mount user in the redux store
    dispatch(setUser(userInfo));
  }
  return status;
};
export const updateUserPasswordAction = (userObj) => async (dispatch) => {
  const { status, userInfo } = await changePassword(userObj);

  if (status === "success") {
    //mount user in the redux store
    dispatch(setUser(userInfo));
  }
  return status;
};
export const updateUserProfilePicAction =
  (userId, formData) => async (dispatch) => {
    try {
      const { status, userInfo } = await uploadProfilePic(userId, formData);

      if (status === "success") {
        // Update user in the redux store
        dispatch(setUser(userInfo));
      }
      return status;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      return { status: "error", message: "Failed to update profile picture" };
    }
  };

export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");

  if (accessJWT) {
    // Check if the access token is valid
    const response = await fetchUserProfileAction(); // This should check token validity
    if (response.status === "success") {
      return dispatch(fetchUserProfileAction());
    } else {
      // Try using the refresh token
      const refreshJWT = localStorage.getItem("refreshJWT");
      if (refreshJWT) {
        const refreshResponse = await getNewAccessJWT();
        if (refreshResponse.status === "success") {
          sessionStorage.setItem("accessJWT", refreshResponse.accessJWT);
          return dispatch(fetchUserProfileAction());
        }
      }
    }
  } else {
    const refreshJWT = localStorage.getItem("refreshJWT");
    if (refreshJWT) {
      const refreshResponse = await getNewAccessJWT();
      if (refreshResponse.status === "success") {
        sessionStorage.setItem("accessJWT", refreshResponse.accessJWT);
        return dispatch(fetchUserProfileAction());
      }
    }
  }

  return { status: "error", message: "User not authenticated" };
};

export const logOutUserAction = () => async (dispatch) => {
  // call api with authorization for backend logout
  logoutUser();

  // frontend logout
  dispatch(setUser({}));
  localStorage.removeItem("refreshJWT");
  sessionStorage.removeItem("accessJWT");
};
