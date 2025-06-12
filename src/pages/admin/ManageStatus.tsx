import React, { useState } from 'react';

interface StatusType {
  id: number;
  name: string;
  type: 'movie' | 'seat' | 'cinema' | 'ticket';
  color: string;
  isActive: boolean;
}

const ManageStatus: React.FC = () => {
  const [statuses, setStatuses] = useState<StatusType[]>([
    { id: 1, name: 'Đang chiếu', type: 'movie', color: '#10b981', isActive: true },
    { id: 2, name: 'Sắp chiếu', type: 'movie', color: '#3b82f6', isActive: true },
    { id: 3, name: 'Đã kết thúc', type: 'movie', color: '#9ca3af', isActive: true },
    { id: 4, name: 'Có sẵn', type: 'seat', color: '#10b981', isActive: true },
    { id: 5, name: 'Đã đặt', type: 'seat', color: '#ef4444', isActive: true },
    { id: 6, name: 'Bảo trì', type: 'seat', color: '#f59e0b', isActive: true },
    { id: 7, name: 'Hoạt động', type: 'cinema', color: '#10b981', isActive: true },
    { id: 8, name: 'Bảo trì', type: 'cinema', color: '#f59e0b', isActive: true },
    { id: 9, name: 'Đóng cửa', type: 'cinema', color: '#dc2626', isActive: true },
    { id: 10, name: 'Đã thanh toán', type: 'ticket', color: '#10b981', isActive: true },
    { id: 11, name: 'Chờ thanh toán', type: 'ticket', color: '#f59e0b', isActive: true },
    { id: 12, name: 'Đã hủy', type: 'ticket', color: '#dc2626', isActive: true }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Omit<StatusType, 'id'>>({
    name: '',
    type: 'movie',
    color: '#000000',
    isActive: true
  });

  // Filter statuses based on type
  const filteredStatuses = filterType === 'all' 
    ? statuses 
    : statuses.filter(status => status.type === filterType);

  const handleStatusClick = (status: StatusType) => {
    setSelectedStatus(status);
    setNewStatus({
      name: status.name,
      type: status.type,
      color: status.color,
      isActive: status.isActive
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedStatus(null);
    setNewStatus({
      name: '',
      type: 'movie',
      color: '#000000',
      isActive: true
    });
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setNewStatus({
      ...newStatus,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSaveStatus = () => {
    if (selectedStatus) {
      // Update existing status
      setStatuses(statuses.map(status => 
        status.id === selectedStatus.id 
          ? { ...status, ...newStatus }
          : status
      ));
    } else {
      // Add new status
      setStatuses([
        ...statuses,
        {
          id: statuses.length + 1,
          ...newStatus
        }
      ]);
    }
    setShowModal(false);
  };

  const handleToggleActive = (id: number) => {
    setStatuses(statuses.map(status => 
      status.id === id 
        ? { ...status, isActive: !status.isActive }
        : status
    ));
  };

  const handleDeleteStatus = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa trạng thái này?')) {
      setStatuses(statuses.filter(status => status.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý trạng thái hệ thống</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Thêm trạng thái
        </button>
      </div>

      {/* Filter by type */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại trạng thái</label>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-md ${
                filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setFilterType('movie')}
              className={`px-4 py-2 rounded-md ${
                filterType === 'movie' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Phim
            </button>
            <button 
              onClick={() => setFilterType('seat')}
              className={`px-4 py-2 rounded-md ${
                filterType === 'seat' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Ghế
            </button>
            <button 
              onClick={() => setFilterType('cinema')}
              className={`px-4 py-2 rounded-md ${
                filterType === 'cinema' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Rạp chiếu
            </button>
            <button 
              onClick={() => setFilterType('ticket')}
              className={`px-4 py-2 rounded-md ${
                filterType === 'ticket' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Vé
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStatuses.map(status => (
          <div 
            key={status.id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4`}
            style={{ borderLeftColor: status.color }}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{status.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">Áp dụng cho: {status.type}</p>
                </div>
                <div 
                  className="h-6 w-6 rounded-full" 
                  style={{ backgroundColor: status.color }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status.isActive ? 'Đang kích hoạt' : 'Đã vô hiệu'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStatusClick(status)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleToggleActive(status.id)}
                    className={`${status.isActive ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'}`}
                  >
                    {status.isActive ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => handleDeleteStatus(status.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedStatus ? 'Chỉnh sửa trạng thái' : 'Thêm trạng thái mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên trạng thái</label>
                  <input
                    name="name"
                    value={newStatus.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Áp dụng cho</label>
                  <select
                    name="type"
                    value={newStatus.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="movie">Phim</option>
                    <option value="seat">Ghế</option>
                    <option value="cinema">Rạp chiếu</option>
                    <option value="ticket">Vé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                  <div className="flex items-center">
                    <input
                      name="color"
                      value={newStatus.color}
                      onChange={handleInputChange}
                      type="color"
                      className="h-10 w-10 border-0 mr-2"
                    />
                    <input
                      name="color"
                      value={newStatus.color}
                      onChange={handleInputChange}
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="is-active"
                    name="isActive"
                    checked={newStatus.isActive}
                    onChange={handleInputChange}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is-active" className="ml-2 block text-sm text-gray-900">
                    Kích hoạt
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mr-2 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveStatus}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                {selectedStatus ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStatus;
