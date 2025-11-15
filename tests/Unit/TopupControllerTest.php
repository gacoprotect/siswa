<?php

namespace Tests\Unit;

use App\Http\Controllers\TopupController;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class TopupControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_controller_has_required_methods()
    {
        $controller = app(TopupController::class);

        $this->assertTrue(method_exists($controller, 'index'));
        $this->assertTrue(method_exists($controller, 'charge'));
        $this->assertTrue(method_exists($controller, 'checkPendingTransaction'));
    }

    public function test_charge_method_validates_amount_minimum()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 5000, // Below minimum
            'va_number' => '12345678901234567890',
        ]);

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_validates_amount_maximum()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 20000000, // Above maximum
            'va_number' => '12345678901234567890',
        ]);

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_validates_va_number_format()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 50000,
            'va_number' => '123', // Too short
        ]);

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_validates_amount_numeric()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 'invalid',
            'va_number' => '12345678901234567890',
        ]);

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_validates_va_number_numeric()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 50000,
            'va_number' => 'invalid',
        ]);

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_validates_required_fields()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        // No data provided

        $this->expectException(ValidationException::class);
        $controller->charge($request, 'test-nouid');
    }

    public function test_charge_method_handles_empty_nouid()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 50000,
            'va_number' => '12345678901234567890',
        ]);

        $response = $controller->charge($request, '');

        $this->assertTrue($response->getSession()->has('errors'));
        $this->assertContains('Parameter nouid tidak valid', $response->getSession()->get('errors')->get('message'));
    }

    public function test_validation_exception_contains_correct_errors()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 'invalid',
            'va_number' => '12345678901234567890',
        ]);

        try {
            $controller->charge($request, 'test-nouid');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('amount', $e->errors());
            $this->assertContains('Jumlah topup harus berupa angka', $e->errors()['amount']);

            return;
        }

        $this->fail('ValidationException should have been thrown');
    }

    public function test_validation_exception_contains_custom_messages()
    {
        $controller = app(TopupController::class);
        $request = new Request;
        $request->merge([
            'amount' => 5000, // Below minimum
            'va_number' => '12345678901234567890',
        ]);

        try {
            $controller->charge($request, 'test-nouid');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('amount', $e->errors());
            $this->assertContains('Jumlah topup minimal Rp 10.000', $e->errors()['amount']);

            return;
        }

        $this->fail('ValidationException should have been thrown');
    }

    public function test_check_pending_transaction_method_exists()
    {
        $controller = app(TopupController::class);

        $this->assertTrue(method_exists($controller, 'checkPendingTransaction'));
        $this->assertTrue(is_callable([$controller, 'checkPendingTransaction']));
    }
}
