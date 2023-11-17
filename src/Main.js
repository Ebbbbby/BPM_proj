import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  // BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { URL } from "./utils/routes";
// import PageLoader from "./app/dashboard/Components/Loader/Loader";
import { LoggedInRoute, ProtectedRoutes } from "./utils/ProtectedRoutes";

import ViewAccidentReport from "./app/dashboard/Pages/Fleets/Accident/ViewAccidentReport";
import ViewMaintenanceRequisition from "./app/dashboard/Pages/Fleets/Maintenance/ViewMaintenanceRequisition";
import { getMyPermissions } from "./utils/functions/GetMyPermissions";
import { DEFINED_PERMISSIONS } from "./utils/const";
import ViewTrainingRequisition from "./app/dashboard/Pages/HR/Training/ViewTrainingRequisition";
import ViewEmployeeTrainingRequisition from "./app/dashboard/Pages/Employee/Training/ViewTrainingRequisition";

// import ViewFleet from "./app/dashboard/Pages/Fleets/AllFleets/ViewFleet";

import { GetLocalStorage } from "./utils/functions/GetLocalStorage";
import { USER_CATEGORY } from "./utils/Enums";
import RouteLayout from "./app/dashboard/Components/Layout/RouteLayout";
import EditExitRequisition from "./app/dashboard/Pages/Employee/ExitRequisition/EditExitRequisition";
import MedicalRequisition from "./app/dashboard/Pages/HR/EmployeeManagement/MedicalUpdate/MedicalRequisition";

const Showcase = lazy(() => import("./app/showcase"));
const Home = lazy(() => import("./app/auth"));
const Login = lazy(() => import("./app/auth/Login"));
const ForgotPassword = lazy(() => import("./app/auth/ForgotPasswordPro"));
const ResetPassword = lazy(() => import("./app/auth/ResetPasswordPro"));
const SignUp = lazy(() => import("./app/auth/SignUp"));
const EmailConfirm = lazy(() => import("./app/auth/EmailConfirmation"));
const Dashboard = lazy(() => import("./app/dashboard"));
const DashboardHome = lazy(() => import("./app/dashboard/Pages/DashboardHome"));
const Onboarding = lazy(() => import("./app/dashboard/Onboarding.js"));
const Assets = lazy(() => import("./app/dashboard/Pages/Assets"));

const VehicleMaintenance = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/AllMaintenanceRequisitions")
);
const VehicleMaintenanceRequsition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/AddRequisition")
);
const EditVehicleMaintenanceRequsition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/EditMaintenanceRequisition")
);
const AccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/AllAccidentReport")
);
const AddAccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/AddAccidentReport")
);
const EditAccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/EditAccidentReport")
);
// const Vendors = lazy(() => import("./app/dashboard/Pages/Vendors"));
const VendorsMgt = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management")
);
const VendorsHome = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/Vendor")
);
const AddVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/AddVendor")
);

const CreateVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/CreateVendor")
);

const EditVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/EditVendor")
);

const AppraiseVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/AppraiseVendor")
);
const ViewVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/ViewVendors")
);

const Procurement = lazy(() => import("./app/dashboard/Pages/Procurement"));
const ProcDeliveryHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Delivery")
);
const ProcQuotationHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation")
);
const ProcQuotationAdd = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation/AddQuotation")
);
const ProcQuotationView = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation/ViewQuotation")
);

const ProcRequisitionHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition")
);
const ProcRequisitionAdd = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition/AddRequisition")
);
const ProcRequisitionView = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition/ViewRequisition")
);
const Acquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/Acquisition")
);
const AddAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/AddNewAcquisition")
);
const ViewAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/ViewAcquisition")
);

const Allocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/Allocation")
);
const AddAllocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/AddNewAllocation")
);
const ViewAllocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/ViewAllocation")
);

const Monitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/Monitoring")
);
const AddMonitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/AddNewMonitoring")
);
const ViewMonitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/ViewMonitoring")
);

const AuctioningBidding = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning (Bidding)/AuctioningBidding")
);

// const AddAuctioningBidding = lazy(() =>
//   import("./app/dashboard/Pages/Assets/Auctioning (Bidding)/AddNewAuctioning")
// );
const ViewAuctioningBidding = lazy(() =>
  import(
    "./app/dashboard/Pages/Assets/Auctioning (Bidding)/ViewAuctioningBidding"
  )
);

const Auctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/Auctioning")
);
const AddAuctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/AddNewAuctioning")
);
const ViewAuctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/ViewAuctioning")
);

const AssetRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/Requisition")
);
const AddRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/AddNewRequisition")
);
const ViewAssetRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/ViewRequisition")
);

const AssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/AssetRegister")
);
const AddAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/AddAssetRegister")
);
const ViewAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/ViewAssetRegister")
);
const EditAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/EditAssetRegister")
);
const Categories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/Categories")
);
const AddCategories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/AddNewCategories")
);
const ViewCategories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/ViewCategories")
);

const ConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/ConsummableRegister"
  )
);
const AddConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/AddConsummableRegister"
  )
);
const ViewConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/ViewConsummableRegister"
  )
);
const EditConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/EditConsummableRegister"
  )
);
const ConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/ConsummableCategories"
  )
);
const AddConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/AddNewConsummableCategories"
  )
);
const ViewConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/ViewConsummableCategories"
  )
);

const Budget = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Budget/Budget")
);

const ConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/Acquisition")
);
const AddConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/AddNewAcquisition")
);
const ViewConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/ViewAcquisition")
);

const ConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/Allocation")
);
const AddConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/AddNewAllocation")
);
const ViewConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/AddNewAllocation")
);

const ConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/Requisition")
);
const AddConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/AddNewRequisition")
);
const ViewConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/ViewRequisition")
);
//hr
const HR = lazy(() => import("./app/dashboard/Pages/HR"));
const TrainingSetup = lazy(() =>
  import("./app/dashboard/Pages/HR/TrainingSetUp")
);
const TrainingRequisitions = lazy(() =>
  import("./app/dashboard/Pages/HR/Training")
);
// const AddTrainingRequisition = lazy(() => import("./app/dashboard/Pages/HR/Training/AddTrainingRequisition"))
//fleet
const Fleet = lazy(() => import("./app/dashboard/Pages/Fleets"));
const Fleets = lazy(() => import("./app/dashboard/Pages/Fleets/AllFleets"));
const DocumentSetup = lazy(() =>
  import("./app/dashboard/Pages/Fleets/VehicleDocument/SetUp")
);
const ViewFleet = lazy(() =>
  import("./app/dashboard/Pages/Fleets/AllFleets/ViewFleet")
);
const Requisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/Requisition")
);

//employee
const Employee = lazy(() => import("./app/dashboard/Pages/Employee"));
const EmployeeTrainingRequisitions = lazy(() =>
  import("./app/dashboard/Pages/Employee/Training")
);
const EditTrainingRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/Training/EditTrainingRequsition")
);
const AddTrainingRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/Training/AddTrainingRequisition")
);

const MyRequisitions = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/MyRequisitions")
);
const AddFuelRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/AddNewFuelRequisition")
);
const ViewRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/ViewFuelRequisition")
);
const EditRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/EditRequisition")
);
const FuelPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/FuelPayment")
);
const AddFuelPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/AddNewFuelPayment")
);
const ViewPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/ViewPayment")
);
const EditPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/EditPayment")
);
const MyPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/MyPayment")
);
const DriverActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/DriverActivity")
);
const AddActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/AddActivity")
);
const EditActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/EditActivity")
);
const ViewDriverActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/ViewDriverActivity")
);
const AllDriverActivities = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/AllDriverActivities")
);
const Scheduler = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/Scheduler")
);

const Permissions = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions")
);

const GroupPermissions = lazy(() =>
  import("./app/dashboard/Pages/Settings/GroupPermissions")
);

const ViewGroupPermissions = lazy(() =>
  import("./app/dashboard/Pages/Settings/GroupPermissions/ViewPermissionGroup")
);

const AddGroupPermissions = lazy(() =>
  import("./app/dashboard/Pages/Settings/GroupPermissions/AddPermissionGroup")
);

const CreateStaff = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions/CreateStaff")
);

const EditStaffPermission = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions/EditStaffPermissions")
);

const ReportIndex = lazy(() => import("./app/dashboard/Pages/Reports/index"));
const ReportsAdd = lazy(() => import("./app/dashboard/Pages/Reports/add"));
const ReportTriggerHistory = lazy(() =>
  import("./app/dashboard/Pages/Reports/TriggerHistory")
);
/*
const GenerateReports = lazy(() =>
  import("./app/dashboard/Pages/Reports/GenerateReports")
);

const ReportConfiguration = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration")
);

const ReportConfigurationDetails = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration/details")
);

const ReportConfigurationAdd = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration/add")
);

const ReportScheduler = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportScheduler")
);

const AddReportScheduler = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportScheduler/addSchedule")
);
*/

const LeaveRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/Leave/LeaveRequistion")
);
const AddLeave = lazy(() => import("./app/dashboard/Pages/Employee/Leave/AddLeave"));

const ViewLeave = lazy(() =>
  import("./app/dashboard/Pages/Employee/Leave/ViewLeave")
);

const EditLeave = lazy(() =>
  import("./app/dashboard/Pages/Employee/Leave/EditLeave")
);
// const AddSetUp = lazy(() =>
//   import("./app/dashboard/Pages/HR/LeaveSetUp/AddSetUp")
// );
const  LeaveApprovalHOD = lazy(()=> import ("./app/dashboard/Pages/Employee/Leave/LeaveApprovalHOD/LeaveApprovalHOD"))

const LeaveApproval = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveApproval/LeaveApproval")
);
const LeaveRecall = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveRecall/LeaveRecall")
);

const ViewRecall = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveRecall/LeaveRecall")
);
const LeaveSetUp = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveSetUp/index")
);

const ExitRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/ExitRequisition/ExitRequisition")
);

const ExitRequisitionHOD = lazy(() =>
  import("./app/dashboard/Pages/Employee/ExitRequisition/ExitRequisitionHOD")
);
const ViewExitRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/ExitRequisition/ViewExitRequisition")
);
const AddExitRequisition = lazy(() =>
  import("./app/dashboard/Pages/Employee/ExitRequisition/AddExitRequisition")
);

const AllExitRequisition = lazy(() =>
  import(
    "./app/dashboard/Pages/HR/ExitManagement/ExitRequisition/AllExitRequisition"
  )
);

const ViewExitRequisitions = lazy(() =>
  import(
    "./app/dashboard/Pages/HR/ExitManagement/ExitRequisition/ViewExitRequisition"
  )
);

