import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/scrollbars.css";
import "./styles/aside.css";
import "./styles/modal.css";
import "./styles/react-select.css";
import "./styles/page-geo.css";
import "./styles/column-toggle-popup.css";
import "./styles/date-menu.css";
import "./styles/catalogue-menu.css";
import "./styles/tippy.css";
import "./styles/components.css";
import "./styles/report-child-table.css";
import "./styles/date-range-picker-one.css";
import "./styles/date-picker.css";
import "./styles/floating-filter.css";

import AgTable from "./pages/AgTable";
import Error from "./pages/Error";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import Vendors from "./pages/vendors/Vendors";
import Invoices1 from "./pages/Invoices1";
import Invoices2 from "./pages/Invoices2";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prices from "./pages/Prices";
import MainDashboard from "./pages/MainDashboard";
import ProfileForm from "./components/ProfileForm";
import PasswordForm from "./components/PasswordForm";
import Test from "./pages/Test";
import OrderDetails from "./pages/OrderDetails";
import InvoicesTable from "./pages/InvoicesTable";
import Terms from "./pages/Terms";
import AllOrdersParent from "./pages/AllOrdersParent";
import LogsTable from "./pages/LogsTable";
import CatalogueTable from "./pages/CatalogueTable";
import ReportsTable from "./pages/ReportsTable";
import Contract from "./pages/Contract";
import NewCatalogueTable from "./pages/NewCatalogueTable";
import CatalogueTableGeo from "./pages/CatalogueTableGeo";
import CatalogueTablegeoResize from "./pages/CatalogueTableGeoResize";
import VendorAllOrdersTable from "./pages/VendorAllOrdersTable";
import StableTable from "./pages/StableTable";
import CatalogueTable5Level from "./pages/CatalogueTable5Level";
import SlaByVendorsTable from "./pages/SlaByVendorsTable";
import SlaGraphics from "./pages/SlaGraphics";
import DiscountsTable from "./pages/DiscountsTable";
import DiscountsCards from "./pages/DiscountsCards";
import MainHome from "./pages/MainHome";
import VendorsCalendarTable from "./pages/VendorsCalendarTable";
import InvoiceDetailsTable from "./pages/InvoiceDetailsTable";
import SlaCategory from "./pages/SlaCategory";
import DashboardLayout from "./layout/DashboardLayout";
import Dash from "./pages/Dash";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Test2 from "./pages/Test2";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dash />} />
            <Route path="/links" element={<Home />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/invoice-details" element={<InvoiceDetailsTable />} />
            <Route path="/sla-category" element={<SlaCategory />} />
            <Route path="/ag-table" element={<AgTable />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/invoices1" element={<Invoices1 />} />
            <Route path="/invoices2" element={<Invoices2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/main-dashboard" element={<MainDashboard />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/invoices-table" element={<InvoicesTable />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/all-orders-parent" element={<AllOrdersParent />} />
            <Route path="/logs" element={<LogsTable />} />
            <Route path="/catalogue" element={<CatalogueTable />} />
            <Route path="/reports" element={<ReportsTable />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/new-catalogue" element={<NewCatalogueTable />} />
            <Route path="/catalogue-geo" element={<CatalogueTableGeo />} />
            <Route path="/stable-table" element={<StableTable />} />
            <Route path="/sla-by-vendors" element={<SlaByVendorsTable />} />
            <Route path="/sla-graphics" element={<SlaGraphics />} />
            <Route path="/discounts-table" element={<DiscountsTable />} />
            <Route path="/discounts-cards" element={<DiscountsCards />} />
            <Route
              path="/vendors-calendar"
              element={<VendorsCalendarTable />}
            />
            <Route
              path="/catalogue-5-level"
              element={<CatalogueTable5Level />}
            />
            <Route
              path="/vendor-all-orders"
              element={<VendorAllOrdersTable />}
            />
            <Route
              path="/catalogue-geo-resize"
              element={<CatalogueTablegeoResize />}
            />
            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
