import React, { useState, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as faceapi from "face-api.js";
import { initHeadMotion, initThreejs, drawComponentFace } from './jeelizeService';

function WebCamDetectComponent(props) {
    const [loading, setLoading] = useState(false);
    const [progressLoading, setProgressLoading] = useState({
        value: "",
        dataset: [
            'tinyFaceDetector',
            'faceLandmark68Net',
            'faceRecognitionNet',
            'faceExpressionNet',
            'ageGenderNet',
        ],
        errorDetect: [
            "Để khuôn mặt ở giữa oval",
            "Điều chỉnh mắt mở phù hợp, nếu có thể mở mắt kính ra",
            "Điều chỉnh ánh sáng phù hợp để làm rõ khuôn mặt",
            "Đảm bảo không có vật gì che những thành phần trên khuôn mặt"
        ],
        livenessCheck: "",
        checkStep: {
            smile: null
        },
        valueError: ""
    });
    const { func } = props;
    const webcamRef = useRef(null);
    const canvasRef = useRef(null)
    const detectLeftRight = useRef({
        desc: '',
        value: null
    })
    const checkboxExpression = useRef(true);
    const [previewImageVideo, setPreViewImageVideo] = useState(null)
    const [isDetectFace, setIsDetectFace] = useState(false);
    const [threejsMaterial, setThreeJsMaterial] = useState({
        THREECAMERA: null,
        MOUTHOPENMESH: null,
        MOUTHSMILEMESH: null,
        EYEBROWSMESH: null,
        output: {
            mouthOpen: null,
            detection: null
        },
        debug: {
            x: null,
            y: null,
            deviceX: null,
            deviceY: null
        }
    })

    //HOOK
    useEffect(() => {
        (webcamRef.current && canvasRef.current) && loadModels();
        return (async () => {
            const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }
            await JEELIZFACEFILTER?.destroy();
            canvasRef.current = null;
            webcamRef.current = null;
        })
    }, []);

    useEffect(() => {
        if (!isDetectFace) {
            setInterval(() => {
                var greeting_id = Math.floor(Math.random() * progressLoading.errorDetect.length);
                progressLoading.valueError = progressLoading.errorDetect[greeting_id];
                setProgressLoading({ ...progressLoading })
            }, 2000);
        }
        else {
            progressLoading.valueError = ""
        }

    }, [isDetectFace])

    useEffect(() => {
        if (func?.setImageBase64) {
            func.setImageBase64(previewImageVideo);
        }
    }, [previewImageVideo])

    //function

    const resolveToVal = val => new Promise(res =>
        setTimeout(() => res(val), Math.random() * 1000))

    const initServiceJeelize = () => {
        JEELIZFACEFILTER.get_videoDevices((data) => {
            const deviceid = data[0]?.deviceId ?? null;
            initHeadMotion('jeeFaceFilterCanvas', detectLeftRight, deviceid)
            initThreejs(deviceid, threejsMaterial);
        })
    }

    const loadModels = () => {
        setLoading(true);
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]?.map((_, i) => resolveToVal(i)
            .then(() => {
                progressLoading.value = progressLoading.dataset[i];
                setProgressLoading({ ...progressLoading })
            })))?.then(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                    .then((currentStream) => {
                        const video = webcamRef.current;
                        window.stream = currentStream;
                        video.srcObject = currentStream;
                        //video.play()
                        faceDetection();
                        // //init jeeliz
                        // initServiceJeelize();
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    });
            })
    };

    const faceDetection = async () => {
        setInterval(async () => {
            if (webcamRef.current) {
                try {
                    const detections = await faceapi.detectAllFaces(webcamRef.current, new faceapi.TinyFaceDetectorOptions({
                        // scoreThreshold: 0.8,
                    }))?.withFaceLandmarks()?.withFaceExpressions();
                    if (detections?.length > 0) {
                        threejsMaterial.debug.x = detections[0]?.detection.box._x;
                        threejsMaterial.debug.y = detections[0]?.detection.box._y;
                        threejsMaterial.debug.deviceX = (webcamRef.current.videoWidth / 2.5);
                        threejsMaterial.debug.deviceY = webcamRef.current.videoWidth / 2.5
                        // console.log({
                        //     x: detections[0]?.detection.box._x,
                        //     y: detections[0]?.detection.box._y,
                        //     wc_width_from: (webcamRef.current.videoWidth / 2.5),
                        //     wc_width_to: (webcamRef.current.videoWidth / 2.5)
                        // });
                    }
                    if (detections?.length > 0
                        &&
                        //box oval
                        (
                            detections[0].detection.box._x >= (webcamRef.current.videoWidth / 2.5) - 150
                            && detections[0].detection.box._x < (webcamRef.current.videoWidth / 2.5) + 50
                        )
                        &&
                        (
                            detections[0].detection.box._y >= (webcamRef.current.videoWidth / 2.5) - 180
                            && detections[0].detection.box._y < (webcamRef.current.videoWidth / 2.5)
                        )
                    ) {
                        // console.log({
                        //     x: detections[0]?.detection.box._x,
                        //     y: detections[0]?.detection.box._y
                        // });
                        setIsDetectFace(true)
                        //Call this function to extract and display face
                        detections?.length > 0 && extractFaceFromBox(webcamRef.current, detections[0].detection.box, detections[0])
                        // detections?.length > 0 && console.log("Left Eye landmarks===========>" + detections[0].landmarks.getLeftEye());
                        if (checkboxExpression.current) {

                            canvasRef.current.innerHtml = await faceapi.createCanvasFromMedia(webcamRef.current);
                            //draw inside
                            const canvas = canvasRef.current
                            const displaySize = { width: webcamRef.current?.offsetWidth, height: webcamRef.current?.offsetHeight }
                            faceapi.matchDimensions(canvas, displaySize)

                            const resizedDetections2 = faceapi.resizeResults(detections, displaySize)
                            threejsMaterial.output.detection = resizedDetections2[0];
                            var ctx = canvas.getContext('2d');
                            ctx?.clearRect(0, 0, canvas.width, canvas.height)
                            ctx.beginPath();
                            // context.translate(canvas.width, 0);
                            // context.scale(-1,1);

                            const componentPoint = {
                                nose: {
                                    x: resizedDetections2[0]?.landmarks?.getNose()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getNose()?.at(2)?._y - 10,
                                    text: 'Mũi'
                                },
                                leftEye: {
                                    x: resizedDetections2[0]?.landmarks?.getLeftEye()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getLeftEye()?.at(2)?._y,
                                    text: 'Mắt phải'
                                },
                                rightEye: {
                                    x: resizedDetections2[0]?.landmarks?.getRightEye()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getRightEye()?.at(2)?._y,
                                    text: 'Mắt trái'
                                },
                                mouth: {
                                    x: resizedDetections2[0]?.landmarks?.getMouth()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getMouth()?.at(2)?._y,
                                    text: "Mồm"
                                },
                                leftEyeBrow: {
                                    x: resizedDetections2[0]?.landmarks?.getLeftEyeBrow()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getLeftEyeBrow()?.at(2)?._y,
                                    text: "Lông mày phải"
                                },
                                rightEyeBrow: {
                                    x: resizedDetections2[0]?.landmarks?.getRightEyeBrow()?.at(2)?._x - 10,
                                    y: resizedDetections2[0]?.landmarks?.getRightEyeBrow()?.at(2)?._y,
                                    text: "Lông mày trái"
                                },
                            }

                            drawComponentFace(ctx, componentPoint.nose);
                            drawComponentFace(ctx, componentPoint.leftEye);
                            drawComponentFace(ctx, componentPoint.rightEye);
                            drawComponentFace(ctx, componentPoint.mouth, 40, 20);
                            drawComponentFace(ctx, componentPoint.leftEyeBrow, 40, 20);
                            drawComponentFace(ctx, componentPoint.rightEyeBrow, 40, 20);

                            ctx.strokeStyle = 'blue';
                            ctx.stroke();
                            //drawing landmark
                            faceapi.draw.drawDetections(canvas, resizedDetections2)
                            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections2)
                            faceapi.draw.drawFaceExpressions(canvas, resizedDetections2)

                            //age detect
                            // resized?.forEach(result => {
                            //     const { age, gender, genderProbability } = result;
                            //     new faceapi.draw.DrawTextField(
                            //         [
                            //             `${Math.round(age)} years`,
                            //             `${gender}`
                            //         ],
                            //         result.detection.box.bottomRight
                            //     ).draw(canvasRef.current);
                            // });
                        }

                    }
                    else {
                        setIsDetectFace(false)
                        threejsMaterial.output.detection = null;
                        canvasRef.current?.getContext('2d').clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
                    }
                }
                catch { }
            }
        }, 200)
    }

    async function extractFaceFromBox(inputImage, box, detectionData) {

        const regionsToExtract = [
            new faceapi.Rect(box.x, box.y - 120, box.width + 10, box.height + 120)
        ]

        let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)

        if (faceImages.length == 0) {
            setPreViewImageVideo(null)
        }
        else {
            // faceImages.forEach(cnv => {
            //     progressLoading.checkStep.smile = null;
            //     progressLoading.livenessCheck = "Đã chụp ảnh";
            //     setProgressLoading({ ...progressLoading })
            //     setPreViewImageVideo(cnv.toDataURL());
            // })

            //scenario for liveness check - simple case
            if (progressLoading.checkStep.smile === null) {
                if (detectionData?.expressions?.happy < 0.25) {
                    progressLoading.livenessCheck = "Đã phát hiện khuôn mặt, cười lên";
                    progressLoading.checkStep.smile = 'checking';
                    setProgressLoading({ ...progressLoading })
                }
                else {
                    progressLoading.livenessCheck = "Bắt đầu phiên xác thực ảnh mới, vui lòng không cười";
                    progressLoading.checkStep.smile = null;
                    setProgressLoading({ ...progressLoading })
                }

            }
            else {
                if (progressLoading.checkStep.smile === 'checking'
                    && detectionData?.expressions?.happy >= 0.3) {
                    faceImages.forEach(cnv => {
                        progressLoading.checkStep.smile = null;
                        progressLoading.livenessCheck = "Đã chụp ảnh";
                        setProgressLoading({ ...progressLoading })
                        setPreViewImageVideo(cnv.toDataURL());
                    })
                }
            }
        }
    }

    const svgIcon = () => (
        <svg
            width="100%"
            height="100%"
            className="svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <g>
                <g id="one">
                    <rect x="0" y="0" width="100%" height="100%" fill="transparent" fillOpacity="0.1" />
                </g>
                <g id="two">
                    <ellipse id={isDetectFace ? 'successEllipse' : 'blueEllipse'}
                        style={{
                            stroke: isDetectFace ? 'green' : 'red',
                            fill: '#fff', fillOpacity: '0.06', strokeWidth: 5,
                            strokeDasharray: '1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2'
                        }}
                        cx="50%" cy="50%" rx="30%" ry="40%">
                    </ellipse>
                </g>
                <g id="three">
                    {
                        isDetectFace ? <svg height="80%" width="80%">
                            <text x="47%" y="4%" fill="green" fontSize={13}>{progressLoading.livenessCheck}</text>
                        </svg>
                            :
                            <svg height="80%" width="80%">
                                <text x="47%" y="4%" fill="red" fontSize={13}>{progressLoading.valueError}</text>
                            </svg>
                    }
                </g>
            </g>
            <use href="#two"></use>
            <use href="#three"></use>
        </svg>
    );

    return (
        <React.Fragment>
            {
                loading &&
                <div className='loading-custom'>
                    <div className='row mt-2'>
                        <div className='col-md-12'>
                            <p><h5>LOADING MODELS...</h5></p>
                            <p>{progressLoading.value}</p>
                            <img src="/asset/image/loading-model.gif" />
                        </div>
                    </div>
                </div>
            }
            <div className='col-md-6'>
                {/* //main camera */}
                <div style={{ display: 'block', zIndex: '9', position: 'relative', width: '100%', borderRadius: '10px', objectFit: 'contain' }}>
                    <video id="video" className='video-custom' ref={webcamRef} autoPlay={true} playsInline={true} muted={true}></video>
                    <div className="overlay-container" id="frame-video-main">
                        <canvas
                            id="canvas"
                            style={{ position: 'absolute' }}
                            className='canvas-mirror'
                            ref={canvasRef}>
                        </canvas>
                        {svgIcon()}
                    </div>
                </div>
                {/* //main camera */}
            </div>
            {/* //expression data */}
            <div className='col-md-3'>
                <p className='custom-toogle'>
                    <input type={"checkbox"} checked={checkboxExpression.current} onChange={(e) => {
                        checkboxExpression.current = e.target.checked;
                        if (checkboxExpression.current) {
                            //do something
                        }
                        else {
                            //  JEELIZFACEFILTER?.destroy();
                            canvasRef.current?.getContext('2d').clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)
                        }
                    }} id="chkbox" />&nbsp;
                    Expression box
                </p>
                {/* //this canvas for init rotate facing */}
                {/* <canvas style={{ opacity: checkboxExpression.current ? 1 : 0.01, display: 'block' }} className="canvas-generic" id='jeeFaceFilterCanvas' width={295} height={200}></canvas> */}
                {/* //end canvas for init rotate facing */}

                {/* //this canvas for init mouth */}
                <canvas style={{ display: checkboxExpression.current ? "block" : 'none' }} className="canvas-mirror box-3d-custom" id='threeCanvas'></canvas>
                <canvas style={{ display: checkboxExpression.current ? "none" : 'none' }} className="canvas-generic" id='modelfacecanvas'></canvas>
                {/* //end canvas init mouth */}

                {/* //result */}
                <p style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '15px' }}>
                    [detectX]: {threejsMaterial.debug.x}
                    <br />
                    [detectY]: {threejsMaterial.debug.y}
                    <br />
                    [deviceX]: {threejsMaterial.debug.deviceX}
                    <br />
                    [deviceY]: {threejsMaterial.debug.deviceY}
                    <br />
                    [Góc mặt]: {detectLeftRight.current.desc} {detectLeftRight.current.value?.toFixed(10)}
                    <br />
                    [Kích thước Khuôn miệng]: {threejsMaterial.output.mouthOpen?.toFixed(10)}
                    <br />
                    [Vị trí miệng]: x: {threejsMaterial.output.detection?.landmarks?.getMouth()?.at(-1)?._x?.toFixed(10)} , y: {threejsMaterial.output.detection?.landmarks?.getMouth()?.at(-1)?._y?.toFixed(10)}
                    <br />
                    [Vị trí mũi]: x: {threejsMaterial.output.detection?.landmarks?.getNose()?.at(-1)?._x?.toFixed(10)} , y: {threejsMaterial.output.detection?.landmarks?.getNose()?.at(-1)?._y?.toFixed(10)}

                </p>
                {/* //end result */}
            </div>
        </React.Fragment>
    )
}

WebCamDetectComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default React.memo(WebCamDetectComponent);