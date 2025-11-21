import React from "react";
import {X, AlertTriangle} from "lucide-react";

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
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-150"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-base-100 rounded-2xl shadow-2xl border border-emerald-300/40 w-full max-w-sm animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b border-base-300/50 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
                        <h3 className="text-lg font-semibold text-emerald-700">
                            {heading}
                        </h3>
                        <button
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={onCancel}
                            disabled={isProcessing}
                        >
                            <X className="size-4"/>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-5 text-center space-y-3">
                        <AlertTriangle className="mx-auto text-warning size-8"/>
                        {description && (
                            <p className="text-sm text-base-content/70">{description}</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 px-5 py-4 border-t border-base-300/50">
                        <button
                            className="btn btn-ghost flex-1 hover:text-emerald-600"
                            onClick={onCancel}
                            disabled={isProcessing}
                        >
                            {cancelText}
                        </button>
                        <button
                            className="btn bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:from-emerald-400 hover:to-teal-400 shadow-md hover:shadow-emerald-500/30 transition-all"
                            onClick={onConfirm}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"/>
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
