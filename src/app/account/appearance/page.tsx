"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { IoIosColorPalette } from "react-icons/io";

const defaultValues = {
  theme: "light",
};

export default function AppearanceForm() {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">Appearance</h1>
        <Separator />
      </div>

      <form className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl flex items-center gap-1">
            <IoIosColorPalette className="text-3xl" /> Theme
          </h2>
          <p>Select the theme for the application.</p>
          <RadioGroup className="grid max-w-md grid-cols-2 gap-8 pt-2">
            <div>
              <label className="[&:has([data-state=checked])>div]:border-primary">
                <div>
                  <RadioGroupItem value="light" className="sr-only" />
                </div>
                <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Light
                </span>
              </label>
            </div>
            <div>
              <label className="[&:has([data-state=checked])>div]:border-primary">
                <div>
                  <RadioGroupItem value="dark" className="sr-only" />
                </div>
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Dark
                </span>
              </label>
            </div>
          </RadioGroup>
        </div>

        <button
          type="submit"
          className="bg-[var(--secondary-color)] py-2 px-5 font-semibold text-white rounded-md text-lg"
        >
          Update Preferences
        </button>
      </form>
    </div>
  );
}
