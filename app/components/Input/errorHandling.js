export const getError = (field, error) => {
  let msgId = '';
  if (error === 'required') {
    msgId = 'field_required_error';
  } else {
    msgId = `${field}_${error}_error`;
  }
  return msgId;
};
