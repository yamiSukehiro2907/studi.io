import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  heading: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  heading,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-150"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-base-100 rounded-xl shadow-xl w-full max-w-sm pointer-events-auto animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
            <h3 className="text-lg font-semibold">{heading}</h3>
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={onCancel}
              disabled={isProcessing}
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-3 text-center">
            <AlertTriangle className="mx-auto text-warning size-8" />
            {description && (
              <p className="text-sm text-base-content/70">{description}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-5 py-3 border-t border-base-300">
            <button
              className="btn btn-ghost flex-1"
              onClick={onCancel}
              disabled={isProcessing}
            >
              {cancelText}
            </button>
            <button
              className="btn btn-error flex-1"
              onClick={onConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
