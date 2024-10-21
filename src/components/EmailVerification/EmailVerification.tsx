import { Dialog, DialogContent, DialogContentText, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import React, { useState } from "react";
import { DialogHeader } from "../ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useVerifyEmailMutation } from "@/features/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
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

const EmailVerification = ({ open, setOpen, email }: Props) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyEmail] = useVerifyEmailMutation();
  const router = useRouter();
  const [errors, setErrors] = useState<EmailVerificationErrors>({
    email: "",
    verificationCode: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailVerification = async () => {
    setErrors({
      email: "",
      verificationCode: "",
    });
    setLoading(true);
    const { data, error } = await verifyEmail({
      email,
      verificationCode,
    });
    setLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as AuthResponse;
      if (errorResponse?.errors) {
        setErrors(errorResponse.errors);
      } else {
        setOpen(false);
        toast.error(errorResponse?.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      return;
    }
    if (data?.success) {
      setOpen(false);
      router.push("/");
      toast.success(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (data?.success && data.message) {
      setOpen(false);
      toast.error(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
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
            Enter the OTP sent to <span className="font-bold">{email}</span> to
            verify your email address.
          </p>

          <div className="flex items-center justify-center mt-8">
            <InputOTP
              autoFocus
              value={verificationCode}
              onChange={(value: string) => setVerificationCode(value)}
              maxLength={6}
            >
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

          {(errors.email && (
            <span className="text-red-500 text-sm font-normal">
              {errors.email}
            </span>
          )) ||
            (errors.verificationCode && (
              <span className="text-red-500 text-sm font-normal">
                {errors.verificationCode}
              </span>
            ))}

          <div className="flex items-center my-4 justify-center mt-6">
            <button
              onClick={handleEmailVerification}
              className="bg-[var(--secondary-color)] text-white py-2 px-6 text-xl font-semibold rounded-md"
            >
              {loading ? "Processing..." : "Verify"}
            </button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerification;
