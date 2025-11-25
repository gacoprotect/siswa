<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

/**
 * Base Application Exception
 * 
 * Base exception class yang mengikuti standar RFC 7807 (Problem Details for HTTP APIs)
 * 
 * @see https://tools.ietf.org/html/rfc7807
 */
abstract class BaseApplicationException extends Exception
{
    protected ?string $typeUri = null;
    protected ?array $context = null;
    protected int $httpStatusCode = 500;

    /**
     * Create new exception instance
     *
     * @param string $message
     * @param int $httpStatusCode
     * @param array|null $context
     * @param \Throwable|null $previous
     */
    public function __construct(
        string $message = '',
        int $httpStatusCode = 500,
        ?array $context = null,
        ?\Throwable $previous = null
    ) {
        parent::__construct($message, $httpStatusCode, $previous);
        $this->httpStatusCode = $httpStatusCode;
        $this->context = $context;
    }

    /**
     * Get HTTP status code
     *
     * @return int
     */
    public function getStatusCode(): int
    {
        return $this->httpStatusCode;
    }

    /**
     * Get type URI for RFC 7807
     *
     * @return string
     */
    public function getTypeUri(): string
    {
        if ($this->typeUri) {
            return $this->typeUri;
        }

        $baseUrl = config('app.url', 'http://localhost');
        $type = $this->getExceptionType();
        return "{$baseUrl}/errors/{$type}";
    }

    /**
     * Get exception type name
     *
     * @return string
     */
    protected function getExceptionType(): string
    {
        $className = class_basename(static::class);
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $className));
    }

    /**
     * Get context data
     *
     * @return array|null
     */
    public function getContext(): ?array
    {
        return $this->context;
    }

    /**
     * Set context data
     *
     * @param array $context
     * @return self
     */
    public function setContext(array $context): self
    {
        $this->context = $context;
        return $this;
    }

    /**
     * Render exception to JSON response as fallback
     *
     * @param Request $request
     * @return HttpResponse|JsonResponse
     */
    public function render(Request $request): JsonResponse|HttpResponse
    {
        return response()->json($this->toArray(), $this->httpStatusCode, [
            'Content-Type' => 'application/problem+json',
        ]);
    }

    /**
     * Convert exception to array
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'type' => $this->getTypeUri(),
            'title' => $this->getTitle(),
            'status' => $this->httpStatusCode,
            'detail' => $this->getMessage(),
            'context' => $this->context,
        ];
    }

    /**
     * Get title for the exception
     *
     * @return string
     */
    protected function getTitle(): string
    {
        return match ($this->httpStatusCode) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            422 => 'Validation Error',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            503 => 'Service Unavailable',
            default => 'An Error Occurred',
        };
    }
}

