<?php

namespace App\Exceptions\Snap;

class SnapBusinessException extends SnapException
{
    public function __construct(
        string $responseCode,
        string $responseMessage,
        ?array $responseData = null,
        int $httpCode = 403,
        ?\Throwable $previous = null
    ) {
        parent::__construct($responseCode, $responseMessage, $responseData, 'Business', $httpCode, $previous);
    }
}

