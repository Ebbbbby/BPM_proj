import { URL } from "../../../../utils/routes";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFolderPlus,
  FiSettings,
} from "react-icons/fi";
import { RiPulseLine } from "react-icons/ri";
import { DEFINED_PERMISSIONS } from "../../../../utils/const";
import { GetLocalStorage } from "../../../../utils/functions/GetLocalStorage";
import { USER_CATEGORY } from "../../../../utils/Enums";

export const sidebar = () => {
  const user = GetLocalStorage?.();
  const data = [
    {
      iconIMG: ({ top }) => (
        <FiHome size={"1.4rem"} style={{ marginTop: top }} />
      ),
      iconTag: "Dashboard",
      iconLink: "/dashboard",
      linkEnd: true,
      linkPermissions: "",
    },
    {
      iconIMG: ({ top }) => (
        <FiUsers size={"1.4rem"} style={{ marginTop: top }} />
      ),
      iconTag: `${
        USER_CATEGORY.VENDOR === user?.category ? "Vendor" : "Vendors"
      }`,
      iconLink: URL?.Vendors,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.Vendor,
      hasSubLinks: false,
    },

    {
      iconIMG: ({ top }) => (
        <FiFolderPlus size={"1.4rem"} style={{ marginTop: top }} />
      ),
      iconTag: "Procurement",
      iconLink: URL?.Procurement,
      linkEnd: false,
      linkPermissions: "",
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Requisition",
          subUrl: URL?.Procurement + "/" + URL?.Requisition_Management,
          linkPermissions: DEFINED_PERMISSIONS.ProcurementRequisitionView,
        },
        {
          sublink: "Quotation",
          subUrl: URL?.Procurement + "/" + URL?.Quotation_Management,
          linkPermissions: DEFINED_PERMISSIONS.QuotationView,
        },
        {
          sublink: "Delivery",
          subUrl: URL?.Procurement + "/" + URL?.Delivery,
          linkPermissions: DEFINED_PERMISSIONS.DeliveryView,
        },
      ],
    },
    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "Assets Management",
      iconLink: URL?.Assets,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.AssetView,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Asset Acquisition",
          subUrl: URL?.Assets + "/" + URL?.Acquisition,
          linkPermissions: DEFINED_PERMISSIONS.AssetAcquisitionView,
        },
        {
          sublink: "Asset Allocation",
          subUrl: URL?.Assets + "/" + URL?.Allocation,
          linkPermissions: DEFINED_PERMISSIONS.AssetAllocationView,
        },
        {
          sublink: "Asset Requisition",
          subUrl: URL?.Assets + "/" + URL?.Requisition,
          linkPermissions: DEFINED_PERMISSIONS.AssetRequisitionView,
        },
        {
          sublink: "Asset Monitoring",
          subUrl: URL?.Assets + "/" + URL?.Monitoring,
          linkPermissions: DEFINED_PERMISSIONS.AssetRequisitionView,
          // linkPermissions: DEFINED_PERMISSIONS.AssetView,
        },
        {
          sublink: "Asset Auctioning",
          subUrl: URL?.Assets + "/" + URL?.Auctioning,
          linkPermissions: DEFINED_PERMISSIONS.AssetAuctionView,
        },
        {
          sublink: "Auctioning (Bidding)",
          subUrl: URL?.Assets + "/" + URL?.AuctionBidding,
          linkPermissions: DEFINED_PERMISSIONS.AssetBidView,
        },
      ],
    },
    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "Consumable Mgt",
      iconLink: URL?.Consumables,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Acquisition",
          subUrl: URL?.Consumables + "/" + URL?.Consumable_Acqusition,
          linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
        },
        {
          sublink: "Allocation",
          subUrl: URL?.Consumables + "/" + URL?.Consumable_Allocation,
          linkPermissions: DEFINED_PERMISSIONS.ConsumableAllocationView,
        },
        {
          sublink: "Requisition",
          subUrl: URL?.Consumables + "/" + URL?.Consumable_Requsition,
          linkPermissions: DEFINED_PERMISSIONS.ConsumableRequisitionView,
        },
      ],
    },
    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "Asset Setup",
      iconLink: URL?.AssetSetUp,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.AssetView,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Asset Register",
          subUrl: URL?.AssetSetUp + "/" + URL?.AssetRegister,
          linkPermissions: DEFINED_PERMISSIONS.AssetView,
        },
        {
          sublink: "Category",
          subUrl: URL?.AssetSetUp + "/" + URL?.Categories,
          linkPermissions: DEFINED_PERMISSIONS.AssetCategoryView,
        },
        // {
        //   sublink: "Budget",
        //   subUrl: URL?.AssetSetUp + "/" + URL?.Budget,
        //   linkPermissions: "",
        // },
      ],
    },

    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "Store & Inventory Setup",
      iconLink: URL?.ConsummableSetUp,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Consumable Register",
          subUrl: URL?.ConsummableSetUp + "/" + URL?.ConsummbaleRegister,
          linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
        },
        {
          sublink: "Categories",
          subUrl: URL?.ConsummableSetUp + "/" + URL?.ConsummableCategories,
          linkPermissions: DEFINED_PERMISSIONS?.ConsumableCategoryView,
        },
      ],
    },
    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "Fleet Management",
      iconLink: URL?.Fleets,
      linkEnd: false,
      linkPermissions: "",
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Fleets",
          subUrl: URL?.Fleets + "/" + URL?.Fleet_Management,
          linkPermissions: "",
        },
        {
          sublink: "Fuel Requisition",
          subUrl: URL?.Fleets + "/" + URL?.Requisition,
          linkPermissions: "",
        },
        {
          sublink: "Fuel Payment",
          subUrl: URL?.Fleets + "/" + URL?.Fuel_Payment,
          linkPermissions: "",
        },
        {
          sublink: "Driver Activity",
          subUrl: URL?.Fleets + "/" + URL?.Driver_Activity,
          linkPermissions: "",
        },
        {
          sublink: "Vehicle Maintenance Requisition",
          subUrl: URL?.Fleets + "/" + URL?.Vehicle_Maintenance,
          linkPermissions: "",
        },
        {
          sublink: "Accident Report",
          subUrl: URL?.Fleets + "/" + URL?.Accident_Report,
          linkPermissions: "",
        },
        {
          sublink: "Generate Report",
          subUrl: URL?.Fleets + "/" + URL?.Generate_Report,
          linkPermissions: "",
        },
        {
          sublink: "Document Set-Up",
          subUrl: URL?.Fleets + "/" + URL?.Vehicle_Document_SetUp,
          linkPermissions: "",
        },
      ],
    },

    {
      iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
      iconTag: "HR Services",
      iconLink: URL?.HR,
      linkEnd: false,
      linkPermissions: "",
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Employee Management",
          subUrl: URL.HR + "/" + URL.Employee_Management,
          linkPermissions: "",
        },

        {
          sublink: "Leave Approval (HR)",
          subUrl: URL.HR + "/" + URL.Leave_Approval,
          linkPermissions: "",
        },
      
        {
          sublink: "Leave Setup",
          subUrl: URL.HR + "/" + URL.Leave_SetUp,
          linkPermissions: "",
        },
        {
          sublink: "Training",
          subUrl: URL?.HR + "/" + URL?.Training_Request,
          linkPermissions: "",
        },
        {
          sublink: "Training Setup",
          subUrl: URL?.HR + "/" + URL?.Training_SetUp,
          linkPermissions: "",
        },
        {
          sublink: "Exit Management",
          subUrl: URL?.HR + "/" + URL?.Exit_Management,
          linkPermissions: "",
        },
        {
          sublink: "Exit Discussion Setup",
          subUrl: URL?.HR + "/" + URL?.Exit_Discussion_SetUp,
          linkPermissions: "",
        },
        {
        sublink: "Overtime Setup",
        subUrl: URL?.HR + "/" + URL?.Overtime_Setup,
        linkPermissions: "",
      },
      {
        sublink: "Overtime Management",
        subUrl: URL?.HR + "/" + URL?.Overtime_Management,
        linkPermissions: "",
      },
      {
          sublink: "Query Setup",
          subUrl: URL?.HR + "/" + URL?.Query_SetUp,
          linkPermissions: "",
        },
        {
          sublink: "Query Management",
          subUrl: URL?.HR + "/" + URL?.Query_Management,
          linkPermissions: "",
        },
  
      {
        sublink: "All Query ",
        subUrl: URL?.HR + "/"  + URL.Query_Management + "/" + URL?.All_Query_Management,
        linkPermissions: "",
      },
    ],
    },
  // URL?.Employee + "/" + URL.Query + "/" + URL?.My_Query_Response,
    {
      iconIMG: (rest) => <FiUsers size={"1.4rem"} {...rest} />,
      iconTag: "Employee Services",
      iconLink: URL?.Employee,
      linkEnd: false,
      linkPermissions: "",
      hasSubLinks: true,
      subLinks: [

        {
          sublink: "Employee",
          subUrl: URL?.Employee + "/" + URL?.My_Employee_Info,
          linkPermissions: "",
        },
        {
          sublink: "Training",
          subUrl: URL?.Employee + "/" + URL?.Training,
          linkPermissions: "",
        },
        {
          sublink: "Leave Request",
          subUrl: URL.Employee + "/" + URL.Leave_Requisition,
          linkPermissions: "",
        },

        {
          sublink: "Leave Approval(HOD)",
          subUrl: URL.HR + "/" + URL.Leave_HOD,
          linkPermissions: "",
        },

      {
        sublink: "Exit Requisition",
        subUrl: URL?.Employee + "/" + URL?.Exit_Requisition,
        linkPermissions: "",
      },
    
      {
        sublink: "Exit Requisition HOD",
        subUrl: URL?.Employee + "/" + URL?.Exit_HOD,
        linkPermissions: "",
      },
      {
        sublink: "Query",
        subUrl: URL?.Employee + "/" + URL?.Query,
        linkPermissions: "",
      },

      {
        sublink: "My Query",
        subUrl: URL?.Employee + "/" + URL?.My_Query,
        linkPermissions: "",
      },


      {
          sublink: "Query HOC",
          subUrl: URL?.Employee + "/" + URL?.Query_By_HOC,
          linkPermissions: "",
        },
  
      {
        sublink: "Overtime Requisition",
        subUrl: URL?.Employee + "/" + URL?.Overtime_Requisition,
        linkPermissions: "",
      },
    
    ],
  },

    // {
    //   //     iconIMG: <HiHome />,
    //   iconTag: "Relationship",
    //   iconLink: URL?.Relationship,
    //   linkEnd: false,
    //   linkPermissions: "",
    // },

    {
      iconIMG: () => <RiPulseLine />,
      iconTag: "Reports",
      iconLink: URL?.Reports,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.ViewReports,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "Report Configuration",
          subUrl: URL?.Reports + "/" + URL?.Report_configuration,
          exact: true,
          linkPermissions: DEFINED_PERMISSIONS.ViewReports,
        },
        {
          sublink: "Trigger History",
          subUrl: URL?.Reports + "/" + URL?.Trigger_History,
          linkPermissions: DEFINED_PERMISSIONS.ViewReports,
        },
        //   {
        //     sublink: "Report Scheduler",
        //     subUrl: URL?.Reports + "/" + URL?.Report_scheduler,
        //     linkPermissions: "",
        //   },
      ],
    },
    {
      iconIMG: ({ top }) => (
        <FiSettings size={"1.4rem"} style={{ marginTop: top }} />
      ),
      iconTag: "Settings",
      iconLink: URL?.Settings,
      linkEnd: false,
      linkPermissions: DEFINED_PERMISSIONS.PermissionManager,
      hasSubLinks: true,
      subLinks: [
        {
          sublink: "User Access Setup",
          subUrl: URL?.Settings + "/" + URL?.Permissions,
          linkPermissions: DEFINED_PERMISSIONS.PermissionManager,
        },
        {
          sublink: "Permission Groups",
          subUrl: URL?.Settings + "/" + URL?.Permission_Group,
          linkPermissions: DEFINED_PERMISSIONS.PermissionManager,
        },
      ],
    },
  ];
  return data;
};
