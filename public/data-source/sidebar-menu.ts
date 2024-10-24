import Dashboardicon from "../assests/menuicon/dashboardicon.svg";
import Bookings from "../assests/menuicon/bookingsIcon.svg";
import VendorIcon from "../assests/menuicon/Vendoricon.svg";
import Agent from "../assests/menuicon/AgentIcon.svg";
import Customer from "../assests/menuicon/Customericon.svg";
import MarketSales from "../assests/menuicon/Salesicon.svg";
import Promotion from "../assests/menuicon/Dealsicon.svg";
import Accounts from "../assests/menuicon/Accountsicon.svg";
// import Logo from "../assests/menuicon/Logo.svg";
// import Transaction from "../assests/menuicon/Transactionicon.svg";
// import Journal from "../assests/menuicon/Journalicon.svg";
// import Employee from "../assests/menuicon/Employeeicon.svg";
// import Reports from "../assests/menuicon/Reportsicon.svg";
// import Settings from "../assests/menuicon/Settingsicon.svg";
// import LogOut from "../assests/menuicon/Logoutiutton.svg";

export const sidebarMenu = [
  {
    name: "Dashboard",
    tag: "dashboard",
    isEnabled: true,
    isAccessable: true,
    icon: Dashboardicon,
    path: "/dashboard",
  },
  {
    name: "Deposit Request",
    tag: "deposit_request",
    isEnabled: true,
    isAccessable: true,
    icon: Accounts,
    path: "/deposit-requests",
  },
  {
    name: "Credit Request",
    tag: "credit_request",
    isEnabled: true,
    isAccessable: true,
    icon: Accounts,
    path: "/credit-requests",
  },
  {
    name: "Profile",
    tag: "user-profile",
    isEnabled: true,
    isAccessable: true,
    icon: Bookings,
    path: "#",
  },
  {
    name: "Vendor",
    tag: "vendor",
    isEnabled: true,
    isAccessable: true,
    icon: VendorIcon,
    path: "#",
  },
  {
    name: "Agent",
    tag: "agent",
    isEnabled: true,
    isAccessable: true,
    icon: Agent,
    path: "#",
  },
  {
    name: "Customer",
    tag: "customer",
    isEnabled: true,
    isAccessable: true,
    icon: Customer,
    path: "#",
  },
  {
    name: "Market",
    tag: "market",
    isEnabled: true,
    isAccessable: true,
    icon: MarketSales,
    path: "#",
  },
  {
    name: "Promotion",
    tag: "promotion",
    isEnabled: true,
    isAccessable: true,
    icon: Promotion,
    path: "#",
  },
];
