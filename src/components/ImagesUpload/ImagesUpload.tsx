"use client";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { Dispatch, SetStateAction } from "react";

export function ImagesUpload({
  setImages,
  fileStates,
  setFileStates,
}: {
  setImages: Dispatch<SetStateAction<string[]>>;
  setFileStates: Dispatch<SetStateAction<FileState[]>>;
  fileStates: FileState[];
}) {
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
      />

      <button
        className="bg-[var(--secondary-color)] h-10 flex items-center justify-center w-24 mt-4 py-1 px-4 text-xl text-white rounded-md"
        onClick={async () => {
          await Promise.all(
            fileStates.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });
                if (res.url) {
                  setImages((images) => [...images, res.url]);
                }
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      >
        Upload
      </button>
    </div>
  );
}
