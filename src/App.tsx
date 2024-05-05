import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { theme } from "src/styles";
import { Home } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchAndReplace" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
