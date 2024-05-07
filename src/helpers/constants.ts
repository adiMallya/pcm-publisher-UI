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
    buId: "1",
    buName: "TEST BU",
  },
  {
    buId: "53F8CDC5-F8C9-4F2B-A7DD-75B24DD12773",
    buName: "METT Orchestration TEST",
  },
];

export const DataColumnList: GridColDef[] = [
  { field: "campaignID", headerName: "Message ID", width: 130 },
  { field: "campaignName", headerName: "Message Name", width: 200 },
];
