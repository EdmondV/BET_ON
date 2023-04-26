import { color, hexToRgb } from 'styles-constants';
import { icons } from 'components/Icon/icons';

export const notificationStyles = {
  NotificationItem: {
    DefaultStyle: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 70,
      width: 350,
      paddingLeft: 60,
      margin: '14px 0',
      backgroundColor: `rgba(${hexToRgb(color.primaryLighted)}, 0.8)`,
      borderRadius: '1px',
      backgroundSize: '32px auto',
      backgroundPosition: '14px center',
      boxShadow: `0 0 0 4px rgba(${hexToRgb(color.danger)}, 0.6)`,
      border: 'none',
      left: '-44px',
      fontSize: 14,
      color: 'white',
      cursor: 'default',
    },
    success: {
      backgroundImage: `url(${icons.approve})`,
      boxShadow: `0 0 0 4px rgba(${hexToRgb(color.success)}, 0.6)`,
    },
    error: {
      backgroundImage: `url(${icons.error})`,
      boxShadow: `0 0 0 4px rgba(${hexToRgb(color.danger)}, 0.6)`,
    },
    info: {
      backgroundImage: `url(${icons.attention})`,
      boxShadow: `0 0 0 4px rgba(${hexToRgb(color.info)}, 0.6)`,
    },
  },
  MessageWrapper: {
    DefaultStyle: {
      padding: '2px 7px',
      width: 180,
    },
  },
  Dismiss: {
    DefaultStyle: {
      position: 'absolute',
      color: 'transparent',
      borderRadius: '0',
      lineHeight: 0,
      width: '11px',
      height: '11px',
      // compress bg styles
      backgroundColor: 'transparent',
      backgroundImage: `url(${icons.cross})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    },
  },
  Action: {
    DefaultStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      borderRadius: '2px',
      padding: 0,
      fontWeight: 'normal',
      margin: '0 auto',
      border: 'none',
      cursor: 'pointer',
    },
  },
  ActionWrapper: {
    DefaultStyle: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      width: 110,
      borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
    },
  },
};
