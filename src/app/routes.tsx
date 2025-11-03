import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DeviceList from "../features/devices/DeviceList";
import DeviceDetail from "../features/devices/DeviceDetail";
import ErrorView from "../shared/components/ErrorView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorView title="Routing error" message="Something went wrong." />
    ),
    children: [
      { index: true, element: <DeviceList /> },
      { path: "devices", element: <DeviceList /> },
      { path: "devices/:id", element: <DeviceDetail /> },
      {
        path: "*",
        element: <ErrorView title="404" message="Page not found." />,
      },
    ],
  },
]);
