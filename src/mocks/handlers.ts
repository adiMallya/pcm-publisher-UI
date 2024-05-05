import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("/api/folders", () => {
        return HttpResponse.json([
            {
                id: 1,
                folderName: "Folder 1",
            },
            {
                id: 2,
                folderName: "Folder 2",
            },
            {
                id: 3,
                folderName: "Folder 3",
            },
            {
                id: 4,
                folderName: "Folder 4",
            },
        ]);
    })
];