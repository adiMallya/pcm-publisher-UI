import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { fetchFoldersByBUId } from "src/services";
import { FolderList } from "./FolderList";
import { CampaignsTable } from "./CampaignsTable";
import { IFolderResponse } from "src/helpers";

interface CloneEntitySelectionProps {
  title?: string;
  width: string;
  height: string;
  buId: string | null;
  onSelectedCampaignChange: (campaignId: string) => void;
  onSelectedFolderChange?: (folderId: string) => void;
}

export const CloneEntitySelection: React.FC<CloneEntitySelectionProps> = ({
  width,
  height,
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
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId);
    if (onSelectedFolderChange) {
      onSelectedFolderChange(folderId);
    }
  };

  useEffect(() => {
    if (buId) {
      const loadFolders = async () => {
        setEntityState((old) => ({ ...old, isLoading: true }));
        const fetchedFolders = await fetchFoldersByBUId(buId);
        setEntityState((old) => ({ ...old, folders: fetchedFolders }));
        setSelectedFolderId(fetchedFolders[0]?.folderID || null);
        setEntityState((old) => ({ ...old, isLoading: true }));
      };
      loadFolders();
    } else {
      setEntityState((old) => ({ ...old, folders: [] }));
      setSelectedFolderId(null);
    }
  }, [buId]);

  if (!buId) {
    return null; // Or a placeholder message indicating selection is required
  }

  return (
    <Paper
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "row",
        padding: 16,
      }}
    >
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
    </Paper>
  );
};
