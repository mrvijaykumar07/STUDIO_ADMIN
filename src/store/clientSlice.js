// clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const res = await api.get("/v1/clients?page=1&limit=10");
  return res.data.data.clients;
});

const clientSlice = createSlice({
  name: "clients",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default clientSlice.reducer;
