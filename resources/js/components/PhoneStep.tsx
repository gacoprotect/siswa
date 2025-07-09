// components/PhoneStep.tsx
import React from 'react';

interface PhoneStepProps {
  phone: string;
  errors: Record<string, string>;
  processing: boolean;
  registeredPhone: string;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
  phone,
  errors,
  processing,
  registeredPhone,
  onPhoneChange,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900">Masukkan Nomor HP Anda yang terdaftar</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Kami akan mengirimkan kode OTP ke nomor ini <br />
          {registeredPhone}
        </p>
      </div>

      {errors.phone && <div className="text-center text-sm text-red-500">{errors.phone}</div>}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Nomor Handphone
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">+62</span>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              className={`block w-full rounded-md border-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } py-2 pl-12 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="8123456789"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={processing || phone.length < 10}
            className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
              phone.length >= 10 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'cursor-not-allowed bg-gray-400'
            } focus:ring-2 focus:ring-offset-2 focus:outline-none`}
          >
            {processing ? 'Mengirim OTP...' : 'Kirim Kode OTP'}
          </button>
        </div>
      </form>
    </div>
  );
};