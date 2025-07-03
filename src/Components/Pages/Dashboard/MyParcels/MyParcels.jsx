import React, { useState, useEffect } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

const ITEMS_PER_PAGE = 10;

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [filteredParcels, setFilteredParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [updateParcel, setUpdateParcel] = useState(null);
    const [payParcel, setPayParcel] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('Stripe'); // 🔧 ADDED HERE

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        const filtered = parcels.filter(p => {
            const matchSearch =
                p.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                p.trackingId?.toLowerCase().includes(searchText.toLowerCase());
            const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
            return matchSearch && matchStatus;
        });
        setFilteredParcels(filtered);
    }, [searchText, selectedStatus, parcels]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete this parcel?');
        if (!confirmed) return;
        try {
            await axiosSecure.delete(`/parcels/${id}`);
            toast.success('Parcel deleted!');
            refetch();
        } catch (err) {
            toast.error('Failed to delete parcel.');
        }
    };

    const handlePayment = async () => {
        if (!payParcel) return;
        try {
            const res = await axiosSecure.patch(`/parcels/${payParcel._id}`, {
                paid: true,
                paymentMethod: selectedMethod,
                transactionId: `demo_txn_${Date.now()}`,
                paymentDate: new Date().toISOString(),
                status: 'In Transit'
            });
            if (res.data?.message) {
                toast.success('Payment recorded successfully!');
                setPayParcel(null);
                refetch();
            }
        } catch (err) {
            toast.error('Failed to record payment.');
        }
    };

    const totalPages = Math.ceil(filteredParcels.length / ITEMS_PER_PAGE);
    const displayedParcels = filteredParcels.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const scrollToTop = () => {
        document.getElementById('parcel-list')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToTop, [currentPage]);

    return (
        <div id="parcel-list" className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">📦 My Parcels ({parcels.length})</h1>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by title or tracking ID..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="input input-bordered w-full md:w-1/2"
                />

                <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="select select-bordered w-full md:w-52"
                >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            {displayedParcels.length === 0 ? (
                <p className="text-gray-500">No parcels found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100 text-sm">
                                <th>#</th>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th>Booked On</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedParcels.map((parcel, index) => (
                                <tr key={parcel._id} className="hover:bg-gray-50 cursor-pointer">
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                    <td className="font-mono text-blue-600">{parcel.trackingId}</td>
                                    <td>{parcel.title}</td>
                                    <td className="text-green-600 text-sm">{parcel.status}</td>
                                    <td>৳{parcel.cost || 'N/A'}</td>
                                    <td>
                                        {parcel.paid ? (
                                            <span className="badge bg-green-200 text-green-800">Paid</span>
                                        ) : (
                                            <button
                                                onClick={() => setPayParcel(parcel)}
                                                className="btn btn-xs btn-accent"
                                            >
                                                Pay
                                            </button>
                                        )}
                                    </td>
                                    <td>{parcel.createdAt ? format(new Date(parcel.createdAt), 'PPpp') : 'N/A'}</td>
                                    <td className="flex flex-col md:flex-row gap-2 justify-center">
                                        <button
                                            onClick={() => setSelectedParcel(parcel)}
                                            className="btn btn-sm bg-blue-100 text-blue-600 hover:bg-blue-200"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => setUpdateParcel(parcel)}
                                            className="btn btn-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4 gap-2">
                        {[...Array(totalPages).keys()].map(n => (
                            <button
                                key={n}
                                onClick={() => setCurrentPage(n + 1)}
                                className={`btn btn-sm ${currentPage === n + 1 ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {n + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* View Modal */}
            {selectedParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-2">📦 Parcel Details</h2>
                        <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
                        <p><strong>Title:</strong> {selectedParcel.title}</p>
                        <p><strong>Status:</strong> {selectedParcel.status}</p>
                        <p><strong>Cost:</strong> ৳{selectedParcel.cost}</p>
                        <p><strong>Booked On:</strong> {format(new Date(selectedParcel.createdAt), 'PPpp')}</p>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="btn btn-sm btn-error text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {updateParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">✏️ Update Parcel</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;
                                const updatedTitle = form.title.value;
                                const updatedStatus = form.status.value;
                                const updatedCost = parseFloat(form.cost.value);

                                try {
                                    const res = await axiosSecure.patch(`/parcels/${updateParcel._id}`, {
                                        title: updatedTitle,
                                        status: updatedStatus,
                                        cost: updatedCost
                                    });
                                    if (res.data?.message) {
                                        toast.success('Parcel updated!');
                                        setUpdateParcel(null);
                                        refetch();
                                    }
                                } catch (err) {
                                    toast.error('Update failed');
                                }
                            }}
                        >
                            <div className="mb-4">
                                <label className="font-semibold block mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={updateParcel.title}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold block mb-1">Status</label>
                                <select
                                    name="status"
                                    defaultValue={updateParcel.status}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Transit">In Transit</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold block mb-1">Cost (৳)</label>
                                <input
                                    type="number"
                                    name="cost"
                                    defaultValue={updateParcel.cost}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setUpdateParcel(null)}
                                    className="btn btn-sm btn-error"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-sm btn-success">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Pay Modal */}
            {payParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">💳 Payment Confirmation</h2>
                        <p><strong>Tracking ID:</strong> {payParcel.trackingId}</p>
                        <p><strong>Cost:</strong> ৳{payParcel.cost}</p>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Choose Payment Method:</label>
                            <select
                                value={selectedMethod}
                                onChange={e => setSelectedMethod(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="Stripe">Stripe</option>
                                <option value="SSLCommerz">SSLCommerz</option>
                                <option value="bKash">bKash</option>
                            </select>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={() => setPayParcel(null)}
                                className="btn btn-sm btn-error"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                className="btn btn-sm btn-success"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyParcels;
