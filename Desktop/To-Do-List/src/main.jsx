import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/inder"; // الوزن العادي
// import "@fontsource/Oswald"; // الوزن الافتراضي 400
// import "@fontsource/oswald/700.css"; // لو عاوزه الوزن 700

import App from "./App.jsx"; 
import { TasksProvider } from "./routes/TasksContext.jsx"; // ✅ استيراد البروڤايدر

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);
