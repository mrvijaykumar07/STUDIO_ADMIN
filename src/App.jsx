import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./store/authSlice";

import MainLayout from "./Dashboard/MainLayout";
import LeadManagementPage from "./Pages/LeadManagementPage";
import ClientEventsPage from "./Pages/clientEventPage/ClientEventsPage";
import AgreementsPage from "./Pages/AgreementsPage";
import PaymentsPage from "./Pages/PaymentsPage";
import QRPhotoSharingPage from "./Pages/QRPhotoSharingPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import UserManagementPage from "./Pages/UserManagementPage";
import SettingsPage from "./Pages/SettingsPage";
import DashboardPage from "./Pages/DashboardPage";
import AdminLogin from "./Components/AdminLogin";
import ClientCreatePage from "./Pages/clientEventPage/ClientCreatePage";
import EventCreatePage from "./Pages/clientEventPage/EventCreatePage";
import EventDetailsPage from "./Pages/clientEventPage/EventDetailsPage";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  // ✅ LocalStorage → Redux sync (page refresh ke baad bhi user login rahe)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (token && refreshToken && user) {
      dispatch(
        loginSuccess({
          user: JSON.parse(user),
          accessToken: token,
          refreshToken: refreshToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AdminLogin />
          )
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/lead-management" element={<LeadManagementPage />} />
        <Route path="/client-events" element={<ClientEventsPage />} />

        <Route path="/clients/create" element={<ClientCreatePage />} />
        <Route path="/events/create" element={<EventCreatePage />} />

        <Route path="/clients/edit/:clientId" element={<ClientCreatePage />} />
        <Route path="/events/edit/:clientId" element={<EventCreatePage/>} />

<Route path="/events/details/:id" element={<EventDetailsPage/>} />

        <Route path="/agreements" element={<AgreementsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/qr-photo-sharing" element={<QRPhotoSharingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
