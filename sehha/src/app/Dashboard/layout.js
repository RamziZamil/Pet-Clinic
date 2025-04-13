import { verifyToken } from "../lib/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const decoded = verifyToken(token);
    // Only allow admins; if not admin, redirect to home
    if (decoded.role !== "admin") {
      redirect("/");
    }
  } catch (error) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-[#303241] text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="text-[#FC7729] mr-2">●</span>
            Admin Dashboard
          </h1>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-1">
            <li>
              <Link
                href="/Dashboard/UserManagement"
                className="flex items-center px-4 py-3 text-white bg-[#FC7729] rounded-md shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                User Management
              </Link>
            </li>
            {/* <li>
              <Link
                href="/Dashboard/PatientRecords"
                className="flex items-center px-4 py-3 text-white bg-[#FC7729] rounded-md shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Patient Records
              </Link>
            </li> */}
            <li>
              <Link
                href="/Dashboard/Analytics"
                className="flex items-center px-4 py-3 text-white bg-[#FC7729] rounded-md shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard/Schedules"
                className="flex items-center px-4 py-3 text-white bg-[#FC7729] rounded-md shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Doctor Schedules
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4">
          <div className="bg-[#3d3f51] rounded-lg p-4">
            <div className="text-sm text-gray-300">Logged in as</div>
            <div className="font-medium">Admin User</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-[#303241]">
              Admin Panel
            </h2>
            <div className="flex items-center space-x-4">
              {/* Optionally, add a logout button here as well */}
              <button className="text-gray-600 hover:text-gray-800">
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="text-center text-sm text-gray-500">
            © 2025 Medical Admin Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
