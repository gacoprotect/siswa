import { ConfirmDialog } from '@/components/ConfirmDialog ';
import InputGroup from '@/components/InputGroup';
import { NoteDialog } from '@/components/NoteDialog';
import { cn } from '@/lib/utils';
import { Siswa, Wali } from '@/types';
import { useForm } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaBirthdayCake, FaEdit, FaEnvelope, FaGraduationCap, FaHandshake, FaHome, FaHotel, FaIdCard, FaMobileAlt, FaNotesMedical, FaPhone, FaPlus, FaTimes, FaUser, FaUserFriends, FaUserTie } from 'react-icons/fa';

type DataSiswaContentProps = {
    nouid: string;
    siswa: Siswa;
};

interface Wilayah {
    prov: string;
    kab: string;
    kec: string;
    kel: string;
}

interface DataWilayah {
    id: string;
    nama: string;
    level: string;
}

interface DetailDataWilayah {
    detail: DataWilayah;
    hierarchy: DataWilayah[];
}

interface ResponseWilayah {
    success: boolean;
    level: string;
    data: DataWilayah[] | DetailDataWilayah;
}
interface LivingOption {
    id: number;
    nama: string;
    icon?: React.ReactNode;
}

const livingOptions: LivingOption[] = [
    { id: 1, nama: 'Orang Tua', icon: <FaUserFriends /> },
    { id: 2, nama: 'Wali', icon: <FaUserTie /> },
    { id: 3, nama: 'Asrama', icon: <FaHotel /> },
    { id: 4, nama: 'Tinggal Mandiri', icon: <FaUser /> },
    { id: 5, nama: 'Lainnya', icon: <FaHome /> }
];
const DataSiswaContent: React.FC<DataSiswaContentProps> = ({ nouid, siswa }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [provs, setProvs] = useState<DataWilayah[]>([]);
    const [kabs, setKabs] = useState<DataWilayah[]>([]);
    const [kecs, setKecs] = useState<DataWilayah[]>([]);
    const [kels, setKels] = useState<DataWilayah[]>([]);
    const [selectedWilayah, setSelectedWilayah] = useState<Wilayah>({
        prov: siswa.safe?.wilayah?.prov || '',
        kab: siswa.safe?.wilayah?.kab || '',
        kec: siswa.safe?.wilayah?.kec || '',
        kel: siswa.safe?.wilayah?.kel || '',
    });

    const { data, setData, post, processing, errors } = useForm({
        nis: siswa.nis ?? '',
        namlen: siswa.namlen,
        kel: siswa.kel ?? '',
        tel: siswa.tel ?? '',
        ttl: siswa.ttl ?? '',
        email: siswa.email ?? '',
        safe: {
            ala: siswa.safe?.ala ?? '',
            rt: siswa.safe?.rt ?? '',
            rw: siswa.safe?.rw ?? '',
            kec: siswa.safe?.kec ?? '',//16.71.04
            lur: siswa.safe?.lur ?? '', //16.71.04.1002
            kodpos: siswa.safe?.kodpos ?? '',
            dusun: siswa.safe?.dusun ?? '',
            temtin: siswa.safe?.temtin ?? '',
            sakit: siswa.safe?.sakit ?? [],
            wilayah: {
                prov: siswa.safe?.wilayah?.prov || '',
                kab: siswa.safe?.wilayah?.kab || '',
                kec: siswa.safe?.wilayah?.kec || '',
                kel: siswa.safe?.wilayah?.kel || '',
            },
        },
    });
    const [healthNotes, setHealthNotes] = useState<string[]>(data.safe.sakit || ['']);

    const addHealthNote = () => {
        setHealthNotes([...healthNotes, '']);
        setData('safe', {
            ...data.safe,
            sakit: [...healthNotes, '']
        });
    };

    const removeHealthNote = (index: number) => {
        const updatedNotes = healthNotes.filter((_, i) => i !== index);
        setHealthNotes(updatedNotes);
        setData('safe', {
            ...data.safe,
            sakit: updatedNotes
        });
    };

    const handleHealthNoteChange = (index: number, value: string) => {
        const updatedNotes = [...healthNotes];
        updatedNotes[index] = value;
        setHealthNotes(updatedNotes);
        setData('safe', {
            ...data.safe,
            sakit: updatedNotes
        });
    };
    const initialLoad = useRef(true);
    const fetchWilayah = useCallback(async (url: string) => {
        try {
            const res = await fetch(url);
            const json = await res.json();
            if (!res.ok) throw new Error(json.message);
            return json;
        } catch (err) {
            console.error('Gagal ambil data wilayah:', err);
            return { success: false, data: [] };
        }
    }, []);


    const getProvs = useCallback(async () => {
        const { data } = await fetchWilayah(route('api.wilayah'));
        setProvs(data as DataWilayah[]);
    }, [fetchWilayah]);

    const getKabs = useCallback(async (provinceId: string) => {
        if (!provinceId) {
            setKabs([]);
            return;
        }
        const { data } = await fetchWilayah(route('api.wilayah', provinceId));
        setKabs(data as DataWilayah[]);
    }, [fetchWilayah]);

    const getKecs = useCallback(async (regencyId: string) => {
        if (!regencyId) {
            setKecs([]);
            return;
        }
        const { data } = await fetchWilayah(route('api.wilayah', regencyId));
        setKecs(data as DataWilayah[]);
    }, [fetchWilayah]);

    const getKels = useCallback(async (districtId: string) => {
        if (!districtId) {
            setKels([]);
            return;
        }
        const { data } = await fetchWilayah(route('api.wilayah', districtId));
        setKels(data as DataWilayah[]);
    }, [fetchWilayah]);

    useEffect(() => {
        if (isEditing && initialLoad.current) {
            initialLoad.current = false;
            getProvs();

            // Load data hierarki jika ada nilai awal
            if (selectedWilayah.prov) {
                getKabs(selectedWilayah.prov).then(() => {
                    if (selectedWilayah.kab) {
                        getKecs(selectedWilayah.kab).then(() => {
                            if (selectedWilayah.kec) {
                                getKels(selectedWilayah.kec);
                            }
                        });
                    }
                });
            }
        }
    }, [isEditing, selectedWilayah.prov, selectedWilayah.kab, selectedWilayah.kec, getProvs, getKabs, getKecs, getKels]);


    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = e.target.value;
        const newWilayah = {
            prov: provinceId,
            kab: '',
            kec: '',
            kel: '',
        };

        setSelectedWilayah(newWilayah);
        setData('safe', {
            ...data.safe,
            wilayah: newWilayah
        });
        // Reset dropdown dependen
        setKabs([]);
        setKecs([]);
        setKels([]);

        if (provinceId) {
            await getKabs(provinceId);
        }
    };

    // Handler untuk perubahan kabupaten
    const handleRegencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regencyId = e.target.value;
        const newWilayah = {
            ...selectedWilayah,
            kab: regencyId,
            kec: '',
            kel: '',
        };

        setSelectedWilayah(newWilayah);
        setData('safe', {
            ...data.safe,
            wilayah: newWilayah
        });

        // Reset dropdown dependen
        setKecs([]);
        setKels([]);

        if (regencyId) {
            await getKecs(regencyId);
        }
    };

    // Handler untuk perubahan kecamatan
    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        const newWilayah = {
            ...selectedWilayah,
            kec: districtId,
            kel: '',
        };

        setSelectedWilayah(newWilayah);
        setData('safe', {
            ...data.safe,
            wilayah: newWilayah
        });

        // Reset dropdown dependen
        setKels([]);

        if (districtId) {
            await getKels(districtId);
        }
    };

    // Handler untuk perubahan kelurahan
    const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const villageId = e.target.value;
        const newWilayah = {
            ...selectedWilayah,
            kel: villageId,
        };

        setSelectedWilayah(newWilayah);
        setData('safe', {
            ...data.safe,
            wilayah: newWilayah
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('siswa.update', { nouid: nouid }), {
            onSuccess: () => {
                setIsEditing(false);
            },
            onFinish: () => {
                setIsDialogOpen(true)
            }
        });
    };

    // Komponen Select untuk dropdown wilayah
    const WilayahSelect = ({
        options,
        value,
        onChange,
        placeholder,
        disabled,
    }: {
        options: DataWilayah[];
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        placeholder: string;
        disabled?: boolean;
    }) => (
        <select
            value={value}
            onChange={onChange}
            disabled={disabled || options.length === 0}
            className="w-full rounded border border-gray-300 p-2 text-sm"
        >
            <option value="">{placeholder}</option>
            {options.map(item => (
                <option key={item.id} value={item.id}>
                    {item.nama}
                </option>
            ))}
        </select>
    );
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
                                        icon={<FaBirthdayCake />}
                                        label="TTL"
                                        value={data.ttl}
                                        onChange={(e) => setData('ttl', e.target.value)}
                                        error={errors.ttl}
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
                                    <FaNotesMedical /> Catatan Kesehatan
                                </h4>

                                <div className="space-y-3">
                                    {healthNotes.map((note, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={note}
                                                onChange={(e) => handleHealthNoteChange(index, e.target.value)}
                                                className="flex-1 rounded border border-gray-300 p-2 text-sm"
                                                placeholder={`Catatan kesehatan #${index + 1}`}
                                            />
                                            {healthNotes.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeHealthNote(index)}
                                                    className="rounded-full p-2 text-red-500 hover:bg-red-50"
                                                >
                                                    <FaTimes className="text-sm" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addHealthNote}
                                        className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100"
                                    >
                                        <FaPlus /> Tambah Catatan
                                    </button>
                                </div>

                                {/* {errors.safe?.sakit && (
                                    <p className="mt-2 text-sm text-red-500">{errors.safe?.sakit}</p>
                                )} */}
                            </div>

                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-600">
                                    <FaHome /> Alamat
                                </h4>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Alamat lengkap</label>
                                <textarea
                                    className="w-full rounded border border-gray-300 p-2"
                                    value={data.safe?.ala}
                                    onChange={(e) => setData('safe', {
                                        ...data.safe,
                                        ala: e.target.value
                                    })}
                                    rows={2}
                                    placeholder='Masukan Alamat Lengkap'
                                />
                                {/* {errors.safe?.ala && <p className="mt-1 text-sm text-red-500">{errors.safe?.ala}</p>} */}

                                <div className='grid grid-cols-2 gap-4'>
                                    <InputGroup

                                        name='rt'
                                        prefix="RT"
                                        value={data.safe?.rt}
                                        onChange={(v) => setData('safe', {
                                            ...data.safe,
                                            rt: v as string
                                        })}
                                        error={errors.safe}
                                    />
                                    <InputGroup

                                        name='rw'
                                        prefix="RW"
                                        value={data.safe?.rw}
                                        onChange={(v) => setData('safe', {
                                            ...data.safe,
                                            rw: v as string
                                        })}
                                        error={errors.safe}
                                    />


                                </div>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Provinsi</label>
                                        <WilayahSelect
                                            options={provs}
                                            value={selectedWilayah.prov}
                                            onChange={handleProvinceChange}
                                            placeholder="Pilih Provinsi"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Kabupaten/Kota</label>
                                        <WilayahSelect
                                            options={kabs}
                                            value={selectedWilayah.kab}
                                            onChange={handleRegencyChange}
                                            placeholder="Pilih Kabupaten/Kota"
                                            disabled={!selectedWilayah.prov}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Kecamatan</label>
                                        <WilayahSelect
                                            options={kecs}
                                            value={selectedWilayah.kec}
                                            onChange={handleDistrictChange}
                                            placeholder="Pilih Kecamatan"
                                            disabled={!selectedWilayah.kab}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Kelurahan/Desa</label>
                                        <WilayahSelect
                                            options={kels}
                                            value={selectedWilayah.kel}
                                            onChange={handleVillageChange}
                                            placeholder="Pilih Kelurahan/Desa"
                                            disabled={!selectedWilayah.kec}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <FaHome className="text-gray-500" />
                                            Tinggal Dengan
                                        </label>
                                        <select
                                            value={data.safe?.temtin}
                                            onChange={(e) => setData('safe', {
                                                ...data.safe,
                                                temtin: e.target.value
                                            })}
                                            className="w-full rounded border border-gray-300 p-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih Status Tinggal</option>
                                            {livingOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.nama}
                                                </option>
                                            ))}
                                        </select>
                                        {/* {errors.tinggal && (
                                            <p className="mt-1 text-xs text-red-500">{errors.tinggal}</p>
                                        )} */}
                                    </div>
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
                                    <DataRow icon={<FaIdCard />} label="NISN" value={siswa?.nisn ?? ''} />
                                    <DataRow icon={<FaIdCard />} label="NIS" value={siswa?.nis ?? ''} />
                                    <DataRow icon={<FaUser />} label="Nama" value={siswa.namlen} />
                                    {/* <DataRow icon={<FaGraduationCap />} label="Kelas" value={siswa?.kel ?? ''} /> */}
                                    {/* <DataRow icon={<FaPhone />} label="Telepon" value={siswa?.tel ?? ''} /> */}
                                    <DataRow icon={<FaBirthdayCake />} label="TTL" value={siswa?.ttl ?? ''} />
                                    {/* <DataRow icon={<FaEnvelope />} label="Email" value={siswa?.email ?? ''} /> */}
                                </div>
                            </div>

                            {/* <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-600">
                                    <FaHome /> Alamat
                                </h4>
                                <p className="text-gray-700">{siswa.ala}</p>
                            </div> */}
                        </div>

                        {/* Kolom 2 */}
                        <div className="space-y-4">
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600">
                                    <FaUserTie /> Orang Tua / Wali
                                </h4>
                                <div className="space-y-3">
                                    <DataRow icon={<FaUserFriends />} label="Nama Wali" value={siswa?.wali?.nama ?? ''} />
                                    <DataRow icon={<FaHandshake />} label="Hubungan" value={siswa?.wali?.hub ?? ''} />
                                    <DataRow icon={<FaMobileAlt />} label="Kontak" value={siswa?.wali?.tel ?? ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Edit Data Siswa"
                description="Data Anda telah kami terima , perubahan data memerlukan verifikasi dari pihak sekolah"
                confirmText="Mengerti"
                cancelText={null}
                onConfirm={() => setIsDialogOpen(false)}
                variant="primary"
            />

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
    icon?: React.ReactNode;
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
            {icon && (<div className="text-xl text-gray-500">{icon}</div>)}
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
