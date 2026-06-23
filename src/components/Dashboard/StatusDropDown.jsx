'use client';

import React, { useTransition } from 'react';
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
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20';
        case 'unpublished': 
            return 'bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-slate-500/30';
        case 'pending': 
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20';
        default: 
            return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20';
    }
};

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button 
    size="sm" 
    variant="bordered"
    disabled={isPending}
  
    className={`w-[120px] justify-between px-3 py-1.5 h-auto font-black rounded-xl text-[10px] border tracking-wider uppercase transition-all flex items-center gap-1.5 ${getStatusStyle(currentStatus)}`}
>
    <span>{isPending ? 'Updating...' : (currentStatus || 'Pending')}</span>
    <ChevronDown size={12} className="shrink-0" />
</Button>
            </Dropdown.Trigger>
            
           <Dropdown.Popover>
    <Dropdown.Menu aria-label="Ebook Status Options" className="bg-[#161b2e] border border-slate-800 rounded-xl p-1 shadow-2xl min-w-[130px]">
        
        {/* Publish */}
        <Dropdown.Item 
            onPress={() => handleStatusChange('published')}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 text-xs font-bold cursor-pointer transition-colors"
        >
            <SquareCheck size={14} className="text-emerald-400" />
            Publish
        </Dropdown.Item>

        {/* Unpublish */}
        <Dropdown.Item 
            onPress={() => handleStatusChange('unpublished')}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-amber-500/20 hover:text-amber-400 text-xs font-bold cursor-pointer transition-colors"
        >
            <ArrowRightToSquare size={14} className="text-amber-400" />
            Unpublish
        </Dropdown.Item>

    </Dropdown.Menu>
</Dropdown.Popover>
        </Dropdown>
    );
}