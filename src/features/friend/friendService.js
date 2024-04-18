import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const createFriendRequest = async (requestId, recipentId) => {
  const response = await axios.post(
    `${base_url}friends/${requestId}/${recipentId}`,
    { requestId, recipentId },
    config
  );
  return response.data;
};

const confirmFriendAccept = async (id, requesterId) => {
  const response = await axios.get(
    `${base_url}friends/${id}/${requesterId}/accept`,
    config
  );
  return response.data;
};

const getAllFriendsRequest = async (id) => {
  const response = await axios.get(
    `${base_url}friends/${id}/requests`,
    config
  );
  return response.data;
};

const getFriendList = async (id) => {
  const response = await axios.get(
    `${base_url}friends/${id}`,
    config
  );
  return response.data;
};

const cancelFriendRequest = async (id, recipentId) => {
  const response = await axios.get(
    `${base_url}friends/${id}/${recipentId}/cancel`,
    config
  );
  return response.data;
};

const declineFriendRequest = async (id) => {
  const response = await axios.get(
    `${base_url}friends/${id}/decline`,
    config
  );
  return response.data;
};
const getAllFriendRequestSented = async (id) => {
  const response = await axios.get(
    `${base_url}friends/${id}/requests/sented`,
    config
  );
  return response.data;
};

const friendService = {
  createFriendRequest,
  confirmFriendAccept,
  getAllFriendsRequest,
  getFriendList,
  cancelFriendRequest,
  declineFriendRequest,
  getAllFriendRequestSented
};
export default friendService;
