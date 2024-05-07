import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IFolderResponse } from "src/helpers";

interface FolderListProps {
  folders: IFolderResponse[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string) => void;
}

export const FolderList: React.FC<FolderListProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
}) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: 300,
      }}
    >
      {folders.map((folder) => (
        <ListItemButton
          key={folder.folderID}
          selected={folder.folderID === selectedFolderId}
          onClick={() => onSelectFolder(folder.folderID)}
          sx={{ bgcolor: "teal" }}
        >
          <ListItemText
            primary={folder.folderName}
            sx={{ color: "text.secondary" }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
