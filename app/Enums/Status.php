<?php

namespace App\Enums;

enum Status: int
{
    case MENUNGGU = 0;
    case DISETUJUI = 1;
    case DITOLAK = -1;
    case DIBATALKAN = -2;

    public function label(): string
    {
        return match ($this) {
            self::MENUNGGU => 'menunggu',
            self::DISETUJUI => 'disetujui',
            self::DITOLAK => 'ditolak',
            self::DIBATALKAN => 'dibatalkan',
        };
    }

    public static function fromName(string $name): self
    {
        foreach (self::cases() as $status) {
            if ($status->name === $name) {
                return $status;
            }
        }

        throw new \ValueError("$name is not a valid backing value for enum " . self::class);
    }

    public static function tryDefault(): self
    {
        return self::tryFrom(0) ?? self::cases()[0];
    }
}
