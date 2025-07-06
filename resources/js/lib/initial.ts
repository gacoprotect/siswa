// initial.ts

import type {
    Bank,
    BillData,
    BillTagihan,
    DataSiswa,
    Excul,
    MidtransPaymentData,
    Nominal,
    PaymentData,
    PaymentDataResponse,
    Siswa,
    TransactionDetail,
    VirtualAccount,
} from '@/types'; // sesuaikan path jika perlu

export const initialSiswa: Siswa = {
    has_pin: false,
    balance: 0,
    nis: '',
    nisn: '',
    namlen: '',
    nampan: '',
    namman: '',
    temlah: '',
    tgllah: '',
    jenkel: '',
    tel: '',
    ket: '',
    sta: '',
    staqd: '',
    rev: '',
    createdby: '',
    updatedby: '',
    kel: '',
    ala: '',
    pin: '',
};

export const initialDataSiswa: DataSiswa = {
    idok: 0,
    nouid: '',
    balance: 0,
    siswa: initialSiswa,
};

export const initialBank: Bank = {
    id: 0,
    title: '',
    name: '',
    logo: '',
    payment_type: '',
};

export const initialNominal: Nominal = {
    id: 0,
    amount: 0,
};

export const initialPaymentData: PaymentData = {
    order_id: '',
    gross_amount: '',
    payment_type: '',
    transaction_status: '',
    va_numbers: [],
    permata_va_number: '',
};

export const initialVirtualAccount: VirtualAccount = {
    bank: '',
    va_number: '',
};

export const initialMidtransPaymentData: MidtransPaymentData = {
    currency: '',
    order_id: '',
    merchant_id: '',
    status_code: '',
    fraud_status: '',
    gross_amount: '',
    payment_type: '',
    status_message: '',
    transaction_id: '',
    transaction_time: '',
    transaction_status: '',
    expiry_time: '',
    va_numbers: [],
    permata_va_number: '',
};

export const initialTransactionDetail: TransactionDetail = {
    id: 0,
    nouid: '',
    order_id: '',
    amount: '',
    bank: '',
    phone: '',
    va_number: '',
    payment_type: '',
    status: 'pending',
    type: '',
    tah: '',
    month: '',
    spr: [],
    note: '',
    failure_message: null,
    expiry_time: '',
    created_at: '',
    updated_at: '',
};

export const initialPaymentDataResponse: PaymentDataResponse = {
    nouid: '',
    order_id: '',
    transaction: initialTransactionDetail,
};

export const initialBillTagihan: BillTagihan = {
    spr: 0,
    tah: '',
    jen: 0,
    ket: '',
    jumlah: 0,
    bulan: '',
    sta: 0,
};

export const initialBillData: BillData = {
    tagihan: 0,
    transactions: [],
};

export const initialExcul: Excul = {
    id: 0,
    name: '',
    day: '',
    time: '',
    pel_id: 0,
    quota: 0,
    registered: 0,
    icon: '',
};
