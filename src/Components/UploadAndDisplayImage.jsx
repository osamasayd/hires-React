import React, { useState } from "react";
import { Button } from '@mui/material';
import './UploadAndDisplayImage.css';

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [UrlImage, setUrlImage] = useState(null);
    const [imageData, setImageData] = useState([]);


    const baseURL = "https://5c91-31-143-212-101.ngrok-free.app"
    const upscaleAPI = baseURL + "/sdapi/v1/upscale";
    const preUpscaleAPI = baseURL + "/sdapi/v1/upscale-preview";
    const statusAPI = baseURL + "/sdapi/v1/progress";
    const upscalers = ['R-ESRGAN 4x+', 'R-ESRGAN 4x+ Anime6B', 'ESRGAN_4x'];

    const UploadImage = async () => {
        const ImageKey = selectedImage ? selectedImage.name : '';

        fetch(preUpscaleAPI, {
            // mode: 'no-cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            },
            body: JSON.stringify({
                "client_id": "",
                "imageKey": ImageKey, //'2023-12-13T15-47-34-003Z-castle.png',// Just for test  selectedImage.name,
                // "upscalers_list": upscalers,
                "imageURL": UrlImage,
                "upscaling_resize": 2,
                "upscalers_params": [{ 'upscaler_1': '4x-UltraSharp', 'upscaler_2': 'R-ESRGAN 4x+', 'extras_upscaler_2_visibility': 0.2 }]
            })
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(data => {
            const images = data.images || [];
            setImageData(images);
            console.log(images);
        }).catch(error => console.log('Fetch error : ' + error.message)
        );
    }

    const handleUrlImage = (event) => {
        const file = event.target.value;
        setUrlImage(file);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

    };

    const rmvImage = (event) => {
        setSelectedImage(null);
    }

    return (
        <>
            <div className="header">
                <h1>Boost Images Resolution</h1>
                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"300px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button className="rmvBtn" onClick={rmvImage}>Remove</button>
                        {/* <button className="uploadBtn" type="submit" onClick={UploadImage}>Upload</button> */}
                    </div>
                )}

                <input
                    type="file"
                    name="myImage"
                    onChange={handleImageChange}
                    class="input_container"
                />
                <input
                    type="text"
                    placeholder="Image URl"
                    name="imageUrl"
                    onChange={handleUrlImage}
                />
                <button className="uploadBtn" onClick={UploadImage}>Upload</button>
            </div>
            <div>
                <h1>Images Preview</h1>
                {imageData.map((image, index) => (
                    <img
                        key={index}
                        src={image} // Assuming image is a URL or base64 string
                        alt={`Image ${index + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </>
    );
};

export default UploadAndDisplayImage;