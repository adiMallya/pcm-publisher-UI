import { Stack, Typography, CircularProgress } from "@mui/material";
import { GridSlots } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { SiteLayout } from "src/components";
import { StyledDataGrid } from "src/components";
import { NoRows } from "src/components/NoRows";
import { JobsGridColumnList } from "src/helpers";
import { fetchJobs } from "src/services";
export const Home: React.FC = () => {
  const [records, setRecords] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setRecords((old) => ({ ...old, isLoading: true }));
      const jobs = await fetchJobs();
      if (jobs) {
        setRecords((old) => ({
          ...old,
          data: jobs,
        }));
      }
      setRecords((old) => ({ ...old, isLoading: false }));
    };

    fetchData();
  }, []);

  return (
    <SiteLayout>
      <Stack
        style={{ height: 400, width: "100%" }}
        direction={"column"}
        padding={3}
      >
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Monitor Jobs
        </Typography>
        <StyledDataGrid
          paginationMode="server"
          rowCount={records.data?.length}
          rows={records?.data}
          columns={JobsGridColumnList}
          loading={records?.isLoading}
          slots={{
            loadingOverlay: CircularProgress as GridSlots["loadingOverlay"],
            noRowsOverlay: NoRows,
          }}
        />
      </Stack>
    </SiteLayout>
  );
};
