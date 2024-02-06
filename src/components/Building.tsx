import {
  Cog6ToothIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import TenantDetail from "./TenantDetail";
import RoomDetail from "./RoomDetail";
import Lease from "./Lease";
import PaymentHistory from "./PaymentHistory";
import Report from "./Report";

import apiClient from "../services/apiClient";

import configAPI from "../services/configAPI.json";

import { getUserId } from "../services/userService";

import jsonData from "../jsonTest/Building.json";
import AddBuilding from "./Popup/AddBuilding";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const tabsData = [
  {
    label: "Room details",
    value: "detail",
    desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
  },
  {
    label: "Lease",
    value: "lease",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Payment history",
    value: "payment",
    desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: "Report history",
    value: "report",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}


function BuildingIcon({data}:{data:string}) {
  return (
    <div className="flex items-center gap-2">
      <AddBuilding idDormitory = {data} />
      <Cog6ToothIcon width={25} />
    </div>
  );
}

interface roomStatusInterface {
  idRoom: string;
  roomName: string;
  isRoomStay: boolean;
  isRoomPay: boolean;
  isRoomLatePay: boolean;
}

interface buildingInfoInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
  roomInfo: roomStatusInterface[];
}

interface dormitoryInfoInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
  buildingInfo: buildingInfoInterface[];
}

interface buildingInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
}

interface dormitoryInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;

}

interface dormitoryProps  {
  data: dormitoryInterface[];
}

