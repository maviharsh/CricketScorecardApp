import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import Header from './Layout/Header';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Footer from './Layout/Footer';
import Form from './Community/Form';
import Form2 from './Community/CoachForm';
import GroundForm from './Community/GroundForm';
import PostPage from './LookingPage/PostPage';
import { InputWithButton } from './Message';
import BottomForm from './LookingPage/BottomForm';
import PlayerTeam from './LookingPage/PlayerTeamForm';
import TournamentForm from './LookingPage/TournamentForm';
import TournamentParticipateForm from './LookingPage/TournamentParticipate';
import OpponentForm from './LookingPage/OpponentForm';
import LookingHomePage from './LookingPage/LookingHomePage';
import CardPage from './Community/CardPage';
import MyCricketHomePage from './MyCricket/MyCricketHomePage';
 import Carding from './Community/Card';
import IndividualPage from './Community/IndividualPage';
import HomePage from './Community/HomePage';
import MyStats from './MyCricket/MyStats';
import Message from './Message';
import FrontHomePage from './HomePage/FrontHomePage';
import MyTeams from './MyCricket/MyTeams';
import ProfilePage from './MyCricket/ProfilePage';


const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
          <Header />
        <FrontHomePage />,
        <Footer />
        </div>
    },
    {
      path:"/looking",
      element:
      <div>
          <Header />
        <LookingHomePage />,
        <Footer />
        </div>
    },
    {
      path:"/mycricket",
      element:
      <div> 
          <Header />
        <MyCricketHomePage />,
        <Footer />
        </div>
    },
    {
      path:"/community",
      element:
      <div>
          <Header />
        <HomePage />,
        <Footer />
        </div>
    },
    {
      path:"/postpage",
      element:
      <div>
          <Header />
        <PostPage />,
        <Footer />
        </div>
    },
    {
      path:"/bottomform",
      element:
      <div>
          <Header />
        <BottomForm />,
        <Footer />
        </div>
    },
    {
      path:"/mystats",
      element:
      <div>
          <Header />
        <MyStats />,
        <Footer />
        </div>
    },
    {
      path:"/message",
      element:
      <div>
          <Header />
        <Message />,
        <Footer />
        </div>
    },
    {
      path:"/individualpage",
      element:
      <div>
          <Header />
        <IndividualPage />,
        <Footer />
        </div>
    },
    {
      path:"/form",
      element:
      <div>
          <Header />
        <Form />,
        <Footer />
        </div>
    },
    {
      path:"/myteams",
      element:
      <div>
        <Header />
         <MyTeams/>      
        <Footer />
      </div>
    },
    {
      path:"/profilepage",
      element:
      <div>
        <Header />
         <ProfilePage/>      
        <Footer />
      </div>
    },
    {
      path:"/tournamentform",
      element:
      <div>
        <Header />
         <TournamentForm/>      
        <Footer />
      </div>
    },
    {
      path:"/participateform",
      element:
      <div>
        <Header />
         <TournamentParticipateForm/>      
        <Footer />
      </div>
    },
    {
      path:"/opponentform",
      element:
      <div>
        <Header />
         <OpponentForm/>      
        <Footer />
      </div>
    },
    {
      path:"/playerteamform",
      element:
      <div>
        <Header />
         <PlayerTeam/>      
        <Footer />
      </div>
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
