import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

// ----------------- Async Thunks -----------------

// Fetch all clients
export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const res = await api.get("/v1/clients");
  return res.data.data.clients;
});

// Add new client
export const addClient = createAsyncThunk("clients/addClient", async (data) => {
  const res = await api.post("/v1/clients", data);
  return res.data.data;
});

// Update existing client
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, data }) => {
    const res = await api.put(`/v1/clients/${id}`, data);
    return res.data.data;
  }
);

// Delete client
export const deleteClient = createAsyncThunk("clients/deleteClient", async (id) => {
  await api.delete(`/v1/clients/${id}`);
  return id;
});

// ----------------- Slice -----------------
const clientSlice = createSlice({
  name: "clients",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addClient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.list.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c._id !== action.payload);
      });
  },
});

export default clientSlice.reducer;
