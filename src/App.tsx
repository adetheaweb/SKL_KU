/** @license SPDX-License-Identifier: Apache-2.0 */
import React, { useState } from 'react';
import { ExcelUploader } from './components/ExcelUploader';
import { SKLTemplate, TranscriptTemplate } from './components/Templates';
import { type Student, type MadrasahConfig } from './types';
import { Printer, Users, Eye, FileText, LayoutGrid, Settings, Upload, Image as ImageIcon, Download, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

const GuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-xl font-bold">Panduan Penggunaan Wacana Negeri SKL</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</div>
              <h3>Persiapan Database Excel</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">
              Siapkan file Excel (.xlsx) dengan kolom yang sesuai: <strong>nama, nisn, tempatLahir, tanggalLahir, nomorPeserta, npsn, nomorSKL, tanggalKelulusan</strong>. Pastikan tidak ada baris kosong di tengah data.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">2</div>
              <h3>Pengaturan Identitas Madrasah</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">
              Buka menu <strong>"Settings"</strong> di sidebar. Masukkan Nama Madrasah, Alamat, Kota, dan Nama Kepala Madrasah. Unggah logo Madrasah (PNG/JPG) untuk hasil yang profesional.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">3</div>
              <h3>Pratinjau & Pengecekan</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">
              Klik nama siswa di daftar sidebar untuk melihat tampilan dokumen. Anda bisa beralih antara mode <strong>"SKL"</strong> atau <strong>"TRANSCRIPT"</strong> melalui tombol di bagian atas pratinjau.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">4</div>
              <h3>Mencetak ke PDF</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">
              Untuk mencetak satu siswa, klik ikon <strong>Print Documents</strong> di pojok kanan atas. Untuk mencetak seluruh siswa sekaligus, gunakan tombol <strong>"DOWNLOAD SEMUA SKL"</strong> yang ada di bawah daftar siswa.
            </p>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl ml-8">
              <p className="text-xs text-amber-800">
                <strong>Tips Cetak:</strong> Saat jendela print muncul, pastikan "Destination" adalah "Save as PDF", Ukuran kertas "A4", dan "Margins" diatur ke "None" untuk hasil terbaik.
              </p>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Mengerti, Siap Mulai!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<'skl' | 'transcript'>('skl');
  const [activeTab, setActiveTab] = useState<'students' | 'settings'>('students');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const [config, setConfig] = useState<MadrasahConfig>({
    nama: "MAN 1 TASIKMALAYA",
    alamat: "JL. TAMAN PAHLAWAN KHZ. MUSTHAFA SUKAMANAH",
    kota: "Tasikmalaya",
    provinsi: "Jawa Barat",
    kepalaNama: "H. HUSEN, M.Pd",
    kepalaNip: "197201081997031004",
    logoUrl: ""
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setConfig(prev => ({ ...prev, logoUrl: evt.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset data? Seluruh data yang diupload akan hilang.")) {
      setStudents([]);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation - Hidden on Print */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col print:hidden">
        <div className="p-6 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-sm">W</div>
            <h1 className="text-lg font-bold tracking-tight">Wacana <span className="text-blue-600 font-normal">Negeri SKL</span></h1>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button 
               onClick={() => setActiveTab('students')}
               className={cn(
                 "flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2",
                 activeTab === 'students' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
               )}
             >
               <Users className="w-3.5 h-3.5" />
               STUDENTS
             </button>
             <button 
               onClick={() => setActiveTab('settings')}
               className={cn(
                 "flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2",
                 activeTab === 'settings' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
               )}
             >
               <Settings className="w-3.5 h-3.5" />
               SETTINGS
             </button>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'students' ? (
            <>
              {/* Step Indicators */}
              <div className="mb-8 space-y-2">
                 <div className={cn(
                   "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                   !students.length ? "bg-blue-50 text-blue-700" : "text-slate-400"
                 )}>
                    <span className={cn("text-[10px] font-bold w-5 h-5 flex items-center justify-center border rounded-full", !students.length ? "bg-white border-blue-200" : "border-slate-200")}>1</span>
                    <span>Upload Data Source</span>
                 </div>
                 <div className={cn(
                   "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                   students.length > 0 ? "bg-blue-50 text-blue-700" : "text-slate-400"
                 )}>
                    <span className={cn("text-[10px] font-bold w-5 h-5 flex items-center justify-center border rounded-full", students.length > 0 ? "bg-white border-blue-200" : "border-slate-200")}>2</span>
                    <span>Review & Merge</span>
                 </div>
              </div>

              {students.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Student List ({students.length})</h3>
                   <div className="space-y-1">
                     {students.map((student) => (
                        <button
                          key={student.id}
                          onClick={() => setSelectedStudent(student)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group",
                            selectedStudent?.id === student.id 
                              ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
                              : "hover:bg-slate-50 text-slate-600"
                          )}
                        >
                          <span className="truncate">{student.nama}</span>
                          {selectedStudent?.id === student.id && <Eye className="w-3.5 h-3.5 opacity-70" />}
                        </button>
                      ))}
                   </div>
                   <div className="mt-4 px-3">
                      <button 
                        onClick={() => {
                          setViewMode('skl');
                          setTimeout(() => {
                            window.print();
                          }, 500);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        DOWNLOAD SEMUA SKL
                      </button>
                      <button 
                        onClick={() => {
                          setViewMode('transcript');
                          setTimeout(() => {
                            window.print();
                          }, 500);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-95 border border-slate-200"
                      >
                        <Download className="w-4 h-4" />
                        DOWNLOAD SEMUA TRANSKRIP
                      </button>
                   </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6 pt-2">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Madrasah Identity</h3>
                
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex flex-col items-center gap-3 mb-4">
                    <div className="w-20 h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
                      {config.logoUrl ? (
                         <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <label className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                      Change Logo
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400">School Name</label>
                    <input 
                      type="text" 
                      value={config.nama} 
                      onChange={(e) => setConfig(prev => ({ ...prev, nama: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400">Address</label>
                    <textarea 
                      value={config.alamat} 
                      onChange={(e) => setConfig(prev => ({ ...prev, alamat: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-20 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400">City</label>
                      <input 
                        type="text" 
                        value={config.kota} 
                        onChange={(e) => setConfig(prev => ({ ...prev, kota: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400">Province</label>
                      <input 
                        type="text" 
                        value={config.provinsi} 
                        onChange={(e) => setConfig(prev => ({ ...prev, provinsi: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 pt-4">Principal (Signature)</h3>
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400">Full Name & Title</label>
                    <input 
                      type="text" 
                      value={config.kepalaNama} 
                      onChange={(e) => setConfig(prev => ({ ...prev, kepalaNama: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400">NIP</label>
                    <input 
                      type="text" 
                      value={config.kepalaNip} 
                      onChange={(e) => setConfig(prev => ({ ...prev, kepalaNip: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {students.length > 0 && (
          <div className="p-4 border-t border-slate-100">
            <div className="p-4 bg-slate-900 rounded-xl text-white">
              <p className="text-[10px] opacity-60 mb-1 font-bold uppercase tracking-wider">Loaded Data</p>
              <p className="text-sm font-medium truncate mb-1">Graduation_Database.xlsx</p>
              <button 
                onClick={handleReset}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-tighter"
              >
                Clear Data
              </button>
            </div>
          </div>
        )}

        <div className="p-4 mt-auto border-t border-slate-100">
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm"
          >
            <HelpCircle className="w-5 h-5" />
            Panduan Penggunaan
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Hidden on Print */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 print:hidden">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mode:</span>
               <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('skl')}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                      viewMode === 'skl' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    SKL
                  </button>
                  <button 
                    onClick={() => setViewMode('transcript')}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                      viewMode === 'transcript' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    TRANSCRIPT
                  </button>
               </div>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            {selectedStudent && (
              <span className="text-sm text-slate-500">
                Viewing: <span className="font-bold text-slate-900">{selectedStudent.nama}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
             {students.length > 0 && (
               <button 
                 onClick={handlePrint}
                 className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2 transform active:scale-95 transition-all shadow-blue-100"
               >
                 <Printer className="w-4 h-4" />
                 Print Documents
               </button>
             )}
          </div>
        </header>

        {/* Workspace area */}
        <div className="flex-1 overflow-y-auto p-12 print:p-0 print:overflow-visible">
          {!students.length ? (
            <div className="max-w-2xl mx-auto py-20">
               <ExcelUploader onDataLoaded={(data) => {
                  setStudents(data);
                  setSelectedStudent(data[0]);
               }} />
            </div>
          ) : (
            <>
              {/* UI Preview */}
              <div className="max-w-4xl mx-auto flex flex-col items-center print:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStudent?.id + viewMode}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white shadow-2xl shadow-slate-200 border border-slate-200 rounded-sm overflow-hidden"
                  >
                    {selectedStudent && (
                      viewMode === 'skl' ? <SKLTemplate student={selectedStudent} config={config} /> : <TranscriptTemplate student={selectedStudent} config={config} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Print Only Container - This is what the PDF gets */}
              <div className="hidden print:block w-full">
                {students.map((student) => (
                  <React.Fragment key={student.id}>
                    {viewMode === 'skl' ? (
                      <SKLTemplate student={student} config={config} />
                    ) : (
                      <TranscriptTemplate student={student} config={config} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <style>{`
        @media print {
          body { background: white !important; margin: 0; padding: 0; }
          @page { size: A4; margin: 0; }
          aside, header, .print-hidden { display: none !important; }
          .print-break { break-after: page; }
        }
      `}</style>
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}

