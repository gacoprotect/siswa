import { cn } from "@/lib/utils";
import { AlertCircle, X } from "lucide-react";
import React, { forwardRef, ReactNode, useEffect, useRef, useState, useCallback } from "react";
import InputGroup from "../InputGroup";

interface ModalProps {
  title?: string | null | undefined;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  overlayClassName?: string;
  className?: string;
  header?: boolean;
  footer?: ReactNode;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  cancelText?: string | React.ReactNode;
  confirmText?: string | React.ReactNode;
  confirmDisabled?: boolean;
  confirmClassName?: string;
  error?: string;
  agreement?: string | React.ReactNode;
  onScrollToBottom?: () => void;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "w-full mx-6",
};

export const Modal: React.FC<ModalProps> = ({
  title = '',
  size = "md",
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  overlayClassName = "",
  className = "",
  header = true,
  footer,
  onConfirm,
  cancelText = "Batal",
  confirmText = "Setuju",
  confirmDisabled = false,
  confirmClassName = "bg-primary text-primary-foreground hover:bg-primary/90",
  error,
  onScrollToBottom,
  agreement,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate disabled state
  const isDisabled = useCallback(() => {
    const hasError = !!error;
    const requiresAgreement = !!agreement;
    const requiresScroll = !!onScrollToBottom;

    // Base disabled state from props
    if (confirmDisabled) return true;

    // If there's an error
    if (hasError) return true;

    // If agreement is required but not agreed
    if (requiresAgreement && !agreed) return true;

    // If scroll to bottom is required but not scrolled
    if (requiresScroll && !scrolledToBottom) return true;

    return false;
  }, [confirmDisabled, error, agreement, agreed, onScrollToBottom, scrolledToBottom]);

  // Detect scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isOpen) return;

    const handleScroll = () => {
      const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setScrolledToBottom(isBottom);
      if (isBottom && onScrollToBottom) {
        onScrollToBottom();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isOpen, onScrollToBottom]);

  // Close with ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setAgreed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Overlay click close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
      setAgreed(false);
    }
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setAgreed(false);
      setScrolledToBottom(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setAgreed(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          `relative bg-secondary text-secondary-foreground rounded-lg shadow-lg flex flex-col max-h-[90vh] ${sizeMap[size]}`,
          className
        )}
      >
        {header && (
          <ModalHeader onClose={handleClose}>{title}</ModalHeader>
        )}
        <ModalBody className="flex-1 overflow-auto" ref={scrollRef}>
          {children}
        </ModalBody>
        {agreement && (
          <div className='flex gap-2 px-4 text-sm'>
            <InputGroup
              name="agreement"
              type="checkbox"
              checked={agreed}
              onChange={(val) => setAgreed(Boolean(val))}
              classNameInput={cn(
                'h-5 w-5 form-checkbox rounded accent-blue-500',
                !agreed && 'animate-pulse bg-accent-primary',
                error && 'accent-red-500'
              )}
            />
            {agreement}
          </div>
        )}
        {(footer || onConfirm) && (
          <ModalFooter className={cn(error && 'justify-between')}>
            {error && (
              <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                <AlertCircle className="text-red-500 w-4 h-4" />
                {error}
              </p>
            )}

            {footer || (
              <div className="flex gap-2 items-center">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-white text-sm font-medium rounded-md bg-red-500 hover:bg-red-400"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDisabled()}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
                    confirmClassName
                  )}
                >
                  {confirmText}
                </button>
              </div>
            )}
          </ModalFooter>
        )}
      </div>
    </div>
  );
};

// Header (unchanged)
interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = "",
  showCloseButton = true,
  onClose,
}) => {
  return (
    <div className={`flex justify-between items-center p-2 border-b ${className}`}>
      <h3 className="text-xl font-semibold">{children}</h3>
      {showCloseButton && (
        <button
          onClick={onClose}
          className=" absolute top-2 right-2 text-red-500 hover:text-accent-foreground text-2xl"
          aria-label="Close"
        >
          <X />
        </button>
      )}
    </div>
  );
};

// Body (unchanged)
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={`p-2 overflow-auto ${className}`}>
      {children}
    </div>
  )
);

// Footer (unchanged)
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}
export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = "" }) => (
  <div className={cn(`px-2 py-2 border-t flex justify-end space-x-2 `, className)}>{children}</div>
);