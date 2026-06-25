"use client";

import { Table, Chip } from "@heroui/react";

export default function TransactionsTable({ transactions = [] }) {
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  return (
    <Table className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <Table.ScrollContainer>
        <Table.Content aria-label="All system transactions table">
          
          {/* 📋 Table Header */}
          <Table.Header className="bg-[#f8fafc] border-b border-slate-100 text-[#475569] text-[11px] font-bold uppercase tracking-wider">
           <Table.Column isRowHeader className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">
    TX ID
  </Table.Column>
            <Table.Column className="py-4 px-6 text-center !bg-[#f8fafc] text-slate-500 font-bold">TYPE</Table.Column>
            <Table.Column className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">USER / WRITER</Table.Column>
            <Table.Column className="py-4 px-6 text-left !bg-[#f8fafc] text-slate-500 font-bold">EBOOK</Table.Column>
            <Table.Column className="py-4 px-6 text-right !bg-[#f8fafc] text-slate-500 font-bold">AMOUNT</Table.Column>
            <Table.Column className="py-4 px-6 text-right !bg-[#f8fafc] text-slate-500 font-bold">DATE</Table.Column>
          </Table.Header>
          
          {/* 📋 Table Body */}
          <Table.Body emptyContent={"No transactions found"}>
            {transactions.map((tx) => {
              const isPurchase = tx.type === "purchase";

              return (
                <Table.Row key={tx._id} className="border-b border-slate-500/5 hover:bg-[#f8fafc]/60 transition-all duration-200">
                  
                  {/* TX ID (Stripe বা DB আইডি থেকে জেনারেট করা শর্ট কোড) */}
                  <Table.Cell className="py-4 px-6 text-sm text-slate-600 font-medium !bg-white">
                    #{tx.transactionId}
                  </Table.Cell>
                  
                  {/* TYPE CHIP: image_8abd02.png এর মতো ক্লিন ও গ্লসি লুক */}
                  <Table.Cell className="py-4 px-6 text-center !bg-white">
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border-0 ${
                        isPurchase 
                          ? "bg-amber-500/10 text-amber-700" 
                          : "bg-indigo-500/10 text-indigo-700"
                      }`}
                    >
                      {isPurchase ? "PURCHASE" : "PUB. FEE"}
                    </Chip>
                  </Table.Cell>
                  
                  {/* USER / WRITER EMAIL */}
                  <Table.Cell className="py-4 px-6 text-sm text-slate-600 font-medium !bg-white">
                    {tx.email}
                  </Table.Cell>
                  
                  {/* EBOOK TITLE */}
                  <Table.Cell className="py-4 px-6 text-sm font-bold text-[#0f172a] max-w-[200px] truncate !bg-white">
                    {tx.ebookTitle}
                  </Table.Cell>
                  
                  {/* AMOUNT */}
                  <Table.Cell className="py-4 px-6 text-sm font-bold text-amber-600 text-right !bg-white">
                    ${Number(tx.amount).toFixed(2)}
                  </Table.Cell>
                  
                  {/* DATE */}
                  <Table.Cell className="py-4 px-6 text-sm text-slate-400 font-medium text-right !bg-white">
                    {formatDate(tx.date)}
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}