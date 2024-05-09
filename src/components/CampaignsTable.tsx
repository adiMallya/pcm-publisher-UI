import { useState, useEffect } from "react";
import { LinearProgress, Stack, Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  GridRowSelectionModel,
  GridPaginationModel,
  GridSlots,
} from "@mui/x-data-grid";
import { StyledDataGrid } from ".";

import { DataColumnList } from "src/helpers";
import {
  fetchCampaignsForFolderIdByPage,
  searchCampaignsByName,
} from "src/services";
import { NoRows } from "./NoRows";

interface CampaignsTableProp {
  folderID: string;
  onSelectCampaign: (campaignId: string) => void;
}
export const CampaignsTable: React.FC<CampaignsTableProp> = ({
  folderID,
  onSelectCampaign,
}) => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 10,
    page: 0,
    rowsPerPage: 4,
    searchName: "",
  });

  const handleCampaignSelection = (selected: GridRowSelectionModel) => {
    const selectedCampaignID = selected.length ? (selected[0] as string) : "";
    onSelectCampaign(selectedCampaignID);
  };

  const handlePaginationModelChange = (
    paginationModel: GridPaginationModel
  ) => {
    setPageState((old) => ({
      ...old,
      page: paginationModel.page,
      rowsPerPage: paginationModel.pageSize,
    }));
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const campaigns = await fetchCampaignsForFolderIdByPage({
        folderID,
        pageNo: pageState.page,
        recordsPerPage: pageState.rowsPerPage,
      });

      if (campaigns) {
        setPageState((old) => ({
          ...old,
          data: campaigns?.campaigns,
          total: campaigns?.totalRecords,
        }));
      }
      setPageState((old) => ({ ...old, isLoading: false }));
    };

    fetchCampaigns();
  }, [folderID, pageState.page, pageState.rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPageState((old) => ({ ...old, searchName: event.target.value }));

  const handleSearchClick = async () => {
    setPageState((old) => ({ ...old, isLoading: true }));
    const foundCampaigns = await searchCampaignsByName({
      searchName: pageState.searchName,
      folderID,
      pageNo: pageState.page,
      recordsPerPage: pageState.rowsPerPage,
    });
    if (foundCampaigns) {
      setPageState((old) => ({
        ...old,
        data: foundCampaigns?.campaigns,
        total: foundCampaigns?.totalRecords,
        isLoading: false,
      }));
      setPageState((old) => ({ ...old, isLoading: false }));
    }
  };

  return (
    <Box
      style={{ maxHeight: 360, width: "100%", maxWidth: 520 }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Stack direction={"row"}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={pageState.searchName}
          fullWidth
          onChange={handleSearchChange}
          sx={{
            "& .MuiInputLabel-outlined": {
              color: "text.primary",
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Stack>

      <StyledDataGrid
        autoHeight
        columns={DataColumnList}
        rows={pageState.data}
        getRowId={(row) => row.campaignID}
        paginationMode="server"
        rowCount={pageState.total}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageState.rowsPerPage,
              page: pageState.page,
            },
          },
        }}
        loading={pageState.isLoading}
        onPaginationModelChange={(paginationModel) =>
          handlePaginationModelChange(paginationModel)
        }
        pageSizeOptions={[4, 8]}
        checkboxSelection
        disableMultipleRowSelection
        onRowSelectionModelChange={handleCampaignSelection}
        slots={{
          loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          noRowsOverlay: NoRows,
        }}
      />
    </Box>
  );
};
