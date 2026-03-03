import React, { useEffect, useState } from 'react'
import Card3 from './Card3'
import Swal from 'sweetalert2';
import axios from '../api/axios';

const Queries = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("email")
  const [filterData, setFilterData] = useState("")
  const handleFilterDataChange = (e) => {
    const newFilterData = e.target.value.toLowerCase();
    setFilterData(newFilterData);
    if (filter !== "") {
      const tempData = data.filter((d) =>
        d[filter.toString()].toString().toLowerCase().startsWith(newFilterData)
      );
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: 'Loading...',
          allowOutsideClick: false,
          showConfirmButton: false
        });
        const response = await axios.get('/admin/queries', {
          headers: {
            "token": localStorage.getItem('token')
          }
        });
        setData(response.data.data);
        setFilteredData(response.data.data);
        Swal.close();
      } catch (error) {
        Swal.close();
        Swal.fire({ title: error.response.data.error, text: error.response.data.message, icon: "error" })
      }
    }
    fetchData();
  },[]);

  return (
    <div className='p-5 bg-black text-white'>
      <div className='flex flex-row items-center'>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-black">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" fill='#ffffff' /></svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52 bg-black">
            <li><button onClick={() => setFilter("email")}>Email</button></li>
            <li><button onClick={() => setFilter("name")}>Name</button></li>
            <li><button onClick={() => setFilter("title")}>Title</button></li>
          </ul>
        </div>
        <input type="text"  placeholder={filter === "" ? `Select filter and type here` : `Type ${filter} Here`} className="text-red-800 input input-bordered w-full" value={filterData} onChange={handleFilterDataChange} />
      </div>
      {(filteredData||[]).map((d) => (
        <Card3 data={d} fullData={data} setData={setData} fullFilteredData={filteredData} setFilteredData={setFilteredData}/>
      ))}
    </div>
  )
}

export default Queries
