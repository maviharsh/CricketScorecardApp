import { Link } from 'react-router-dom';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Form from './Community/CommunityForms/Form';
import Form2 from './Community/CommunityForms/CoachForm';
import GroundForm from './Community/CommunityForms/GroundForm';
import CoachForm from './Community/CommunityForms/CoachForm.js'
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
 import Carding from './Community/Elements/Card';
import IndividualPage from './Community/CommunityPages/CoachPage';
import HomePage from './Community/CommunityPages/HomePage';
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
import CoachPage from './Community/CommunityPages/CoachPage';
import CommentatorPage from './Community/CommunityPages/CommentatorPage.js';
import GroundPage from './Community/CommunityPages/GroundPage.js';
import UmpirePage from './Community/CommunityPages/UmpirePage.js';
import ScorerPage from './Community/CommunityPages/ScorerPage.js';
import ShopPage from './Community/CommunityPages/ShopPage.js';
import StreamerPage from './Community/CommunityPages/StreamerPage.js';
import TShirtPage from './Community/CommunityPages/TShirtPage.js';


export const routes=[
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
      path:"/groundform",
      element:
      <div>
          <Header />
        <GroundForm />,
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
      path:"/coachpage",
      element:
      <div>
          <Header />
        <CoachPage />,
        <Footer />
        </div>
    },
    {
      path:"/scorerpage",
      element:
      <div>
          <Header />
        <ScorerPage />,
        <Footer />
        </div>
    },{
      path:"/commentatorpage",
      element:
      <div>
          <Header />
        <CommentatorPage />,
        <Footer />
        </div>
    },{
      path:"/groundpage",
      element:
      <div>
          <Header />
        <GroundPage />,
        <Footer />
        </div>
    },{
      path:"/streamerpage",
      element:
      <div>
          <Header />
        <StreamerPage />,
        <Footer />
        </div>
    },{
      path:"/tshirtpage",
      element:
      <div>
          <Header />
        <TShirtPage />,
        <Footer />
        </div>
    },{
      path:"/umpirepage",
      element:
      <div>
          <Header />
        <UmpirePage />,
        <Footer />
        </div>
    },{
      path:"/shoppage",
      element:
      <div>
          <Header />
        <ShopPage />,
        <Footer />
        </div>
    },
    {
      path:"/scorerform",
      element:
      <div>
          <Header />
        <Form photo={"scorecard-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/coachform",
      element:
      <div>
          <Header />
        <CoachForm photo={"manager-boss-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/commentatorform",
      element:
      <div>
          <Header />
        <Form photo={"commentator-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/streamerform",
      element:
      <div>
          <Header />
        <Form photo={"stream-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/tshirtform",
      element:
      <div>
          <Header />
        <CoachForm photo={"orange-tshirt-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/umpireform",
      element:
      <div>
          <Header />
        <Form photo={"referee-svgrepo-com.svg"} />,
        <Footer />
        </div>
    },
    {
      path:"/shopform",
      element:
      <div>
          <Header />
        <CoachForm photo={"shops-shop-svgrepo-com.svg"} />,
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