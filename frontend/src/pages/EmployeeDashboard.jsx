import { useEffect, useState, useContext } from "react";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const STATUS_STYLES = {
  "Pending":     "bg-yellow-100 text-yellow-800 border border-yellow-200",
  "In-Progress": "bg-blue-100 text-blue-800 border border-blue-200",
  "Done":        "bg-green-100 text-green-800 border border-green-200",
};

const BORDER_STYLES = {
  "Pending":     "border-l-yellow-400",
  "In-Progress": "border-l-blue-500",
  "Done":        "border-l-green-500",
};

const getStatusColor = (status) => {
  if (status === "Pending")     return "bg-yellow-100 text-yellow-800";
  if (status === "In-Progress") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
};

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/employee");
      setTasks(res.data);
    } catch (error) { console.error("Error fetching tasks"); }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating task");
    }
  };

  // Stats
  const total      = tasks.length;
  const pending    = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In-Progress").length;
  const done       = tasks.filter(t => t.status === "Done").length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 rounded-xl p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">My Tasks</h1>
              <p className="text-xs text-gray-500">Welcome back, {user?.name || "Employee"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:bg-red-50 px-3 py-2 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Tasks",  value: total,      color: "text-gray-800",   bg: "bg-white" },
            { label: "Pending",      value: pending,    color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "In Progress",  value: inProgress, color: "text-blue-600",   bg: "bg-blue-50" },
            { label: "Completed",    value: done,       color: "text-green-600",  bg: "bg-green-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm border border-gray-100`}>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Task Grid */}
        {tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No tasks assigned yet</p>
            <p className="text-sm mt-1">Check back later for new assignments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${BORDER_STYLES[task.status] || "border-l-gray-300"} p-5 hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-gray-900 leading-snug flex-1 pr-2">{task.title}</h3>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[task.status]}`}>
                    {task.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

                <div className="space-y-1 mb-4">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Assigned by <span className="font-medium text-gray-700 ml-1">{task.assignedBy?.name}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(task.deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="border border-gray-200 rounded-xl text-xs px-2 py-1.5 bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
