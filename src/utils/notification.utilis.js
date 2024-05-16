import custimAxios from "../configs/axios.config";
const userSingle = localStorage.getItem('user')

export const notificationUtils = {
  getNotification: async () => {
    const { data } = await custimAxios.get("/notification/all");
    return data;
  },
  getUserNotification: async (id) => {
    const data = [];
    if(userSingle){
      data.push(...(await custimAxios.get(`/notification/by/${id}`)).data);
      return data;
    }
  },
  patchNatification: async ({ id, watchedUserId, status }) => {
    const { data } = await custimAxios.patch(`/notification/update/${id}`, {
      watchedUserId: watchedUserId,
      status: status,
    });
    return data;
  },
};
