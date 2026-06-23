"use client";

import { useState } from "react";
import { Table, Dropdown, Button, Chip, toast } from "@heroui/react";
import { TrashBin, ChevronDown } from "@gravity-ui/icons";

import { updateUsers, deleteUsers } from "@/lib/api/users";

export default function ManageUsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

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

  // 🛠️ Delete User Logic
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await deleteUsers(id);

    if (res) {
      setUsers(users.filter(u => u._id !== id));
      toast.success("User deleted successfully!");
    } else {
      toast.error("Failed to delete user");
    }
  };

  return (
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
                        <Button size="sm" variant="flat" className="bg-white/5 text-slate-300 font-medium flex items-center gap-1">
                          Role <ChevronDown className="size-3" />
                        </Button>
                      </Dropdown.Trigger>
                      
                      <Dropdown.Popover className="bg-[#161b2e] border border-slate-800 text-white rounded-xl">
                        <Dropdown.Menu 
                          aria-label="Roles" 
                          onAction={(key) => handleRoleChange(user._id, key)}
                          itemClasses={{ base: "text-slate-300 rounded-lg hover:bg-[#7c5dfa] hover:text-white" }}
                        >
                          {/* 💡 এখানে 'key' এর জায়গায় 'id' ব্যবহার করা হয়েছে */}
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
                      onClick={() => handleDelete(user._id)} 
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
  );
}