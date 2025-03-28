import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import axios from "axios";

export default function SidebarWithBurgerMenu() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name,setName]=useState("Guest");
  const [picture,setPicture]=useState("user-icon-svgrepo-com.svg");
  const [isAuthorized,setIsAuthorized]=useState(true);
  const navigate=useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/api/authstatus`,{withCredentials:true})
      .then((response)=>{
          const {name,image}=response.data;
           setName(name);
           setPicture(image.url);
           setIsAuthorized(false);
      })
      .catch((err)=>{
        setName("Guest");
        setPicture("user-icon-svgrepo-com.svg");
        setIsAuthorized(true);
         console.log("not found");
      })

  },[isDrawerOpen])


  const handleclick = async () => {

    if(isAuthorized)
    {
      navigate("/login");
    }
    else
    {

    
       try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/loginform/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("logout done successfuly");
        navigate("/")
        setIsDrawerOpen(false);
        setIsAuthorized(true);
      } else {
        console.log("logout unsuccessful");
        setIsAuthorized(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
}

  return (
    <>
      <IconButton variant="text" size="lg" color="white" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img src={picture} alt="brand" className="h-10 " />
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
          </div>

          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <img
                      src="cricket-game-svgrepo-com.svg"
                      alt=""
                      className="h-5"
                    ></img>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    My Cricket
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/mycricket">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Matches
                    </ListItem>
                  </Link>
                  <Link to="/mystats">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Stats
                    </ListItem>
                  </Link>
                  <Link to="/myteams">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Teams
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <Link to="/profilepage">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            {(isAuthorized)?(
              <ListItem>
                <ListItemPrefix>
                  <img
                    src="cricket-svgrepo-com.svg"
                    className="h-4"
                    alt="imagica"
                  ></img>
                </ListItemPrefix>
               Login To Start A Match
              </ListItem>):(<Link to="/startmatch">
              <ListItem>
                <ListItemPrefix>
                  <img
                    src="cricket-svgrepo-com.svg"
                    className="h-4"
                    alt="imagica"
                  ></img>
                </ListItemPrefix>
                Start A Match
              </ListItem>
            </Link>)}
            
            <ListItem onClick={handleclick} >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5"  />
              </ListItemPrefix>
                  {isAuthorized?"Login":"Logout"}  
           </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
