import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

// ----------------- Async Thunks -----------------

// Fetch all events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await api.get("/v1/events");
  return res.data.data.events;
});

// Add new event
export const addEvent = createAsyncThunk("events/addEvent", async (data) => {
  const res = await api.post("/v1/events", data);
  return res.data.data;
});

// Update existing event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, data }) => {
    const res = await api.put(`/v1/events/${id}`, data);
    return res.data.data;
  }
);

// Delete event
export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id) => {
  await api.delete(`/v1/events/${id}`);
  return id;
});

// ----------------- Slice -----------------
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
      // Fetch
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })

      // Update
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e._id === action.payload._id);
        if (index !== -1) state.events[index] = action.payload;
      })

      // Delete
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
