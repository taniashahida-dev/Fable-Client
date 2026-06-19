"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Bell, Briefcase, Envelope, House, Magnifier, Person, LayoutSideContent } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const ROLE_NAV_ITEMS = {
  admin: {
    subtitle: "ADMIN DASHBOARD",
    items: [
      { icon: House, href: "/dashboard/admin", label: "Overview" },
      { icon: Person, href: "/dashboard/admin/users", label: "Manage Users" },
      { icon: Briefcase, href: "/dashboard/admin/ebooks", label: "Manage Ebooks" },
      { icon: Magnifier, href: "/dashboard/admin/transactions", label: "Transactions" },
    ],
  },
  reader: {
    subtitle: "READER DASHBOARD",
    items: [
      { icon: House, href: "/dashboard/reader", label: "Overview" },
      { icon: Briefcase, href: "/dashboard/reader/purchase-history", label: "Purchase History" },
      { icon: Magnifier, href: "/dashboard/reader/my-library", label: "My Library" },
      { icon: Bell, href: "/dashboard/reader/bookmarks", label: "Bookmarks" },
      { icon: Person, href: "/dashboard/reader/profile", label: "Profile" },
    ],
  },
  writer: {
    subtitle: "WRITER DASHBOARD",
    items: [
      { icon: House, href: "/dashboard/writer", label: "Overview" },
      { icon: Briefcase, href: "/dashboard/writer/my-ebooks", label: "My Ebooks" },
      { icon: Bell, href: "/dashboard/writer/add-ebook", label: "Add Ebook" },
      { icon: Magnifier, href: "/dashboard/writer/sales-history", label: "Sales History" },
      { icon: Envelope, href: "/dashboard/writer/bookmarks", label: "Bookmarks" },
      { icon: Person, href: "/dashboard/writer/profile", label: "Profile" },
    ],
  },
};

export function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;
  const config = ROLE_NAV_ITEMS[role] || ROLE_NAV_ITEMS.reader;

  const [isOpen, setIsOpen] = useState(false);

  const getAvatarInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sidebarItems = (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-6">
        {/* Brand Header Identity */}
        <div className="px-3 flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white font-black text-xs">
              F
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Fable</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase mt-1">
            {config.subtitle}
          </span>
        </div>

        {/* Navigation Core List */}
        <nav className="flex flex-col gap-1">
          {config.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              type="button"
            >
              <item.icon className="size-5 text-slate-500" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Embedded Profile User Badge at Footer */}
      {user && (
        <div className="mt-auto p-2 border-t border-slate-800/50 bg-[#121624]/40 rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {getAvatarInitials()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-white truncate leading-tight">
              {user.name}
            </span>
            <span className="text-[10px] text-slate-500 truncate mt-0.5">
              {role} • {user.email}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside className="hidden w-64 shrink-0 bg-[#0e111d] border-r border-slate-900 p-4 lg:block h-screen sticky top-0 z-50">
        {sidebarItems}
      </aside>

      {/* Mobile Floating Menu Button */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <Button 
          size="lg" 
          radius="full"
          variant="solid" 
          isIconOnly 
          className="bg-[#0e111d] text-slate-200 shadow-xl border border-slate-800 hover:text-white"
          onPress={() => setIsOpen(true)}
        >
          <LayoutSideContent className="size-6" />
        </Button>
      </div>
        
      {/* Mobile Drawer */}
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        placement="left"
        className="z-50"
        classNames={{
          base: "bg-[#0e111d] p-4 text-white max-w-[260px]",
          closeButton: "text-white top-4 right-4"
        }}
      >
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.CloseTrigger className="text-white" />
            <Drawer.Header className="px-3 pt-2">
              <Drawer.Heading className="text-slate-500 text-[10px] tracking-wider uppercase font-bold">
                Navigation
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="px-0 py-4 h-[calc(100vh-80px)] overflow-y-auto">
              {sidebarItems}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}