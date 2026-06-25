"use client";

import { Modal, Button } from "@heroui/react";

export default function PromoteAdminModal({ isOpen, onOpenChange, userName, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-100">
            <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            
            <Modal.Header className="flex flex-col gap-1">
              <Modal.Heading className="text-xl font-bold text-slate-900">
                Promote to Admin?
              </Modal.Heading>
            </Modal.Header>
            
            <Modal.Body className="py-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Are you sure you want to make <strong className="text-slate-950">{`"${userName}"`}</strong> an Admin?
              </p>
              <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg font-medium border border-amber-100 mt-2">
                ⚠️ Note: If you promote this user to Admin, they will be automatically removed from this readers/writers list view.
              </p>
            </Modal.Body>
            
            <Modal.Footer className="flex justify-end gap-3 mt-4">
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg px-4"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 shadow-sm"
                onClick={onConfirm}
              >
                Confirm & Change
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}