import React , { useState , useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Input,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import apiClient from '../services/apiClient'
import { getUserId } from '../services/userService'

import jsonData from '../jsonTest/Community.json';

const data = [
  {
    imageLink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  },
];

interface communityPostInterface
{
  idUser : string,
  category : string,
  title : string,
  details : string,
}

interface communityInterface
{
  idCommunity : string,
  idUser : string,
  name : string,
  category : string,
  title : string,
  details : string,
  timesTamp : Date
}

export default function Community() {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value: any) => setSelected(value);

  const [form, setForm] = useState<communityPostInterface>({
    idUser : '',
    category:'public',
    title: 'public',
    details: ''
  });

  const [postData , setPostData] = useState<communityInterface[]>([])

  const changeCommunityPostHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const sendDataCommunityPost = async () => {
    const isFormFilled = Object.values(form).every(value => value !== '');
    const token = localStorage.getItem('token');
    if(isFormFilled && token !== '')
    {
      console.log(form);
      try {
        const res = await apiClient('https://localhost:7282/Api/Community/CreateCommunity', {
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

  const getDataPostPublic = async () => {
    const idUser = getUserId();
    if(idUser !== '')
    {
      try {
      
        const res = await apiClient(`https://localhost:7282/Api/Community/GetPostPublic`, {
          method: 'GET',
        });
        setPostData(res.data);
        console.log(res.data);
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  const getDataPostApartment = async () => {
    const idUser = getUserId();
    if(idUser !== '')
    {
      try {
      
        const res = await apiClient(`https://localhost:7282/Api/Community/GetPostApartment/${idUser}`, {
          method: 'GET',
        });
        setPostData(res.data);
        console.log(res.data);
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    // const idUser = getUserId();
    // if(idUser != '')
    // {
    //   setForm(prevForm => ({ ...prevForm, idUser}));
    // }

    // getDataPostPublic();
    
    setPostData(jsonData);
  }, []);
  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10">
      <div className="flex my-4 items-center justify-between">
        <p className="font-bold">Community</p>
        <div className="flex justify-center items-center text-xl"></div>
      </div>
      <div className="flex justify-between">
        <Card className="w-96 h-fit">
          <List>
            <ListItem
              selected={selected === 1}
              // onClick={() => {setSelectedItem(1); getDataPostPublic();}}
            >
              Public
            </ListItem>
            <ListItem
              selected={selected === 2}
              // onClick={() =>{setSelectedItem(2); getDataPostApartment();}}
            >
              My Apartment
            </ListItem>
            <ListItem
              selected={selected === 3}
              onClick={() => setSelectedItem(3)}
            >
              Announcement
            </ListItem>
          </List>
        </Card>
        <div className="flex flex-col">
        {postData.map((val,key) => (
        <Card className="w-[50%] p-5">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full object-cover object-center"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="nature image"
              />
              <div className="ml-5">
                <Typography variant="h5">{val.name}</Typography>
                <Typography>2 hours ago</Typography>
              </div>
            </div>
            <Menu>
              <MenuHandler>
                <EllipsisHorizontalIcon className="h-8 w-8 cursor-pointer" />
              </MenuHandler>
              <MenuList className="flex flex-col gap-2">
                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                  <Avatar
                    variant="circular"
                    alt="tania andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      Tania send you a message
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                      <ClockIcon />
                      13 minutes ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                  <Avatar
                    variant="circular"
                    alt="natali craig"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      Natali replied to your email.
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                      <ClockIcon />1 hour ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                  <Avatar
                    variant="circular"
                    alt="paypal"
                    src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      You&apos;ve received a payment.
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                      <ClockIcon />5 hours ago
                    </Typography>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="mt-5">
            <Typography>
              {val.details}
            </Typography>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-5">
              {data.map(({ imageLink }, index) => (
                <div key={index}>
                  <img
                    className="h-40 w-40 rounded-lg object-cover object-center"
                    src={imageLink}
                    alt="gallery-photo"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Typography>comments</Typography>
          </div>
          <div className="border" />
          <div className="flex mt-5">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
            <div className="ml-5">
              <Typography variant="h6">The Room52 Apartment</Typography>
              <Typography>2 hours ago</Typography>
            </div>
          </div>

          <div className="flex items-center mt-5">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
            <div className="w-[90%] ml-5 mr-2">
              <Input
                type="email"
                placeholder="Comment..."
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <IconButton>
              <PaperAirplaneIcon className="w-5 h-5" />
            </IconButton>
          </div>
        </Card>
        ))}
        </div>
        <Card className="p-5 h-fit">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
            <div className="ml-5">
              <Typography variant="h6">The Room52 Apartment</Typography>
            </div>
          </div>
          <div className="w-96">
            <Textarea onChange={changeCommunityPostHandler} name="details" variant="static" placeholder="Your Post" rows={8} />
            <div className="flex w-full justify-between py-1.5">
              <div className="items-center">
                <IconButton variant="text" color="blue-gray">
                  <PhotoIcon className="w-8 h-8" />
                </IconButton>
                <IconButton variant="text" color="blue-gray">
                  <MapPinIcon className="w-8 h-8 ml-2" />
                </IconButton>
              </div>
              <div className="flex gap-2">
                <Button onClick={sendDataCommunityPost} size="md" className="rounded-md">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}