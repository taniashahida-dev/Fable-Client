'use client';

import React, { useTransition } from 'react';
// 🌟 HeroUI এর Button এবং Dropdown
import { Dropdown, Button } from '@heroui/react'; 
import { ArrowRightToSquare, SquareCheck, ChevronDown } from '@gravity-ui/icons';

export default function StatusDropdown({ bookId, currentStatus, toggleAction }) {
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (targetStatus) => {
        startTransition(async () => {
            await toggleAction(bookId, targetStatus);
        });
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'published': 
                return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20';
            case 'unpublished': 
                return 'bg-slate-500/20 text-slate-600 border-slate-500/30 hover:bg-slate-500/30';
            case 'pending': 
                return 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20';
            default: 
                return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500/20';
        }
    };

    return (
        <Dropdown>
            {/* 🌟 ফিক্স: `asChild` বাদ দিয়ে স্বাভাবিক রাখা হয়েছে */}
           <Dropdown.Trigger>
    <div
        className={`w-[120px] justify-between px-3 py-1.5 h-8 font-bold rounded-xl text-[10px] border tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${getStatusStyle(currentStatus)}`}
    >
        <span>
            {isPending ? "Updating..." : (currentStatus || "Pending")}
        </span>

        <ChevronDown size={12} className="shrink-0" />
    </div>
</Dropdown.Trigger>
            
            <Dropdown.Popover>
                <Dropdown.Menu aria-label="Ebook Status Options" className="bg-white border border-slate-100 rounded-xl p-1 shadow-2xl min-w-[130px]">
                    
                    {/* Publish */}
                    <Dropdown.Item 
                        onPress={() => handleStatusChange('published')}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-600 text-xs font-semibold cursor-pointer transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <SquareCheck size={14} className="text-emerald-500" />
                            <span>Publish</span>
                        </div>
                    </Dropdown.Item>

                    {/* Unpublish */}
                    <Dropdown.Item 
                        onPress={() => handleStatusChange('unpublished')}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-700 hover:bg-amber-500/10 hover:text-amber-600 text-xs font-semibold cursor-pointer transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <ArrowRightToSquare size={14} className="text-amber-500" />
                            <span>Unpublish</span>
                        </div>
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}