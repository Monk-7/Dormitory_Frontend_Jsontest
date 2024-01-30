import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useToggle,  } from "../../hooks/useToggle";
import React, { useState, useEffect } from 'react';

import apiClient from '../../services/apiClient';
import { getUserId } from '../../services/userService';

interface buildingInterface {
  idUser:string,
  buildingName: string,
  buildingRoomNumberlength: number,
  buildingFloor: number,
  buildingRoom: number,
  waterPrice: number,
  electricalPrice: number,
  roomPrice: number,
  furniturePrice: number,
  internetPrice: number,
  parkingPrice: number
}

export default function AddBuilding() {
  const { status: isOpen, toggleStatus: setIsOpen } = useToggle();

  const [form, setForm] = useState<buildingInterface>({
    idUser:'',
    buildingName: '',
    buildingRoomNumberlength: 3,
    buildingFloor: 0,
    buildingRoom: 0,
    waterPrice: 0,
    electricalPrice: 0,
    roomPrice: 0,
    furniturePrice: 0,
    internetPrice: 0,
    parkingPrice: 0
  });

  const changeBuildingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const sendDataAddBuilding = async () => {
    const isFormFilled = Object.values(form).every(value => value !== '');
    const token = localStorage.getItem('token');
    if(isFormFilled && token !== '')
    {
      console.log(form);
      try {
        const res = await apiClient('https://localhost:7282/Api/Building/CreateBuilding', {
          method: 'POST',
          data: form,
        });
        console.log(res);
        window.location.reload();
      }
      catch (error)
      {
        console.log(error);
      }
    }
    else
    {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  }

  useEffect(() => {
    const idUser = getUserId();
    if(idUser != '')
    {
      setForm(prevForm => ({ ...prevForm, idUser}));
    }
    
  }, []);

  return (
    <div>
      <PlusCircleIcon
        width={26}
        onClick={setIsOpen}
        className="cursor-pointer"
      />
      <Dialog open={isOpen} handler={setIsOpen} className="p-4">
        <DialogHeader>Create new building</DialogHeader>
        <DialogBody>
          <p>You need to enter the code for create your dormitory.</p>
          <div className="my-6 flex items-center">
            <p className="w-[200px] text-black">Building name</p>
            <Input
              onChange={changeBuildingHandler}
              name= "buildingName"
              label="Building name"
              containerProps={{ className: "max-w-[400px]" }}
            />
          </div>
          <div className="my-6 flex items-center">
            <p className="w-[200px] text-black">Storied building</p>
            <Input
              onChange={changeBuildingHandler}
              name= "buildingFloor"
              label="Storied building"
              containerProps={{ className: "max-w-[400px]" }}
            />
          </div>
          <div className="my-6 flex items-center">
            <p className="w-[200px] text-black">Number of rooms</p>
            <Input
              onChange={changeBuildingHandler}
              name= "buildingRoom"
              label="Number of rooms"
              containerProps={{ className: "max-w-[400px]" }}
            />
          </div>
        </DialogBody>
        <DialogHeader>Room details</DialogHeader>
        <DialogBody className="py-0 ">
          <p>Set room default for the fist time. You can be edited later.</p>

          <div className="my-6 flex items-center">
            <p className="w-[200px] text-black">Room fee</p>
            <Input
              onChange={changeBuildingHandler}
              name= "roomPrice"
              label="Room fee"
              containerProps={{ className: "max-w-[400px]" }}
            />
          </div>
          <div className="my-6 flex items-center">
            <p className="w-[200px] text-black">Furniture fee</p>
            <Input
              onChange={changeBuildingHandler}
              name= "furniturePrice"
              label="Furniture fee"
              containerProps={{ className: "max-w-[400px]" }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="filled" className="bg-black" onClick={setIsOpen}>
            <span onClick={sendDataAddBuilding}>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
