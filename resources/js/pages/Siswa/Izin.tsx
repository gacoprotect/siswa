import { CheckCircle, Clock, XCircle, Plus, FileText, CalendarDays, ArrowLeft, HeartPulse, Scissors, User, HelpCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useLogger } from '@/contexts/logger-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import InputGroup from '@/components/InputGroup';

type IzinProps = { nouid: string; onClose: () => void };

type JenisIzin = 'sakit' | 'dispensasi' | 'pribadi' | 'lainnya';
type StatusIzin = 'menunggu' | 'disetujui' | 'ditolak' | 'dibatalkan';

interface Izin {
    id: string;
    jenis: JenisIzin;
    tanggalMulai: string;
    tanggalSelesai: string;
    alasan: string;
    keterangan: string;
    status: StatusIzin;
    dibuatPada: Date;
}

const Izin: React.FC<IzinProps> = ({ onClose }) => {
    const { log } = useLogger();
    const [sedangMembuat, setSedangMembuat] = useState(false);
    const [daftarIzin, setDaftarIzin] = useState<Izin[]>([]);
    const [formData, setFormData] = useState({
        jenis: 'sakit' as JenisIzin,
        tanggalMulai: '',
        tanggalSelesai: '',
        alasan: '',
        keterangan: ''
    });

    const getStatusIcon = (status: StatusIzin) => {
        switch (status) {
            case 'disetujui':
                return <CheckCircle className="text-green-500" size={16} />;
            case 'menunggu':
                return <Clock className="text-yellow-500" size={16} />;
            case 'ditolak':
                return <XCircle className="text-red-500" size={16} />;
            case 'dibatalkan':
                return <XCircle className="text-red-500" size={16} />;
            default:
                return null;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi tanggal
        if (new Date(formData.tanggalSelesai) < new Date(formData.tanggalMulai)) {
            alert('Tanggal selesai tidak boleh sebelum tanggal mulai');
            return;
        }

        const izinBaru: Izin = {
            id: Math.random().toString(36).substring(2, 9),
            ...formData,
            status: 'menunggu',
            dibuatPada: new Date()
        };

        setDaftarIzin([...daftarIzin, izinBaru]);
        setSedangMembuat(false);
        setFormData({
            jenis: 'sakit',
            tanggalMulai: '',
            tanggalSelesai: '',
            alasan: '',
            keterangan: ''
        });

        log('Pengajuan izin dikirim', izinBaru);
        // Di sini biasanya akan mengirim data ke backend
        // router.post('/izin', izinBaru);
    };

    const batalkanIzin = (id: string) => {
        setDaftarIzin(daftarIzin.map(izin =>
            izin.id === id ? { ...izin, status: 'dibatalkan' } : izin
        ));
        log('Izin dibatalkan', { idIzin: id });
        // router.patch(`/izin/${id}/batalkan`);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            {!sedangMembuat ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            onClick={() => setSedangMembuat(true)}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="mr-2" size={16} /> Ajukan Izin Baru
                        </Button>
                    </div>

                    {daftarIzin.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                            <FileText className="w-10 h-10 text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-500 mb-1">
                                Belum ada pengajuan izin
                            </h3>
                            <p className="text-gray-400 text-center max-w-md px-4">
                                Anda belum membuat permohonan izin. Klik tombol "Ajukan Izin Baru" untuk membuat pengajuan.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {daftarIzin.map(izin => (
                                <div
                                    key={izin.id}
                                    className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-lg text-gray-800 capitalize">
                                                    {izin.jenis === 'sakit' && 'Izin Sakit'}
                                                    {izin.jenis === 'dispensasi' && 'Dispensasi'}
                                                    {izin.jenis === 'pribadi' && 'Keperluan Pribadi'}
                                                    {izin.jenis === 'lainnya' && 'Lainnya'}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                <CalendarDays className="inline mr-1 w-4 h-4" />
                                                {new Date(izin.tanggalMulai).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })} - {new Date(izin.tanggalSelesai).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`flex items-center gap-1 px-3 py-1 ${izin.status === 'disetujui' ? 'bg-green-50 text-green-600 border-green-100' :
                                                    izin.status === 'ditolak' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        izin.status === 'dibatalkan' ? 'bg-gray-50 text-gray-600 border-gray-100' :
                                                            'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}
                                        >
                                            {getStatusIcon(izin.status)}
                                            <span className="capitalize">
                                                {izin.status === 'menunggu' && 'Menunggu'}
                                                {izin.status === 'disetujui' && 'Disetujui'}
                                                {izin.status === 'ditolak' && 'Ditolak'}
                                                {izin.status === 'dibatalkan' && 'Dibatalkan'}
                                            </span>
                                        </Badge>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Alasan</h4>
                                            <p className="font-medium text-gray-800">{izin.alasan}</p>
                                        </div>
                                        {izin.keterangan && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Keterangan</h4>
                                                <p className="text-gray-600 whitespace-pre-line">{izin.keterangan}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-xs text-gray-400">
                                            Diajukan pada: {new Date(izin.dibuatPada).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                        {izin.status === 'menunggu' && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => batalkanIzin(izin.id)}
                                                className="hover:bg-red-600 transition-colors"
                                            >
                                                Batalkan Pengajuan
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Formulir Pengajuan Izin</h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Izin</label>
                            <Select
                                value={formData.jenis}
                                onValueChange={(value) => setFormData({ ...formData, jenis: value as JenisIzin })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih jenis izin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sakit" className="hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <HeartPulse className="w-4 h-4 text-red-500" />
                                            <span>Izin Sakit</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="dispensasi" className="hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <Scissors className="w-4 h-4 text-blue-500" />
                                            <span>Dispensasi</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="pribadi" className="hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-purple-500" />
                                            <span>Keperluan Pribadi</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="lainnya" className="hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-gray-500" />
                                            <span>Lainnya</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                                <Input
                                    type="date"
                                    name="tanggalMulai"
                                    value={formData.tanggalMulai}
                                    onChange={handleInputChange}
                                    required
                                    className="focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai</label>
                                <Input
                                    type="date"
                                    name="tanggalSelesai"
                                    value={formData.tanggalSelesai}
                                    onChange={handleInputChange}
                                    required
                                    min={formData.tanggalMulai}
                                    className="focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alasan</label>
                            <Input
                                name="alasan"
                                value={formData.alasan}
                                onChange={handleInputChange}
                                placeholder="Contoh: Sakit demam, ada acara keluarga, dll."
                                required
                                className="focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
                            <InputGroup
                                name="keterangan"
                                type='textarea'
                                value={formData.keterangan}
                                onChange={()=>handleInputChange}
                                placeholder="Berikan penjelasan lebih detail jika diperlukan..."
                                rows={4}
                                className="focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setSedangMembuat(false)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                <Send className="mr-2 w-4 h-4" /> Ajukan Izin
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Izin;