export function getHalfOfText(text: string) {
  // Menghitung panjang teks
  const length = text.length;

  // Menentukan titik tengah teks
  const midpoint = Math.floor(length / 2);

  // Mengembalikan setengah dari teks
  return text.slice(0, midpoint);
}

export function getFirstNWords(text: string, numWords: number) {
  // Memecah teks menjadi array kata-kata
  const words = text.split(/\s+/);

  // Mengambil N kata pertama
  const selectedWords = words.slice(0, numWords);

  // Menggabungkan kata-kata menjadi teks kembali
  return selectedWords.join(" ");
}
