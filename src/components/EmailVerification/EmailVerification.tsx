import { Dialog, DialogContent, DialogContentText, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmailVerification = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className="rounded-lg"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogHeader className="flex gap-0 my-4 items-center flex-col">
        <Image
          src={"/images/email-verification.png"}
          alt="verofy email"
          height={180}
          width={180}
        />
        <h1 className="text-center text-3xl">Email Verification</h1>
      </DialogHeader>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <p className="text-sm max-w-[440px] text-center">
            Enter the OTP sent to{" "}
            <span className="font-bold">gritik418@gmail.com</span> to verify
            your email address.
          </p>

          <div className="flex items-center justify-center mt-8">
            <InputOTP autoFocus maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot autoFocus index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center my-4 justify-center mt-6">
            <button className="bg-[var(--secondary-color)] text-white py-2 px-6 text-xl font-semibold rounded-md">
              Verify
            </button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerification;
