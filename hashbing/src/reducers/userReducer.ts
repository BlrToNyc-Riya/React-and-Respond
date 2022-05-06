import { UserAction, UserStateType } from "../actions/types/UserAction.types";

const initalState: UserStateType = {
  user: null,
};
const userReducer = (
  state: UserStateType = initalState,
  action: UserAction
) => {
  const { type } = action;

  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
