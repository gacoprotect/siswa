<?php

namespace Database\Seeders;

use App\Models\Saving\Tsnk;
use App\Models\Saving\TsnkPoint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SnkSeeder extends Seeder
{
    public function run(): void
    {
        DB::connection('mai4')->transaction(function () {
            $now = Carbon::now();

            // Insert SNK master
            $snkId = Tsnk::create([
                'version' => 'v1',
                'title' => 'Ketentuan Kartu Pelajar',
                'summary' => 'Syarat dan Ketentuan penggunaan Kartu Pelajar dan akses SIP.',
                'is_active' => true,
                'is_required' => true,
                'published_at' => $now,
                'effective_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ])->id;

            // SNK Points
            $points = [
                [
                    'nmr' => 1,
                    'title' => 'KETENTUAN UMUM',
                    'content' => [
                        "title" => "KETENTUAN UMUM",
                        "intro" => "Dalam ketentuan ini yang dimaksud dengan:",
                        "items" => [
                            [
                                "label" => "Penerbit Kartu",
                                "description" => "adalah institusi pendidikan dan/atau perusahaan jasa yang bekerja sama dalam menerbitkan Kartu Pelajar."
                            ],
                            [
                                "label" => "Kartu Pelajar",
                                "description" => "adalah kartu identitas pelajar yang memiliki multi fungsi, yaitu:",
                                "items" => [
                                    ["description" => "Kartu diskon"],
                                    ["description" => "Akses ke Perpustakaan"],
                                    ["description" => "Kartu Tabungan pelajar"],
                                    ["description" => "Kartu pembayaran non-tunai"],
                                    ["description" => "Akses ke SIP (Student Information & Payment)"]
                                ]
                            ],
                            [
                                "label" => "Pemegang Kartu",
                                "description" => "adalah pelajar yang terdaftar secara resmi di institusi pendidikan dan telah diberikan Kartu Pelajar, serta bertanggung jawab penuh atas penggunaan kartu dan segala akibat yang timbul darinya. Kartu ini hanya diperuntukkan kepada pelajar yang tercantum di dalamnya dan tidak untuk dipindahtangankan."
                            ],
                            [
                                "label" => "Pemilik Kartu",
                                "description" => "adalah ayah/ibu/wali pelajar yang mengisi data dirinya untuk permohonan aktivasi dan mendapatkan PIN (Personal Identification Number) dari Penerbit Kartu untuk akses ke SIP."
                            ],
                            [
                                "label" => "PIN (Personal Identification Number)",
                                "description" => "adalah kode rahasia berupa angka untuk pengamanan, verifikasi transaksi, atau akses ke suatu sistem/layanan."
                            ],
                            [
                                "label" => "Transaksi",
                                "description" => "adalah kegiatan pembayaran atau penggunaan dana yang dilakukan melalui Kartu Pelajar."
                            ],
                            [
                                "label" => "Saldo Kartu",
                                "description" => "adalah dana yang tercatat dalam SIP (Student Information & Payment) yang dapat digunakan untuk bertransaksi."
                            ],
                            [
                                "label" => "SIP (Student Information & Payment)",
                                "description" => "adalah layanan informasi dan sistem pembayaran serta pendaftaran online untuk memudahkan orang tua/wali mendapatkan informasi dari Sekolah Maitreyawira Deli Serdang secara elektronik."
                            ]
                        ]
                    ]
                ],
                [
                    'nmr' => 2,
                    'title' => 'KETENTUAN PIN/KODE AKSES',
                    'content' =>  [
                        "title" => "KETENTUAN PIN/KODE AKSES",
                        "items" => [
                            [
                                "description" => "Pemohon kode akses dalam hal ini adalah sebagai Pemilik Kartu yaitu ayah/ibu/wali pelajar yang terdaftar resmi di data Penerbit Kartu, yang mengisi data permohonan dan menerima PIN Akses SIP (Student Information & Payment) saat aktivasi pertama kali."
                            ],
                            [
                                "description" => "Pemohon wajib menjaga kerahasiaan PIN dan tidak memberitahukannya kepada pihak lain."
                            ],
                            [
                                "description" => "Semua transaksi yang dilakukan dengan PIN yang benar, dianggap sah dan menjadi tanggung jawab Pemilik Kartu."
                            ],
                            [
                                "description" => "Kehilangan atau penyalahgunaan akibat kelalaian menjaga PIN adalah tanggung jawab penuh Pemilik Kartu."
                            ]
                        ]
                    ],

                ],
                [
                    'nmr' => 3,
                    'title' => 'KETENTUAN PENGGUNAAN KARTU',
                    'content' =>  [
                        "title" => "KETENTUAN PENGGUNAAN KARTU",
                        "items" => [
                            [
                                "label" => "Kartu Pelajar sebagai kartu diskon:",
                                "items" => [
                                    ["description" => "Pemegang Kartu wajib hadir untuk mendapatkan diskon di merchant yang bermitra dengan Sekolah Maitreyawira Deli Serdang."],
                                    ["description" => "Sekolah hanya menginformasikan merchant kepada Pemilik Kartu dan tidak bertanggung jawab atas kualitas layanan atau produk merchant."],
                                    ["description" => "Penggunaan kartu dibatasi oleh waktu, besaran diskon, dan kebijakan merchant yang dapat berubah sewaktu-waktu."],
                                    ["description" => "Kartu yang telah melewati masa berlaku dapat ditolak oleh merchant dan menjadi tanggung jawab Pemilik Kartu."]
                                ]
                            ],
                            [
                                "label" => "Kartu Pelajar sebagai kartu akses ke Perpustakaan:",
                                "items" => [
                                    ["description" => "Akses ke perpustakaan dari jenjang SD hingga SMA."],
                                    ["description" => "Dapat melakukan peminjaman buku."],
                                    ["description" => "Wajib mengikuti peraturan perpustakaan Sekolah Maitreyawira Deli Serdang."]
                                ]
                            ],
                            [
                                "label" => "Kartu Pelajar sebagai Kartu Tabungan:",
                                "items" => [
                                    ["description" => "Mendorong anak belajar menabung sejak dini dan memahami manajemen keuangan."],
                                    ["description" => "Pemilik Kartu dapat menitipkan uang jajan, dan pelajar dapat menabung dalam kartu."],
                                    ["description" => "Saldo dapat digunakan untuk pembayaran tagihan sekolah dan merchant tertentu."],
                                    ["description" => "Tidak ada batas minimum/maksimum saldo."],
                                    ["description" => "Pengembalian saldo hanya dapat dilakukan oleh Pemilik Kartu sesuai syarat yang berlaku."]
                                ]
                            ],
                            [
                                "label" => "Kartu Pelajar sebagai alat pembayaran non-tunai:",
                                "items" => [
                                    ["description" => "Hanya dapat digunakan untuk transaksi di area yang ditentukan oleh sekolah."],
                                    ["description" => "Penggunaan kartu bisa dibatasi berdasarkan waktu, nominal, dan jenis transaksi."],
                                    ["description" => "Semua transaksi dengan kartu dianggap valid dan menjadi tanggung jawab Pemegang Kartu."],
                                    ["description" => "Jatah penggunaan bulanan yang tidak digunakan dapat dibawa ke bulan berikutnya maksimal Rp100.000 dan tidak dapat diakumulasi 2 bulan berturut-turut."],
                                    ["description" => "Penerbit tidak bertanggung jawab atas penyalahgunaan oleh pihak ketiga akibat kelalaian pengguna."],
                                    ["description" => "Penerbit berhak menangguhkan atau menonaktifkan kartu jika ditemukan pelanggaran."]
                                ]
                            ],
                            [
                                "label" => "Data akses ke SIP (Student Information & Payment):",
                                "items" => [
                                    ["description" => "Pemilik Kartu dapat menggunakan seluruh layanan SIP sesuai ketentuan."],
                                    ["description" => "Semua transaksi dalam SIP dianggap sah dan menjadi tanggung jawab Pemilik Kartu."],
                                    ["description" => "Seluruh informasi dalam SIP adalah tanggung jawab Pemilik Kartu."],
                                    ["description" => "Setiap perubahan data menjadi tanggung jawab Pemilik Kartu."],
                                    ["description" => "Penerbit tidak bertanggung jawab atas kerugian akibat penyalahgunaan kartu karena kelalaian menjaga keamanan atau PIN."]
                                ]
                            ]
                        ]
                    ],
                ],
                [
                    'nmr' => 4,
                    'title' => 'MASA BERLAKU KARTU',
                    'content' => [
                        "title" => "MASA BERLAKU KARTU",
                        "items" => [
                            [
                                "description" => "Masa berlaku kartu ditentukan berdasarkan status peserta didik di Sekolah Maitreyawira Deli Serdang."
                            ],
                            [
                                "description" => "Kartu yang telah habis masa berlakunya harus dikembalikan kepada pihak sekolah atau Penerbit Kartu untuk dimusnahkan."
                            ],
                            [
                                "description" => "Kartu yang dikembalikan sebelum masa berlaku berakhir akan dinonaktifkan dan dimusnahkan guna mencegah penyalahgunaan."
                            ],
                            [
                                "description" => "Kartu Pelajar wajib dikembalikan ke Penerbit Kartu apabila diminta atau jika pelajar tidak lagi terdaftar sebagai peserta didik Sekolah Maitreyawira."
                            ]
                        ]
                    ],
                ],
                [
                    'nmr' => 5,
                    'title' => 'KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN',
                    'content' =>  [
                        "title" => "KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN",
                        "items" => [
                            [
                                "label" => "Penerimaan dan Aktivasi Kartu",
                                "items" => [
                                    ["description" => "Pemilik Kartu wajib melakukan aktivasi kartu sesuai prosedur yang ditetapkan oleh Penerbit Kartu sebelum dapat digunakan untuk akses ke SIP dan melakukan transaksi pembayaran."],
                                    ["description" => "Aktivasi kartu dapat dilakukan melalui scan QR-code yang tertera pada kartu dengan mengisi data dengan lengkap dan benar."],
                                    ["description" => "Nomor PIN sementara (First-PIN) akan dikirimkan kepada Pemilik Kartu melalui metode komunikasi aman setelah melalui proses validasi data oleh Penerbit Kartu. PIN wajib diubah oleh Pemilik Kartu saat aktivasi."]
                                ]
                            ],
                            [
                                "label" => "Penggantian Kartu dan Biaya",
                                "items" => [
                                    ["description" => "Apabila kartu hilang, rusak, atau dicuri, Pemegang Kartu wajib segera melapor kepada Pemilik Kartu untuk segera melakukan pemblokiran dan penggantian kartu."],
                                    ["description" => "Pemilik Kartu wajib melapor kepada pihak Sekolah (Penerbit Kartu) atas pemblokiran kartu."],
                                    ["description" => "Pemegang Kartu bertanggung jawab sepenuhnya atas semua transaksi yang terjadi sebelum laporan kehilangan atau pencurian diterima secara resmi dan sebelum dilakukan pemblokiran kartu."],
                                    ["description" => "Penerbit Kartu dapat mengenakan biaya administrasi penggantian kartu yang besarnya dapat berubah sewaktu-waktu."],
                                    ["description" => "Kartu yang sudah diblokir atau tidak berlaku harus dikembalikan ke Penerbit Kartu untuk dimusnahkan agar tidak disalahgunakan."]
                                ]
                            ],
                            [
                                "label" => "Pemblokiran dan Penonaktifan Kartu",
                                "items" => [
                                    [
                                        "description" => "Penerbit Kartu berhak memblokir atau menonaktifkan kartu secara sementara atau permanen dalam hal:",
                                        "items" => [
                                            ["description" => "Terjadi indikasi penyalahgunaan atau kecurangan"],
                                            ["description" => "Kartu sudah habis masa berlakunya atau dinyatakan batal"],
                                            ["description" => "Pelanggaran ketentuan yang ditetapkan."]
                                        ]
                                    ],
                                    ["description" => "Penerbit Kartu wajib memberitahukan pemblokiran kepada Pemegang Kartu melalui saluran komunikasi resmi."]
                                ]
                            ],
                            [
                                "label" => "Penanganan Masalah Transaksi",
                                "items" => [
                                    ["description" => "Jika terjadi kegagalan transaksi akibat gangguan sistem Penerbit Kartu, maka upaya pengembalian saldo akan dilakukan sesuai prosedur."],
                                    ["description" => "Penerbit Kartu tidak bertanggung jawab atas kerugian yang disebabkan oleh kesalahan sistem pihak ketiga di luar kendali mereka."]
                                ]
                            ],
                            [
                                "label" => "Perubahan Ketentuan",
                                "items" => [
                                    ["description" => "Penerbit Kartu berhak mengubah syarat dan ketentuan ini dengan pemberitahuan terlebih dahulu kepada Pemilik Kartu melalui media yang dianggap efektif."]
                                ]
                            ]
                        ]
                    ],
                ],
                [
                    'nmr' => 6,
                    'title' => 'KETENTUAN LAIN-LAIN',
                    'content' => [
                        "title" => "KETENTUAN LAIN-LAIN",
                        "items" => [
                            [
                                "description" => "Pemegang Kartu dapat dikenakan biaya administrasi, dan/atau denda sesuai kebijakan Penerbit Kartu yang bekerja sama dalam penyediaan fasilitas ini."
                            ],
                            [
                                "description" => "Seluruh biaya yang dikenakan akan diinformasikan terlebih dahulu kepada Pemilik Kartu dan dapat berubah sewaktu-waktu sesuai kebijakan Penerbit Kartu."
                            ],
                            [
                                "description" => "Kartu Pelajar tidak diberikan untuk rekening gabungan atau digunakan secara kolektif. Setiap kartu bersifat personal dan hanya dapat digunakan oleh pelajar yang namanya tercantum pada kartu tersebut."
                            ]
                        ]
                    ],
                ],
                [
                    'nmr' => 7,
                    'title' => 'PERNYATAAN PEMILIK KARTU/DISCLAIMER',
                    'content' => [
                        "title" => "PERNYATAAN PEMILIK KARTU/DISCLAIMER",
                        "items" => [
                            [
                                "description" => "Saya yang bertanda tangan di bawah ini {{nama_ortu}} menyatakan telah membaca, memahami, dan menyetujui seluruh Ketentuan Kartu Pelajar dan akses SIP yang tercantum di atas."
                            ],
                            [
                                "description" => "Saya bersedia menaati seluruh syarat dan ketentuan penggunaan yang telah ditetapkan oleh lembaga pendidikan terkait, termasuk setiap perubahan yang mungkin dilakukan di kemudian hari."
                            ],
                            [
                                "description" => "Saya menyadari bahwa pelanggaran terhadap ketentuan ini dapat menyebabkan akses ke SIP akan dinonaktifkan dan/atau Kartu Pelajar anak saya ditarik kembali tanpa pemberitahuan terlebih dahulu."
                            ],
                            [
                                "description" => "Pemakaian kartu pelajar sebagai kartu diskon, akses ke perpustakaan, Tabungan pelajar, kartu pembayaran non-tunai, dan akses ke SIP (Student Information & Payment) adalah merupakan tanggung jawab saya {{nama_ortu}} dan anak saya {{nama_siswa}} sepenuhnya."
                            ],
                            [
                                "description" => "Saya membebaskan pihak Sekolah atas kelalaian atau penyalahgunaan kartu baik oleh saya {{nama_ortu}} atau anak saya {{nama_siswa}}."
                            ],
                            [
                                "description" => "Saya membebaskan pihak Sekolah atas kelalaian atau penyalahgunaan PIN akses ke SIP baik oleh saya {{nama_ortu}} atau anak saya {{nama_siswa}}."
                            ],
                        ]
                    ]
                ],
            ];

            foreach ($points as $point) {
                TsnkPoint::create([
                    'tsnk_id' => $snkId,
                    'nmr' => $point['nmr'],
                    'title' => $point['title'],
                    'content' => $point['content'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        });
    }
}
