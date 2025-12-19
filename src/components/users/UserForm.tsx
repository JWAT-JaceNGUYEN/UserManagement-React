import { useState } from "react";
import { useUserStore } from "../../store/user.store";


export default function UserForm() {

  const addUser = useUserStore(state => state.addUser);
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    addUser(name);
    setName("");
  };

  return (
    <div className="form-row">
      <input
        placeholder="Enter user name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button className="btn primary" onClick={submit}>
        Add User
      </button>
    </div>
  );
}
