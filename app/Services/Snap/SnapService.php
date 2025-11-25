<?php

namespace App\Services\Snap;

use Otnansirk\SnapBI\Interfaces\HttpResponseInterface;
use Otnansirk\SnapBI\Services\SnapBi;
use Otnansirk\SnapBI\Support\Signature;
use Otnansirk\SnapBI\Services\BCA\BcaConfig;
use Illuminate\Support\Facades\Log;
use Exception;
use Carbon\Carbon;
use BadMethodCallException;

class SnapService
{
    protected string $bank;

    public function __construct(string $bank = null)
    {
        $this->bank = $bank ?? config('snap.default', 'ocbc');
    }

    /**
     * Set bank untuk service ini
     *
     * @param string $bank
     * @return self
     */
    public function setBank(string $bank): self
    {
        $this->bank = $bank;
        return $this;
    }

    /**
     * Get current bank
     *
     * @return string
     */
    public function getBank(): string
    {
        return $this->bank;
    }

    /**
     * Get SnapBi instance untuk bank yang dipilih
     *
     * @return mixed
     */
    protected function getSnapBi()
    {
        return SnapBi::for($this->bank);
    }

    /**
     * Get access token B2B
     *
     * @return HttpResponseInterface
     */
    public function getAccessToken(): HttpResponseInterface
    {
        try {
            $baseUrl = config("snap.{$this->bank}.base_url");
            $endpointPath = '/api/v1.0/access-token/b2b';
            $endpoint = $baseUrl ? $baseUrl . $endpointPath : 'N/A';
            $clientId = config("snap.{$this->bank}.client_id");

            try {
                $timestamp = function_exists('currentTimestamp')
                    ? currentTimestamp()->toIso8601String()
                    : Carbon::now()->toIso8601String();
            } catch (\Exception $e) {
                $timestamp = Carbon::now()->toIso8601String();
            }

            Log::debug("{$this->bank} Access Token Request", [
                'bank' => strtoupper($this->bank),
                'method' => 'POST',
                'endpoint' => $endpoint,
                'base_url' => $baseUrl,
                'client_id' => $clientId ? '***' : 'NOT SET',
                'client_id_set' => !empty($clientId),
                'headers' => [
                    'X-TIMESTAMP' => $timestamp,
                    'X-CLIENT-KEY' => $clientId ? '***' : 'NOT SET',
                    'X-SIGNATURE' => '*** (generated)',
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ],
                'body' => [
                    'grantType' => 'client_credentials'
                ],
                'note' => $this->bank === 'ocbc'
                    ? 'Jika 404, periksa: 1) Base URL benar, 2) Endpoint path benar, 3) Port number benar'
                    : null
            ]);

            return $this->getSnapBi()->accessTokenB2b();
        } catch (Exception $e) {
            Log::error("{$this->bank} Access Token Error", [
                'bank' => strtoupper($this->bank),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Get signature auth
     *
     * @return HttpResponseInterface
     */
    public function getSignatureAuth(string $timestamp): string
    {
        return $this->getSnapBi()->authSignature($timestamp);
    }

    /**
     * Call VA inquiry endpoint via php-snap-bi
     */
    public function virtualAccountInquiry(array $body, ?string $token = null, array $headers = []): HttpResponseInterface
    {
        return $this->callSnapMethod('vaInquiry', $body, $headers, $token);
    }

    /**
     * Flag VA payment
     */
    public function virtualAccountPayment(array $body, ?string $token = null, array $headers = []): HttpResponseInterface
    {
        return $this->callSnapMethod('vaPayment', $body, $headers, $token);
    }

    /**
     * Check VA payment status
     */
    public function virtualAccountStatus(array $body, ?string $token = null, array $headers = []): HttpResponseInterface
    {
        return $this->callSnapMethod('vaInquiryStatus', $body, $headers, $token);
    }

    /**
     * Prepare and call SnapBI static method safely.
     *
     * @throws BadMethodCallException
     */
    protected function callSnapMethod(string $method, array $body = [], array $headers = [], ?string $token = null): HttpResponseInterface
    {
        $snapInstance = $this->getSnapBi();
        $snapClass = get_class($snapInstance);

        if (!method_exists($snapClass, $method)) {
            throw new BadMethodCallException("Method {$method} is not supported for bank {$this->bank}");
        }

        $prepared = $snapClass::withTokenB2b($token);

        if (!empty($headers)) {
            $prepared = $prepared->withHeaders($headers);
        }

        if (!empty($body)) {
            $prepared = $prepared->withBody($body);
        }

        Log::debug("{$this->bank} {$method} request", [
            'bank' => strtoupper($this->bank),
            'method' => $method,
            'token_provided' => (bool) $token,
            'headers' => array_keys($headers),
            'body_keys' => array_keys($body),
        ]);

        return call_user_func([$snapClass, $method]);
    }
}
