<?php

namespace App\Exceptions\Snap;

class SnapSystemException extends SnapException
{
    public function __construct(
        string $responseCode,
        string $responseMessage,
        ?array $responseData = null,
        int $httpCode = 500,
        ?\Throwable $previous = null
    ) {
        parent::__construct($responseCode, $responseMessage, $responseData, 'System', $httpCode, $previous);
    }
}

