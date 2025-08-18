import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";


export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await api.get("/v1/events");
  console.log(res.data.data.events);
  return res.data.data.events;  // 👈 sirf events array bhejo
});

// ✅ Delete event
export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id) => {
  await api.delete(`/v1/events/${id}`);
  return id;
});

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
