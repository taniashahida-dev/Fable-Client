'use client';

import React, { useState, useRef } from 'react';
import { AlertDialog, Button } from "@heroui/react";
import { TrashBin, TriangleExclamation } from '@gravity-ui/icons';

export default function DeleteBookButton({ bookId, deleteAction }) {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef(null);

    const handleConfirmDelete = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); 
        }
        setIsOpen(false);
    };

    return (
        <>
           
            <form ref={formRef} action={deleteAction} className="hidden ">
                <input type="hidden" name="bookId" value={bookId} />
            </form>

           
            <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button 
                    onPress={() => setIsOpen(true)}
                    isIconOnly
                    className="p-2 bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition border border-slate-700/30 min-w-0 w-8 h-8 flex items-center justify-center"
                    title="Delete"
                >
                    <TrashBin size={12} />
                </Button>

              
                <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="bg-[#0e111d] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-200">
                            
                            <AlertDialog.CloseTrigger className="absolute right-4 top-4 p-1 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition" />
                            
                           
                            <AlertDialog.Header className="flex items-center gap-3 border-b border-slate-900 pb-3">
                                <div className="p-2 bg-rose-500/10 text-rose-500 rounded-xl">
                                    <TriangleExclamation size={20} />
                                </div>
                                <AlertDialog.Heading className="text-lg font-bold text-white tracking-tight">
                                    Delete Ebook?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                         
                            <AlertDialog.Body className="py-4 text-sm text-slate-400 leading-relaxed">
                                Are you absolutely sure you want to delete this ebook? This action is permanent and cannot be undone.
                            </AlertDialog.Body>

                            
                            <AlertDialog.Footer className="flex justify-end gap-3 pt-3 border-t border-slate-900">
                                <Button 
                                    onPress={() => setIsOpen(false)}
                                    className="bg-slate-800 text-slate-300 rounded-xl px-4 h-10 text-sm font-medium hover:bg-slate-700 transition"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onPress={handleConfirmDelete}
                                    className="bg-rose-600 text-white font-semibold hover:bg-rose-700 rounded-xl px-5 h-10 text-sm transition shadow-lg shadow-rose-600/20"
                                >
                                    Yes, Delete
                                </Button>
                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
}