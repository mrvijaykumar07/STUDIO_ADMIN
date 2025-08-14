import { Routes, Route } from "react-router-dom";
import MainLayout from "./Dashboard/MainLayout";


import LeadManagementPage from "./Pages/LeadManagementPage";
import ClientEventsPage from "./Pages/ClientEventsPage";
import AgreementsPage from "./Pages/AgreementsPage";
import PaymentsPage from "./Pages/PaymentsPage";
import QRPhotoSharingPage from "./Pages/QRPhotoSharingPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import UserManagementPage from "./Pages/UserManagementPage";
import SettingsPage from "./Pages/SettingsPage";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage/>} />
        <Route path="lead-management" element={<LeadManagementPage />} />
        <Route path="client-events" element={<ClientEventsPage />} />
        <Route path="agreements" element={<AgreementsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="qr-photo-sharing" element={<QRPhotoSharingPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
