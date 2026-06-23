"use client";

import { useState } from "react";
import { Table, Dropdown, Button, Chip, toast } from "@heroui/react";
import { TrashBin, ChevronDown } from "@gravity-ui/icons";

import { updateUsers, deleteUsers } from "@/lib/api/users";
import DeleteUserModal from "./DeleteUserModal"; 

export default function ManageUsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  
  // মোডাল এবং ইউজার ট্র্যাক করার স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // 🛠️ Role Change Logic
  const handleRoleChange = async (id, newRole) => {
    const res = await updateUsers(id, newRole);

    if (res) {
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}!`);
    } else {
      toast.error("Failed to update role");
    }
  };

  // 🛠️ ডিলিট বাটন ক্লিক করলে মোডাল ট্রিগার করার ফাংশন
  const triggerDeleteModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  // 🛠️ কাস্টম মোডাল থেকে কনফার্মেশন পাওয়ার পর ডিলিট করার লজিক
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    const res = await deleteUsers(userToDelete._id);

    if (res) {
      setUsers(users.filter(u => u._id !== userToDelete._id));
      toast.success("User deleted successfully!");
    } else {
      toast.error("Failed to delete user");
    }
    
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <Table className="bg-[#121624] border border-slate-800/60 rounded-xl overflow-hidden shadow-lg">
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage users table">
            
            {/* 📋 Table Header */}
            <Table.Header className="bg-[#161b2e] text-slate-400 text-xs font-bold uppercase">
              <Table.Column isRowHeader className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">
                NAME
              </Table.Column>
              <Table.Column className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">EMAIL</Table.Column>
              <Table.Column className="py-4 px-4 text-left !bg-[#161b2e] text-slate-400">ROLE</Table.Column>
              <Table.Column className="py-4 px-4 text-center !bg-[#161b2e] text-slate-400">ACTIONS</Table.Column>
            </Table.Header>
            
            {/* 📋 Table Body */}
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id} className="!bg-[#121624] border-b border-slate-800/40 hover:bg-white/5 transition-colors">
                  
                  {/* Name */}
                  <Table.Cell className="py-4 px-4 text-sm font-semibold text-white !bg-[#121624]">
                    {user.name}
                  </Table.Cell>
                  
                  {/* Email */}
                  <Table.Cell className="py-4 px-4 text-sm text-slate-400 !bg-[#121624]">
                    {user.email}
                  </Table.Cell>
                  
                  {/* Role Chip */}
                  <Table.Cell className="py-4 px-4 text-sm !bg-[#121624]">
                    <Chip 
                      size="sm" variant="flat" className="capitalize text-xs font-bold"
                      color={user.role === "admin" ? "danger" : user.role === "writer" ? "secondary" : "success"}
                    >
                      {user.role}
                    </Chip>
                  </Table.Cell>
                  
                  {/* Actions */}
                  <Table.Cell className="py-4 px-4 text-sm !bg-[#121624]">
                    <div className="flex items-center gap-3 justify-center">
                      
                      {/* Dropdown Component */}
                      <Dropdown>
                        <Dropdown.Trigger>
                          {/* 💡 ফিক্সড: বাটন সরিয়ে টেইলউইন্ড দিয়ে ডিজাইন করা span ব্যবহার করা হয়েছে */}
                          <span className="inline-flex items-center justify-center px-3 h-8 text-xs font-medium rounded-xl bg-white/5 text-slate-300 gap-1 hover:bg-white/10 transition-colors cursor-pointer select-none">
                            Role <ChevronDown className="size-3" />
                          </span>
                        </Dropdown.Trigger>
                        
                        <Dropdown.Popover className="bg-[#161b2e] border border-slate-800 text-white rounded-xl">
                          <Dropdown.Menu 
                            aria-label="Roles" 
                            onAction={(key) => handleRoleChange(user._id, key)}
                            itemClasses={{ base: "text-slate-300 rounded-lg hover:bg-[#7c5dfa] hover:text-white" }}
                          >
                            <Dropdown.Item id="reader">Reader</Dropdown.Item>
                            <Dropdown.Item id="writer">Writer</Dropdown.Item>
                            <Dropdown.Item id="admin">Admin</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>

                      {/* Delete Button */}
                      <Button 
                        isIconOnly 
                        size="sm" 
                        color="danger" 
                        variant="light" 
                        onClick={() => triggerDeleteModal(user)} 
                        className="text-rose-500 rounded-lg hover:bg-rose-500/10"
                      >
                        <TrashBin className="size-4" />
                      </Button>
                    </div>
                  </Table.Cell>

                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* আলাদা করা মোডাল কম্পোনেন্ট */}
      <DeleteUserModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        userToDelete={userToDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}