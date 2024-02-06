import Imgslide from "../components/Imgslide";
import AddBuilding from "../components/Popup/AddBuilding";
import Building from "../components/Building";
import {
  FunnelIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import { Option, Select, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { getUserId } from "../services/userService";
import configAPI from "../services/configAPI.json";
interface dormitoryInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
}

export default function Home() {

  const [dormData, setDormData] = useState<dormitoryInterface[]>();

  useEffect( () => {
    const getDataDorm = async () => {
      const id = getUserId();
      if(id !== '')
      {
        try {
          const res = await apiClient(`${configAPI.api_url.localHost}/Dormitory/GetAllDormitory/${id}`, {
            method: 'GET',
          });
          setDormData(res.data);
          console.log(res);
        }
        catch (error)
        {
          console.log(error);
        }
      }
    }
    getDataDorm();
  }, []);

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      {/* <Imgslide /> */}
      <div className="flex my-4 items-center justify-between">
        <Typography variant="h5">Management</Typography>
        <div className="flex w-70 gap-2">
          <Select label="Select Domitory">
            <Option>Domitory A</Option>
            <Option>Domitory B</Option>
            <Option>Domitory C</Option>
          </Select>
          <Select label="Select Building" disabled>
            <Option>Building A</Option>
            <Option>Building B</Option>
            <Option>Building C</Option>
          </Select>
        </div>
      </div>
      {dormData && <Building data={dormData} />}
    </div>
  );
}
