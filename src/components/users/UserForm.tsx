import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

export default function UserForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    onAdd(name);
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
