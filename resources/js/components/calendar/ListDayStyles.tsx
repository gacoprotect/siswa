import * as React from 'react'
import { useEffect } from 'react'

/**
 * Komponen ini berisi gaya kustom untuk tampilan listDay di kalender
 * Ini akan digunakan untuk menambahkan CSS ke halaman ketika tampilan listDay aktif
 */
export const ListDayStyles: React.FC = () => {
    useEffect(() => {
        // Buat elemen style
        const style = document.createElement('style');
        style.setAttribute('id', 'fc-listDay-styles');
        style.textContent = `
      /* Gaya untuk header tampilan listDay */
      .fc .fc-list-day-cushion {
        background-color: #f9fafb !important;
        padding: 8px 14px !important;
      }
      
      .fc .fc-list-day-text,
      .fc .fc-list-day-side-text {
        font-weight: 600 !important;
        font-size: 0.9rem !important;
        color: #111827 !important;
      }

      /* Gaya untuk tabel listDay */
      .fc .fc-list-table {
        border-radius: 0.375rem;
        overflow: hidden;
      }

      /* Gaya untuk header tabel */
      .fc .fc-list-table th {
        background-color: #f3f4f6 !important;
        padding: 10px 14px !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.025em !important;
        color: #4b5563 !important;
      }

      /* Gaya untuk baris tabel */
      .fc .fc-list-table td {
        padding: 10px 14px !important;
        font-size: 0.9rem !important;
        border-width: 0 !important;
        border-bottom-width: 1px !important;
        border-color: #e5e7eb !important;
      }
      
      /* Gaya untuk sel waktu pada baris */
      .fc .fc-list-event-time {
        font-weight: 500 !important;
        color: #4b5563 !important;
        width: 140px !important;
      }

      /* Gaya saat hover pada baris acara */
      .fc .fc-list-event:hover td {
        background-color: #f3f4f6 !important;
      }

      /* Gaya khusus untuk baris acara penting */
      .fc .fc-list-event.is-important td {
        background-color: #fffbeb22 !important;
      }

      /* Gaya khusus untuk baris acara libur */
      .fc .fc-list-event.is-holiday td {
        background-color: #fee2e222 !important;
      }
      
      /* Menyesuaikan tampilan untuk perangkat mobile */
      @media (max-width: 640px) {
        .fc .fc-list-event-time {
          width: 100px !important;
          font-size: 0.75rem !important;
        }
        
        .fc .fc-list-event-title {
          font-size: 0.85rem !important;
        }
      }
    `;

        // Tambahkan ke head dokumen
        document.head.appendChild(style);

        // Cleanup saat komponen unmount
        return () => {
            const existingStyle = document.getElementById('fc-listDay-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    // Komponen ini tidak merender apa pun ke DOM
    return null;
}

export default ListDayStyles