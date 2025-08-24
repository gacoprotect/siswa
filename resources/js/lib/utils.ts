import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Mengubah nama menjadi format terproteksi (contoh: WAHYU WIJAYA CAHYA → W**U W**A C**A)
 * @param fullName Nama lengkap yang akan dimasking
 * @returns Nama yang sudah dimasking
 */
export const maskName = (fullName: string): string => {
    return fullName
        .split(' ')
        .map((word) => {
            if (word.length <= 2) return word; // Tidak masking kata pendek

            const firstChar = word[0];
            const lastChar = word[word.length - 1];
            const maskedPart = '*'.repeat(Math.max(0, word.length - 2));

            return `${firstChar}${maskedPart}${lastChar}`;
        })
        .join(' ');
};

/**
 * Mengubah nomor telepon menjadi format terproteksi (contoh: 12345678 → 12***78)
 * @param phoneNumber Nomor telepon yang akan dimasking
 * @param visibleDigits Jumlah digit yang terlihat di awal dan akhir (default: 2)
 * @returns Nomor telepon yang sudah dimasking
 */
export const maskPhoneNumber = (phoneNumber: string, visibleDigits: number = 2): string => {
    if (phoneNumber.length <= visibleDigits * 2) {
        return phoneNumber; // Tidak masking jika terlalu pendek
    }

    const firstPart = phoneNumber.substring(0, 4);
    const lastPart = phoneNumber.substring(phoneNumber.length - visibleDigits);
    const maskedPart = '*'.repeat(phoneNumber.length - visibleDigits * 2);

    return `${firstPart}${maskedPart}${lastPart}`;
};

export function formatIDR(value: number | string): string {
    // Pastikan jadi Number
    const amount = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(amount)) return 'Rp 0 ,-';

    // Format dengan ribuan tanpa desimal
    const formatted = amount.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Tambahkan prefix dan suffix
    return `Rp ${formatted} ,-`;
}


export function formatBulan(bulid: number): string {
    const bulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return bulan[bulid - 1] || 'Undefined';
}

export function formatCurrency(amount: number | string): string {
    const amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(amountNumber)) return 'Rp 0 ,-';

    // Handle negative numbers by placing minus sign after "Rp"
    if (amountNumber < 0) {
        const absoluteValue = Math.abs(amountNumber);
        const formatted = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(absoluteValue);

        // Replace "Rp" with "Rp -" to get the desired format
        return formatted.replace('Rp', 'Rp -');
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amountNumber);
}

/**
 * Format angka dalam format akuntansi Indonesia
 * Format: angka positif = 1.000.000, angka negatif = (1.000.000)
 * @param amount Jumlah yang akan diformat
 * @param decimals Jumlah desimal (default: 0)
 * @returns String yang sudah diformat
 */
export function formatAccounting(amount: number | string, decimals: number = 0): string {
    const amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(amountNumber)) return '0';

    // Format angka dengan pemisah ribuan
    const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Math.abs(amountNumber));

    // Jika negatif, tambahkan tanda kurung
    if (amountNumber < 0) {
        return `- ${formatted}`;
    }

    return formatted;
}

/**
 * Format mata uang dalam format akuntansi Indonesia
 * Format: angka positif = Rp 1.000.000, angka negatif = (Rp 1.000.000)
 * @param amount Jumlah yang akan diformat
 * @param decimals Jumlah desimal (default: 0)
 * @returns String yang sudah diformat
 */
export function formatAccountingCurrency(amount: number | string, decimals: number = 0): string {
    const amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(amountNumber)) return 'Rp 0';

    // Format angka dengan pemisah ribuan
    const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Math.abs(amountNumber));

    // Jika negatif, tambahkan tanda kurung
    if (amountNumber < 0) {
        return `(Rp ${formatted})`;
    }

    return `Rp ${formatted}`;
}
