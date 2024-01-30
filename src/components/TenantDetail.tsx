import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function TenantDetail() {
  return (
    <div className="text-sm">
      <Typography variant="h6">Tenant Details</Typography>
      <div className="grid grid-cols-4 items-center mb-4 mt-1">
        <span className="col-span-2">Main tenant</span>
        <div className="col-span-2"></div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Name</span>
        <div className="col-span-3">
          <Input label="Name" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Tel.</span>
        <div className="col-span-3">
          <Input label="Tel." color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">E-Mail</span>
        <div className="col-span-3">
          <Input label="E-Mail" color="black" />
        </div>
      </div>
      <div className="flex items-center cursor-pointer text-sm">
        <PlusCircleIcon width={26} className=" mr-2" />
        Add another tenant
      </div>
      <Typography variant="h6" className="pt-4 pb-2">
        Room Details
      </Typography>
      <Typography variant="small">
        Set room default for the first time. You can be edited later.
      </Typography>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Room fee</span>
        <div className="col-span-3">
          <Input label="Room fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Furniture fee</span>
        <div className="col-span-3">
          <Input label="Furniture fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Internet fee</span>
        <div className="col-span-3">
          <Input label="Internet fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Parking fee</span>
        <div className="col-span-3">
          <Input label="Parking fee" color="black" />
        </div>
      </div>
      <div className="flex items-center cursor-pointer text-sm">
        <PlusCircleIcon width={26} className=" mr-2" />
        Add another
      </div>
      <div className="flex mt-5 justify-end">
        <Button className="mr-2 bg-gray-100 text-black shadow-none">
          Gen code
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
}
