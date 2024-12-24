import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  documentUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "1GB" },
    text: { maxFileSize: "1GB" },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      return {}; // No authentication, just return an empty object
    })
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for file:", file.name);
      console.log("File URL:", file.url);
 
      // Return void or a plain object with JSON-serializable values
      return { fileName: file.name, fileUrl: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

