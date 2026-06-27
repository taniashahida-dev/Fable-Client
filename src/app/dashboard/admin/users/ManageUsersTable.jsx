"use client";

import { useState } from "react";
import { Table, Dropdown, Button, Chip } from "@heroui/react";
import { TrashBin, ChevronDown } from "@gravity-ui/icons";

import { updateUsers, deleteUsers } from "@/lib/api/users";
import DeleteUserModal from "./DeleteUserModal";
import PromoteAdminModal from "@/components/Dashboard/PromoteAdminModal";
import toast from "react-hot-toast";

export default function ManageUsersTable({ initialUsers }) {
  const filteredUsers = (initialUsers || []).filter(
    (user) => user.role !== "admin",
  );
  const [users, setUsers] = useState(filteredUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [pendingUserRoleChange, setPendingUserRoleChange] = useState(null);

  const handleRoleChange = async (id, name, newRole) => {
    if (newRole === "admin") {
      setPendingUserRoleChange({ id, name, newRole });
      setIsAdminModalOpen(true);
      return;
    }

    const res = await updateUsers(id, newRole);
    if (res) {
      setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
      toast.success(`Role updated to ${newRole}!`);
    } else {
      toast.error("Failed to update role");
    }
  };

  const handleConfirmAdmin = async () => {
    if (!pendingUserRoleChange) return;

    const { id, newRole } = pendingUserRoleChange;
    const res = await updateUsers(id, newRole);

    if (res) {
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User promoted to Admin successfully!");
    } else {
      toast.error("Failed to update role to Admin");
    }

    setIsAdminModalOpen(false);
    setPendingUserRoleChange(null);
  };

  const triggerDeleteModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    const res = await deleteUsers(userToDelete._id);
    if (res) {
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      toast.success("User deleted successfully!");
    } else {
      toast.error("Failed to delete user");
    }

    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <Table className="bg-white min-w-200 border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Table.ScrollContainer className="overflow-x-auto">
            <Table.Content aria-label="Manage users table">
              <Table.Header className="bg-[#f8fafc] border-b border-slate-100 text-[#475569] text-[11px] font-bold uppercase tracking-wider">
                <Table.Column
                  isRowHeader
                  className="py-4 px-3 md:px-6 text-left bg-[#f8fafc]! text-slate-500 font-bold"
                >
                  NAME
                </Table.Column>
                <Table.Column className="py-4 px-3 md:px-6 text-left bg-[#f8fafc]! text-slate-500 font-bold">
                  EMAIL
                </Table.Column>
                <Table.Column className="py-4 px-3 md:px-6 text-left bg-[#f8fafc]! text-slate-500 font-bold">
                  ROLE
                </Table.Column>
                <Table.Column className="py-4 px-3 md:px-6 text-center bg-[#f8fafc]! text-slate-500 font-bold">
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {users.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan="4"
                      className="text-center py-8 text-sm text-gray-500 bg-white!"
                    >
                      No readers or writers found.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  users.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="border-b border-slate-500/5 hover:bg-[#f8fafc]/60 transition-all duration-200"
                    >
                      <Table.Cell className="py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-bold text-[#0f172a] bg-white!">
                        {user.name}
                      </Table.Cell>
                      <Table.Cell className="py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm text-slate-600 font-medium bg-white!">
                        {user.email}
                      </Table.Cell>
                      <Table.Cell className="py-3 md:py-4 px-3 md:px-6 text-sm bg-white!">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="capitalize text-[11px] font-bold px-2.5 py-1 rounded-md border-0"
                          color={
                            user.role === "writer" ? "secondary" : "success"
                          }
                        >
                          {user.role}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell className="py-3 md:py-4 px-3 md:px-6 text-sm bg-white!">
                        <div className="flex items-center gap-3 justify-center">
                          <Dropdown>
                            <Dropdown.Trigger>
                              <span className="inline-flex items-center justify-center px-2 md:px-3 h-7 md:h-8 text-xs font-bold rounded-lg bg-[#f1f5f9] border border-slate-200 text-slate-700 gap-1.5 hover:bg-[#e2e8f0] transition-all cursor-pointer select-none">
                                Role{" "}
                                <ChevronDown className="size-3 text-slate-500" />
                              </span>
                            </Dropdown.Trigger>
                            <Dropdown.Popover className="bg-white border border-slate-100 text-slate-800 rounded-xl shadow-xl">
                              <Dropdown.Menu
                                aria-label="Roles"
                                onAction={(key) =>
                                  handleRoleChange(user._id, user.name, key)
                                }
                                itemClasses={{
                                  base: "text-slate-700 text-xs rounded-lg hover:bg-[#6366F1] hover:text-white font-semibold transition-colors",
                                }}
                              >
                                <Dropdown.Item id="reader">
                                  Reader
                                </Dropdown.Item>
                                <Dropdown.Item id="writer">
                                  Writer
                                </Dropdown.Item>
                                <Dropdown.Item id="admin">Admin</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown.Popover>
                          </Dropdown>

                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onClick={() => triggerDeleteModal(user)}
                            className="bg-[#334155] text-white rounded-lg hover:bg-[#1e293b] min-w-7 h-7 md:min-w-8 md:h-8 flex items-center justify-center transition-colors"
                          >
                            <TrashBin className="size-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <DeleteUserModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        userToDelete={userToDelete}
        onConfirm={handleConfirmDelete}
      />

      <PromoteAdminModal
        isOpen={isAdminModalOpen}
        onOpenChange={setIsAdminModalOpen}
        userName={pendingUserRoleChange?.name || ""}
        onConfirm={handleConfirmAdmin}
      />
    </>
  );
}
