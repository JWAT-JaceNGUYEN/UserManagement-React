import LogoutButton from "../components/LogoutButton";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

export default function UserManagement() {
  return (
    <div>
      <div className="page-title">User Management</div>

      <UserForm />
      <UserTable />
      <LogoutButton />
    </div>
  );
}
