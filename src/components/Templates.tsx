/** @license SPDX-License-Identifier: Apache-2.0 */
import React from 'react';
import { type Student, type MadrasahConfig } from '../types';
import { formatGradeToWords } from '../lib/formatter';

interface Props {
  student: Student;
  config: MadrasahConfig;
}

export const SKLTemplate: React.FC<Props> = ({ student, config }) => {
  return (
    <div id={`skl-${student.id}`} className="relative w-[210mm] min-h-[297mm] h-fit bg-white p-[20mm] mx-auto shadow-lg print:shadow-none print:m-0 print:p-[15mm] flex flex-col font-serif text-gray-900 border-[1px] border-gray-200 print:border-none print:break-after-page overflow-hidden">
      {/* Watermark */}
      {config.logoUrl && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <img src={config.logoUrl} alt="Watermark" className="w-[120mm] h-[120mm] object-contain rotate-0" />
        </div>
      )}

      {/* Content wrapper with relative z-index to stay above watermark if needed */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center border-b-4 border-double border-black pb-4 mb-8">
          <div className="w-24 h-24 flex-shrink-0 bg-white flex items-center justify-center border border-slate-200 overflow-hidden">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center border border-dashed border-gray-300">
                <span className="text-[10px] text-center text-gray-400 p-2">LOGO KEMENAG</span>
              </div>
            )}
          </div>
          <div className="flex-1 text-center font-bold">
            <h2 className="text-xl">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
            <h1 className="text-2xl uppercase">{config.nama || student.satuanPendidikan}</h1>
            <p className="text-sm font-normal italic">{config.alamat}</p>
            <p className="text-sm font-normal italic">{config.kota} , {config.provinsi}</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold border-b-2 border-black inline-block mb-1">SURAT KETERANGAN LULUS</h3>
          <p className="font-bold">TAHUN AJARAN 2024/2025</p>
          <p className="text-sm">Nomor : {student.nomorSKL}</p>
        </div>

        <div className="mb-8 leading-relaxed">
          <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
          <div className="grid grid-cols-[200px_20px_1fr] gap-y-2 ml-10">
            <div className="font-medium">nama</div>
            <div>:</div>
            <div className="font-bold uppercase underline decoration-gray-400">{student.nama}</div>
            
            <div className="font-medium">tempat dan tanggal lahir</div>
            <div>:</div>
            <div className="uppercase">{student.tempatLahir}, {student.tanggalLahir}</div>
            
            <div className="font-medium">nomor induk siswa nasional</div>
            <div>:</div>
            <div>{student.nisn}</div>
            
            <div className="font-medium">nomor peserta ujian madrasah</div>
            <div>:</div>
            <div>{student.nomorPeserta}</div>
            
            <div className="font-medium">satuan pendidikan</div>
            <div>:</div>
            <div className="uppercase">{config.nama || student.satuanPendidikan}</div>
            
            <div className="font-medium">nomor pokok sekolah nasional</div>
            <div>:</div>
            <div>{student.npsn}</div>
          </div>
        </div>

        <p className="mb-8 text-justify">
          dinyatakan <span className="font-bold">LULUS</span> berdasarkan surat keputusan kepala <span className="font-bold">{config.nama || student.satuanPendidikan}</span> Nomor B.645/Ma.10.20/PP.01/05/2025 tanggal 05 Mei 2025 setelah memenuhi seluruh kriteria sesuai dengan peraturan perundang-undangan.
        </p>

        <p className="mb-12">Demikian surat keterangan ini dibuat untuk digunakan sebagaimana mestinya.</p>

        {/* Footer */}
        <div className="mt-auto grid grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative">
               <span className="text-[10px] text-gray-400">PAS FOTO 3X4</span>
               <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-xs">Preview</span>
               </div>
            </div>
          </div>
          <div className="text-center ml-auto pr-10">
            <p>{config.kota}, {student.tanggalKelulusan}</p>
            <p className="mb-20">Kepala Madrasah</p>
            <p className="font-bold underline">{config.kepalaNama}</p>
            <p className="text-sm">NIP. {config.kepalaNip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TranscriptTemplate: React.FC<Props> = ({ student, config }) => {
  const avg = student.grades.length > 0 
    ? (student.grades.reduce((sum, g) => sum + g.score, 0) / student.grades.length).toFixed(2)
    : "0.00";

  return (
    <div id={`transcript-${student.id}`} className="relative w-[210mm] min-h-[297mm] h-fit bg-white p-[20mm] mx-auto shadow-lg print:shadow-none print:m-0 print:p-[15mm] flex flex-col font-serif text-gray-900 border-[1px] border-gray-200 print:border-none mt-10 print:mt-0 print:break-after-page overflow-hidden">
      {/* Watermark */}
      {config.logoUrl && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <img src={config.logoUrl} alt="Watermark" className="w-[100mm] h-[100mm] object-contain rotate-0" />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center border-b-4 border-double border-black pb-4 mb-4">
          <div className="w-24 h-24 flex-shrink-0 bg-white flex items-center justify-center border border-slate-200 overflow-hidden">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center border border-dashed border-gray-300">
                <span className="text-[10px] text-center text-gray-400 p-2">LOGO KEMENAG</span>
              </div>
            )}
          </div>
          <div className="flex-1 text-center font-bold">
            <h2 className="text-lg">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
            <h1 className="text-xl uppercase">{config.nama || student.satuanPendidikan}</h1>
            <p className="text-[10px] font-normal italic">{config.alamat}</p>
            <p className="text-[10px] font-normal italic">{config.kota} , {config.provinsi}</p>
          </div>
        </div>

      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">TRANSKRIP NILAI</h3>
        <h4 className="text-md font-bold italic uppercase">Madrasah Aliyah Keagamaan</h4>
        <p className="font-bold">TAHUN AJARAN 2024/2025</p>
      </div>

      <div className="grid grid-cols-[200px_10px_1fr] text-sm gap-y-1 mb-6 max-w-2xl">
        <div>Satuan Pendidikan</div><div>:</div><div className="uppercase font-bold">{config.nama || student.satuanPendidikan}</div>
        <div>Nomor Pokok Sekolah Nasional</div><div>:</div><div>{student.npsn}</div>
        <div>Nama Lengkap</div><div>:</div><div className="uppercase font-bold">{student.nama}</div>
        <div>Tempat dan Tanggal Lahir</div><div>:</div><div className="uppercase">{student.tempatLahir}, {student.tanggalLahir}</div>
        <div>Nomor Induk Siswa Nasional</div><div>:</div><div>{student.nisn}</div>
        <div>Nomor SKL</div><div>:</div><div>{student.nomorSKL}</div>
        <div>Tanggal Kelulusan</div><div>:</div><div>{student.tanggalKelulusan}</div>
      </div>

      <table className="w-full border-collapse border border-black text-xs">
        <thead className="bg-gray-100 uppercase font-bold">
          <tr>
            <th rowSpan={2} className="border border-black p-2 w-12 text-center">No</th>
            <th rowSpan={2} className="border border-black p-2 text-left">Mata Pelajaran</th>
            <th colSpan={2} className="border border-black p-2 text-center">Nilai</th>
          </tr>
          <tr>
            <th className="border border-black p-1 w-20 text-center">Angka</th>
            <th className="border border-black p-1 w-48 text-center">Huruf</th>
          </tr>
        </thead>
        <tbody>
          {/* Kelompok A */}
          <tr className="font-bold italic bg-gray-50">
             <td colSpan={4} className="border border-black p-1">Kelompok A</td>
          </tr>
          {student.grades.filter(g => g.category === "Kelompok A").map((grade, idx) => (
             <tr key={idx}>
                <td className="border border-black p-1 text-center">{idx + 1}</td>
                <td className="border border-black p-1 pl-4">{grade.name}</td>
                <td className="border border-black p-1 text-center">{grade.score}</td>
                <td className="border border-black p-1 italic">{formatGradeToWords(grade.score)}</td>
             </tr>
          ))}
          
          {/* Kelompok B */}
          <tr className="font-bold italic bg-gray-50">
             <td colSpan={4} className="border border-black p-1">Kelompok B</td>
          </tr>
          {student.grades.filter(g => g.category === "Kelompok B").map((grade, idx) => (
             <tr key={idx}>
                <td className="border border-black p-1 text-center">{idx + 1}</td>
                <td className="border border-black p-1 pl-4">{grade.name}</td>
                <td className="border border-black p-1 text-center">{grade.score}</td>
                <td className="border border-black p-1 italic">{formatGradeToWords(grade.score)}</td>
             </tr>
          ))}

          {/* Kelompok C */}
          <tr className="font-bold italic bg-gray-50">
             <td colSpan={4} className="border border-black p-1">Kelompok C (Peminatan)</td>
          </tr>
          {student.grades.filter(g => g.category === "Kelompok C").map((grade, idx) => (
             <tr key={idx}>
                <td className="border border-black p-1 text-center">{idx + 1}</td>
                <td className="border border-black p-1 pl-4">{grade.name}</td>
                <td className="border border-black p-1 text-center">{grade.score}</td>
                <td className="border border-black p-1 italic">{formatGradeToWords(grade.score)}</td>
             </tr>
          ))}
          {/* Average */}
          <tr className="font-bold bg-gray-100">
             <td colSpan={2} className="border border-black p-1 text-center">Rata-Rata</td>
             <td className="border border-black p-1 text-center font-bold">{avg}</td>
             <td className="border border-black p-1 italic">{formatGradeToWords(Number(avg))}</td>
          </tr>
        </tbody>
      </table>

      {/* Footer Transcript */}
      <div className="mt-auto flex justify-end pr-10">
        <div className="text-center">
          <p className="text-sm">{config.kota}, {student.tanggalKelulusan}</p>
          <p className="mb-20 text-sm">Kepala Madrasah</p>
          <p className="font-bold underline">{config.kepalaNama}</p>
          <p className="text-sm">NIP. {config.kepalaNip}</p>
        </div>
      </div>
    </div>
  </div>
);
};
