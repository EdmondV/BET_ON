const CARD_STATUS = {
  IN_REVIEW: 0,
  UNAPPROVED: 1,
  DECLINED: 2,
  APPROVED: 3,
};

const LOG_DEPOSIT_TYPE = {
  DEPOSIT: 1,
  WITHDRAWAL: 2,
};

const LOG_DEPOSIT_STATUS = {
  IN_PROGRESS: 1,
  COMPLETE: 2,
  FAILED: 3,
};

export {
  CARD_STATUS,
  LOG_DEPOSIT_STATUS,
  LOG_DEPOSIT_TYPE,
};


export const cardStatusMessages = (status) => {
  switch (status) {
    case CARD_STATUS.UNAPPROVED:
      return 'Unapproved';
    case CARD_STATUS.IN_REVIEW:
      return 'In review';
    case CARD_STATUS.APPROVED:
      return 'Approved';
    case CARD_STATUS.DECLINED:
      return 'Declined';
    default:
      return '';
  }
};

export const LogDepositTypeMessages = (type) => {
  switch (type) {
    case LOG_DEPOSIT_TYPE.DEPOSIT:
      return 'Deposit';
    case LOG_DEPOSIT_TYPE.WITHDRAWAL:
      return 'Withdrawal';
    default:
      return '';
  }
};

export const LogDepositStatusMessages = (status) => {
  switch (status) {
    case LOG_DEPOSIT_STATUS.IN_PROGRESS:
      return 'In Progress';
    case LOG_DEPOSIT_STATUS.COMPLETE:
      return 'Complete';
    case LOG_DEPOSIT_STATUS.FAILED:
      return 'Failed';
    default:
      return '';
  }
};
