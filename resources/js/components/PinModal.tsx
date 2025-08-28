import React from 'react';
import { Modal } from './ui/Modal';
import { PinStep } from './PinStep';
import { SetupPinStep } from './SetupPinStep';
import { OtpStep } from './OtpStep';
import { FaKey } from 'react-icons/fa';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DataSiswa } from '@/types';
import { usePinContext } from '@/contexts/pin-context';

export const PinModal: React.FC = () => {
    const { isPinModalOpen, currentAction, pinHook, closePinModal } = usePinContext();
    const { data: pageData } = usePage<{ data: DataSiswa }>().props;

    if (!isPinModalOpen || !pinHook) {
        return null;
    }

    const register = () => {
        router.get(route('register', pinHook.data.nouid));
    };

    return (
        <Modal
            title={pinHook.hasPin ? (currentAction?.description || '') : 'Anda Belum Terverifikasi'}
            isOpen={isPinModalOpen}
            onClose={() => { closePinModal(); }}
            header={false}
        >
            {pinHook.hasPin ? (
                <div className="flex items-center justify-center p-2">
                    <div className="w-full max-w-md space-y-8">
                        {pinHook.step === 'pin' && (
                            <PinStep
                                pin={pinHook.data.pin}
                                errors={pinHook.errors}
                                inputType={pinHook.inputType}
                                processing={pinHook.processing}
                                onPinChange={(e, index) => pinHook.handlePinChange(e.target.value, index)}
                                onKeyDown={pinHook.handlePinKeyDown}
                                onPaste={(e) => pinHook.handlePaste(e, 'pin')}
                                onToggleInputType={pinHook.toggleInputType}
                                onSubmit={pinHook.handlePinSubmit}
                                setInputRef={(el, index) => {
                                    pinHook.pinRefs.current[index] = el;
                                }}
                                inputRefs={pinHook.pinRefs}
                            />
                        )}

                        {pinHook.step === 'otp' && (
                            <OtpStep
                                otp={pinHook.data.otp}
                                errors={pinHook.errors}
                                processing={pinHook.processing}
                                countdown={pinHook.countdown}
                                onOtpChange={(value, index) => pinHook.handleDigitChange(value, 'otp', index)}
                                onKeyDown={pinHook.handleOtpKeyDown}
                                onBack={() => closePinModal()}
                                onResendOtp={pinHook.resendOtp}
                                onSubmit={pinHook.handleOtpSubmit}
                                inputRefs={pinHook.otpRefs}
                            />
                        )}

                        {pinHook.step === 'setup' && (
                            <SetupPinStep
                                errors={pinHook.errors}
                                inputType={pinHook.inputType}
                                onToggleInputType={pinHook.toggleInputType}
                                onSukses={() => closePinModal()}
                            />
                        )}
                    </div>
                </div>
            ) : (pageData.summary && 'reg' in pageData.summary && pageData.summary.reg === 1 && 'pin' in pageData.summary && pageData.summary.pin === false) ? (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center">
                    <p className="max-w-md text-sm">
                        {currentAction?.description || 'Untuk melanjutkan silahkan buat PIN Anda terlebih dahulu'}
                    </p>
                    <button
                        onClick={() => {
                            // Handle setup PIN
                            console.log('Setup PIN clicked');
                        }}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Buat Sekarang</span>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center">
                    <p className="max-w-md text-sm">
                        {currentAction?.description || 'Untuk melanjutkan silahkan verifikasi identitas diri Anda terlebih dahulu'}
                    </p>
                    <button
                        onClick={register}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Verifikasi Sekarang</span>
                    </button>
                </div>
            )}
        </Modal>
    );
};
