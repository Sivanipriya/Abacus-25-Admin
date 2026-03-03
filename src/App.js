import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./components/RequireAuth";
import VerifyWorkshopPayment from "./components/VerifyWorkshopPayment";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import AddAdmin from "./components/AddAdmin";
import ChangePassword from "./components/ChangePassword";
import WorkshopCashPayment from "./components/WorkshopCashPayment";
import WorkshopList from "./components/WorkshopList";
import EventList from "./components/EventList";
import WorkshopPayments from "./components/WorkshopPayments";
import Queries from "./components/Queries";
import RegisterNewUser from "./components/RegisterNewUser";
import RegisterCampusAmbassador from "./components/RegisterCA";
import EventCashPayment from "./components/EventCashPayment";
import EventPayments from "./components/EventPayment";
import VerifyEventPayment from "./components/verifyEventPayments";
import Ambassadors from "./components/Ambassadors";
import AmbassadorStats from "./components/AmbassadorStats";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPage />}></Route>

        {/* <Route element={<RequireAuth />}> */}
        <Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register-user" element={<RegisterNewUser />}></Route>
          <Route path="/add-admin" element={<AddAdmin />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route
            path="/verify-workshop-payment"
            element={<VerifyWorkshopPayment />}
          ></Route>
          <Route
            path="/workshop-cash-payment"
            element={<WorkshopCashPayment />}
          ></Route>
          <Route
            path="/verify-event-payment"
            element={<VerifyEventPayment />}
          ></Route>
          <Route path="/event-list" element={<EventList />}></Route>
          <Route path="/workshop-list" element={<WorkshopList />}></Route>
          <Route
            path="/event-cash-payment"
            element={<EventCashPayment />}
          ></Route>
          <Route
            path="/workshop-payments"
            element={<WorkshopPayments />}
          ></Route>
          <Route path="/queries" element={<Queries />}></Route>
          <Route path="/event-payments" element={<EventPayments />}></Route>

          <Route
            path="/register-ca"
            element={<RegisterCampusAmbassador />}
          ></Route>
          <Route path="/ambassadors" element={<Ambassadors />} />
          <Route path="/ambassador/:referralCode" element={<AmbassadorStats />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
