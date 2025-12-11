"use client"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import * as yup from 'yup';


export default function Lista (){
    const [file, setfile]=useState <File | null>(null);
    const [name, setname]= useState("");
    const [price, setprice]= useState("");
    const [city, setcity]= useState("");
    const [country, setcountry]= useState("");
    const [description, setdescription]= useState("");



        const productSchema = yup.object({ 
            name: yup.string().required('El nombre del coworking es obligatorio'), 
            price: yup.number().typeError('El precio debe ser numérico').required('El precio es obligatorio').positive('El precio debe ser mayor que 0'),
            country: yup.string().required('El país es obligatorio'),
            description: yup.string().required('La descripción es obligatoria'),
        }); 

        const handleSubmit =async (e:any) => {
        e.preventDefault()
        
            
                try { 
                    await productSchema.validate({ name, city, country, description, price: Number(price)}); 
                } catch (err:any) { /* ADDED */
                    toast.error(err?.message || 'Datos inválidos'); 
                    return; 
                } 

                const formData= new FormData()
                if (file){  
        formData.append('file', file);
        formData.append("name", name);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("description", description);
        formData.append("price", price);
        } else {
            toast.error("no se pudo crear los datos")
        };
        

        try{
            const upload = await axios.post("/api/nube", formData);
            // succesful upload
            toast.success('Coworking creado correctamente');
            // reset form
            setfile(null);
            setname("");
            setcity("");
            setcountry("");
            setdescription("");
            setprice("");
        }catch(err:any){
            console.error("error", err)
            toast.error("Error subiendo el coworking")
        };
        };


return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Selecciona coworking</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800">Imagen</label>
                    <label className="text-gray-400"> 
                    <input type="file" className="cursor-pointer"
                    onChange={(e) =>{setfile(e.target.files?.[0] || null)}}/>
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800">Nombre Coworking</label>
                <input value={name} type="text"  placeholder="Nombre coworking"
                    className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setname(e.target.value)} />
                </div>
                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800">Ciudad</label>
                <input value={city} type="text"  placeholder="Ciudad"
                    className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setcity(e.target.value)} />
                </div>
                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800">País</label>
                <input value={country} type="text"  placeholder="País"
                    className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setcountry(e.target.value)} />
                </div>
                <div>
                <label className="block mb-2 text-xm font-medium text-gray-800">Descripción</label>
                <textarea value={description} placeholder="Descripción del coworking"
                className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setdescription(e.target.value)} />
                </div>
                <div>
                <label className="block mb-2 text-xm font-medium text-gray-800">Precio</label>
                <input value={price} type="number" placeholder="Precio"
                className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setprice(e.target.value)} />
                </div>
                <div>
                
                </div>
                <div>
                <button  className="w-full px-4 py-2 text-white
                        bg-indigo-500 rounded-md
                        hover:bg-indigo-600 focus:outline-none
                        focus:bg-indigo-700 cursor-pointer"
                >enviar</button>
                </div>
            </form>
            </div>
            <ToastContainer />
        </div>
    )};


