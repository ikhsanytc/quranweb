export interface Quran {
  code: number;
  message: string;
  data: QuranDatum[];
}

export interface QuranLengkap {
  code: number;
  message: string;
  data: QuranDataLengkap;
}

export interface QuranDatum {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
}

export interface AudioFull {
  "01": string;
  "02": string;
  "03": string;
  "04": string;
  "05": string;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioFull;
}

export interface SuratSelanjutnya {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export interface QuranDataLengkap {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
  ayat: Ayat[];
  suratSelanjutnya: SuratSelanjutnya;
  suratSebelumnya: boolean;
}

export interface LoginT {
  email: string;
  password: string;
}

export interface RegisterT {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LinkNavbar {
  display: string;
  path: string;
}