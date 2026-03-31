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

export default function EmployerDashboard() {
  const { logout, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", assignedTo: "", deadline: "", status: "Pending" });

  // Filter State
  const [filters, setFilters] = useState({ status: "", employee: "", date: "" });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/employer");
      setTasks(res.data);
    } catch (err) { console.error("Error fetching tasks"); }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/auth/employees");
      setEmployees(res.data);
    } catch (err) { console.error("Error fetching employees"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) { alert("Failed to delete task"); }
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingId(task._id);
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo._id,
        deadline: task.deadline.split("T")[0],
        status: task.status,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", description: "", assignedTo: "", deadline: "", status: "Pending" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, formData);
      } else {
        await api.post("/tasks", formData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      alert("Error saving task. Check all fields.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.status   ? task.status === filters.status : true) &&
      (filters.employee ? task.assignedTo._id === filters.employee : true) &&
      (filters.date     ? task.deadline.startsWith(filters.date) : true)
    );
  });

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
            <div className="bg-blue-600 rounded-xl p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Employer Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome back, {user?.name || "Employer"}</p>
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
            { label: "Total Tasks",  value: total,      color: "text-gray-800",  bg: "bg-white" },
            { label: "Pending",      value: pending,    color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "In Progress",  value: inProgress, color: "text-blue-600",  bg: "bg-blue-50" },
            { label: "Completed",    value: done,       color: "text-green-600", bg: "bg-green-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm border border-gray-100`}>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Controls: Filters + Create */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </select>

              <select
                className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
              >
                <option value="">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>

              <input
                type="date"
                className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>

            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-sm shadow-blue-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </button>
          </div>
        </div>

        {/* Task Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm mt-1">Create a task or adjust your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
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
                    <span className="font-medium text-gray-700">{task.assignedTo?.name}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(task.deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openModal(task)}
                    className="flex-1 text-sm text-blue-600 font-semibold hover:bg-blue-50 py-1.5 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 text-sm text-red-600 font-semibold hover:bg-red-50 py-1.5 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Task" : "Create New Task"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required type="text" placeholder="Task title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Task description" rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <select
                  required value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee...</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  required type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
                >
                  {editingId ? "Save Changes" : "Create Task"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
