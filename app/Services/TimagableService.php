<?php

namespace App\Services;

use App\Models\Saving\Timagable;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;

class TimagableService
{
    protected string $disk = 'local';
    protected string $directory = 'uploads';

    /**
     * Universal save method (handles both single and multiple files)
     * 
     * @param UploadedFile|UploadedFile[] $files
     * @param mixed $imagableId
     * @param string $imagableType
     * @return Timagable|Timagable[]
     * @throws Exception
     */
    public function simpan($files, $imagableId, string $imagableType)
    {
        // Convert single file to array for unified processing
        $filesArray = is_array($files) ? $files : [$files];
        
        if (empty($filesArray)) {
            return [];
        }

        $result = DB::transaction(function () use ($filesArray, $imagableId, $imagableType) {
            $saved = [];
            
            foreach ($filesArray as $file) {
                if (!$file instanceof UploadedFile) {
                    continue;
                }

                $path = $file->store($this->directory, $this->disk);
                
                if (!$path) {
                    throw new Exception("Failed to store file: {$file->getClientOriginalName()}");
                }

                $saved[] = Timagable::create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                    'imagable_id' => $imagableId,
                    'imagable_type' => $imagableType,
                ]);
            }

            return $saved;
        });

        // Return single model if input was single file, otherwise return array
        return is_array($files) ? $result : ($result[0] ?? null);
    }

    /**
     * Universal delete method (handles both single and multiple models)
     * 
     * @param Timagable|Timagable[] $timagables
     * @return bool
     * @throws Exception
     */
    public function delete($timagables): bool
    {
        $timagablesArray = is_array($timagables) ? $timagables : [$timagables];
        
        if (empty($timagablesArray)) {
            return true;
        }

        return DB::transaction(function () use ($timagablesArray) {
            foreach ($timagablesArray as $timagable) {
                if (!$timagable instanceof Timagable) {
                    continue;
                }

                if ($timagable->path && Storage::disk($this->disk)->exists($timagable->path)) {
                    Storage::disk($this->disk)->delete($timagable->path);
                }

                if (!$timagable->delete()) {
                    throw new Exception("Failed to delete timagable with ID: {$timagable->id}");
                }
            }

            return true;
        });
    }
}