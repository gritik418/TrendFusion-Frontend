import { TextField } from "@mui/material";
import React from "react";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const AddressInput = () => {
  return (
    <div className="flex rounded-md flex-col bg-[var(--light-color)] my-10 py-8 px-4 lg:px-8">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl uppercase text-[var(--secondary-color)] font-semibold">
          Add a new address
        </h2>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            id="outlined-basic"
            size="medium"
            label="First Name"
            variant="outlined"
          />
          <TextField
            size="medium"
            className="w-full"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            size="medium"
            id="outlined-basic"
            label="Phone Number"
            type="number"
            variant="outlined"
          />
          <TextField
            className="w-full"
            size="medium"
            type="number"
            id="outlined-basic"
            label="Alternate Phone Number"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            rows={3}
            multiline
            size="medium"
            id="outlined-basic"
            label="Address (Street)"
            type="text"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            rows={1}
            maxRows={2}
            multiline
            size="medium"
            id="outlined-basic"
            label="Appartment (Optional)"
            type="text"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            size="medium"
            id="outlined-basic"
            label="City"
            type="text"
            variant="outlined"
          />
          <TextField
            className="w-full"
            size="medium"
            type="text"
            id="outlined-basic"
            label="State"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3">
          <TextField
            className="w-full"
            size="medium"
            id="outlined-basic"
            label="Landmark (Optional)"
            type="text"
            variant="outlined"
          />
          <TextField
            className="w-full"
            size="medium"
            type="text"
            id="outlined-basic"
            label="Postal Code"
            variant="outlined"
          />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-3 flex-col">
          <p>Address Type</p>
          <RadioGroup
            defaultValue="option-one"
            name="addressType"
            className="flex gap-8"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="home" id="home" />
              <Label htmlFor="home">Home</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="work" id="work" />
              <Label htmlFor="work">Work</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-6">
          <p>Use as Default Address</p>
          <Switch />
        </div>

        <div className="flex gap-3 justify-end">
          <button className="px-5 py-2 text-xl text-[var(--secondary-color)] rounded-md font-semibold">
            Cancel
          </button>

          <button className="bg-[var(--secondary-color)] px-5 py-2 text-xl uppercase text-white rounded-md font-bold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
