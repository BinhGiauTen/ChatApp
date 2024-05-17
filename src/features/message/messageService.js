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

const getAllConversations = async () => {
  const response = await axios.get(
    `${base_url}messages/conversations/get`,
    config
  );
  return response.data;
};

const getAConversation = async (conversationId) => {
  const response = await axios.get(
    `${base_url}messages/conversation/${conversationId}`,
    config
  );
  return response.data;
};

const deleteMessage = async (participantId, messageId) => {
  const response = await axios.post(
    `${base_url}messages/revoke/${participantId}`,
    { messageId },
    config
  );
  return response.data;
};

const shareMessage = async (receiverId, messageId) => {
  const response = await axios.post(
    `${base_url}messages/share/${receiverId}`,
    { messageId },
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
  shareMessage
};
export default messageService;
