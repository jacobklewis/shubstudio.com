function standardDate(dateStr: string | undefined): string {
  if (dateStr === undefined) {
    return '';
  }
  return new Date(dateStr).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
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

export { standardDate, cpt2Dec, dec2Cpt };
