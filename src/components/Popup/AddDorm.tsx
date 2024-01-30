import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

export default function AddDorm() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Add New Dorm
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader>Please enter your code here.</DialogHeader>
        <DialogBody className="py-0 ">
          <p>You need to enter the code for create your dormitory.</p>
          <div className="w-full my-6">
            <Input label="Enter your code" />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="filled" className="bg-black" onClick={handleOpen}>
            <span>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
