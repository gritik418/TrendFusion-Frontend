import Navbar from "@/components/Navbar/Navbar";
import CustomizedSteppers from "@/components/Stepper/Stepper";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Navbar />

      <div className="p-5 pt-10 gap-6 flex flex-col w-full">
        <div className="flex bg-white flex-col items-center p-5 rounded-lg">
          <h1 className="text-4xl mb-8 font-semibold">Checkout</h1>
          <CustomizedSteppers />
        </div>

        <div className="flex min-h-[30vh] bg-white flex-col items-center p-5 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Checkout;
