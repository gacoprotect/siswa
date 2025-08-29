<?php
namespace App\Http\Controllers;

use App\Services\AgreementService;
use App\Services\CalendarService;
use App\Services\DataValidatorService;
use App\Services\IzinService;
use App\Services\TagihanService;
use App\Services\TimagableService;
use App\Services\TransactionService;
use Illuminate\Http\Request;

abstract class Controller
{
    protected $nouid;
    public function __construct(
        protected readonly AgreementService $agreement,
        protected readonly CalendarService $calendar,
        protected readonly DataValidatorService $validator,
        protected readonly IzinService $izin,
        protected readonly TagihanService $tagihan,
        protected readonly TimagableService $timagable,
        protected readonly TransactionService $trx,
    ) {
        $req = new Request();
        $this->nouid = $req->route('nouid');
    }
}
