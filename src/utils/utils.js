export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getFlagEmoji(countryCode) {
  if (countryCode != null) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  } else {
    return String.fromCodePoint("127758");
  }
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
