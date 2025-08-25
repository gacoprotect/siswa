<?php

namespace Database\Seeders;

use App\Models\Admin\Event;
use App\Models\Admin\EventCategory;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;

class EventCalendarSeeder extends Seeder
{
    public function run(): void
    {
        $nouid = 'a7095648';

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
            [
                'category' => 'pengumuman',
                'title' => 'Pengumuman Kalender Semester',
                'days' => 0,
                'desc' => 'Rangkuman agenda semester ini.',
                'all_day' => true,
                'important' => true,
            ],
            [
                'category' => 'ujian',
                'title' => 'Ujian Matematika Bab 1',
                'days' => 3,
                'desc' => 'Materi aljabar dan persamaan linear.',
                'start_hour' => 9,
                'duration_h' => 2,
                'important' => false,
            ],
            [
                'category' => 'tugas',
                'title' => 'Tugas IPA: Laporan Praktikum',
                'days' => 1,
                'desc' => 'Kumpulkan PDF di LMS.',
                'all_day' => true,
            ],
            [
                'category' => 'agenda-sekolah',
                'title' => 'Upacara Bendera',
                'days' => 7,
                'desc' => 'Wajib hadir, seragam lengkap.',
                'start_hour' => 7,
                'duration_h' => 1,
            ],
            [
                'category' => 'rapat-orang-tua',
                'title' => 'Rapat Orang Tua/Wali',
                'days' => 10,
                'desc' => 'Pembahasan perkembangan belajar.',
                'start_hour' => 13,
                'duration_h' => 2,
            ],
            [
                'category' => 'ekskul',
                'title' => 'Ekskul Futsal',
                'days' => 5,
                'desc' => 'Latihan rutin di lapangan indoor.',
                'start_hour' => 15,
                'duration_h' => 2,
            ],
            [
                'category' => 'libur',
                'title' => 'Libur Nasional',
                'days' => 14,
                'desc' => 'Tanggal merah, sekolah libur.',
                'all_day' => true,
            ],
            [
                'category' => 'tryout',
                'title' => 'Tryout Ujian Nasional',
                'days' => 12,
                'desc' => 'Simulasi UNBK.',
                'start_hour' => 8,
                'duration_h' => 3,
                'important' => true,
            ],
        ];

        foreach ($events as $e) {
            $start = $now->addDays($e['days']);
            if (isset($e['start_hour'])) {
                $start = $start->setTime($e['start_hour'], 0);
            }
            $end = null;
            if (! empty($e['duration_h'])) {
                $end = $start->addHours($e['duration_h']);
            }

            Event::query()->create([
                'nouid' => $nouid,
                'event_category_id' => $slugToId[$e['category']],
                'title' => $e['title'],
                'description' => $e['desc'] ?? null,
                'start_at' => $start->toDateTimeString(),
                'end_at' => $end?->toDateTimeString(),
                'all_day' => (bool) ($e['all_day'] ?? false),
                'location' => $e['location'] ?? null,
                'status' => ($e['status'] ?? 'wajib'),
                'is_important' => (bool) ($e['important'] ?? false),
                'meta' => [],
            ]);
        }
    }
}
