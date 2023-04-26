import React from 'react';
import PSGLogo from '../TeamLogo/PSG.png';
import BrcLogo from '../TeamLogo/BRC.png';
import BraLogo from '../TeamLogo/BRA.png';
import GerLogo from '../TeamLogo/GER.png';
import RealLogo from '../TeamLogo/RMD.png';
import DorLogo from '../TeamLogo/DOR.png';
import S04Logo from '../TeamLogo/S04.png';
import SpmLogo from '../TeamLogo/SPM.png';
import RkaLogo from '../TeamLogo/RKA.png';

const Logo = (name) => {
  switch (name.toLowerCase()) {
    case 'bar':
    case 'brc':
      return <img src={BrcLogo} alt={name} />;
    case 'psg':
      return <img src={PSGLogo} alt={name} />;
    case 'bra':
      return <img src={BraLogo} alt={name} />;
    case 'ger':
      return <img src={GerLogo} alt={name} />;
    case 'rma':
      return <img src={RealLogo} alt={name} />;
    case 'dor':
      return <img src={DorLogo} alt={name} />;
    case 's04':
      return <img src={S04Logo} alt={name} />;
    case 'rka':
      return <img src={RkaLogo} alt={name} />;
    case 'spm':
      return <img src={SpmLogo} alt={name} />;
    default:
      return <img src={PSGLogo} alt={name} />;
  }
};

export default function TeamLogo({ name }) {
  return Logo(name);
}
