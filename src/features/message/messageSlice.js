import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  messages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const sendMessage = createAsyncThunk(
  "message/send-message",
  async ({ receiverId, message, conversationName }, thunkAPI) => {
    try {
      return await messageService.sendMessage(
        receiverId,
        message,
        conversationName
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllMessages = createAsyncThunk(
  "message/get-all-message",
  async (id, thunkAPI) => {
    try {
      return await messageService.getAllMessages(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllConversations = createAsyncThunk(
  "message/get-all-conversation",
  async (id, thunkAPI) => {
    try {
      return await messageService.getAllConversations(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAConversation = createAsyncThunk(
  "message/get-a-conversation",
  async ({ id, conversationId }, thunkAPI) => {
    try {
      return await messageService.getAConversation(id, conversationId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "message/delete-message",
  async ({ id, participantId, messageId }, thunkAPI) => {
    try {
      return await messageService.deleteMessage(
        id, participantId, messageId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendMessage = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllMessages = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllConversations = action.payload;
      })
      .addCase(getAllConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAConversation = action.payload;
      })
      .addCase(getAConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedMessage = action.payload;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default messageSlice.reducer;
