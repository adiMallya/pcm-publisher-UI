import { Toolbar } from "@mui/material";
import { SiteLayout } from "src/components";

export const Home: React.FC = () => {
  return (
    <SiteLayout>
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
        }}
      />
    </SiteLayout>
  );
};
