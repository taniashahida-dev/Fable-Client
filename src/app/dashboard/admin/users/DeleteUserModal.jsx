"use client";

import React from 'react';

import { AlertDialog, Button } from "@heroui/react";
import { TriangleExclamation } from '@gravity-ui/icons';

export default function DeleteUserModal({ isOpen, onOpenChange, userToDelete, onConfirm }) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      
      {/* ব্যাকড্রপ ও কন্টেইনার */}
      <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-[#0e111d] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-200">
            
            {/* ক্লোজ বাটন */}
            <AlertDialog.CloseTrigger className="absolute right-4 top-4 p-1 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition" />
            
            {/* ডায়ালগ হেডার */}
            <AlertDialog.Header className="flex items-center gap-3 border-b border-slate-900 pb-3">
              <div className="p-2 bg-rose-500/10 text-rose-500 rounded-xl">
                <TriangleExclamation size={20} />
              </div>
              <AlertDialog.Heading className="text-lg font-bold text-white tracking-tight">
                Delete User?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* ডায়ালগ বডি */}
            <AlertDialog.Body className="py-4 text-sm text-slate-400 leading-relaxed">
              Are you absolutely sure you want to delete <span className="text-white font-semibold">{userToDelete?.name}</span>? This action is permanent and cannot be undone.
            </AlertDialog.Body>

            {/* ডায়ালগ ফুটার */}
            <AlertDialog.Footer className="flex justify-end gap-3 pt-3 border-t border-slate-900">
              <Button 
                onPress={() => onOpenChange(false)}
                className="bg-slate-800 text-slate-300 rounded-xl px-4 h-10 text-sm font-medium hover:bg-slate-700 transition"
              >
                Cancel
              </Button>
              <Button 
                onPress={onConfirm}
                className="bg-rose-600 text-white font-semibold hover:bg-rose-700 rounded-xl px-5 h-10 text-sm transition shadow-lg shadow-rose-600/20"
              >
                Yes, Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}