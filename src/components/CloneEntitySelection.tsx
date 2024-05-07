import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Stack } from "@mui/material";
import { fetchFoldersByBUId } from "src/services";
import { FolderList } from "./FolderList";
import { CampaignsTable } from "./CampaignsTable";
import { IFolderResponse } from "src/helpers";

interface CloneEntitySelectionProps {
  title?: string;
  buId: string | null;
  onSelectedCampaignChange: (campaignId: string) => void;
  onSelectedFolderChange?: (folderId: string) => void;
}

export const CloneEntitySelection: React.FC<CloneEntitySelectionProps> = ({
  title,
  buId,
  onSelectedCampaignChange,
  onSelectedFolderChange,
}) => {
  const [entityState, setEntityState] = useState<{
    folders: IFolderResponse[];
    isLoading: boolean;
  }>({
    folders: [],
    isLoading: false,
  });
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId);
    if (onSelectedFolderChange) {
      onSelectedFolderChange(selectedFolderId);
    }
  };

  useEffect(() => {
    if (buId) {
      const loadFolders = async () => {
        setEntityState((old) => ({ ...old, isLoading: true }));
        const fetchedFolders = await fetchFoldersByBUId(buId);

        if (fetchedFolders?.length) {
          setEntityState((old) => ({ ...old, folders: fetchedFolders }));
          setSelectedFolderId(fetchedFolders[0]?.folderID);
        }
        setEntityState((old) => ({ ...old, isLoading: false }));
      };
      loadFolders();
    } else {
      setEntityState((old) => ({ ...old, folders: [] }));
      setSelectedFolderId("");
    }
  }, [buId]);

  if (!buId) {
    return null; // Or a placeholder message indicating selection is required
  }

  return (
    <Box
      component={"section"}
      sx={{
        backgroundColor: "primary",
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 1,
        padding: 2,
      }}
    >
      {entityState.isLoading ? (
        <LinearProgress />
      ) : !entityState.folders.length ? (
        <Typography variant="h5">{`No Folders Found For ${
          title ?? "BU"
        }`}</Typography>
      ) : (
        <Stack direction={"column"} gap={2}>
          <Typography variant="h5">{title}</Typography>
          <Box display={"flex"}>
            <FolderList
              folders={entityState.folders}
              selectedFolderId={selectedFolderId}
              onSelectFolder={handleSelectFolder}
            />
            {selectedFolderId && (
              <CampaignsTable
                folderID={selectedFolderId}
                onSelectCampaign={onSelectedCampaignChange}
              />
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
};
