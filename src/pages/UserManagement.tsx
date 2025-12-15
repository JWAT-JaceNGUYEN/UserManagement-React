import { useUsers } from "../hooks/useUsers";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

export default function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useUsers();

  return (
    <div>
      <div className="page-title">User Management</div>

      <UserForm onAdd={addUser} />

      <UserTable
        users={users}
        onUpdate={updateUser}
        onDelete={deleteUser}
      />
    </div>
  );
}