const ExitDiscussionSetUp = lazy(() =>
  import(
    "./app/dashboard/Pages/HR/ExitManagement/ExitDiscussion/ExitDiscussionSetUp"
  )
);
const AddExitDiscussion = lazy(() =>
  import(
    `./app/dashboard/Pages/HR/ExitManagement/ExitDiscussion/AddExitDiscussion`
  )
);
const ExitDiscussion = lazy(() =>
  import(`./app/dashboard/Pages/Employee/ExitDiscussion/ExitDiscussion`)
);
const AddExitDisscussion = lazy(() =>
  import(`./app/dashboard/Pages/Employee/ExitDiscussion/AddDiscussion`)
);

const ViewExitDiscussion = lazy(() =>
  import(
    "./app/dashboard/Pages/HR/ExitManagement/ExitDiscussion/ViewExitDiscussion"
  )
);

const QuerySetup = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagementSetup/QuerySetup`)
);
const AddQuerySetup = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagementSetup/AddQuerySetup`)
);
const EditQuerySetup = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagementSetup/EditQuerySetup`)
);

const Query = lazy(() => import(`./app/dashboard/Pages/Employee/Query/Query`));
const QueryByHOD = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/QueryByHOD`)
);
const QueryByHOC = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/QueryByHOC`)
);
const MyQuery = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/MyQuery`)
);
const AddQuery = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/AddQuery`)
);
const EditQuery = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/EditQuery`)
);
const ViewQuery = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Query/ViewQuery`)
);

const AddQueryResponse = lazy(() =>
  import(`./app/dashboard/Pages/Employee/QueryResponse/AddQueryResponse`)
);

const QueryResponse = lazy(() =>
  import(`./app/dashboard/Pages/Employee/QueryResponse/QueryResponse`)
);

const ViewQueryResponse = lazy(() => import(`./app/dashboard/Pages/Employee/QueryResponse/ViewQueryResponse`)
);
const MyQueryResponse = lazy(() => import(`./app/dashboard/Pages/Employee/QueryResponse/MyQueryResponse`)
);
const QueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/QueryManagement`)
);
const AddQueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/AddQueryManagement`)
);
const EditQueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/EditQueryManagement`)
);
const ViewQueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/ViewQueryManagement`)
);

const AddQueryComments =lazy(()=> import (`./app/dashboard/Pages/HR/QueryManagement/AddQueryComments`))

const AddQueryPanel = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/AddQueryPanel`)
);

const OvertimeSetup = lazy(()=> import (`./app/dashboard/Pages/HR/OverTimeManagementSetup/OvertimeSetup`))
const OvertimeManagement = lazy(()=> import (`./app/dashboard/Pages/HR/OvertimeManagement/OvertimeManagement`))

const ViewOvertimeManagement = lazy(()=> import(`./app/dashboard/Pages/HR/OvertimeManagement/ViewOvertimeManagement`))

const OvertimeRequisition = lazy(()=> import(`./app/dashboard/Pages/Employee/OvertimeRequisition/OvertimeRequisition`))
const ViewOvertimeRequisition = lazy(()=> import(`./app/dashboard/Pages/Employee/OvertimeRequisition/ViewOvertimeRequisition`))

const AllQueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/AllQueryManagement`)
);

const ViewAllQueryManagement = lazy(() =>
  import(`./app/dashboard/Pages/HR/QueryManagement/ViewAllQueryManagement`)
);
const EditQueryPanel = lazy(() => import (`./app/dashboard/Pages/HR/QueryManagement/EditQueryPanel`))


const AllEmployees = lazy(() =>
  import(
    `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeInformation/AllEmployees`
  )
);

// const AddEmployeeInformation = lazy(()=> import (  `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeInformation/CreateEmployeeInformation`))

const EditEmployeeInformation = lazy(() =>
  import(
    `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeInformation/EditEmployeeInformation`
  )
);

const NOKInformation = lazy(() =>
  import(`./app/dashboard/Pages/HR/EmployeeManagement/NOKUpdate/NOKInformation`)
);

// const AddNOK = lazy(() =>
//   import(`./app/dashboard/Pages/HR/EmployeeManagement/NOKUpdate/AddNOK`)
// );

const ViewNOKInformation = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Employee/NOKUpdate/ViewNOKInformation`)
);

const MyEmployeeInfo = lazy(() =>
  import(`./app/dashboard/Pages/Employee/EmployeeInfo/MyEmployeeInfo`)
);

const EditMyEmployeeInfo = lazy(() =>
  import(`./app/dashboard/Pages/Employee/EmployeeInfo/EditMyEmployeeInfo`)
);

const ViewEmployeeInformation = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeInfo/ViewEmployeeInformation`
  )
);
const AddMyNOK = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Employee/NOKUpdate/AddMyNOK`)
);

const MyNOKInformation = lazy(() =>
  import(`./app/dashboard/Pages/Employee/Employee/NOKUpdate/MyNOKInformation`)
);

const EditMyNOKInformation = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/Employee/NOKUpdate/EditMyNOKInformation`
  )
);
const MyMedicalRequisition = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeMedicalRequisition/MyMedicallRequisition`
  )
);

const AddMyMedicalRequisition = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeMedicalRequisition/AddMyMedicalRequisition`
  )
);

const EditMyMedicalRequisition = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeMedicalRequisition/EditMyMedicalRequisition`
  )
);

const ViewMyMedicalRequisition = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeMedicalRequisition/ViewMyMedicalRequisition`
  )
);

const EmployeeQualification = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeQualification/EmployeeQualification`
  )
);

const EmployeeQualifications = lazy(() =>
  import(
    `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeQualification/EmployeeQualifications`
  )
);

