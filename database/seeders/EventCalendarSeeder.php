<?php

namespace Database\Seeders;

use App\Models\Admin\Event;
use App\Models\Admin\EventCategory;
use App\Models\Admin\EventTarget;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;

class EventCalendarSeeder extends Seeder
{
    public function run(): void
    {
        $students = [3363, 12]; // Multiple students

        $categories = [
            ['slug' => 'jadwal-pelajaran', 'name' => 'Jadwal Pelajaran', 'color' => '#93c5fd', 'icon' => 'BookOpen'],
            ['slug' => 'ujian', 'name' => 'Ujian', 'color' => '#fca5a5', 'icon' => 'Pencil'],
            ['slug' => 'tugas', 'name' => 'Tugas', 'color' => '#fdba74', 'icon' => 'ClipboardList'],
            ['slug' => 'proyek', 'name' => 'Proyek', 'color' => '#fcd34d', 'icon' => 'Wrench'],
            ['slug' => 'agenda-sekolah', 'name' => 'Agenda Sekolah', 'color' => '#a5b4fc', 'icon' => 'Calendar'],
            ['slug' => 'rapat-orang-tua', 'name' => 'Rapat Orang Tua', 'color' => '#86efac', 'icon' => 'Users'],
            ['slug' => 'rapor', 'name' => 'Penerimaan Rapor', 'color' => '#f9a8d4', 'icon' => 'BarChart'],
            ['slug' => 'administrasi', 'name' => 'Administrasi', 'color' => '#c4b5fd', 'icon' => 'FileText'],
            ['slug' => 'ekskul', 'name' => 'Ekskul', 'color' => '#fde68a', 'icon' => 'Trophy'],
            ['slug' => 'lomba', 'name' => 'Lomba', 'color' => '#fbbf24', 'icon' => 'Award'],
            ['slug' => 'tryout', 'name' => 'Tryout', 'color' => '#7dd3fc', 'icon' => 'Target'],
            ['slug' => 'pengumuman', 'name' => 'Pengumuman', 'color' => '#60a5fa', 'icon' => 'Megaphone'],
            ['slug' => 'libur', 'name' => 'Hari Libur', 'color' => '#34d399', 'icon' => 'Sun'],
            ['slug' => 'keagamaan', 'name' => 'Hari Besar Keagamaan', 'color' => '#c084fc', 'icon' => 'Sparkles'],
            ['slug' => 'peringatan', 'name' => 'Hari Peringatan', 'color' => '#f472b6', 'icon' => 'Gift'],
            ['slug' => 'bk', 'name' => 'Bimbingan Konseling', 'color' => '#a7f3d0', 'icon' => 'MessageSquare'],
            ['slug' => 'kesehatan', 'name' => 'Kesehatan', 'color' => '#fca5a5', 'icon' => 'HeartPulse'],
            ['slug' => 'baksos', 'name' => 'Bakti Sosial', 'color' => '#93c5fd', 'icon' => 'HandHeart'],
        ];

        $slugToId = [];
        foreach ($categories as $cat) {
            $model = EventCategory::query()->firstOrCreate(
                ['slug' => $cat['slug']],
                ['name' => $cat['name'], 'color' => $cat['color'], 'icon' => $cat['icon']]
            );
            $slugToId[$cat['slug']] = $model->id;
        }

        $now = CarbonImmutable::now();

        $events = [
            // Global Events (target_type = 0) - Visible to all students
            [
                'judul' => 'Pengumuman Kalender Semester',
                'deskripsi' => 'Rangkuman agenda semester ini. Semua siswa wajib memperhatikan jadwal yang telah ditentukan.',
                'tanggal_mulai' => $now->addDays(0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => 'Sekolah',
                'penting' => true,
                'wajib' => false,
                'kategori' => 'pengumuman',
                'audience' => 'global',
            ],
            [
                'judul' => 'Libur Sekolah',
                'deskripsi' => 'Libur sekolah setelah UAS. Semua kegiatan sekolah ditiadakan.',
                'tanggal_mulai' => $now->addDays(18)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(32)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => '-',
                'penting' => true,
                'wajib' => false,
                'kategori' => 'libur',
                'audience' => 'global',
            ],
            [
                'judul' => 'Hari Raya Idul Fitri',
                'deskripsi' => 'Libur hari raya keagamaan. Selamat merayakan Idul Fitri.',
                'tanggal_mulai' => $now->addDays(21)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(21)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => '-',
                'penting' => true,
                'wajib' => false,
                'kategori' => 'keagamaan',
                'audience' => 'global',
            ],
            [
                'judul' => 'Upacara Bendera',
                'deskripsi' => 'Upacara bendera rutin setiap Senin. Wajib hadir dengan seragam lengkap.',
                'tanggal_mulai' => $now->addDays(7)->setTime(7, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(7)->setTime(8, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Lapangan Upacara',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'agenda-sekolah',
                'audience' => 'global',
            ],
            [
                'judul' => 'Hari Kemerdekaan RI',
                'deskripsi' => 'Upacara dan lomba-lomba dalam rangka memperingati HUT RI ke-79.',
                'tanggal_mulai' => $now->addDays(25)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(25)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => 'Lapangan Sekolah',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'peringatan',
                'audience' => 'global',
            ],

            // Level/Tingkatan Events (target_type = 1) - Visible to specific level
            [
                'judul' => 'Ujian Tengah Semester',
                'deskripsi' => 'Ujian untuk semua mata pelajaran tingkat kelas yang sama. Wajib hadir tepat waktu.',
                'tanggal_mulai' => $now->addDays(5)->setTime(8, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(5)->setTime(12, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Ruang Kelas',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'ujian',
                'audience' => 'level',
                'target_id' => 1, // Tingkatan ID
            ],
            [
                'judul' => 'Rapat Orang Tua Tingkat',
                'deskripsi' => 'Pembahasan perkembangan belajar tingkat. Orang tua wajib hadir.',
                'tanggal_mulai' => $now->addDays(10)->setTime(13, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(10)->setTime(15, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Aula Sekolah',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'rapat-orang-tua',
                'audience' => 'level',
                'target_id' => 1, // Tingkatan ID
            ],

            // Class/Kelas Events (target_type = 3) - Visible to specific class
            [
                'judul' => 'Tugas Kelompok IPA',
                'deskripsi' => 'Proyek sains kelas. Kerjakan dalam kelompok 4-5 orang.',
                'tanggal_mulai' => $now->addDays(3)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(3)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => 'Laboratorium IPA',
                'penting' => false,
                'wajib' => true,
                'kategori' => 'tugas',
                'audience' => 'class',
                'target_id' => 101, // Kelas ID
            ],
            [
                'judul' => 'Ekskul Kelas',
                'deskripsi' => 'Kegiatan ekskul khusus kelas. Pilih sesuai minat dan bakat.',
                'tanggal_mulai' => $now->addDays(8)->setTime(15, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(8)->setTime(17, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Lapangan Olahraga',
                'penting' => false,
                'wajib' => false,
                'kategori' => 'ekskul',
                'audience' => 'class',
                'target_id' => 101, // Kelas ID
            ],

            // Student-specific Events (target_type = 4) - Visible to specific students
            [
                'judul' => 'Tugas IPA: Laporan Praktikum',
                'deskripsi' => 'Kumpulkan laporan praktikum dalam format PDF di LMS. Deadline ketat.',
                'tanggal_mulai' => $now->addDays(1)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(1)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => 'LMS Online',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'tugas',
                'audience' => 'student',
                'target_id' => 3363, // Student ID
            ],
            [
                'judul' => 'Ujian Matematika Bab 1',
                'deskripsi' => 'Materi aljabar dan persamaan linear. Bawa kalkulator dan alat tulis.',
                'tanggal_mulai' => $now->addDays(3)->setTime(9, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(3)->setTime(11, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Ruang Kelas 7A',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'ujian',
                'audience' => 'student',
                'target_id' => 3363, // Student ID
            ],
            [
                'judul' => 'Konseling Siswa',
                'deskripsi' => 'Sesi konseling dengan BK. Bahas masalah akademik dan personal.',
                'tanggal_mulai' => $now->addDays(2)->setTime(10, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(2)->setTime(11, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Ruang BK',
                'penting' => true,
                'wajib' => false,
                'kategori' => 'bk',
                'audience' => 'student',
                'target_id' => 12, // Student ID
            ],
            [
                'judul' => 'Tugas Bahasa Inggris',
                'deskripsi' => 'Essay writing assignment. Minimal 500 kata dalam bahasa Inggris.',
                'tanggal_mulai' => $now->addDays(4)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(4)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => true,
                'tempat' => 'Google Classroom',
                'penting' => false,
                'wajib' => true,
                'kategori' => 'tugas',
                'audience' => 'student',
                'target_id' => 12, // Student ID
            ],
            [
                'judul' => 'Tryout Ujian Nasional',
                'deskripsi' => 'Simulasi UNBK. Persiapan untuk ujian nasional yang sebenarnya.',
                'tanggal_mulai' => $now->addDays(12)->setTime(8, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(12)->setTime(11, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'Lab Komputer',
                'penting' => true,
                'wajib' => true,
                'kategori' => 'tryout',
                'audience' => 'student',
                'target_id' => 3363, // Student ID
            ],
            [
                'judul' => 'Pemeriksaan Kesehatan',
                'deskripsi' => 'Pemeriksaan kesehatan rutin. Cek tinggi badan, berat badan, dan kesehatan umum.',
                'tanggal_mulai' => $now->addDays(6)->setTime(9, 0)->format('Y-m-d H:i:s'),
                'tanggal_berakhir' => $now->addDays(6)->setTime(10, 0)->format('Y-m-d H:i:s'),
                'satu_hari_penuh' => false,
                'tempat' => 'UKS',
                'penting' => false,
                'wajib' => true,
                'kategori' => 'kesehatan',
                'audience' => 'student',
                'target_id' => 12, // Student ID
            ],
        ];

        foreach ($events as $e) {
            $event = Event::query()->create([
                'judul' => $e['judul'],
                'desk' => $e['deskripsi'] ?? null,
                'start_at' => $e['tanggal_mulai'],
                'end_at' => $e['tanggal_berakhir'],
                'fullday' => (bool) ($e['satu_hari_penuh'] ?? false),
                'lokasi' => $e['tempat'] ?? null,
                'penting' => (bool) ($e['penting'] ?? false),
                'sifat' => ($e['wajib'] ?? false) ? 1 : 0,
                'kategori_id' => $slugToId[$e['kategori']],
                'sta' => true,
                'meta' => [],
            ]);

            // Tambahkan target audiens berdasarkan hierarki
            switch ($e['audience']) {
                case 'global':
                    // Global events (target_type = 0) - visible to all
                    EventTarget::create([
                        'event_id' => $event->id,
                        'target_type' => 0,
                        'target_id' => 0,
                    ]);
                    break;

                case 'level':
                    // Level/tingkatan events (target_type = 1)
                    EventTarget::create([
                        'event_id' => $event->id,
                        'target_type' => 1,
                        'target_id' => $e['target_id'],
                    ]);
                    break;

                case 'class':
                    // Class/kelas events (target_type = 3)
                    EventTarget::create([
                        'event_id' => $event->id,
                        'target_type' => 3,
                        'target_id' => $e['target_id'],
                    ]);
                    break;

                case 'student':
                    // Student-specific events (target_type = 4)
                    EventTarget::create([
                        'event_id' => $event->id,
                        'target_type' => 4,
                        'target_id' => $e['target_id'],
                    ]);
                    break;
            }
        }

        // Create some events for multiple students
        $multiStudentEvents = [
            [
                'category' => 'baksos',
                'title' => 'Bakti Sosial Kelompok',
                'days' => 15,
                'desc' => 'Kegiatan bakti sosial bersama.',
                'start_hour' => 8,
                'duration_h' => 4,
                'all_day' => false,
            ],
            [
                'category' => 'lomba',
                'title' => 'Lomba Antar Kelas',
                'days' => 18,
                'desc' => 'Kompetisi olahraga antar kelas.',
                'start_hour' => 14,
                'duration_h' => 3,
                'all_day' => false,
            ],
        ];

        foreach ($multiStudentEvents as $e) {
            $start = $now->addDays($e['days']);
            if (isset($e['start_hour'])) {
                $start = $start->setTime($e['start_hour'], 0);
            }
            $end = null;
            if (! empty($e['duration_h'])) {
                $end = $start->addHours($e['duration_h']);
            }

            $event = Event::query()->create([
                'judul' => $e['title'],
                'desk' => $e['desc'] ?? null,
                'start_at' => $start->toDateTimeString(),
                'end_at' => $end?->toDateTimeString(),
                'fullday' => (bool) ($e['all_day'] ?? false),
                'lokasi' => $e['location'] ?? null,
                'penting' => (bool) ($e['important'] ?? false),
                'sifat' => ($e['status'] ?? 'opsional') === 'wajib' ? 1 : 0,
                'kategori_id' => $slugToId[$e['category']],
                'sta' => true,
                'meta' => [],
            ]);

            // Create targets for multiple students
            foreach ($students as $studentId) {
                EventTarget::create([
                    'event_id' => $event->id,
                    'target_type' => 4, // Student-specific
                    'target_id' => $studentId,
                ]);
            }
        }
    }
}
