import { useState, useEffect } from "react";
import { LinearProgress, Paper, TextField } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridRowSelectionModel,
  GridPaginationModel,
  GridSlots,
} from "@mui/x-data-grid";

import { ICampaignResponse, DataColumnList } from "src/helpers";
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
  //   const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 10,
    page: 0,
    rowsPerPage: 3,
    searchName: "",
  });

  const handleCampaignSelection = (selected: GridRowSelectionModel) => {
    const selectedCampaignID = selected[0] as string;
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPageState((old) => ({ ...old, searchName: event.target.value }));

  useEffect(() => {
    const fetchCampaigns = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const campaigns = await fetchCampaignsForFolderIdByPage({
        folderID,
        pageNo: pageState.page,
        recordsPerPage: pageState.rowsPerPage,
      });

      if (campaigns) {
        console.log(campaigns.campaigns.length);
        setPageState((old) => ({
          ...old,
          data: campaigns?.campaigns,
          total: campaigns?.totalRecords,
        }));
      }
      setPageState((old) => ({ ...old, isLoading: false }));
    };

    fetchCampaigns();
  }, [folderID]);

  useEffect(() => {
    const searchData = async () => {
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
        }));
        setPageState((old) => ({ ...old, isLoading: false }));
      }
    };
    searchData();
  }, [pageState.searchName]);

  return (
    <Paper style={{ height: 400, width: "100%", padding: 16 }}>
      <TextField
        label="Search by name"
        variant="outlined"
        value={pageState.searchName}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <DataGrid
        autoHeight
        columns={DataColumnList}
        rows={pageState.data}
        getRowId={(row) => row.campaignID}
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
    </Paper>
  );
};
