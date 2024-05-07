import { GridColDef } from "@mui/x-data-grid";

export const BASE_API = "https://localhost:7184";

export const pages: Array<{ name: string; link: string }> = [
  {
    name: "Clone",
    link: "/clone",
  },
  {
    name: "Replace",
    link: "/searchAndReplace",
  },
];

export const BUList: Array<{ buId: string; buName: string }> = [
  {
    buId: "9899F5AC-5B95-4622-AA45-20518BC9A213",
    buName: "TEST BU FOR DEMO",
  },
];

export const DataColumnList: GridColDef[] = [
  { field: "campaignID", headerName: "Message ID", flex: 1 },
  { field: "campaignName", headerName: "Message Name", flex: 1 },
];
