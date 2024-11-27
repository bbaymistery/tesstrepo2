export const getPostCode = (pickUpPoints) => {
  let postCode = pickUpPoints[0]?.postcode
    ? pickUpPoints[0]?.postcode
    : String(pickUpPoints[0]?.address).match(
        /(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)/g
      )[0];

  return postCode;
};
