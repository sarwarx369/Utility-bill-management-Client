import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold">UBMS</div>
          <div className="text-sm text-gray-600">Utility Bill Management</div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/bills" className="hover:text-primary">
            Bills
          </Link>
          {user ? (
            <>
              <Link to="/mypaybills" className="hover:text-primary">
                My Pay Bills
              </Link>
              <div className="flex items-center gap-2">
                <img
                  src={
                    // user.photoUrl ||
                    // "https://ui-avatars.com/api/?name=" +
                    //   encodeURIComponent(user.name) ||
                    "https://i.ibb.co.com/3mG4GkG2/action.jpg"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={() => {
                    logout();
                    nav("/");
                  }}
                  className="text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="hover:text-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
