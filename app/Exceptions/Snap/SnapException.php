<?php

namespace App\Exceptions\Snap;

use Exception;

class SnapException extends Exception
{
    protected string $responseCode;
    protected string $responseMessage;
    protected ?array $responseData;
    protected string $category;
    protected int $httpCode;

    public function __construct(
        string $responseCode,
        string $responseMessage,
        ?array $responseData = null,
        string $category = 'System',
        int $httpCode = 500,
        ?\Throwable $previous = null
    ) {
        parent::__construct($responseMessage, $httpCode, $previous);
        
        $this->responseCode = $responseCode;
        $this->responseMessage = $responseMessage;
        $this->responseData = $responseData;
        $this->category = $category;
        $this->httpCode = $httpCode;
    }

    public function getResponseCode(): string
    {
        return $this->responseCode;
    }

    public function getResponseMessage(): string
    {
        return $this->responseMessage;
    }

    public function getResponseData(): ?array
    {
        return $this->responseData;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function getHttpCode(): int
    {
        return $this->httpCode;
    }

    /**
     * Convert exception to array for JSON response
     */
    public function toArray(): array
    {
        return [
            'success' => false,
            'response_code' => $this->responseCode,
            'response_message' => $this->responseMessage,
            'category' => $this->category,
            'http_code' => $this->httpCode,
            'data' => $this->responseData,
        ];
    }
}

