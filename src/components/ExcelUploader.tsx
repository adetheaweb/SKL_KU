import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, Download } from 'lucide-react';
import { type Student, type SubjectGrade, TEMPLATE_COLUMNS } from '../types';
import { motion } from 'motion/react';

interface Props {
  onDataLoaded: (students: Student[]) => void;
}

export const ExcelUploader: React.FC<Props> = ({ onDataLoaded }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws) as any[];

      const students: Student[] = data.map((row, index) => {
        // Map dynamic columns to subject grades
        const subjects: SubjectGrade[] = [
          { category: "Kelompok A", name: "Al-Quran Hadis", score: row["Al-Quran Hadis"] || 0 },
          { category: "Kelompok A", name: "Akidah Akhlak", score: row["Akidah Akhlak"] || 0 },
          { category: "Kelompok A", name: "Fikih", score: row["Fikih"] || 0 },
          { category: "Kelompok A", name: "Sejarah Kebudayaan Islam", score: row["SKI"] || 0 },
          { category: "Kelompok A", name: "PPKN", score: row["PPKN"] || 0 },
          { category: "Kelompok A", name: "Bahasa Indonesia", score: row["Bahasa Indonesia"] || 0 },
          { category: "Kelompok A", name: "Bahasa Arab", score: row["Bahasa Arab"] || 0 },
          { category: "Kelompok A", name: "Matematika", score: row["Matematika"] || 0 },
          { category: "Kelompok A", name: "Sejarah Indonesia", score: row["Sejarah Indonesia"] || 0 },
          { category: "Kelompok A", name: "Bahasa Inggris", score: row["Bahasa Inggris"] || 0 },
          
          { category: "Kelompok B", name: "Seni Budaya", score: row["Seni Budaya"] || 0 },
          { category: "Kelompok B", name: "Penjasorkes", score: row["Penjasorkes"] || 0 },
          { category: "Kelompok B", name: "Prakarya", score: row["Prakarya"] || 0 },
          { category: "Kelompok B", name: "Bahasa Sunda", score: row["Bahasa Sunda"] || 0 },

          { category: "Kelompok C", name: "Ilmu Tafsir", score: row["Ilmu Tafsir"] || 0 },
          { category: "Kelompok C", name: "Ilmu Hadis", score: row["Ilmu Hadis"] || 0 },
          { category: "Kelompok C", name: "Ushul Fikih", score: row["Ushul Fikih"] || 0 },
          { category: "Kelompok C", name: "Bahasa Arab (P)", score: row["Bahasa Arab Keagamaan"] || 0 },
          { category: "Kelompok C", name: "Ekonomi", score: row["Ekonomi"] || 0 },
        ];

        return {
          id: `student-${index}`,
          nama: row["Nama"] || "Unknown Student",
          tempatLahir: row["Tempat Lahir"] || "Unknown",
          tanggalLahir: row["Tanggal Lahir"] || "2000-01-01",
          nisn: row["NISN"]?.toString() || "0000000000",
          nomorPeserta: row["Nomor Peserta"]?.toString() || "00-00-00-0-0000-0000",
          satuanPendidikan: "MAN 1 TASIKMALAYA", // Default or from row
          npsn: "20276807",
          nomorSKL: row["Nomor SKL"] || "0447/Ma.10.06.0020/PP.01.1/SKL/05/2025",
          tanggalKelulusan: row["Tanggal Kelulusan"] || "05 Mei 2025",
          grades: subjects,
        };
      });

      onDataLoaded(students);
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([TEMPLATE_COLUMNS]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "MailMerge_Template.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 group transition-all">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <div className="mb-6 inline-flex p-5 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
          <FileSpreadsheet className="w-16 h-16 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Connect Your Data</h3>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto text-sm leading-relaxed">
          Upload an Excel database to instantly generate professional graduation certificates and official transcripts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transform active:scale-95 transition-all shadow-md shadow-blue-200 w-full sm:w-auto">
            <Upload className="w-4 h-4" />
            <span>Select Excel File</span>
            <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileUpload} />
          </label>
          
          <button 
            onClick={downloadTemplate}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transform active:scale-95 transition-all w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