const AddEmployeeQualification = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeQualification/AddEmployeeQualification`
  )
);
const EditEmployeeQualification = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeQualification/EditEmployeeQualification`
  )
);
const ViewEmployeeQualification = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeQualification/ViewEmployeeQualification`
  )
);
const EmployeeReferee = lazy(() =>
import( `./app/dashboard/Pages/Employee/EmployeeReferee/EmployeeReferee`)
);
const EmployeeReferees = lazy(() =>
import( `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeReferees/EmployeeReferees`)
);


const AddEmployeeReferee = lazy(() =>
import( `./app/dashboard/Pages/Employee/EmployeeReferee/AddEmployeeReferee`)
);

const EditEmployeeReferee = lazy(() =>
import( `./app/dashboard/Pages/Employee/EmployeeReferee/EditEmployeeReferee`)
);

const ViewEmployeeReferee = lazy(() =>import(
  `./app/dashboard/Pages/Employee/EmployeeReferee/ViewEmployeeReferee`
)
);


const EditEmployeeExtendedClaim = lazy(() =>
  import(
    `./app/dashboard/Pages/Employee/EmployeeExtendedClaim/EditEmployeeExtendedClaim`
  )
);

const AddEmployeeExtendedClaim = lazy(() =>
import( `./app/dashboard/Pages/Employee/EmployeeExtendedClaim/AddEmployeeExtendedClaim`)
);

const EmployeeExtendedClaim = lazy(() =>
import( `./app/dashboard/Pages/Employee/EmployeeExtendedClaim/EmployeeExtendedClaim`)
);

const ViewEmployeeExtendedClaim = lazy(() =>import(
  `./app/dashboard/Pages/Employee/EmployeeExtendedClaim/ViewEmployeeExtendedClaim`
)
);

const EmployeeExtendedClaims= lazy(() =>
import( `./app/dashboard/Pages/HR/EmployeeManagement/EmployeeExtendedClaims/EmployeeExtendedClaims`)
);
function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const userPermissions = getMyPermissions();
  const data = GetLocalStorage?.();
  return (
    <>
      <Suspense>
        <Routes location={background || location}>
          <Route path={URL.Home} element={<Home />} />
          <Route path={URL.ResetPassword} element={<ResetPassword />} />
          <Route element={<LoggedInRoute />}>
            <Route path={URL.Login} element={<Login />} />
            <Route path={URL.ForgotPassword} element={<ForgotPassword />} />
            <Route path={URL.SignUp} element={<SignUp />} />
            <Route path={URL.Email_Verified} element={<EmailConfirm />} />
          </Route>
          <Route path={"/showcase"} element={<Showcase />} />
          {/* <Route path={URL.Onboarding} element={<Onboarding />} /> */}
          {/* {userPermissions.includes(DEFINED_PERMISSIONS.Vendor) && (
            <>
              <Route path={URL.Vendors} element={<p>Vendors</p>} />
              {userPermissions.includes(DEFINED_PERMISSIONS.VendorCreate) && (
                <Route element={<ProtectedRoutes />}>
                  <Route path={URL.Onboarding} element={<Onboarding />} />
                </Route>
              )}
            </>
          )} */}
          <Route path={URL.Procurement} element={<p>Procurement</p>} />
          {userPermissions.includes(DEFINED_PERMISSIONS.AssetView) && (
            <Route path={URL.Assets} element={<Assets />}>
              <Route path={URL.Acquisition} element={<Acquisition />} />
              <Route path={URL.Add_Acquitions} element={<AddAcquisition />} />
              <Route
                path={URL.View_Acquisition}
                element={<ViewAcquisition />}
              />
            </Route>
          )}
          {/*<Route path={URL.Reports} element={<p>Reports</p>} />*/}
          <Route path={URL.Inventory} element={<p>Inventory</p>} />
          <Route path={URL.HR} element={<p>HR</p>} />
          <Route path={URL.Relationship} element={<p>Relationship</p>} />

          {/* <Route element={<ProtectedRoutes />}>
            <Route path={URL.Dashboard} element={<Dashboard />}>
            <Route index element={<DashboardHome />} /> */}

          <Route element={<ProtectedRoutes />}>
            <Route path={URL.Onboarding} element={<Onboarding />} />
            <Route path={URL.Dashboard} element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              {/* {userPermissions.includes(DEFINED_PERMISSIONS.Vendor) && ( */}
              <Route path={URL.Vendors} element={<VendorsMgt />}>
                <Route
                  index
                  element={
                    USER_CATEGORY.VENDOR === data?.category ? (
                      <ViewVendor />
                    ) : (
                      <VendorsHome />
                    )
                  }
                />
                <Route
                  path={`:id/${URL.View_Vendor}`}
                  element={<ViewVendor />}
                />
                {userPermissions.includes(DEFINED_PERMISSIONS.VendorCreate) && (
                  <>
                    <Route path={URL.Add_Vendor} element={<AddVendor />} />
                    <Route
                      path={URL.Create_Vendor}
                      element={<CreateVendor />}
                    />
                  </>
                )}

                {userPermissions.includes(
                  DEFINED_PERMISSIONS.VendorManager
                ) && (
                  <>
                    <Route path={`:id/edit`} element={<EditVendor />} />

                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.VendorManager
                    ) && (
                      <Route
                        path={`:id/:report/appraise/:type/:reporter/:reporter_department/:report_date`}
                        element={<AppraiseVendor />}
                      />
                    )}
                  </>
                )}
              </Route>

              <Route path={URL.Procurement} element={<Procurement />}>
                <Route index element={<Outlet />} />
                {userPermissions.includes(
                  DEFINED_PERMISSIONS.QuotationView
                ) && (
                  <Route
                    path={URL.Quotation_Management}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<ProcQuotationHome />} />
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.QuotationAdd
                    ) && (
                      <>
                        <Route
                          path={":id/:kind/add"}
                          element={<ProcQuotationAdd />}
                        />
                        <Route
                          path={":id/edit"}
                          element={<ProcQuotationAdd />}
                        />
                      </>
                    )}
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.QuotationView
                    ) && (
                      <>
                        <Route
                          path={`:id/view`}
                          element={<ProcQuotationView />}
                        />
                      </>
                    )}
                  </Route>
                )}

                <Route path={URL.Requisition_Management} element={<Outlet />}>
                  <Route index element={<ProcRequisitionHome />} />
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ProcurementRequisitionDashboard
                  ) && (
                    <>
                      <Route path={"add"} element={<ProcRequisitionAdd />} />
                      <Route
                        path={":id/edit"}
                        element={<ProcRequisitionAdd />}
                      />
                    </>
                  )}
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ProcurementRequisitionView
                  ) && (
                    <Route
                      path={`:id/view`}
                      element={<ProcRequisitionView />}
                    />
                  )}
                </Route>
                {userPermissions.includes(DEFINED_PERMISSIONS.DeliveryView) && (
                  <>
                    <Route path={URL.Delivery} element={<Outlet />}>
                      <Route index element={<ProcDeliveryHome />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.DeliveryView
                      ) && (
                        <>
                          <Route
                            path={"add"}
                            element={<ProcRequisitionAdd />}
                          />
                          <Route
                            path={":id/edit"}
                            element={<ProcRequisitionAdd />}
                          />
                        </>
                      )}

                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.DeliveryView
                      ) && (
                        <Route
                          path={`:id/view`}
                          element={<ProcRequisitionView />}
                        />
                      )}
                    </Route>
                    <>
                      <Route path={`:id/edit`} element={<EditVendor />} />
                      <Route
                        path={`:id/appraise/:type`}
                        element={<AppraiseVendor />}
                      />
                    </>
                  </>
                )}
              </Route>

              {userPermissions.includes(DEFINED_PERMISSIONS.ConsumableView) && (
                <Route path={URL.Consumables} element={<Procurement />}>
                  <Route index element={<Outlet />} />
                  <Route
                    path={URL.Consumable_Acqusition}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<ConsumableAcquisition />} />
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.ConsumableAdd
                    ) && (
                      <Route
                        path={"add"}
                        element={<AddConsumableAcquisition />}
                      />
                    )}
                    <Route
                      path={`:id/view`}
                      element={<ViewConsumableAcquisition />}
                    />
                  </Route>

                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ConsumableAllocationView
                  ) && (
                    <Route
                      path={URL.Consumable_Allocation}
                      element={<Outlet />}
                    >
                      <Route index element={<ConsumableAllocation />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableAllocationAdd
                      ) && (
                        <Route
                          path={"add"}
                          element={<AddConsumableAllocation />}
                        />
                      )}
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableAllocationView
                      ) && (
                        <Route
                          path={`:id/view`}
                          element={<ViewConsumableAllocation />}
                        />
                      )}
                    </Route>
                  )}
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ConsumableRequisitionView
                  ) && (
                    <Route
                      path={URL.Consumable_Requsition}
                      element={<Outlet />}
                    >
                      <Route index element={<ConsumableRequisition />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableRequisitionAdd
                      ) && (
                        <Route
                          path={"add"}
                          element={<AddConsumableRequisition />}
                        />
                      )}
                      <Route
                        path={`:id/view`}
                        element={<ViewConsumableRequisition />}
                      />
                    </Route>
                  )}
                </Route>
              )}
              {userPermissions.includes(DEFINED_PERMISSIONS.AssetView) && (
                <Route path={URL.AssetSetUp} element={<Procurement />}>
                  <Route index element={<Outlet />} />
                  <Route
                    path={URL.AssetRegister}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<AssetRegister />} />
                    <Route path={"add"} element={<AddAssetRegister />} />
                    <Route path={`:id/view`} element={<ViewAssetRegister />} />
                    <Route path={`:id/edit`} element={<EditAssetRegister />} />
                  </Route>
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.AssetCategoryView
                  ) && (
                    <Route path={URL.Categories} element={<Outlet />}>
                      <Route index element={<Categories />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.AssetCategoryAdd
                      ) && <Route path={"add"} element={<AddCategories />} />}
                      <Route path={`:id/view`} element={<ViewCategories />} />
                    </Route>
                  )}

                  <Route path={URL.Budget} element={<Budget />} />
                </Route>
              )}
              <Route path={URL.ConsummableSetUp} element={<Procurement />}>
                <Route index element={<Outlet />} />
                <Route
                  path={URL.ConsummbaleRegister}
                  element={<Outlet action={() => console.log("lll")} />}
                >
                  <Route index element={<ConsummablesRegister />} />
                  <Route path={"add"} element={<AddConsummablesRegister />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewConsummablesRegister />}
                  />
                  <Route
                    path={`:id/edit`}
                    element={<EditConsummablesRegister />}
                  />
                </Route>
                <Route path={URL.ConsummableCategories} element={<Outlet />}>
                  <Route index element={<ConsummablesCategories />} />
                  <Route path={"add"} element={<AddConsummablesCategories />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewConsummablesCategories />}
                  />
                </Route>
                <Route path={URL.Budget} element={<Budget />} />
              </Route>

              {/* <Route path={URL.Procurement} element={<p>Procurement</p>} /> */}
              {/* {userPermissions.includes(DEFINED_PERMISSIONS.AssetManager) && ( */}
              <Route path={URL.Assets} element={<Assets />}>
                <Route index element={<Acquisition />} />
                <Route path={URL.Acquisition} element={<Outlet />}>
                  <Route index element={<Acquisition />} />
                  <Route
                    path={URL.Add_Acquitions}
                    element={<AddAcquisition />}
                  />
                  <Route
                    path={`:id/${URL.View_Acquisition}`}
                    element={<ViewAcquisition />}
                  />
                </Route>
                <Route path={URL.Allocation} element={<Outlet />}>
                  <Route index element={<Allocation />} />
                  <Route path={"add"} element={<AddAllocation />} />
                  <Route path={`:id/view`} element={<ViewAllocation />} />
                </Route>
                <Route path={URL.Requisition} element={<Outlet />}>
                  <Route index element={<AssetRequisition />} />
                  <Route path={"add"} element={<AddRequisition />} />
                  <Route path={`:id/view`} element={<ViewAssetRequisition />} />
                </Route>
                <Route path={URL.Monitoring} element={<Outlet />}>
                  <Route index element={<Monitoring />} />
                  <Route path={"add"} element={<AddMonitoring />} />
                  <Route path={`:id/view`} element={<ViewMonitoring />} />
                </Route>
                <Route path={URL.Auctioning} element={<Outlet />}>
                  <Route index element={<Auctioning />} />
                  <Route path={"add"} element={<AddAuctioning />} />
                  <Route path={`:id/view`} element={<ViewAuctioning />} />
                </Route>
                <Route path={URL.AuctionBidding} element={<Outlet />}>
                  <Route index element={<AuctioningBidding />} />
                  <Route path={"add"} element={<AddAuctioning />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewAuctioningBidding />}
                  />
                </Route>
              </Route>
              {/* )} */}
              <Route path={URL.Fleets} element={<Fleet />}>
                <Route index element={<Outlet />} />
                <Route path={URL.Fleet_Management} element={<Outlet />}>
                  <Route index element={<Fleets />} />
                  <Route path={`:id/view`} element={<ViewFleet />} />
                </Route>
                <Route path={URL.Requisition} element={<Outlet />}>
                  <Route index element={<Requisition />} />
                  <Route
                    path={URL.Add_Requisitions}
                    element={<AddFuelRequisition />}
                  />
                  <Route path={`:id/edit`} element={<EditRequisition />} />
                  <Route path={`:id/view`} element={<ViewRequisition />} />
                  <Route
                    path={URL.My_Requisitions}
                    element={<MyRequisitions />}
                  />
                </Route>
                <Route path={URL.Fuel_Payment} element={<Outlet />}>
                  <Route index element={<FuelPayment />} />
                  <Route path={"add"} element={<AddFuelPayment />} />
                  <Route path={`:id/edit`} element={<EditPayment />} />
                  <Route path={`:id/view`} element={<ViewPayment />} />
                  <Route path={URL.My_Payment} element={<MyPayment />} />
                </Route>
                <Route path={URL.Driver_Activity} element={<Outlet />}>
                  <Route index element={<DriverActivity />} />
                  <Route path={"add"} element={<AddActivity />} />
                  <Route path={`:id/edit`} element={<EditActivity />} />
                  <Route path={`:id/view`} element={<ViewDriverActivity />} />
                  <Route
                    path={URL.All_DriverActivity}
                    element={<AllDriverActivities />}
                  />
                  <Route path={URL.Scheduler} element={<Scheduler />} />
                </Route>
                <Route path={URL.Vehicle_Maintenance} element={<Outlet />}>
                  <Route index element={<VehicleMaintenance />} />
                  <Route
                    path={"add"}
                    element={<VehicleMaintenanceRequsition />}
                  />
                  <Route
                    path={":id/edit"}
                    element={<EditVehicleMaintenanceRequsition />}
                  />
                  <Route
                    path={`:id/view`}
                    element={<ViewMaintenanceRequisition />}
                  />
                </Route>
                <Route path={URL.Accident_Report} element={<Outlet />}>
                  <Route index element={<AccidentReport />} />
                  <Route path={"add"} element={<AddAccidentReport />} />
                  <Route path={":id/edit"} element={<EditAccidentReport />} />
                  <Route path={`:id/view`} element={<ViewAccidentReport />} />
                </Route>

                <Route path={URL.Vehicle_Document_SetUp} element={<Outlet />}>
                  <Route index element={<DocumentSetup />} />
                </Route>
              </Route>

              <Route path={URL.Reports} element={<Outlet />}>
                <Route path={URL.Report_configuration} element={<Outlet />}>
                  <Route index element={<ReportIndex />} />
                  <Route path={"add"} element={<ReportsAdd />} />
                  <Route
                    path={"edit/:id"}
                    element={<ReportsAdd isEdit={true} />}
                  />
                </Route>
                <Route
                  path={URL.Trigger_History}
                  element={<ReportTriggerHistory />}
                />

                {/*
                <Route path={URL.Report_scheduler} element={<Outlet/>}>
                  <Route index element={<ReportScheduler/>}/>
                  <Route path={"add"} element={<AddReportScheduler/>}/>
                </Route>
                  <Route
                      path={URL.Generate_Report}
                      element={<GenerateReports/>}
                  />

                  <Route path={URL.Report_configuration} element={<Outlet/>}>
                    <Route index element={<ReportConfiguration/>}/>
                    <Route path={"add"} element={<ReportConfigurationAdd/>}/>
                    <Route
                        path={":id"}
                        element={<ReportConfigurationDetails/>}
                    />
                  </Route>
                  */}
              </Route>
              <Route path={URL.Inventory} element={<p>Inventory</p>} />

              <Route path={URL.HR} element={<HR />}>
                <Route index element={<Outlet />} />
                <Route path={URL.Training_Request} element={<Outlet />}>
                  <Route index element={<TrainingRequisitions />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewTrainingRequisition />}
                  />
                </Route>
                <Route path={URL.Training_SetUp} element={<Outlet />}>
                  <Route index element={<TrainingSetup />} />
                </Route>

                <Route index element={<LeaveRequisition />} />

                <Route path={URL.Leave_Approval} element={<Outlet />}>
                  <Route index element={<LeaveApproval />} />
                </Route>
                <Route path={URL.Leave_HOD} element={<Outlet />}>
                  <Route index element={<LeaveApprovalHOD />} />
                </Route>
                <Route path={URL.Leave_SetUp} element={<Outlet />}>
                  <Route index element={<LeaveSetUp />} />
                  {/* <Route path={"add"} element={<AddSetUp />} /> */}
                </Route>
                <Route path={URL.Exit_Management} element={<Outlet />}>
                  <Route index element={<AllExitRequisition />} />
                  <Route path={`:id/view`} element={<ViewExitRequisitions />} />
                </Route>

                <Route path={URL.Exit_Discussion_SetUp} element={<Outlet />}>
                  <Route index element={<ExitDiscussionSetUp />} />
                  <Route path={"add"} element={<AddExitDiscussion />} />

                </Route>
                <Route path={URL.Query_SetUp} element={<Outlet />}>
                  <Route index element={<QuerySetup />} />
                  <Route path={"add"} element={<AddQuerySetup />} />
                  <Route path={":id/edit"} element={<EditQuerySetup />} />
                </Route>
                <Route path={URL.Query_Management} element={<Outlet />}>
                  <Route index element={<QueryManagement />} />
                  <Route path={"add"} element={<AddQueryManagement />} />
                  <Route path={":id/edit"} element={<EditQueryManagement />} />
                  <Route path={`:id/view`} element={<ViewQueryManagement />} />
                  <Route path={`:id/add-panel`} element={<AddQueryPanel />} />
                  <Route
                    path={`:id/add-comment`}
                    element={<AddQueryComments />}
                  />
                  <Route path={":id/editPanel"} element={<EditQueryPanel />} />
                  <Route
                    path={":id/viewpanel"}
                    element={<ViewAllQueryManagement />}
                  />

                  <Route
                    path={URL.All_Query_Management}
                    element={<AllQueryManagement />}
                  />
                </Route>
                <Route path={URL.Overtime_Setup} element={<Outlet />}>
                  <Route index element={<OvertimeSetup />} />
                </Route>

                <Route path={URL.Overtime_Management} element={<Outlet />}>
                  <Route index element={<OvertimeManagement />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewOvertimeManagement />}
                  />
                </Route>
                <Route path={URL.Employee_Management} element={<Outlet />}>
                  <Route index element={<AllEmployees />} />
                  <Route
                    path={`:id/edit`}
                    element={<EditEmployeeInformation />}
                  />
                  <Route
                    path={URL.NOK_Information}
                    element={<NOKInformation />}
                  >
                </Route>
                  <Route
                    path={URL.Medical_Requisition}
                    element={<MedicalRequisition />}
                  >
                  </Route>

                  <Route
                    path={URL.Employee_Qualifications}
                    element={<EmployeeQualifications />}
                  >
                  </Route>

                  <Route
                    path={URL.Employee_Claims}
                    element={<EmployeeExtendedClaims />}
                  >
                  </Route>
                  <Route
                    path={URL.Employee_Refs}
                    element={<EmployeeReferees />}
                  >
                  </Route>
                </Route>
              </Route>

              <Route path={URL.Employee} element={<Employee />}>
                <Route path={URL.Training} element={<Outlet />}>
                  <Route index element={<EmployeeTrainingRequisitions />} />
                  <Route path={"add"} element={<AddTrainingRequisition />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewEmployeeTrainingRequisition />}
                  />
                  <Route
                    path={":id/edit"}
                    element={<EditTrainingRequisition />}
                  />
                </Route>
                <Route path={URL.Leave_Requisition} element={<Outlet />}>
                  <Route index element={<LeaveRequisition />} />

                  <Route path={URL.Add_Leave} element={<AddLeave />} />
                  <Route path={":id/edit"} element={<EditLeave />} />
                  <Route path={`:id/view`} element={<ViewLeave />} />
                  <Route path={`:id/recall`} element={<LeaveRecall />} />
                  <Route path={`:id/view`} element={<ViewRecall />} />
                </Route>
                <Route path={URL.Exit_Requisition} element={<Outlet />}>
                  <Route index element={<ExitRequisition />} />
                  <Route path={`:id/edit`} element={<EditExitRequisition />} />
                  <Route path={"add"} element={<AddExitRequisition />} />
                  <Route path={`:id/view`} element={<ViewExitRequisition />} />

                </Route>
                <Route path={URL.Exit_HOD} element={<Outlet />}>
                  <Route index element={<ExitRequisitionHOD />} />
</Route>
                <Route path={URL.Exit_Discussion} element={<Outlet />}>
                  <Route index element={<ExitDiscussion />} />
                  <Route path={"add"} element={<AddExitDisscussion />} />
                  <Route path={`:id/view`} element={<ViewExitDiscussion />} />

                  {/* <Route path={`:id/edit`} element={<EditRequisition />} /> */}
                </Route>

                <Route path={URL.Overtime_Requisition} element={<Outlet />}>
                  <Route index element={<OvertimeRequisition />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewOvertimeRequisition />}
                  />
                </Route>

                <Route path={URL.Query} element={<Outlet />}>
                  <Route index element={<Query />} />

                  <Route path={"add"} element={<AddQuery />} />
                  <Route path={":id/view"} element={<ViewQuery />} />
                  <Route path={":id/edit"} element={<EditQuery />} />
                  <Route path={`:id/reply`} element={<AddQueryResponse />} />

                  <Route path={URL.Query_Response} element={<Outlet />}>
                    <Route index element={<QueryResponse />} />
                    <Route
                      path={":id/viewreply"}
                      element={<ViewQueryResponse />}
                    />
                  </Route>
                  <Route
                    path={URL.My_Query_Response}
                    element={<MyQueryResponse />}
                  />
                </Route>

                <Route path={URL.Query_By_HOD} element={<QueryByHOD />} />
                <Route path={URL.Query_By_HOC} element={<QueryByHOC />} />
                <Route path={URL.My_Query} element={<MyQuery />} />

                  
                <Route path={URL.My_Employee_Info} element={<Outlet />}>
                  <Route index element={<MyEmployeeInfo />} />
                  <Route path={`:id/edit`} element={<EditMyEmployeeInfo />} />
                  <Route
                      path={`:id/view`}
                      element={<ViewEmployeeInformation />}
                    />

                  <Route path={URL.My_NOK_Information} element={<Outlet />}>
                    <Route index element={<MyNOKInformation />} />
                    <Route path={URL.Add_My_NOK} element={<AddMyNOK />} />
                    <Route
                      path={":id/edit"}
                      element={<EditMyNOKInformation />}
                    />
                      <Route
                      path={`:id/view`}
                      element={<ViewNOKInformation />}
                    />
                  </Route>

                  <Route path={URL.My_Medical_Requisition} element={<Outlet />}>
                    <Route index element={<MyMedicalRequisition />} />
                    <Route
                      path={URL.Add_My_Medical}
                      element={<AddMyMedicalRequisition />}
                    />
                    <Route
                      path={`:id/edit`}
                      element={<EditMyMedicalRequisition />}
                    />
                    <Route
                      path={`:id/view`}
                      element={<ViewMyMedicalRequisition />}
                    />
                  </Route>

                  <Route path={URL.Employee_Qualification} element={<Outlet />}>
                    <Route index element={<EmployeeQualification />} />
                    <Route path={URL.Add_Employee_Qualification} element={<AddEmployeeQualification />} />
                    <Route
                      path={`:id/edit`}
                      element={<EditEmployeeQualification />}
                    />
                   
                   <Route
                      path={`:id/view`}
                      element={<ViewEmployeeQualification />}
                    />
                  </Route>
                  <Route path={URL.Employee_Referees} element={<Outlet />}>
                    <Route index element={<EmployeeReferee />} />
                    <Route
                      path={URL.Add_Employee_Referee}
                      element={<AddEmployeeReferee />}
                    />

                    <Route
                      path={`:id/edit`}
                      element={<EditEmployeeReferee />}
                    />
                    <Route
                      path={`:id/view`}
                      element={<ViewEmployeeReferee />}
                    />
                  </Route>

                  <Route path={URL.Employee_Extended_Claim} element={<Outlet />}>
                    <Route index element={<EmployeeExtendedClaim />} />

                    <Route
                      path={URL.Add_Employee_Claim}
                      element={<AddEmployeeExtendedClaim />}
                    />
                    <Route
                      path={`:id/edit`}
                      element={<EditEmployeeExtendedClaim />}
                    />
                    <Route
                      path={`:id/view`}
                      element={<ViewEmployeeExtendedClaim />}
                    />
                  </Route>

                </Route>
              </Route>

              <Route path={URL.Relationship} element={<p>Relationship</p>} />
              <Route path={URL.Settings} element={<Outlet />}>
                <Route index element={<p>Page Not Found</p>} />
                {userPermissions.includes(
                  DEFINED_PERMISSIONS.PermissionManager
                ) && (
                  <>
                    <Route
                      path={URL.Permissions}
                      element={
                        <>
                          <RouteLayout>
                            <Outlet />
                          </RouteLayout>
                        </>
                      }
                    >
                      <Route index element={<Permissions />} />
                      <Route
                        path={URL.Create_Staff}
                        element={<CreateStaff />}
                      />
                      <Route
                        path={`${URL.Edit_Staff}/:id`}
                        element={<CreateStaff isEdit={true} />}
                      />
                      <Route
                        path={`${URL.Edit_Staff_Permissions}/:id`}
                        element={<EditStaffPermission isEdit={true} />}
                      />
                    </Route>
                    <Route
                      path={URL.Permission_Group}
                      element={
                        <>
                          <RouteLayout>
                            <Outlet />
                          </RouteLayout>
                        </>
                      }
                    >
                      <Route index element={<GroupPermissions />} />
                      <Route path={":id"} element={<ViewGroupPermissions />} />
                      <Route path={"add"} element={<AddGroupPermissions />} />
                      <Route
                        path={"update/:id"}
                        element={<AddGroupPermissions isEdit={true} />}
                      />
                    </Route>
                  </>
                )}
              </Route>
              <Route path={"*"} element={<p>Not Found</p>} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default Main;