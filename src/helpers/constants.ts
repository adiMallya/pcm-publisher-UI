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
    buId: "53f8cdc5-f8c9-4f2b-a7dd-75b24dd12773",
    buName: "TEST BU FOR DEMO 1",
  },
  {
    buId: "9899F5AC-5B95-4622-AA45-20518BC9A213",
    buName: "TEST BU 2",
  },
];

export const DataColumnList: GridColDef[] = [
  { field: "campaignID", headerName: "Message ID", flex: 1 },
  { field: "campaignName", headerName: "Message Name", flex: 1 },
];

export const JobsGridColumnList: GridColDef[] = [
  {
    field: "sourceCampaignID",
    headerName: "Source Message ID",
    flex: 1,
    valueFormatter: (value) => value ?? "",
  },
  {
    field: "targetCampaignID",
    headerName: "Target Message ID",
    flex: 1,
    valueFormatter: (value) => value ?? "",
  },
  {
    field: "mode",
    headerName: "Job Type",
    flex: 1,
    valueFormatter: (value) => (value !== null ? UpdateMode[value] : ""),
  },
  {
    field: "startedAt",
    headerName: "Start Date",
    flex: 1,
    valueFormatter: (value) => value ?? "",
  },
  {
    field: "workStatus",
    headerName: "Status",
    flex: 1,
    valueFormatter: (value) => (value !== null ? WorkStatus[value] : ""),
  },
  {
    field: "createdAt",
    headerName: "Completed Date",
    flex: 1,
    valueFormatter: (value) => value ?? "",
  },
];

export enum WorkStatus {
  QUEUED = <any>0,
  PROCESSING = <any>1,
  PROCESSED = <any>2,
  FAILED = <any>3,
}

export enum UpdateMode {
  CREATE = <any>0,
  UPDATE = <any>1,
}
