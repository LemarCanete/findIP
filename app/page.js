'use client'
import { useState } from 'react';
import axios from 'axios';

const encodedParams = new URLSearchParams();

const isValidIpAddress = (ip) => {
  const ipAddressRegex = /^(\d{1,3}\.){0,3}\d{0,3}$/;
  return ipAddressRegex.test(ip);
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Home() {
    const [address, setAddress] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setAddress(inputValue);

        if (!isValidIpAddress(inputValue)) {
        setError("Please enter a valid IP address");
        } else {
        setError("");
        }
    };

    const handleSubmit = async () => {
        if (!isValidIpAddress(address)) {
            setError("Please enter a valid IP address");
            return;
        }
       
        setIsLoading(true);

        encodedParams.set('ip', address);
        encodedParams.set('reverse-lookup', 'checked');

        const options = {
            method: 'POST',
            url: 'https://community-neutrino-ip-info.p.rapidapi.com/ip-info',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'X-RapidAPI-Key': '20e5f0ded7mshabe3c54e7f19ce6p1ac5e6jsnb3c962c3081a',
              'X-RapidAPI-Host': 'community-neutrino-ip-info.p.rapidapi.com'
            },
            data: encodedParams,
        };
        try {
            const response = await axios.request(options);
            setData(response.data);
            console.log(response.data)
            setIsLoading(false)
            setError("");
            document.getElementById('result-section').scrollIntoView({
                behavior: 'smooth',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className='container-fluid'>
            <div className="h-screen border bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/1203808/pexels-photo-1203808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
                <div className='mx-auto md:w-96 rounded p-3 w-72 bg-slate-200 shadow-lg mt-80'>
                    <p className=''>Enter IP Address: 49.148.245.173</p>
                    <div className="md:flex">
                    <input
                        type="text"
                        className={`w-full border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 focus:outline-none p-2 ${
                        !isValidIpAddress(address) ? 'border-red-500' : ''
                        } focus:border-sky-500`}
                        onChange={handleInputChange}
                        placeholder='192.158.1.38'
                    />
                    <button className='rounded-full bg-sky-500 hover:bg-sky-700 py-2 px-6 ms-3 mt-4 md:mt-0' onClick={handleSubmit}>Enter</button>
                    </div>
                    <span className='block text-red-500'>{error}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-5 h-screen md:text-center" id='result=section'>
                <div className=" bg-green-100 rounded-md p-3 md:pt-32 md:text-2xl font-medium shadow-xl hover:bg-white hover:shadow-none cursor-pointer ">
                    <p className=''>Country: {data.country}</p>
                    <p className=''>Region: {data.region}</p>
                    <p className=''>City: {data.city}</p>
                </div>
                <div className=" bg-red-100 rounded-md p-3 md:pt-32 md:text-2xl font-medium shadow-xl hover:bg-white hover:shadow-none cursor-pointer">
                    <p className=''>Latitude: {data.latitude}</p>
                    <p className=''>Latitude: {data.longitude}</p>
                    <p className=''>hostname: {data.hostname}</p>
                    <p className=''>Continent Code: {data['host-domain']}</p>
                    <p className=''>IP Address: {data.ip}</p>
                </div>
                <div className=" bg-blue-100 rounded-md p-3 md:pt-32 md:text-2xl font-medium shadow-xl hover:bg-white hover:shadow-none cursor-pointer">
                    <p className=''>Continent Code: {data['continent-code']}</p>
                    <p className=''>Continent Code: {data['country-code']}</p>
                    <p className=''>Currency: {data['currency-code']}</p>
                    <p className=''>Continent Code: {data['continent-code']}</p>
                    <p className=''>Continent Code: {data['region-code']}</p>
                </div>
                <div className=" bg-yellow-100 rounded-md p-3 md:pt-32 md:text-2xl font-medium shadow-xl hover:bg-white hover:shadow-none cursor-pointer">
                    <p className=''>Abbr: {data.timezone && data.timezone.abbr}</p> 
                    <p className=''>Date: {data.timezone && data.timezone.date}</p>
                    <p className=''>Id: {data.timezone && data.timezone.id}</p>
                    <p className=''>Name: {data.timezone && data.timezone.name}</p>
                    <p className=''>Offset: {data.timezone && data.timezone.offset}</p>
                    <p className=''>Time: {data.timezone && data.timezone.time}</p>
                </div>
            </div>   
        </main>
    );
}
