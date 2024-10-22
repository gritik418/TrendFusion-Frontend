"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export function ThumbnailUpload() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <button
        className="bg-[var(--secondary-color)] mt-4 py-1 px-4 text-xl text-white rounded-md"
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
