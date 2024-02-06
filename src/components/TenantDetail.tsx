import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import apiClient from "../services/apiClient";
import configAPI from "../services/configAPI.json";

interface roomInterface {
  idRoom: string,
  idBuilding: string,
  roomName: string,
  roomPrice: number,
  furniturePrice: number,
  internetPrice: number,
  parkingPrice: number,
  timesTamp: Date
}

interface UserInterface {
  id: string;
  idRoom: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  phonenumber: string;
  token: string;
}

export default function TenantDetail({ data }: { data: string }) {

  const [roomData,setRoomData] = useState<roomInterface>();
  const [userData,setUserData] = useState<UserInterface[]>();

  const getRoom = async () => 
  {
    try {
      const res = await apiClient(`${configAPI.api_url.localHost}/Room/GetOneRoom/${data}`, {
        method: 'GET',
      });
      setRoomData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getUser = async () => 
  {
    try {
      const res = await apiClient(`${configAPI.api_url.localHost}/User/GetUserAllByIdroom/${data}`, {
        method: 'GET',
      });
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>
  {
    getRoom();
    getUser();
  },[data])

  const check = () =>
  {
    console.log(roomData);
    console.log(userData);
  }

  return (
    <div className="text-sm">
      <button onClick={check}>check</button>
      <Typography variant="h6">Tenant Details</Typography>
      {userData?.length !== 0 ? userData && userData.map((user,index) => (
        <div >
          <div className="grid grid-cols-4 items-center mb-4 mt-1">
            <span className="col-span-2">Tenant {index + 1}</span>
            <div className="col-span-2"></div>
          </div>
          <div className="grid grid-cols-4 items-center my-4">
            <span className="text-right pr-5">Name</span>
            <div className="col-span-3">
              <Input label={user.name + ' ' + user.lastname} color="black" disabled />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center my-4">
            <span className="text-right pr-5">Tel.</span>
            <div className="col-span-3">
              <Input label={user.phonenumber} color="black" disabled />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center my-4">
            <span className="text-right pr-5">E-Mail</span>
            <div className="col-span-3">
              <Input label={user.email} color="black" disabled />
            </div>
          </div>
        </div>
      )) : <span>Vacant Room</span> }
      
      <Typography variant="h6" className="pt-4 pb-2">
        Room Details
      </Typography>
      <Typography variant="small">
        Set room default for the first time. You can be edited later.
      </Typography>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Room fee</span>
        <div className="col-span-3">
          <Input
            type="text"
            placeholder={roomData?.roomPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Furniture fee</span>
        <div className="col-span-3">
          <Input
            type="text"
            placeholder={roomData?.furniturePrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Internet fee</span>
        <div className="col-span-3">
          <Input
            type="text"
            placeholder={roomData?.internetPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Parking fee</span>
        <div className="col-span-3">
          <Input
            type="text"
            placeholder={roomData?.parkingPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      {/* <div className="flex items-center cursor-pointer text-sm">
        <PlusCircleIcon width={26} className=" mr-2" />
        Add another
      </div> */}
      <div className="flex mt-5 justify-end">
        <Button className="mr-2 bg-gray-100 text-black shadow-none">
          Gen code
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
}
