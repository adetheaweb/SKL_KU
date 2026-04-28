export interface Student {
  id: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  nisn: string;
  nomorPeserta: string;
  satuanPendidikan: string;
  npsn: string;
  nomorSKL: string;
  tanggalKelulusan: string;
  nomorSertifikat?: string;
  grades: SubjectGrade[];
}

export interface SubjectGrade {
  category: "Kelompok A" | "Kelompok B" | "Kelompok C" | "Muatan Lokal" | "Pilihan";
  name: string;
  score: number;
  word?: string;
}

export interface MadrasahConfig {
  nama: string;
  alamat: string;
  kota: string;
  provinsi: string;
  kepalaNama: string;
  kepalaNip: string;
  logoUrl?: string;
}

export const TEMPLATE_COLUMNS = [
  "Nama",
  "Tempat Lahir",
  "Tanggal Lahir",
  "NISN",
  "Nomor Peserta",
  "Nomor SKL",
  "Tanggal Kelulusan",
  "Al-Quran Hadis",
  "Akidah Akhlak",
  "Fikih",
  "SKI",
  "PPKN",
  "Bahasa Indonesia",
  "Bahasa Arab",
  "Matematika",
  "Sejarah Indonesia",
  "Bahasa Inggris",
  "Seni Budaya",
  "Penjasorkes",
  "Prakarya",
  "Bahasa Sunda",
  "Ilmu Tafsir",
  "Ilmu Hadis",
  "Ushul Fikih",
  "Bahasa Arab Keagamaan",
  "Ekonomi"
];
