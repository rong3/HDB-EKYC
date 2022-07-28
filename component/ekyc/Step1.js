import React, { useEffect, useState } from "react";
import WebCamDetectComponent from "../../component/webcam-detect/webcam-detect"
import Button from 'aws-northstar/components/Button';
import { useToasts } from "react-toast-notifications";
import { reg_face, crop_image } from "../../services/rekonito"
import { dataUrlToFile } from "../../services/common"
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';

const Step1 = props => {
    if (props.currentStep !== 1) {
        return null;
    }
    const [imageBase64, setImageBase64] = useState(null);
    const [selectImage, setSelectImage] = useState(null)
    const [signal, setSignal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToasts();

    const uploadSelfie = (img) => {
        setIsLoading(true)
        const blobs = dataUrlToFile(img, `test_${new Date().toLocaleDateString()}.png`);
        const formData = new FormData();    //formdata object
        formData.append('Code', 'hd018625');   //append the values with key, value pair
        formData.append('Image', blobs);
        reg_face(formData).then((res) => {
            setIsLoading(false)
            addToast(
                <div className='text-center'>
                    {"Đăng kí khuôn mặt thành công"}
                </div>, { appearance: 'success' });
            setSelectImage(null);
        }).catch((err) => {
            setIsLoading(false)
            addToast(
                <div className='text-center'>
                    {"Đăng kí khuôn mặt thất bại"}
                </div>, { appearance: 'error' });
            setSelectImage(null);
        })
    }

    return (
        <div className='row'>
            <div className='col-md-3'>
                {
                    imageBase64 &&
                    <div style={{ marginBottom: '10px', textAlign: 'center' }} className="row">
                        <p><h3>PREVIEW IMAGE CAPTURE</h3></p>
                        <img id="result-face" src={selectImage ?? imageBase64} className="img-face-custom" />
                        <div style={{ display: imageBase64 && !isLoading ? 'block' : 'none', zIndex: 9999 }}>
                            {
                                selectImage === null &&
                                <Button variant="primary" onClick={() => {
                                    setSelectImage(imageBase64)
                                }}>Use this photo</Button>
                            }
                            {
                                selectImage &&
                                <>
                                    <Button variant="primary" onClick={() => {
                                        uploadSelfie(selectImage)
                                    }}>Upload</Button>
                                    &nbsp;&nbsp;
                                    <Button variant="primary" onClick={() => {
                                        setSelectImage(null);
                                    }}>Retake</Button>
                                </>
                            }
                        </div>
                        <div style={{ display: isLoading ? 'block' : 'none' }}>
                            <LoadingIndicator label='Uploading' />
                        </div>
                    </div>
                }
            </div>
            <WebCamDetectComponent func={{
                setImageBase64: setImageBase64,
                signal: signal
            }} key={props.currentStep} />
        </div>
    );
};

export default Step1;
