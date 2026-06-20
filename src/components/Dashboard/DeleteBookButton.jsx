'use client'; 

import { TrashBin } from '@gravity-ui/icons';

export default function DeleteBookButton({ bookId, deleteAction }) {
    const handleSubmit = (e) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this ebook?");
        if (!isConfirmed) {
            e.preventDefault(); 
        }
    };

    return (
        <form action={deleteAction} onSubmit={handleSubmit}>
            <input type="hidden" name="bookId" value={bookId} />
            <button 
                type="submit"
                className="p-2 bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition border border-slate-700/30" 
                title="Delete"
            >
                <TrashBin size={14} />
            </button>
        </form>
    );
}