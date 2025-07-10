import { cn } from '@/lib/utils';
import { Siswa, Wali } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FaBirthdayCake, FaEdit, FaEnvelope, FaGraduationCap, FaHome, FaIdCard, FaPhone, FaUser, FaUserTie } from 'react-icons/fa';

type DataSiswaContentProps = {
    nouid: string;
    siswa: Siswa;
};

const DataSiswaContent: React.FC<DataSiswaContentProps> = ({ nouid, siswa }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        nis: siswa.nis ?? '',
        namlen: siswa.namlen,
        kel: siswa.kel ?? '',
        tel: siswa.tel ?? '',
        ttl: siswa.ttl ?? '',
        email: siswa.email ?? '',
        ala: siswa.ala,
        wali: {
            ayah: siswa.wali?.ayah ?? '',
            ibu: siswa.wali?.ibu ?? '',
            tel: siswa.wali?.tel ?? '',
        },
        excul: siswa.excul ?? [],
        prestasi: siswa.prestasi ?? [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('siswa.update', { nouid: nouid }), {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    return (
        <div className="w-full space-y-6 p-4">
            <div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
                <h3 className="text-2xl font-bold text-gray-800">Data Siswa Lengkap</h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex w-32 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                    >
                        <FaEdit className="text-lg" />
                        Edit Data
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Kolom 1 */}
                        <div className="space-y-4">
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600">
                                    <FaUser /> Identitas Diri
                                </h4>
                                <div className="space-y-3">
                                    <EditDataRow
                                        icon={<FaIdCard />}
                                        label="NIS"
                                        value={data.nis}
                                        onChange={(e) => setData('nis', e.target.value)}
                                        error={errors.nis}
                                        disabled={true}
                                    />
                                    <EditDataRow
                                        icon={<FaUser />}
                                        label="Nama"
                                        value={data.namlen}
                                        onChange={(e) => setData('namlen', e.target.value)}
                                        error={errors.namlen}
                                        disabled={true}
                                    />
                                    <EditDataRow
                                        icon={<FaGraduationCap />}
                                        label="Kelas"
                                        value={data.kel}
                                        onChange={(e) => setData('kel', e.target.value)}
                                        error={errors.kel}
                                        disabled={true}
                                    />
                                    <EditDataRow
                                        icon={<FaPhone />}
                                        label="Telepon"
                                        value={data.tel}
                                        onChange={(e) => setData('tel', e.target.value)}
                                        error={errors.tel}
                                    />
                                    <EditDataRow
                                        icon={<FaBirthdayCake />}
                                        label="TTL"
                                        value={data.ttl}
                                        onChange={(e) => setData('ttl', e.target.value)}
                                        error={errors.ttl}
                                    />
                                    <EditDataRow
                                        icon={<FaEnvelope />}
                                        label="Email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-600">
                                    <FaHome /> Catatan Kesehatan
                                </h4>
                                <textarea
                                    className="w-full rounded border border-gray-300 p-2"
                                    value={data.ala}
                                    onChange={(e) => setData('ala', e.target.value)}
                                    rows={4}
                                />
                                {errors.ala && <p className="mt-1 text-sm text-red-500">{errors.ala}</p>}
                            </div>
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-600">
                                    <FaHome /> Alamat
                                </h4>
                                <textarea
                                    className="w-full rounded border border-gray-300 p-2"
                                    value={data.ala}
                                    onChange={(e) => setData('ala', e.target.value)}
                                    rows={4}
                                />
                                {errors.ala && <p className="mt-1 text-sm text-red-500">{errors.ala}</p>}
                            </div>
                        </div>

                        {/* Kolom 2 */}
                        <div className="space-y-4">
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600">
                                    <FaUserTie /> Orang Tua
                                </h4>
                                <div className="space-y-3">
                                    <EditDataRow
                                        icon={<FaUser />}
                                        label="Ayah"
                                        value={data.wali.ayah}
                                        onChange={(e) => setData('wali', { ...data.wali, ayah: e.target.value })}
                                        error={errors.wali && typeof errors.wali === 'object' ? ((errors.wali as Wali).ayah ?? undefined) : undefined}
                                    />
                                    <EditDataRow
                                        icon={<FaUser />}
                                        label="Ibu"
                                        value={data.wali.ibu}
                                        onChange={(e) => setData('wali', { ...data.wali, ibu: e.target.value })}
                                        error={errors.wali && typeof errors.wali === 'object' ? ((errors.wali as Wali).ibu ?? undefined) : undefined}
                                    />
                                    <EditDataRow
                                        icon={<FaPhone />}
                                        label="Kontak Darurat"
                                        value={data.wali.tel}
                                        onChange={(e) => setData('wali', { ...data.wali, tel: e.target.value })}
                                        error={errors.wali && typeof errors.wali === 'object' ? ((errors.wali as Wali).tel ?? undefined) : undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    <DataRow icon={<FaPhone />} label="Telepon" value={siswa?.tel ?? ''} />
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
                                    <DataRow icon={<FaUser />} label="Ayah" value={siswa?.wali?.ayah ?? ''} />
                                    <DataRow icon={<FaUser />} label="Ibu" value={siswa?.wali?.ibu ?? ''} />
                                    <DataRow icon={<FaPhone />} label="Kontak Darurat" value={siswa?.wali?.tel ?? ''} />
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-purple-600">
                                    <FaGraduationCap /> Aktivitas
                                </h4>
                                <div className="space-y-3">
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
            )}
        </div>
    );
};

// Komponen untuk menampilkan baris data
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

// Komponen untuk menampilkan baris data dalam mode edit
type EditDataRowProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
};

const EditDataRow = ({ disabled = false, icon, label, value, onChange, error }: EditDataRowProps) => (
    <div className="mb-4">
        <label className="mb-1 ml-8 block text-sm font-bold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
            <div className="text-xl text-gray-500">{icon}</div>
            <input
                disabled={disabled}
                type="text"
                value={value}
                onChange={onChange}
                className={cn(`w-full rounded border ${error ? 'border-red-500' : 'border-gray-300'} p-2 text-sm`, disabled && 'bg-gray-300')}
            />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export default DataSiswaContent;
