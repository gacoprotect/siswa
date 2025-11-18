<?php
namespace App\Services;

use Exception;

class OtpService {
    private $baseUrl = 'https://api.kirimi.id';
    private $userCode;
    private $secret;

    public function __construct($userCode, $secret) {
        $this->userCode = $userCode;
        $this->secret = $secret;
    }

    public function sendMessage($deviceId, $receiver, $message, $options = []) {
        $url = $this->baseUrl . '/v1/send-message';

        $data = [
            'user_code' => $this->userCode,
            'device_id' => $deviceId,
            'receiver' => $receiver,
            'message' => $message,
            'secret' => $this->secret,
            'enableTypingEffect' => isset($options['enableTypingEffect']) ? $options['enableTypingEffect'] : true
        ];

        // Tambahkan parameter opsional
        if (isset($options['mediaUrl'])) {
            $data['media_url'] = $options['mediaUrl'];
        }

        if (isset($options['typingSpeedMs'])) {
            $data['typingSpeedMs'] = $options['typingSpeedMs'];
        }

        $httpOptions = [
            'http' => [
                'header' => "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
                'timeout' => 30
            ]
        ];

        $context = stream_context_create($httpOptions);
        $result = file_get_contents($url, false, $context);

        if ($result === FALSE) {
            throw new Exception('Error: Gagal mengirim request ke API');
        }

        $response = json_decode($result, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Error: Response bukan JSON yang valid');
        }

        return $response;
    }
}
