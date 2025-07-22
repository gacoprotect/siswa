import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: Siswa | null;
}
export type DataValue = string | NestedData;

export interface NestedData {
    [key: string]: DataValue;
}

export interface PageProps {
    flash?: FlashMessage;
    errors?: Record<string, string>;
    name?: string;
    data?: NestedData
    [key: string]: unknown
}
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    nouid: string;
    errors: Record<string, string[]>;
    flash: Flash;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    data: { [key: string]: unknown };
    [key: string]: unknown;
}
export interface Page {
    component: string;
    props: ShareData;
    uri: string;
    version: string;
    clearHistory: boolean;
    encryptHistory: boolean;
}
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface SiswaSummary {
    active?: boolean;
    pin?: boolean;
    reg?: number | null;
    sign?: string | null;
    version?: string;
}
export interface DataSiswa {
    idok: number;
    active: boolean;
    nouid: string;
    balance: number;
    summary?: SiswaSummary;
    siswa: Siswa;
}
export interface Siswa {
    has_pin: boolean;
    balance: number;
    excul?: number[];
    prestasi?: string[];
    nis?: string;
    nisn?: string;
    namlen: string;
    nampan?: string;
    namman?: string;
    ttl?: string;
    email?: string;
    temlah?: string;
    tgllah?: string;
    jenkel?: string;
    tel?: string;
    ket?: string;
    sta?: string;
    staqd?: string;
    rev?: string;
    createdby?: string;
    updatedby?: string;
    kel?: string;
    ala?: string;
    pin?: string;
    wali?: Wali | null;
    alamat?: SiswaSafe;
    [key: string]: NestedData;
}
export interface SiswaSafe {
    ids: number,
    ala: string,
    rt: string,
    rw: string,
    kec: string,//16.71.04
    lur: string, //16.71.04.1002
    kodpos: string,
    dusun: string,
    temtin: string,
    sakit: string[],
    wilayah: Wilayah,
}
export interface Wilayah {
    prov: string;
    kab: string;
    kec: string;
    kel: string;
}
export interface Wali {
    nama: string | null
    tel: string
    hub: string | null
}

export interface Bank {
    id: number;
    title: string;
    name: string;
    logo: string;
    payment_type: string;
}

export interface Nominal {
    id: number;
    amount: number;
}

export interface PaymentData {
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: string;
    va_numbers?: Array<{
        bank: string;
        va_number: string;
    }>;
    permata_va_number?: string;
}

export interface PaymentDataResponse {
    nouid: string;
    order_id: string;
    transaction: TransactionDetail;
}

export interface TransactionDetail {
    id: number;
    nouid: string;
    order_id: string;
    amount: string;
    bank: string;
    phone: string;
    va_number: string;
    payment_type: string;
    status: 'success' | 'pending' | 'failed' | 'canceled';
    type: string;
    tah: string;
    month: string;
    spr: number[];
    note: string;
    // payment_data: MidtransPaymentData;
    failure_message: string | null;
    expiry_time: string; // ISO timestamp
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface MidtransPaymentData {
    currency: string;
    order_id: string;
    bill_key?: string;
    biller_code?: string;
    va_numbers?: VirtualAccount[];
    permata_va_number?: string;
    expiry_time: string; // format: YYYY-MM-DD HH:mm:ss
    merchant_id: string;
    status_code: string;
    fraud_status: string;
    gross_amount: string;
    payment_type: string;
    status_message: string;
    transaction_id: string;
    transaction_time: string; // format: YYYY-MM-DD HH:mm:ss
    transaction_status: string;
}

export interface VirtualAccount {
    bank: string;
    va_number: string;
}

export interface BillTagihan {
    id?: number;
    bulid?: number;
    spr?: number;
    tah: string;
    jen?: number;
    ket: string;
    jumlah: number;
    bulan: string;
    sta?: number;
}
export interface BillData {
    tagihan: number;
    transactions: BillTagihan[];
}
export interface Flash {
    success: boolean | null;
    message: string | null;
}
export interface Pelatih {
    name: string | null;
    telepon: number | null;
}
export interface Excul {
    id: number;
    name: string;
    day: string;
    time: string;
    coach: string;
    pel: Pelatih;
    quota: number;
    registered: number;
    icon: string;
}
