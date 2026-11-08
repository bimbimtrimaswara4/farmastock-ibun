import React, { useState } from 'react';
import { 
  Building2, Camera, FileText, Package, RefreshCw, 
  Search, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRightLeft,
  Calendar, CreditCard, UploadCloud, FileSpreadsheet, Lock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showScanModal, setShowScanModal] = useState(false);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);

  // Master Data Obat Puskesmas Ibun
  const [masterBarang] = useState([
    { id: '1', kode: 'OBT-001', nama: 'Amoxicillin 500mg', kategori: 'Antibiotik', satuan: 'Kaplet', stok: 1250, harga: 450, ed: '2028-05-10', batch: 'BTC-AMX-091' },
    { id: '2', kode: 'OBT-002', nama: 'Paracetamol 500mg', kategori: 'Analgetik', satuan: 'Tablet', stok: 3400, harga: 250, ed: '2027-11-20', batch: 'BTC-PCT-881' },
    { id: '3', kode: 'BMHP-001', nama: 'Spuit 3cc', kategori: 'BMHP', satuan: 'Pcs', stok: 450, harga: 1200, ed: '2029-01-15', batch: 'BTC-SPT-332' }
  ]);

  // Audit Log Immutable
  const [auditLogs] = useState([
    { id: 'LOG-001', time: '2026-11-09 08:30:12', user: 'apt. Bimbim Trimaswara, S.Farm', action: 'OCR_SCAN_FAKTUR', detail: 'Pindai Faktur FK-KF/2026/11/0491 (PT Kimia Farma)', status: 'SUCCESS' },
    { id: 'LOG-002', time: '2026-11-09 08:32:05', user: 'Asisten Apoteker 1', action: 'POST_TRANSAKSI_MASUK', detail: 'Posting Transaksi TRX/2026/11/0001 (Amoxicillin & Paracetamol)', status: 'SUCCESS' }
  ]);

  // Form Barang Masuk (Manual / AI OCR)
  const [formMasuk, setFormMasuk] = useState({
    noFaktur: '',
    pbf: '',
    namaBarang: 'Amoxicillin 500mg',
    batch: '',
    ed: '',
    jumlah: '',
    harga: ''
  });

  // Ekstraksi Foto Faktur PBF
  const handleSimulateOCR = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingOcr(true);
    setTimeout(() => {
      setFormMasuk({
        noFaktur: 'FK-KF/2026/11/' + Math.floor(1000 + Math.random() * 9000),
        pbf: 'PT Kimia Farma Trading & Distribution',
        namaBarang: 'Amoxicillin 500mg',
        batch: 'BTC-AMX-' + Math.floor(100 + Math.random() * 900),
        ed: '2028-10-15',
        jumlah: '1000',
        harga: '450'
      });
      setIsProcessingOcr(false);
      setShowScanModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header Institusi */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">FARMASTOCK INTEGRATED</h1>
              <p className="text-xs text-slate-400 mt-1">Puskesmas Ibun • Penanggung Jawab: <span className="text-emerald-400 font-medium">apt. Bimbim Trimaswara, S.Farm</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> BPK Audit Ready
            </span>
            <span className="text-slate-400">|</span>
            <span>Hotline: <strong className="text-slate-200">088971231976</strong></span>
          </div>
        </div>

        {/* 6 Menu Utama */}
        <nav className="bg-slate-800/50 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 flex space-x-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'master', label: 'Data Barang' },
              { id: 'masuk', label: 'Barang Masuk (OCR)' },
              { id: 'keluar', label: 'Barang Keluar' },
              { id: 'kartustok', label: 'Kartu Stok' },
              { id: 'audit', label: 'Laporan & Audit' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-emerald-400 text-emerald-400 bg-slate-800'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Total Persediaan</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">5,100 Item</h3>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium">Ledger Synchronized</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Alert Kedaluwarsa (ED)</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">0 Item</h3>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-medium">Aman (&gt;6 Bulan)</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Penerimaan Bulan Ini</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">12 Faktur</h3>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">Verified via OCR</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Status Periode</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">TERBUKA (AKTIF)</h3>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">Periode: November 2026</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                  Fitur Pemindaian Otomatis
                </span>
                <h2 className="text-xl font-bold mt-2">Pindai Faktur Obat Terisi Otomatis</h2>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Memudahkan Asisten Apoteker memasukkan data barang masuk dari PBF tanpa perlu mengentri nomor batch, ED, dan harga satu per satu.
                </p>
              </div>
              <button 
                onClick={() => { setActiveTab('masuk'); setShowScanModal(true); }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-500/20"
              >
                <Camera className="w-5 h-5" /> Coba Pindai Faktur
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: BARANG MASUK (OCR) */}
        {activeTab === 'masuk' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Input Penerimaan Barang Masuk</h2>
                <p className="text-xs text-slate-500">Isi manual atau gunakan pemindaian foto faktur PBF otomatis.</p>
              </div>
              <button 
                onClick={() => setShowScanModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <Camera className="w-4 h-4" /> Foto & Auto-Fill via AI OCR
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor Faktur / SBBK</label>
                <input 
                  type="text" 
                  value={formMasuk.noFaktur}
                  onChange={(e) => setFormMasuk({...formMasuk, noFaktur: e.target.value})}
                  placeholder="Contoh: FK-KF/2026/11/001" 
                  className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">PBF / Supplier</label>
                <input 
                  type="text" 
                  value={formMasuk.pbf}
                  onChange={(e) => setFormMasuk({...formMasuk, pbf: e.target.value})}
                  placeholder="Contoh: PT Kimia Farma Trading" 
                  className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Pilih Barang</label>
                <select 
                  value={formMasuk.namaBarang}
                  onChange={(e) => setFormMasuk({...formMasuk, namaBarang: e.target.value})}
                  className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {masterBarang.map(b => (
                    <option key={b.id} value={b.nama}>{b.nama} ({b.satuan})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor Batch</label>
                <input 
                  type="text" 
                  value={formMasuk.batch}
                  onChange={(e) => setFormMasuk({...formMasuk, batch: e.target.value})}
                  placeholder="Contoh: BATCH-AMX-2026" 
                  className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal Kedaluwarsa (ED)</label>
                <input 
                  type="date" 
                  value={formMasuk.ed}
                  onChange={(e) => setFormMasuk({...formMasuk, ed: e.target.value})}
                  className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Jumlah Masuk</label>
                  <input 
                    type="number" 
                    value={formMasuk.jumlah}
                    onChange={(e) => setFormMasuk({...formMasuk, jumlah: e.target.value})}
                    placeholder="1000" 
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Harga Satuan (Rp)</label>
                  <input 
                    type="number" 
                    value={formMasuk.harga}
                    onChange={(e) => setFormMasuk({...formMasuk, harga: e.target.value})}
                    placeholder="450" 
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition">
                  Batal
                </button>
                <button type="button" onClick={() => alert("Transaksi berhasil disimpan! Stok dan Audit Log terperbarui.")} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition shadow-md shadow-emerald-600/20">
                  Simpan Transaksi (Single-Point Entry)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: LAPORAN & AUDIT */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Pusat Audit & Verification Log
              </h2>
              <p className="text-xs text-slate-500 mt-1">Catatan aktivitas bersifat immutable (tidak dapat diubah atau dihapus dari antarmuka).</p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                    <tr>
                      <th className="p-3">ID Log</th>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Pengguna</th>
                      <th className="p-3">Aktivitas</th>
                      <th className="p-3">Detail Perubahan</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-medium text-slate-800">{log.id}</td>
                        <td className="p-3 whitespace-nowrap">{log.time}</td>
                        <td className="p-3 font-medium text-slate-800">{log.user}</td>
                        <td className="p-3"><span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-mono">{log.action}</span></td>
                        <td className="p-3 max-w-xs truncate">{log.detail}</td>
                        <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded">{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal OCR Scanner */}
        {showScanModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" /> Pindai Faktur PBF Otomatis
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ambil foto faktur pembelian fisik. AI OCR akan membaca No Faktur, Nama Obat, Batch, ED, dan Harga secara otomatis.
              </p>

              <div className="mt-6 border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-2xl p-6 text-center">
                {isProcessingOcr ? (
                  <div className="py-6 flex flex-col items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                    <p className="text-sm font-semibold text-emerald-900">Menganalisis Gambar Faktur dengan AI OCR...</p>
                  </div>
                ) : (
                  <div className="py-4 space-y-3">
                    <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto" />
                    <p className="text-xs font-medium text-slate-700">Pilih berkas foto atau ambil gambar faktur</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      onChange={handleSimulateOCR}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button 
                  onClick={() => setShowScanModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
          }
