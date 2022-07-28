import React, { useEffect, useState } from "react";
import WebCamDetectComponent from "../../component/webcam-detect/webcam-detect"
import Button from 'aws-northstar/components/Button';
import { useToasts } from "react-toast-notifications";
import { compare_face, crop_image } from "../../services/rekonito"
import { dataUrlToFile } from "../../services/common"
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';

const Step2 = props => {
    if (props.currentStep !== 2) {
        return null;
    }
    const [imageBase64, setImageBase64] = useState(null);
    const [selectImage, setSelectImage] = useState(null)
    const [signal, setSignal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToasts();
    const [percentage, setPercentage] = useState(null)

    const uploadSelfie = (img) => {
        setIsLoading(true)
        setPercentage(null)
        const blobs = dataUrlToFile(img, `test_${new Date().toLocaleDateString()}.png`);
        const formData = new FormData();    //formdata object
        formData.append('Code', 'hd018625');   //append the values with key, value pair
        formData.append('File', blobs);
        compare_face(formData).then((res) => {
            if (res?.data?.data) {
                res?.data?.data?.percentage < 0 ? setPercentage("Không tìm thấy khuôn mặt")
                    : setPercentage(res?.data?.data?.percentage + " %")
            }
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false)
            setPercentage(null)
            addToast(
                <div className='text-center'>
                    {"Lỗi hệ thống"}
                </div>, { appearance: 'error' });
        })
    }

    return (
        <div className='row'>
            <div className='col-md-3'>
                {
                    imageBase64 &&
                    <div style={{ marginBottom: '10px', textAlign: 'center' }} className="row">
                        <p><h3>PREVIEW IMAGE CAPTURE</h3></p>
                        <img id="result-face2" src={selectImage ?? imageBase64} className="img-face-custom" />
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
                                    }}>Compare Facing</Button>
                                    &nbsp;&nbsp;
                                    <Button variant="primary" onClick={() => {
                                        setSelectImage(null);
                                    }}>Retake</Button>
                                </>
                            }
                        </div>
                        <div>
                            <p className="score-res">
                                {percentage}
                            </p>
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

export default Step2;
