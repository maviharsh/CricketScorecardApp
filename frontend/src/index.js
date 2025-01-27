import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import Header from './Layout/Header';
import {createBrowserRouter,Link,RouterProvider} from "react-router-dom";
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
import StartMatch from './MyCricket/StartMatch';
import AddNewTeam from './MyCricket/AddNewTeam';
import { Button } from '@material-tailwind/react';
import MatchDetails from './MyCricket/MatchDetails';
import Toss from './MyCricket/Toss';
import StartInnings from './MyCricket/StartInnings';
import ScoringPage from './Scoring/ScoringPage';
import ScoreBoard from './Scoring/ScoreBoard';
import NotFound from './Scoring/NotFound';


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
    },
    {
      path:"/startmatch",
      element:
      <div>
        <Header />
         <StartMatch />      
        <Footer />
      </div>
    },
    {
      path:"/addnewteam",
      element:
      <div>
        <Header />
         <AddNewTeam />      
        <Footer />
      </div>
    },
    {
      path:"/selectteam",
      element:
      <div>
        <Header />
         <MyTeams />   
         <Link to="/addnewteam"> 
         <div className='flex justify-center'>
         <Button >Add New Team</Button>  
         </div>
         </Link>
        <Footer />
      </div>
    },
    {
      path:"/matchdetails",
      element:
      <div>
        <Header />
        <MatchDetails />
        <Footer />
      </div>
    },
    {
      path:"/tosspage",
      element:
      <div>
        <Header />
        <Toss />
        <Footer />
      </div>
    },
    {
      path:"/startinnings",
      element:
      <div>
        <Header />
        <StartInnings team1={"11 Kings"} team2={"ABES Kings"}/>
        <Footer />
      </div>
    },
    {
      path:"/scoringpage",
      element:
      <div>
        <Header />
        <ScoringPage />
        <Footer />
      </div>
    },
    {
      path:"/score",
      element:
      <div>
        <Header />
        <ScoreBoard />
        <Footer />
      </div>
    },
    {
          path:"*",
          element:
          <div>
            <Header />
            <NotFound />
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
