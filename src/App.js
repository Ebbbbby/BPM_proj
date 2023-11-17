import Main from "./Main";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import "./app/global/styles/global.css";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.scss"
import { OnboardingProvider } from "./utils/contexts/Onboarding/OnboardingContext";
import { ToastContainer as DefaultToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import PageLoader from "./app/dashboard/Components/Loader/Loader";
import { AppAlert } from "./app/dashboard/Components/Modals/AppAlert";
import { ModalOps } from "./app/dashboard/Pages/Vendors/VendorApprovals/useApprovals";
import { ModalProvider } from "./utils/contexts/Modals/ModalContext";

const ToastContainer = (props) => (
  <DefaultToastContainer style={{ zIndex: "1900" }} {...props} />
);
function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router>
        <ModalProvider>
          <OnboardingProvider>
            <Provider store={store}>
                <Main />
                <ToastContainer />
                <AppAlert />
                <ModalOps />
            </Provider>
          </OnboardingProvider>
        </ModalProvider>
      </Router>
    </Suspense>
  );
}

export default App;
