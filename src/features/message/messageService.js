import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const sendMessage = async (receiverId, message) => {
  const response = await axios.post(
    `${base_url}messages/send/${receiverId}`,
    { message },
    config
  );
  return response.data;
};

const getAllMessages = async (id) => {
  const response = await axios.get(`${base_url}messages/${id}`, config);
  return response.data;
};

const getAllConversations = async (id) => {
  const response = await axios.get(
    `${base_url}messages/conversations/${id}`,
    config
  );
  return response.data;
};

const getAConversation = async (id, conversationId) => {
  const response = await axios.get(
    `${base_url}messages/conversation/${id}/${conversationId}`,
    config
  );
  return response.data;
};

const deleteMessage = async (id, participantId, messageId) => {
  const response = await axios.post(
    `${base_url}messages/delete/${id}/${participantId}/${messageId}`,
    config
  );
  return response.data;
};

const sendImage = async (receiverId, file) => {
  const formData = new FormData();
  formData.append("images[]", file);
  const response = await axios.post(
    `${base_url}messages/send/image/${receiverId}`,
    formData,
    config
  );
  return response.data;
};

const sendFile = async (receiverId, file) => {
  const formData = new FormData();
  formData.append("files[]", file);
  const response = await axios.post(
    `${base_url}messages/send/file/${receiverId}`,
    formData,
    config
  );
  return response.data;
};

const messageService = {
  sendMessage,
  getAllMessages,
  getAllConversations,
  getAConversation,
  deleteMessage,
  sendImage,
  sendFile,
};
export default messageService;
