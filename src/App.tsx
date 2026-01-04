import UserManagement from "./pages/UserManagement";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="app">
      <div className="card">
        <RequireAuth>
          <UserManagement />
        </RequireAuth>
      </div>
    </div>
  );
}

export default App;
