export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
 

export const getCategories = () => {
  // Dummy data
  const dummyCategories = [
    { id: 1, name: "Music", description: "Concerts, live shows, and festivals" },
    { id: 2, name: "Technology", description: "Workshops, conferences, hackathons" },
    { id: 3, name: "Sports", description: "Football, basketball, marathons" },
  ];

  return {
    type: FETCH_CATEGORIES,
    payload: dummyCategories,
  };
};

export const addCategory = (category: any) => {
  return {
    type: ADD_CATEGORY,
    payload: category,
  };
};