export default function Building({data}: dormitoryProps) {

  const [accordionStates, setAccordionStates] = useState<boolean[]>([]);
  const [dormitoryData, setDormitoryData] = useState<dormitoryInfoInterface[]>([]);
  const [idDormitory,setIdDormitory] = useState<string>();
  const [roomName,setRoomName] = useState<string>('NO DATA');
 
  const handleToggleAccordion = (index: number) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const getBuildData = async () => {
    if (dormitoryData !== null) {
      try {
        const buildingPromises = data && data.map(async (dormitory) => {
          const res = await apiClient(`${configAPI.api_url.localHost}/Building/GetAllBuilding/${dormitory.idDormitory}`, {
            method: 'GET',
          });
          return res.data;
        });
        const buildingResults = await Promise.all(buildingPromises);
        const flattenedBuildingData: buildingInterface[] = buildingResults.flatMap((buildingArray: any[]) => buildingArray) as buildingInterface[];
        return flattenedBuildingData;
      } catch (error) {
        console.error(error);
      }

      
    }
  };
  
  const getRoomStatusData = async (_building: buildingInterface[]) => {
    try {
      const buildingPromises = _building && _building.map(async (building) => {
        const res = await apiClient(`${configAPI.api_url.localHost}/Room/GetAllRoomStatus/${building.idBuilding}`, {
          method: 'GET',
        });
  
        return {
          ...building,
          roomInfo: res.data,
        };
      });
      const buildingResults = await Promise.all(buildingPromises);
      const updatedDormitoryData = data.map(dormitory => {
        // ค้นหา building ที่มี idDormitory ตรงกับ idDormitory ของ dormitory ปัจจุบัน
        const matchingBuilding = buildingResults.filter(building => building.idDormitory === dormitory.idDormitory);
        if (matchingBuilding) {
          // ถ้าพบ building ที่ตรงกัน ให้นำข้อมูลของ building มาใส่ใน buildingInfo ของ Dormitory นั้น ๆ
          return {
            ...dormitory,
            buildingInfo: matchingBuilding
          };
        }
        // ถ้าไม่พบ building ที่ตรงกัน ให้คงเดิม
        return dormitory;
      });
      setDormitoryData(updatedDormitoryData);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  
  
  useEffect(() => {
    const getData = async () => {
      if (data != null) {
        const _builb : buildingInterface[] = await getBuildData();
        await getRoomStatusData(_builb);
      }
      if (data && data.length > 0) {
        setAccordionStates(
          Array.from({ length: data.length }, () => true)
        );
      }
    };
  
    getData();
    
  }, [data]);

  const [open, setOpen] = React.useState(1);

  const check = () =>
  {
    console.log(dormitoryData[0].buildingInfo[0]);
  }
      
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex justify-between">
      <div className="w-full lg:w-[70%]">
      {dormitoryData && dormitoryData.map((dataDorm,index) => (
        <Card className="px-5 py-1 mb-5 lg:mr-5 h-fit overflow-auto min-w-[500px]">
          <Accordion onClick={() => {setIdDormitory(dataDorm.idDormitory)}} open={open === 1} icon={<BuildingIcon data={idDormitory} />}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="font-Montserrat text-base border-b-0"
            >
              <div className="flex items-center gap-6">
                <div>Dormitory {dataDorm.dormitoryName}</div>
              </div>
            </AccordionHeader>
            <AccordionBody className="p-0 pb-2">
              {dataDorm &&
                dataDorm.buildingInfo &&
                dataDorm.buildingInfo.map((dataBuild, index) => (
                  <Card className="px-5 py-1 my-2 h-fit overflow-auto min-w-[500px] border">
                    <Accordion
                      key={index}
                      open={accordionStates[index]}
                      icon={<Icon id={accordionStates[index]} open={true} />}
                    >
                      <AccordionHeader
                        onClick={() => handleToggleAccordion(index)}
                        className={`font-Montserrat text-base ${
                          accordionStates[index] === true ? "" : "border-b-0"
                        }`}
                      >
                        Building {dataBuild.buildingName}
                      </AccordionHeader>
                      <AccordionBody className="grid grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
                        {dataBuild &&
                          dataBuild.roomInfo &&
                          dataBuild.roomInfo.map((dataRoom) => (
                            
                            <button onClick={() => {setRoomName(dataRoom.roomName);}}>
                              
                              {
                                dataRoom.isRoomStay ? 
                                <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px] bg-teal-400">
                                  {dataRoom.isRoomPay ? <CheckCircleIcon
                                    color="green"
                                    className="absolute top-[-5px] right-[-5px] w-4 h-4 bg-white rounded-full"
                                  />
                                  :  
                                  <ClockIcon
                                  color="#ECB92F"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4 bg-white rounded-full"
                                />}

                                  {/* <ExclamationCircleIcon
                                    color="#AE2012"
                                    className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                  /> */}
                                  <span className="font-bold text-base text-white">{dataRoom.roomName}</span>
                                </Card>
                                :
                                <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px] ">
                                {dataRoom.isRoomPay ? <CheckCircleIcon
                                  color="green"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4 bg-white rounded-full"
                                />
                                :  
                                <ClockIcon
                                color="#ECB92F"
                                className="absolute top-[-5px] right-[-5px] w-4 h-4 bg-white rounded-full"
                                />}

                                {/* <ExclamationCircleIcon
                                  color="#AE2012"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                /> */}
                                <span className="font-bold text-base">{dataRoom.roomName}</span>
                                </Card>
                              }
                            </button>
                          ))}
                      </AccordionBody>
                    </Accordion>
                  </Card>
                ))}
            </AccordionBody>
          </Accordion>
        </Card>
        ))}
      </div>
      <Card className="hidden lg:block p-5 rounded-md w-[30%] min-w-[400px] h-fit !static">
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="black">
            Room {roomName}
          </Typography>
          <div className="flex gap-4">
            <PencilSquareIcon width={22} className="cursor-pointer" />
            <TrashIcon width={20} className="cursor-pointer" />
          </div>
        </div>
        <Tabs value="detail">
          <TabsHeader className="flex items-center mt-5">
            {tabsData.map(({ label, value }) => (
              <Tab key={value} value={value} className="text-xs py-2">
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="!py-0">
            <TabPanel
              key={tabsData[0].value}
              value={tabsData[0].value}
              className="!px-0 !pb-0"
            >
             {/* {roomData && <TenantDetail room={roomData} user={userData} />} */}
            </TabPanel>
            <TabPanel
              key={tabsData[1].value}
              value={tabsData[1].value}
              className="!px-0 !pb-0"
            >
              <Lease />
            </TabPanel>
            <TabPanel
              key={tabsData[2].value}
              value={tabsData[2].value}
              className="!px-0 !pb-0"
            >
              <PaymentHistory />
            </TabPanel>
            <TabPanel
              key={tabsData[3].value}
              value={tabsData[3].value}
              className="!px-0 !pb-0"
            >
              {/* <Report data ={problemData} /> */}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Card>
    </div>
  );
}
