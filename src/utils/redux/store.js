import { configureStore } from "@reduxjs/toolkit";
import fleetReducer from "./Fleet/FleetSlice";
import AppReducer from "./Auth/AuthSlice";
import vendorReducer from "./Vendor/VendorSlice";
import GlobalReducer from "./Global/GlobalSlice";
import assetReducer from "./Assets/AssetSlice";
import procurementReducer from "./Procurement/ProcurementSlice";
import assetSetUpReducer from "./AssetsSetUp/AssetSetUpSlice";
import consummableReducer from "./Consumables/ConsumablesSlice";
import permissionReducer from './Permission/PermissionSlice'
import consummableSetUpReducer from "./ConsummableSetUp/ConsummableSetUpSlice";
import hrReducer from"./HR/HRSlice";
import reportReducer from "./Report/ReportSlice";
import employeeReducer from "./Employee/EmployeeSlice";

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    auth: AppReducer,
    vendor: vendorReducer, 
    assets: assetReducer,
    assetSetUp: assetSetUpReducer,
    consummableSetUp: consummableSetUpReducer,
    consumable: consummableReducer,
    procurement: procurementReducer,
    permissions: permissionReducer,
    hr : hrReducer,
    fluelRequest: fleetReducer,
    fleet: fleetReducer,
    report: reportReducer,
    employee: employeeReducer,
  },
});

export default store;