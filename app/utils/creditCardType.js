import creditCardType from 'credit-card-type';

export function determineCardType(number) {
  const firstNumbers = number ? number.substr(0, 4) : '';
  if (!creditCardType(firstNumbers) || !creditCardType(firstNumbers)[0] || !firstNumbers) return null;
  return creditCardType(firstNumbers)[0].niceType.toLowerCase();
}
