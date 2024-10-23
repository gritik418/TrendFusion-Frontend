"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export function ColorImageUpload({
  setColorImage,
  file,
  setFile,
}: {
  setColorImage: Dispatch<SetStateAction<string>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}) {
  const { edgestore } = useEdgeStore();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsUploaded(false);
  }, [file]);

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
        className="bg-[var(--secondary-color)] h-10 flex items-center justify-center w-24 mt-4 py-1 px-4 text-xl text-white rounded-md"
        onClick={async () => {
          if (file) {
            setLoading(true);
            const res = await edgestore.publicFiles.upload({
              file,
            });
            setLoading(false);
            if (res.url) {
              setIsUploaded(true);
              setColorImage(res.url);
            }
          }
        }}
      >
        {loading ? (
          <Image
            src={"/images/loader.gif"}
            alt="uploading"
            height={30}
            width={30}
          />
        ) : isUploaded ? (
          <FaCheck className="text-2xl" />
        ) : (
          "Upload"
        )}
      </button>
    </div>
  );
}
