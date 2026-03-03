import React from 'react';
import Swal from 'sweetalert2';
import axios from '../api/axios';

const Card3 = ({ data, fullData, setData, fullFilteredData, setFilteredData }) => {
    const reply = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Verified'
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Loading...',
                    allowOutsideClick: false,
                    showConfirmButton: false
                });

                console.log('Data ID:', data.id); // Ensure this is valid

                // Update query status to 'replied' in the backend using PUT
                await axios.post('/admin/set-query-replied', {
                    id: data.id
                }, {
                    headers: {
                        "token": localStorage.getItem('token')
                    }
                });
                console.log(`/admin/set-query-replied`);

                Swal.close();

                // Update frontend data to remove the replied query
                setData(fullData.filter(d => d.id !== data.id));
                setFilteredData(fullFilteredData.filter(d => d.id !== data.id));

                await Swal.fire({ title: "Verification successful", icon: "success" });

            } catch (error) {
                Swal.close();
                await Swal.fire({ title: error.response?.data?.error || "Error", text: error.response?.data?.message || "Something went wrong.", icon: "error" });
            }
        }
    };

    return (
        <div className="collapse collapse-arrow bg-base-200">

            {/* Change the input type from 'radio' to 'checkbox' */}
            <input type="checkbox"/>
            <div className="collapse-title text-md font-medium z-0">

                {data.title}
            </div>
            <div className="collapse-content">
                <div className="card card-compact w-full bg-neutral shadow-xl text-neutral-content">
                    <div className="card-body items-center text-center">
                        <div className='overflow-x-auto'>
                            <table className='table border-collapse border border-slate-500'>
                                <tbody>
                                    <tr>
                                        <td className='border p-2'>Name</td>
                                        <td className='border p-2'>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <td className='border p-2'>Email</td>
                                        <td className='border p-2'><a href={`mailto:${data.email}`}>{data.email}</a></td>
                                    </tr>
                                    <tr>
                                        <td className='border p-2'>Message</td>
                                        <td className='border p-2'>{data.message}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={reply}>Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card3;
