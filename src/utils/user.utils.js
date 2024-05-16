import custimAxios from "../configs/axios.config";
const userSingle = localStorage.getItem('user')

export const userUtils = {
  getUsers: async () => {
    const { data } = await custimAxios.get("user/all");
    return data;
  },
  getSingleUser: async () => {
    if(userSingle){      
      const { data } = await custimAxios.get("/user/single");
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }
  },
  getCottageUserById: async (userId) => {
    const { data } = await custimAxios.get(`/user/single/user/by/${userId}`);
    return data;
  },
  getUserDevice: async (userId) => {
    const { data } = await custimAxios.get(`user/user-device/${userId}`);
    return data;
  },
  patchUser: async ({
    id,
    email,
    favoriteCottages,
    image,
    name,
    phone,
  }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("favoriteCottages", favoriteCottages);
    formData.append("image", image);
    formData.append("name", name);
    formData.append("phone", phone);
    const { data } = await custimAxios.patch(`user/edit/${id}`, formData,{
    });
    return data;
  },
};
