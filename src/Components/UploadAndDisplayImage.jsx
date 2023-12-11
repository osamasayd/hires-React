import React, { useState } from "react";
import { Button } from '@mui/material';
import './UploadAndDisplayImage.css';

const UploadAndDisplayImage = () => {
    const baseURL = "https://9b56-130-250-185-236.ngrok-free.app"
    const upscaleAPI = baseURL + "/sdapi/v1/upscale";
    const preUpscaleAPI = baseURL + "/sdapi/v1/upscale-preview";
    const statusAPI = baseURL + "/sdapi/v1/progress";

    const [selectedImage, setSelectedImage] = useState(null);

    const upscalers = ['R-ESRGAN 4x+', 'R-ESRGAN 4x+ Anime6B', 'ESRGAN_4x'];

    const postImage = async () => {
        fetch(preUpscaleAPI, {
            mode: 'no-cors',
            credentials: 'include',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://www.resolutionboost.com/'
            },
            body: JSON.stringify({
                "client_id": "fe353d04-69cf-4b9a-9768-41600db1824a"                ,
                "imageKey": selectedImage.name,
                "imageURL": "",
                "upscaling_resize": "2",
                "upscalers_list": upscalers
              })
        }).then(response => {
            console.log(response);
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          }).then(data => {
            const images = data.images;
            console.log(images);
          }).catch(error => console.log('Fetch error : ' + error.message)
        //    {console.log("Fetch error"); }
           );

    }

    return (
        <div className="header">
            <h1>Boost Images Resolution</h1>
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"500px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button className="rmvBtn" onClick={() => setSelectedImage(null)}>Remove</button>
                    <button className="uploadBtn" type="submit" onClick={postImage}>Upload</button>
                </div>
            )}

            <br />
            <br />

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;