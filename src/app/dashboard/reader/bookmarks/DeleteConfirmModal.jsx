"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { AlertCircle } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onClose}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-white rounded-2xl p-6 border border-[#EAE6DF] max-w-sm w-full mx-auto shadow-xl">
            <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-slate-400 hover:text-gray-950 transition-colors cursor-pointer" />

            <AlertDialog.Header className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-50 rounded-xl text-red-600">
                <AlertCircle className="w-5 h-5 stroke-2" />
              </div>
              <AlertDialog.Heading className="text-base font-sans font-bold text-gray-950">
                Remove Bookmark
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="mb-6">
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Are you sure you want to remove this book from your bookmarked
                gallery? You can add it back anytime later.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex items-center justify-end gap-2 border-t border-[#EAE6DF] pt-4">
              <Button
                size="sm"
                variant="light"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={onConfirm}
                className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-4 rounded-xl cursor-pointer"
              >
                Remove
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
