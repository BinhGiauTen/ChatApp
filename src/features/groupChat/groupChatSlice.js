import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import groupChatService from "./groupChatService";

const initialState = {
  groupChats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const addToGroupChat = createAsyncThunk(
  "group/add-to-group-chat",
  async ({ conversationId, participantId }, thunkAPI) => {
    try {
      return await groupChatService.addToGroupChat(
        conversationId,
        participantId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGroupChat = createAsyncThunk(
    "group/create-group-chat",
    async ({ participantsId, conversationName }, thunkAPI) => {
      try {
        return await groupChatService.createGroupChat(
            participantsId, conversationName
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const sendGroupChatMessage = createAsyncThunk(
  "group/send-group-chat-message",
  async ({ conversationId, message }, thunkAPI) => {
    try {
      return await groupChatService.sendGroupChatMessage(
        conversationId,
        message
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGroupChatMessages = createAsyncThunk(
  "group/get-group-chat-message",
  async (conversationId, thunkAPI) => {
    try {
      return await groupChatService.getGroupChatMessages(conversationId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendGroupChatImages = createAsyncThunk(
  "group/send-images",
  async ({ conversationId, file}, thunkAPI) => {
    try {
      return await groupChatService.sendGroupChatImages(
        conversationId,
        file,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendGroupChatFiles = createAsyncThunk(
  "group/send-files",
  async ({ conversationId, file}, thunkAPI) => {
    try {
      return await groupChatService.sendGroupChatFiles(
        conversationId,
        file,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const groupChatSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToGroupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToGroupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToGroupChat = action.payload;
      })
      .addCase(addToGroupChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createGroupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createGroupChat = action.payload;
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(sendGroupChatMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendGroupChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendGroupChatMessage = action.payload;
      })
      .addCase(sendGroupChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getGroupChatMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroupChatMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getGroupChatMessages = action.payload;
      })
      .addCase(getGroupChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(sendGroupChatImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendGroupChatImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendGroupChatImages = action.payload;
      })
      .addCase(sendGroupChatImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(sendGroupChatFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendGroupChatFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendGroupChatFiles = action.payload;
      })
      .addCase(sendGroupChatFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default groupChatSlice.reducer;
