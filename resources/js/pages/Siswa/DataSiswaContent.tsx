import { Siswa } from '@/types';
import { FaBirthdayCake, FaEnvelope, FaGraduationCap, FaHome, FaIdCard, FaPhone, FaUser, FaUserTie } from 'react-icons/fa';

const DataSiswaContent = (siswa: Siswa) => {
    // Data contoh siswa
    // const siswa = {
    //   nis: '20230001',
    //   name: 'WAHYU WIJAYA',
    //   kelas: 'XII IPA 2',
    //   alamat: 'Jl. Merdeka No. 123, Jakarta',
    //   ttl: 'Jakarta, 15 Mei 2006',
    //   email: 'ahmad.fauzi@sekolah.sch.id',
    //   phone: '081234567890',
    //   orangTua: {
    //     ayah: 'Budi Santoso (081234567891)',
    //     ibu: 'Siti Aminah (081234567892)'
    //   },
    //   foto: '/assets/profile.png',
    //   ekstrakurikuler: ['Futsal', 'Robotika'],
    //   prestasi: ['Juara 1 Olimpiade Matematika Tingkat Kota 2022']
    // };
    console.log(siswa);

    return (
        <div className="space-y-6 p-4 w-full">
            <div className="mb-6 items-center space-y-3 md:flex md:justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Data Siswa Lengkap</h3>
                {/* <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white transition-colors hover:bg-amber-600">
                    <FaUserTie className="text-lg" />
                    Export Data
                </button> */}
            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                {/* Foto Profil */}
                {/* <div className="flex-shrink-0">
          <div className="rounded-lg overflow-hidden w-48 h-64 border-2 border-gray-200 shadow-md">
            <img
              className="w-full h-full object-cover"
              src={siswa.foto}
              alt="Student profile"
            />
          </div>
        </div> */}

                {/* Data Siswa */}
                <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Kolom 1 */}
                    <div className="space-y-4">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600">
                                <FaUser /> Identitas Diri
                            </h4>
                            <div className="space-y-3">
                                <DataRow icon={<FaIdCard />} label="NIS" value={siswa?.nis ?? ''} />
                                <DataRow icon={<FaUser />} label="Nama" value={siswa.namlen} />
                                <DataRow icon={<FaGraduationCap />} label="Kelas" value={siswa?.kel ?? ''} />
                                <DataRow icon={<FaBirthdayCake />} label="TTL" value={siswa?.ttl ?? ''} />
                                <DataRow icon={<FaEnvelope />} label="Email" value={siswa?.email ?? ''} />
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-600">
                                <FaHome /> Alamat
                            </h4>
                            <p className="text-gray-700">{siswa.ala}</p>
                        </div>
                    </div>

                    {/* Kolom 2 */}
                    <div className="space-y-4">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600">
                                <FaUserTie /> Orang Tua
                            </h4>
                            <div className="space-y-3">
                                {/* <DataRow icon={<FaUser />} label="Ayah" value={siswa.orangTua.ayah} />
                <DataRow icon={<FaUser />} label="Ibu" value={siswa.orangTua.ibu} /> */}
                                <DataRow icon={<FaPhone />} label="Kontak Darurat" value="081234567893" />
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-purple-600">
                                <FaGraduationCap /> Aktivitas
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium text-gray-700">Ekstrakurikuler:</p>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {siswa?.excul?.map((item, index) => (
                                            <span key={index} className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">Prestasi:</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5">
                                        {siswa?.prestasi?.map((item, index) => (
                                            <li key={index} className="text-gray-700">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen kecil untuk menampilkan baris data
type DataRowProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

const DataRow = ({ icon, label, value }: DataRowProps) => (
    <div className="flex items-start gap-3">
        <span className="mt-1 text-gray-500">{icon}</span>
        <div>
            <p className="font-medium text-gray-700">{label}</p>
            <p className="text-gray-900">{value}</p>
        </div>
    </div>
);

export default DataSiswaContent;
