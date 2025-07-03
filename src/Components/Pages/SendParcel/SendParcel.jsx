import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const SendParcel = () => {

    const { user } = useAuth();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [warehouses, setWarehouses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [senderDistricts, setSenderDistricts] = useState([]);
    const [senderAreas, setSenderAreas] = useState([]);
    const [receiverDistricts, setReceiverDistricts] = useState([]);
    const [receiverAreas, setReceiverAreas] = useState([]);
    const [cost, setCost] = useState(0);
    const [trackingId, setTrackingId] = useState('');
    const parcelType = watch('parcelType');
    const senderRegion = watch('senderRegion');
    const senderDistrict = watch('senderDistrict');
    const receiverRegion = watch('receiverRegion');
    const receiverDistrict = watch('receiverDistrict');

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch('/data/warehouses.json')
            .then(res => res.json())
            .then(data => {
                setWarehouses(data);
                const uniqueRegions = [...new Set(data.map(item => item.region))];
                setRegions(uniqueRegions);
            });
    }, []);

    useEffect(() => {
        if (senderRegion) {
            const filtered = warehouses.filter(item => item.region === senderRegion);
            setSenderDistricts([...new Set(filtered.map(item => item.district))]);
        }
    }, [senderRegion, warehouses]);

    useEffect(() => {
        if (senderDistrict) {
            const found = warehouses.find(item => item.district === senderDistrict);
            setSenderAreas(found?.covered_area || []);
        }
    }, [senderDistrict, warehouses]);

    useEffect(() => {
        if (receiverRegion) {
            const filtered = warehouses.filter(item => item.region === receiverRegion);
            setReceiverDistricts([...new Set(filtered.map(item => item.district))]);
        }
    }, [receiverRegion, warehouses]);

    useEffect(() => {
        if (receiverDistrict) {
            const found = warehouses.find(item => item.district === receiverDistrict);
            setReceiverAreas(found?.covered_area || []);
        }
    }, [receiverDistrict, warehouses]);

    const calculateCost = (data) => {
        const isSameCity = data.senderDistrict === data.receiverDistrict;
        if (data.parcelType === 'document') {
            return isSameCity ? 60 : 80;
        } else {
            const weight = parseFloat(data.weight || 0);
            if (weight <= 3) return isSameCity ? 110 : 150;
            const extraKg = weight - 3;
            return (isSameCity ? 110 : 150) + extraKg * 40 + (!isSameCity ? 40 : 0);
        }
    };

    const generateTrackingID = () => {
        return 'TRK' + Date.now().toString().slice(-6);
    };

    const generatePDF = (data, cost, trackingId) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Parcel Booking Invoice", 20, 20);
        doc.setFontSize(12);
        doc.text(`Tracking ID: ${trackingId}`, 20, 30);
        doc.text(`Date: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`, 20, 37);
        doc.text(`Sender: ${data.senderName}, ${data.senderContact}, ${data.senderAddress}`, 20, 47);
        doc.text(`Receiver: ${data.receiverName}, ${data.receiverContact}, ${data.receiverAddress}`, 20, 57);
        doc.text(`Type: ${data.parcelType}`, 20, 67);
        doc.text(`Weight: ${data.weight || 'N/A'} KG`, 20, 74);
        doc.text(`Pickup Point: ${data.senderCenter}`, 20, 81);
        doc.text(`Delivery Point: ${data.receiverCenter}`, 20, 88);
        doc.text(`Cost: ৳${cost}`, 20, 95);
        doc.save(`parcel_invoice_${trackingId}.pdf`);
    };

    const onSubmit = async (data) => {
        const deliveryCost = calculateCost(data);
        setCost(deliveryCost);
        const tracking = generateTrackingID();
        const currentTime = new Date();

        const confirmed = await Swal.fire({
            title: 'Confirm Your Parcel Booking',
            html: `
            <div style="text-align:left">
              <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
              <p><strong>Sender:</strong> ${data.senderName}, ${data.senderDistrict}</p>
              <p><strong>Receiver:</strong> ${data.receiverName}, ${data.receiverDistrict}</p>
              <hr class="my-2"/>
              <p><strong>Pricing Breakdown:</strong></p>
              ${data.parcelType === 'document'
                    ? `<p>Base Cost: ৳${data.senderDistrict === data.receiverDistrict ? 60 : 80}</p>`
                    : (() => {
                        const weight = parseFloat(data.weight || 0);
                        const isSame = data.senderDistrict === data.receiverDistrict;
                        const base = isSame ? 110 : 150;
                        const extraWeight = weight > 3 ? (weight - 3) : 0;
                        const extraCost = extraWeight > 0 ? `${extraWeight}kg × 40 = ৳${extraWeight * 40}` : '৳0';
                        const locationExtra = !isSame && weight > 3 ? '৳40 (Outside District Extra)' : '৳0';
                        return `
                      <p>Base (up to 3kg): ৳${base}</p>
                      <p>Extra Weight: ${extraCost}</p>
                      ${extraWeight > 0 ? `<p>Outside District Charge: ${locationExtra}</p>` : ''}
                    `;
                    })()}
              <hr class="my-2"/>
              <p style="font-size:18px; margin-top:10px;"><strong>Total Cost: <span style="color:#10B981">৳${deliveryCost}</span></strong></p>
            </div>
          `,
            icon: 'info',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: '✅ Proceed to Payment',
            cancelButtonText: '✏️ Edit Info',
            customClass: {
                actions: 'flex gap-4 justify-center mt-4',
                confirmButton: 'bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded',
                cancelButton: 'bg-gray-300 text-black hover:bg-gray-400 px-6 py-2 rounded',
            },
            buttonsStyling: false
        });

        if (confirmed.isConfirmed) {
            const parcelData = {
                ...data,
                cost: deliveryCost,
                trackingId: tracking,
                createdAt: format(currentTime, 'yyyy-MM-dd HH:mm:ss'),
                createdBy: user?.email || 'unknown',
                status: 'Pending',
                history: [
                    {
                        status: 'Pending',
                        timestamp: format(currentTime, 'yyyy-MM-dd HH:mm:ss')
                    }
                ]
            };

            console.log('Booking Confirmed:', parcelData);


            //Save data to Post Method here
            axiosSecure.post('parcels', parcelData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        //TODO: Redicect to a payment page 
                        
                        Swal.fire('Booked!', 'Your parcel has been booked successfully.', 'success');
                        generatePDF(parcelData, deliveryCost, tracking);
                        reset();
                    }
                })



        }
    };


    const handleTrackParcel = () => {
        if (!trackingId.trim()) return Swal.fire('Error', 'Please enter a valid tracking ID', 'error');
        Swal.fire('Parcel Status', `Tracking ID: ${trackingId}\nStatus: In Transit`, 'info');
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Send Parcel</h1>
            <p className="text-lg text-gray-600 mb-6">Fill in the details below to book your parcel.</p>

            {/* Tracking ID */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Track Your Parcel</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={trackingId}
                        onChange={e => setTrackingId(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter Tracking ID (e.g., TRK123456)"
                    />
                    <button onClick={handleTrackParcel} className="btn btn-primary">Track</button>
                </div>
            </div>

            {/* Parcel Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex items-center gap-6 mb-6">
                    <label className="flex items-center gap-2">
                        <input type="radio" value="document" {...register('parcelType', { required: true })} className="radio radio-success" />
                        <span className="text-green-600 font-semibold">Document</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" value="non-document" {...register('parcelType', { required: true })} className="radio" />
                        <span className="font-semibold">Non-Document</span>
                    </label>
                </div>

                {/* Parcel Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input {...register('title', { required: true })} className="input input-bordered w-full" placeholder="Parcel Name" />
                    <input type="number" step="0.1" {...register('weight')} className="input input-bordered w-full" placeholder="Weight (KG)" />
                </div>

                {/* Sender Details */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Sender Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input {...register('senderName', { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
                        <input {...register('senderContact', { required: true })} placeholder="Sender Contact" className="input input-bordered w-full" />
                        <input {...register('senderAddress', { required: true })} placeholder="Sender Address" className="input input-bordered w-full" />
                        <select {...register('senderRegion', { required: true })} className="select select-bordered w-full">
                            <option value="">Select Division</option>
                            {regions.map(region => <option key={region} value={region}>{region}</option>)}
                        </select>
                        <select {...register('senderDistrict', { required: true })} className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {senderDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select {...register('senderCenter', { required: true })} className="select select-bordered w-full">
                            <option value="">Select Pickup Point</option>
                            {senderAreas.map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                        <textarea {...register('pickupInstruction', { required: true })} placeholder="Pickup Instruction" rows={3} className="textarea textarea-bordered w-full" />
                    </div>
                </div>

                {/* Receiver Details */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Receiver Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input {...register('receiverName', { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                        <input {...register('receiverContact', { required: true })} placeholder="Receiver Contact" className="input input-bordered w-full" />
                        <input {...register('receiverAddress', { required: true })} placeholder="Receiver Address" className="input input-bordered w-full" />
                        <select {...register('receiverRegion', { required: true })} className="select select-bordered w-full">
                            <option value="">Select Division</option>
                            {regions.map(region => <option key={region} value={region}>{region}</option>)}
                        </select>
                        <select {...register('receiverDistrict', { required: true })} className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {receiverDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select {...register('receiverCenter', { required: true })} className="select select-bordered w-full">
                            <option value="">Select Delivery Point</option>
                            {receiverAreas.map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                        <textarea {...register('deliveryInstruction', { required: true })} placeholder="Delivery Instruction" rows={3} className="textarea textarea-bordered w-full" />
                    </div>
                </div>

                <p className="text-sm text-green-500 mt-2">* PickUp Time 4pm–7pm Approx.</p>

                <div className="text-center">
                    <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 text-white px-10">Book Parcel</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;
