export function numberToWordsIndonesian(n: number): string {
  const units = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan"];
  
  if (n === 0) return "Nol";
  if (n < 10) return units[n];
  if (n === 10) return "Sepuluh";
  if (n === 11) return "Sebelas";
  if (n < 20) return units[n % 10] + " Belas";
  if (n < 100) {
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return units[ten] + " Puluh " + units[unit];
  }
  
  // For standard school grades (usually 0-100), this is enough.
  // But let's add digits-only conversion as often seen in transcripts (94 -> Sembilan Empat)
  return n.toString().split('').map(digit => {
    if (digit === '0') return 'Nol';
    if (digit === '.') return 'Koma';
    return units[parseInt(digit)];
  }).join(' ');
}

export function formatGradeToWords(n: number): string {
  // Common transcript format: 93.79 -> Sembilan Tiga Koma Tujuh Sembilan
  const str = n.toString();
  const digitsMap: Record<string, string> = {
    '0': 'Nol', '1': 'Satu', '2': 'Dua', '3': 'Tiga', '4': 'Empat',
    '5': 'Lima', '6': 'Enam', '7': 'Tujuh', '8': 'Delapan', '9': 'Sembilan',
    '.': 'Koma', ',': 'Koma'
  };
  
  return str.split('').map(char => digitsMap[char] || char).join(' ');
}
