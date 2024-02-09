function standardDate(date: Date | string | undefined): string {
  if (date === undefined) {
    return '';
  }
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
function detailedDate(date: Date | string | undefined): string {
  if (date === undefined) {
    return '';
  }
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

function cpt2Dec(cptCode: string | undefined): number {
  return parseInt(cptCode || '0', 36);
}

function dec2Cpt(dec: number): string {
  let cpt = dec.toString(36);
  while (cpt.length < 5) {
    cpt = '0' + cpt;
  }
  return cpt.toUpperCase();
}

export { standardDate, detailedDate, cpt2Dec, dec2Cpt };
