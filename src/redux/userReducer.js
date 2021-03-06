import { userAPI } from "../api/api";
import { meThunk } from "./authReducer";
import { setAppMessage } from "./appReducer";

const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const SET_USER = "auth/SET_USER";
const SET_ERROR = "auth/SET_ERROR";

let initialState = {
  client: null,
  isFetching: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, client: action.client };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export const setUser = (client) => ({ type: SET_USER, client });

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setError = (error) => ({ type: SET_ERROR, error });

export const changeUser = (values) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const response = await userAPI.changeUser(values);
  if (!!response.data.errors) {
    dispatch(setAppMessage("Ошибка при редактирование!", "error"));
    dispatch(toggleIsFetching(false));
    return response.data.errors;
  }
  dispatch(toggleIsFetching(false));
  dispatch(meThunk());
  dispatch(setAppMessage("Пользователь успешно изменен!", "success"));
};

export default userReducer;
