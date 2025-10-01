export const FETCH_USERS = "FETCH_USERS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";
 

export const getUsers = () => {
  // Dummy data
  const dummyUsers = [
    { id: "1", avatar: "https://i.pravatar.cc/100?img=3", name: "Nguyễn Văn A", email: "a@example.com", phone: "0000000000", role: "Admin" },
    { id: "2", avatar: "https://i.pravatar.cc/100?img=3", name: "Trần Thị B", email: "b@example.com", phone: "0000000000", role: "User" },
    { id: "3", avatar: "", name: "Lê Văn C", email: "c@example.com", phone: "0000000000", role: "Manager" },
  ];

  return {
    type: FETCH_USERS,
    payload: dummyUsers,
  };
};

export const setSelectedUser = (payload: { email?: string }) => ({
  type: SET_SELECTED_USER,
  payload,
});

export const clearSelectedUser = () => ({
  type: CLEAR_SELECTED_USER,
});
