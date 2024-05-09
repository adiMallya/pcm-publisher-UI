import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { theme } from "src/styles";
import { Clone, Home, Replace } from "./pages";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clone" element={<Clone />} />
          <Route path="/searchAndReplace" element={<Replace />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
