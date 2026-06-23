"use client";

import { useState } from "react";
import { Table, Button, Chip, toast } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
 
import DeleteBookModal from "./DeleteBookModal";
import { deleteEbook, updateEbook } from "@/lib/api/ebooks";
import StatusDropdown from "@/components/Dashboard/StatusDropDown";

export default function ManageEbooksTable({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

 
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

  // 🛠️ Delete Handler
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
      <Table className="bg-[#121624] border border-slate-800/60 rounded-xl overflow-hidden shadow-lg">
        <Table.ScrollContainer>
          <Table.Content aria-label="Ebooks management table">
            <Table.Header className="bg-[#161b2e] text-slate-400 text-xs font-bold uppercase">
              <Table.Column isRowHeader className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">TITLE</Table.Column>
              <Table.Column className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">WRITER</Table.Column>
              <Table.Column className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">PRICE</Table.Column>
              <Table.Column className="py-4 px-4 text-center !bg-[#161b2e] text-slate-400">STATUS</Table.Column>
              <Table.Column className="py-4 px-4 text-center !bg-[#161b2e] text-slate-400">ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {books.map((book) => {
                const bookStatus = book.status?.toLowerCase() || "pending";
                return (
                  <Table.Row key={book._id} className="border-b border-slate-800/40 hover:bg-white/5 transition-colors">
                    <Table.Cell className="py-4 px-4 text-sm font-semibold text-white max-w-[220px] truncate !bg-[#121624]">{book.title}</Table.Cell>
                    <Table.Cell className="py-4 px-4 text-sm text-slate-300 !bg-[#121624]">{book.writerName || "Unknown"}</Table.Cell>
                    <Table.Cell className="py-4 px-4 text-sm font-medium text-[#7c5dfa] !bg-[#121624]">{Number(book.price) === 0 ? "Free" : `$${book.price}`}</Table.Cell>
                    <Table.Cell className="py-4 px-4 text-center !bg-[#121624]">
  <Chip 
    size="sm" 
    variant="bordered" 
    className={`capitalize text-xs font-bold border ${
      bookStatus === "published" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
      bookStatus === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
      "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }`}
  >
    {book.status || "Pending"}
  </Chip>
</Table.Cell>
                    <Table.Cell className="py-4 px-4 !bg-[#121624]">
                      <div className="flex items-center gap-3 justify-center">
                        <StatusDropdown
                          bookId={book._id} 
                          currentStatus={book.status} 
                          toggleAction={handleTogglePublish} 
                        />
                        <Button isIconOnly size="sm" color="danger" variant="light" onClick={() => { setBookToDelete(book); setIsModalOpen(true); }} className="text-rose-500 rounded-lg hover:bg-rose-500/10"><TrashBin className="size-4" /></Button>
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