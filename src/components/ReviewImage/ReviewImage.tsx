import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const ReviewImage = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="cursor-pointer mt-3">
          <Image
            src={image}
            className="min-h-24 max-h-24 min-w-24 max-w-24"
            alt="review-image"
            height={80}
            width={60}
          />
        </div>
      </DialogTrigger>
      <DialogTitle></DialogTitle>

      <DialogContent className="border-2 mt-3">
        <DialogDescription>
          <Image
            src={image}
            className="min-h-[350px] max-h-[400px]"
            alt="review-image"
            height={500}
            width={500}
          />
        </DialogDescription>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <button className="bg-gray-300 px-3 py-1 rounded-md" type="button">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewImage;
