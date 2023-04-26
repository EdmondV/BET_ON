import React from 'react';
import SoccerIcon from './Soccer/SoccerIcon';
import EgamesIcon from './Egames/EgamesIcon';
import HockeyIcon from './Hockey/HockeyIcon';
import BasketballIcon from './Basketball/BasketballIcon';
import BaseballIcon from './Baseball/BaseballIcon';
import MoreIcon from './More/MoreIcon';


const Icon = {
  baseball: <BaseballIcon />,
  soccer: <SoccerIcon />,
  egames: <EgamesIcon />,
  basketball: <BasketballIcon />,
  hockey: <HockeyIcon />,
  more: <MoreIcon />,
};

export default function MenuIcon({ name }) {
  return Icon[name] || <SoccerIcon />;
}
