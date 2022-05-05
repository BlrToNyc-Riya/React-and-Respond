export const setUser = (type: string, user: firebase.User | null) => (
  console.log("", user),
  {
    type: type,
    user: user,
  }
);
