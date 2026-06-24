"use client";

import { useState } from "react";
import { Table, Button, Chip, toast } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import Image from "next/image";
 
import DeleteBookModal from "./DeleteBookModal";
import { deleteEbook, updateEbook } from "@/lib/api/ebooks";
import StatusDropdown from "@/components/Dashboard/StatusDropDown";

export default function ManageEbooksTable({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Status Toggle
  const handleTogglePublish = async (bookId, targetStatus) => {
    try {
      const res = await updateEbook(bookId, { status: targetStatus });
      
      if (res) {
        setBooks(prevBooks => 
          prevBooks.map(b => b._id === bookId ? { ...b, status: targetStatus } : b)
        );
        toast.success(`Ebook status updated to ${targetStatus}!`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete Handler
  const handleConfirmDelete = async () => {
    const res = await deleteEbook(bookToDelete._id);
    if (res?.deletedCount > 0 || res) {
      setBooks(books.filter(b => b._id !== bookToDelete._id));
      toast.success("Ebook deleted successfully!");
    } else {
      toast.error("Failed to delete ebook");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Table className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <Table.ScrollContainer>
          <Table.Content aria-label="Ebooks management table">
            
            {/* 📋 Table Header */}
            <Table.Header className="bg-[#f8fafc] border-b border-slate-100 text-[#475569] text-[11px] font-bold uppercase tracking-wider">
              <Table.Column isRowHeader className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">TITLE</Table.Column>
              <Table.Column className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">WRITER</Table.Column>
              <Table.Column className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">PRICE</Table.Column>
              <Table.Column className="py-4 px-6 text-center !bg-[#f8fafc] text-slate-500 font-bold">STATUS</Table.Column>
              <Table.Column className="py-4 px-6 text-center !bg-[#f8fafc] text-slate-500 font-bold">ACTIONS</Table.Column>
            </Table.Header>
            
            {/* 📋 Table Body */}
            <Table.Body>
              {books.map((book) => {
                const bookStatus = book.status?.toLowerCase() || "pending";
                return (
                  <Table.Row key={book._id} className="border-b border-slate-500/5 hover:bg-[#f8fafc]/60 transition-all duration-200">
                    
                    {/* Title with Book Cover Image */}
                    <Table.Cell className="py-4 px-6 !bg-white">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-14 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm flex-shrink-0">
                          <Image
                            src={book.coverImage || "/placeholder-book.jpg"}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0f172a] max-w-[200px] truncate">
                          {book.title}
                        </span>
                      </div>
                    </Table.Cell>
                    
                    {/* Writer */}
                    <Table.Cell className="py-4 px-6 text-sm text-slate-600 font-medium !bg-white">
                      {book.writerName || "Unknown"}
                    </Table.Cell>
                    
                    {/* Price */}
                    <Table.Cell className="py-4 px-6 text-sm font-bold text-[#6366F1] !bg-white">
                      {Number(book.price) === 0 ? "Free" : `$${book.price}`}
                    </Table.Cell>
                    
                    {/* Status Chip */}
                    <Table.Cell className="py-4 px-6 text-center !bg-white">
                      <Chip 
                        size="sm" 
                        variant="flat" 
                        className={`capitalize text-[11px] font-bold px-2.5 py-0.5 rounded-md border-0 ${
                          bookStatus === "published" ? "bg-emerald-500/10 text-emerald-600" : 
                          bookStatus === "pending" ? "bg-amber-500/10 text-amber-600" : 
                          "bg-slate-500/10 text-slate-600"
                        }`}
                      >
                        {book.status || "Pending"}
                      </Chip>
                    </Table.Cell>
                    
                    {/* Actions */}
                    <Table.Cell className="py-4 px-6 !bg-white">
                      <div className="flex items-center gap-3 justify-center">
                        <StatusDropdown
                          bookId={book._id} 
                          currentStatus={book.status} 
                          toggleAction={handleTogglePublish} 
                        />
                        
                        {/* Delete Button */}
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="flat" 
                          onClick={() => { setBookToDelete(book); setIsModalOpen(true); }} 
                          className="bg-[#334155] text-white rounded-lg hover:bg-[#1e293b] min-w-8 h-8 flex items-center justify-center transition-colors"
                        >
                          <TrashBin className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>

                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
      
      <DeleteBookModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} bookToDelete={bookToDelete} onConfirm={handleConfirmDelete} />
    </>
  );
}