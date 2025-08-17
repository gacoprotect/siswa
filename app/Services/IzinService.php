<?php

namespace App\Services;

use App\Models\Admin\Tizin;
use App\Models\Admin\Tizinjenis;
use App\Services\DataValidatorService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Exception;

class IzinService
{
    protected DataValidatorService $validator;
    protected TimagableService $imageService;

    public function __construct(DataValidatorService $validator, TimagableService $imageService)
    {
        $this->validator = $validator;
        $this->imageService = $imageService;
    }

    /**
     * Get all izin types
     */
    public function getJenis()
    {
        return Tizinjenis::orderBy('id', 'desc')->get();
    }

    /**
     * Create new izin record with optional file upload
     * 
     * @param array $data Form data
     * @param UploadedFile|array|null $files Optional file upload
     * @return Tizin
     * @throws Exception
     */
    // In IzinService
    public function create(array $data, $files = null)
    {
        try {
            return DB::transaction(function () use ($data, $files) {
                $izin = Tizin::create([
                    'idsis' => $data['idsis'],
                    'jen' => $data['jen'],
                    'tgl_mulai' => $data['tgl_mulai'],
                    'tgl_akhir' => $data['tgl_akhir'],
                    'ket' => $data['ket'],
                ]);

                if ($files) {
                    $file = $this->handleFileUpload($files, $izin->id, Tizin::class);
                }
                logger('Creating Tizin', [
                    'timestamps' => $izin->usesTimestamps(),
                    'created_at' => $izin->created_at,
                    'updated_at' => $izin->updated_at
                ]);
                return $izin;
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Get izin data for specific student
     */
    public function getByStudentId(string $studentId): array
    {
        return [
            'data' => [
                'izin' => Tizin::where('idsis', $studentId)->get(),
            ],
            'jenis' => $this->getJenis()
        ];
    }

    /**
     * Handle file upload process
     */
    protected function handleFileUpload($files, $izinId, string $modelType)
    {
        return $this->imageService->simpan(
            $files,
            $izinId,
            $modelType
        );
    }
}
