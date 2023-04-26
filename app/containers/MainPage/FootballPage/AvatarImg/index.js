import avatarUser from './avatars/neymar.png';
import avatar1 from './avatars/avatar-2.jpg';
import avatar2 from './avatars/avatar-7.jpg';
import avatar3 from './avatars/avatar-9.jpg';
import avatar4 from './avatars/avatar-10.jpg';
import avatar5 from './avatars/avatar-11.jpg';
import avatar6 from './avatars/avatar-12.jpg';
import avatar7 from './avatars/avatar-13.jpg';
import avatar8 from './avatars/avatar-16.jpg';
import avatar9 from './avatars/avatar-19.jpg';

const Img = (name) => {
  switch (name) {
    case 'Jack Nicholson':
      return avatar1;
    case 'Michael Caine':
      return avatar2;
    case 'Dustin Hoffman':
      return avatar3;
    case 'Marlon Brando':
      return avatar4;
    case 'Tom Hanks':
      return avatar5;
    case 'Robert De Niro':
      return avatar6;
    case 'Robin Williams':
      return avatar7;
    case 'Daniel Day-Lewis':
      return avatar8;
    case 'Spencer Tracy':
      return avatar9;
    default:
      return avatarUser;
  }
};

export default function AvatarImg(name) {
  return Img(name);
}
