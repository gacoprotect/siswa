<?php

namespace Tests\Feature;

use Tests\TestCase;

class FlashMessageTest extends TestCase
{
    public function test_flash_message_middleware_handles_string()
    {
        $response = $this->get('/test-flash-string');

        // Mock session with string flash message
        $this->session(['message' => 'Test success message']);

        $response->assertStatus(200);
    }

    public function test_flash_message_middleware_handles_array()
    {
        $response = $this->get('/test-flash-array');

        // Mock session with array flash message
        $this->session(['message' => [
            'message' => 'Test array message',
            'type' => 'success',
        ]]);

        $response->assertStatus(200);
    }

    public function test_flash_message_middleware_handles_null()
    {
        $response = $this->get('/test-flash-null');

        // No flash message in session
        $response->assertStatus(200);
    }

    public function test_errors_middleware_handles_validation_errors()
    {
        $response = $this->post('/test-validation', [
            'required_field' => '', // Empty required field
        ]);

        $response->assertSessionHasErrors(['required_field']);
    }

    public function test_errors_middleware_handles_no_errors()
    {
        $response = $this->get('/test-no-errors');

        $response->assertStatus(200);
    }
}
