import React from "react";
import { Link } from "react-router-dom";
import {
  UtensilsIcon,
  UserCogIcon,
  LogOutIcon,
  CoffeeIcon,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold text-black"
          >
            {/* Coffee icon */}
            <div className="flex justify-center">
              <div className="border-2 border-amber-600 px-1.5 py-2 rounded-md shadow-sm inline-flex items-center gap-2">
                <CoffeeIcon size={20} className="text-amber-600" />{" "}
                <h1 className="text-xl font-bold text-center text-gray-800">
                  Cafe Delight
                </h1>
              </div>
            </div>

            {/* Optional text */}
          </Link>

          <div className="flex items-center gap-4">
            {/* <Link
              to="/"
              className="text-gray-600 hover:text-amber-600 px-3 py-2 rounded-md"
            >
              Menu
            </Link> */}
            {user.isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-amber-600 px-3 py-2 rounded-md"
                >
                  <UserCogIcon size={20} />
                  Dashboard
                </Link>
                <Button
                  variant="secondary"
                  onClick={logout}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-red-500 text-gray-800 hover:text-white"
                >
                  <LogOutIcon size={20} />
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-amber-600 px-3 py-2 rounded-md"
              >
                <UserCogIcon size={20} />
                Owner Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
