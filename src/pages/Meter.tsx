import AddBuilding from "../components/Popup/AddBuilding";
import Building from "../components/Building";
import { FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { getUserId } from '../services/userService';

import jsonData from '../jsonTest/Meter.json';

interface meterPrevInterface
{
  idMeter: string,
  idDormitory: string,
  buildingName: string,
  timesTamp : Date,
  meterRoomAll : [meterRoomAllPrevInterface]

} 

interface meterRoomAllPrevInterface
{
  idMeterRoom : string,
  idRoom: string,
  roomName: string,
  electricity: number,
  water: number,
  electricityPrev: number,
  waterPrev: number,
} 

interface meterUpdateInterface
{
  idMeter: string,
  idDormitory: string,
  meterRoomAll : meterRoomAllUpdateInterface[]
} 

interface meterRoomAllUpdateInterface
{
  idMeterRoom : string,
  electricity: number,
  water: number,
} 

export default function Meter() {
  const tabsData = [
    {
      label: "Electrical Fee",
      value: "efee",
    },
    {
      label: "Water Fee",
      value: "wfee",
    },
  ];

  const TABLE_HEAD = [
    "Room No.",
    "Unit (Last Month)",
    "Unit (This Month)",
    "Used Units",
  ];


  const [meterPrevData,setPrevMeterData] = useState<meterPrevInterface[]>([]);
  const [checkTabsData,setTabsData] = useState<string>("efee");

  const [inputValues, setInputValues] = useState<{ [idMeterRoom: string]: { electricity: number, water: number } }>({});

  const handleChangeMeter = (idMeterRoom: string, type: string, value: number) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [idMeterRoom]: {
        ...prevValues[idMeterRoom],
        [type]: value,
      },
    }));

    console.log(inputValues);
  };

  const  handleSaveMeterData = async () => {
    const updatedMeterData: meterUpdateInterface[] = [];
  
    meterPrevData.forEach((prevMeter) => {
      const updatedMeterRoomAll: meterRoomAllUpdateInterface[] = prevMeter.meterRoomAll.map((prevRoom) => ({
        idMeterRoom: prevRoom.idMeterRoom,
        electricity: inputValues[prevRoom.idMeterRoom]?.electricity || prevRoom.electricity,
        water: inputValues[prevRoom.idMeterRoom]?.water || prevRoom.water,
      }));
  
      updatedMeterData.push({
        idMeter: prevMeter.idMeter,
        idDormitory: prevMeter.idDormitory,
        meterRoomAll: updatedMeterRoomAll,
      });
    });

    console.log(updatedMeterData);
      // try {
      //   const res = await apiClient('https://localhost:7282/Api/Meter/UpdateMeter', {
      //     method: 'PUT',
      //     data: updatedMeterData,
      //   });
      //   console.log(res);
      //   window.location.reload();
      // }
      // catch (error)
      // {
      //   console.log(error);
      // }
  };

  useEffect(() => {
    // const getDataAllMeterPrev= async () => {
    //   const id = getUserId();
    //   if(id !== '')
    //   {
    //     try {
        
    //       const res = await apiClient(`https://localhost:7282/Api/Meter/GetAndCreateMeter/${id}`, {
    //         method: 'GET',
    //       });
    //       setPrevMeterData(res.data);
    //       console.log(res.data);
          
    //     }
    //     catch (error)
    //     {
    //       console.log(error);
    //     }
    //   }
    // }

    // getDataAllMeterPrev();

    setPrevMeterData(jsonData);
  }, []);

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10">
      <p className="font-bold">All Building</p>

      <div className="flex justify-between items-center">
        <div className="w-80 mt-5">
          <Tabs value="efee">
            <TabsHeader>
              {tabsData.map(({ label, value }) => (
                <Tab onClick={()=>{setTabsData(value)}} key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
        <Button onClick={handleSaveMeterData} className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload Files
        </Button>
      </div>
      
      {meterPrevData && meterPrevData.map((label,key) => (
      <div className="px-5 mt-5 border rounded-lg overflow-auto">
        <p className="font-bold my-5">Building {label.buildingName} | 2024 January</p>
        <table className="w-full min-w-max table-auto text-center mb-5 ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {label && label.meterRoomAll && label.meterRoomAll.map((val,key) => (
              <tr key={Number(val.roomName)} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal"
                  >
                    {val.roomName}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal"
                  >
                     {checkTabsData === "efee" ? val.electricityPrev : val.waterPrev}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal"
                  >
                    <input 
                    value={inputValues[val.idMeterRoom]?.[checkTabsData === "efee" ? 'electricity' : 'water'] || ''}
                    onChange={(e) => handleChangeMeter(val.idMeterRoom, checkTabsData === "efee" ? 'electricity' : 'water', +e.target.value)}
                    className="w-48 h-8 border rounded p-2" placeholder={checkTabsData === "efee" ? val.electricity : val.water} />
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal"
                  >
                    {checkTabsData === "efee" ? val.electricityPrev + val.electricity : val.waterPrev + val.water}
                  </Typography>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      ))}
      <div className="flex justify-end mt-5">
        <Button>Save</Button>
      </div>
      
    </div>
  );
}