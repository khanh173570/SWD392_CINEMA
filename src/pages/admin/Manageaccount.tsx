import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";

// Mock API functions (replace with real API calls)
let mockAccounts = [
  { id: 1, username: "admin", email: "admin@example.com", role: "admin" },
  { id: 2, username: "user1", email: "user1@example.com", role: "user" },
];

const fetchAccounts = () =>
  new Promise<typeof mockAccounts>((resolve) =>
    setTimeout(() => resolve([...mockAccounts]), 500)
  );

const createAccount = (account: Omit<Account, "id">) =>
  new Promise<Account>((resolve) => {
    const newId = Math.max(...mockAccounts.map((acc) => acc.id)) + 1;
    const newAccount = { ...account, id: newId };
    mockAccounts.push(newAccount);
    setTimeout(() => resolve(newAccount), 500);
  });

const updateAccount = (account: Account) =>
  new Promise<Account>((resolve) => setTimeout(() => resolve(account), 500));

const deleteAccount = (id: number) =>
  new Promise<void>((resolve) => {
    mockAccounts = mockAccounts.filter((acc) => acc.id !== id);
    setTimeout(() => resolve(), 500);
  });

// Types
type Account = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const initialForm: Omit<Account, "id"> & { password?: string } = {
  username: "",
  email: "",
  role: "user",
  password: "",
};

const ManageAccount: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchAccounts().then((data) => {
      setAccounts(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      const updated = await updateAccount({ id: editingId, ...form });
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === editingId ? updated : acc))
      );
      setEditingId(null);
    } else {
      const created = await createAccount(form);
      setAccounts((prev) => [...prev, created]);
    }
    setForm(initialForm);
    setLoading(false);
  };

  const handleEdit = (account: Account) => {
    setForm({ username: account.username, email: account.email, role: account.role, password: "" });
    setEditingId(account.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá tài khoản này?")) return;
    setLoading(true);
    await deleteAccount(id);
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setLoading(false);
  };

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🔐 Quản lý tài khoản người dùng</h2>

      <div className="mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative">
          <input
            name="password"
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm w-full focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="admin">Admin</option>
          <option value="admin">Customer</option>
          <option value="admin">StaffStaff</option>
          <option value="admin">Manager</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Cập nhật" : "Tạo mới"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Huỷ
            </button>
          )}
        </div>
      </form>

      {loading && <div className="text-center text-gray-500 mb-4">Đang tải dữ liệu...</div>}

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Avatar</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.map((acc) => (
              <tr key={acc.id}>
                <td className="px-6 py-3 text-sm text-gray-700">{acc.id}</td>
                <td className="px-6 py-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {acc.username.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700 font-medium">{acc.username}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{acc.email}</td>
                <td className="px-6 py-3 text-sm text-gray-700 capitalize">{acc.role}</td>
                <td className="px-6 py-3 text-sm text-gray-700 flex gap-2">
                  <button
                    onClick={() => handleEdit(acc)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    <Pencil className="h-4 w-4 inline mr-1" /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(acc.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" /> Xoá
                  </button>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Không có tài khoản nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
                  
export default ManageAccount;
                          