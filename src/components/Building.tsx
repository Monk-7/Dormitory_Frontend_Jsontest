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
import { getUserId } from "../services/userService";

import jsonData from "../jsonTest/Building.json";
import AddBuilding from "./Popup/AddBuilding";

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

function BuildingIcon() {
  return (
    <div className="flex items-center gap-2">
      <AddBuilding />
      <Cog6ToothIcon width={25} />
    </div>
  );
}

interface roomInterface {
  idRoom: string;
  idBuilding: string;
  roomName: string;
  roomPrice: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
  timesTamp: Date;
}

interface buildingInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
  roomAll: [roomInterface];
}

interface dormitoryInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
  buildingAll: [buildingInterface];
}

export default function Building() {
  const [roomData, setRoomData] = useState<dormitoryInterface>();
  const [accordionStates, setAccordionStates] = useState<boolean[]>([]);

  const handleToggleAccordion = (index: number) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    // const getDataAllRoom = async () => {
    //   const id = getUserId();
    //   if(id !== '')
    //   {
    //     try {

    //       const res = await apiClient(`https://localhost:7282/Api/Dormitory/GetDormitoryData/${id}`, {
    //         method: 'GET',
    //       });
    //       setRoomData(res.data);
    //       console.log(res);
    //     }
    //     catch (error)
    //     {
    //       console.log(error);
    //     }
    //   }
    // }

    // getDataAllRoom();

    setRoomData(jsonData);
    if (roomData && roomData.buildingAll) {
      setAccordionStates(
        Array.from({ length: roomData.buildingAll.length }, () => true)
      );
    }
  }, [roomData]);

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex justify-between">
      <div className="w-full lg:w-[70%]">
        <Card className="px-5 py-1 mb-5 lg:mr-5 h-fit overflow-auto min-w-[500px]">
          <Accordion open={open === 1} icon={<BuildingIcon />}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="font-Montserrat text-base border-b-0"
            >
              <div className="flex items-center gap-6">
                <div>Dormitory A</div>
              </div>
            </AccordionHeader>
            <AccordionBody className="p-0 pb-2">
              {roomData &&
                roomData.buildingAll &&
                roomData.buildingAll.map((data, index) => (
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
                        Building {data.buildingName}
                      </AccordionHeader>
                      <AccordionBody className="grid grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
                        {data &&
                          data.roomAll &&
                          data.roomAll.map((data) => (
                            <button>
                              <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px]">
                                <span>{data.roomName}</span>
                              </Card>
                            </button>
                          ))}
                      </AccordionBody>
                    </Accordion>
                  </Card>
                ))}
            </AccordionBody>
          </Accordion>
        </Card>
      </div>
      <Card className="hidden lg:block p-5 rounded-md w-[30%] min-w-[400px] h-fit !static">
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="black">
            Room 101
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
              <TenantDetail />
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
              <Report />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Card>
    </div>
  );
}
