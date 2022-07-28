

export const initHeadMotion = (canvasId, detectLeftRight, deviceId) => {
    let CVD = null;
    HeadControls.init({
        settings: {
            tol: {
                rx: 1,//do not move if head turn more than this value (in degrees) from head rest position
                ry: 3,
                s: 5 //do not move forward/backward if head is larger/smaller than this percent from the rest position
            },
            sensibility: {
                rx: 1.5,
                ry: 1,
                s: 1
            }
        },
        canvasId: canvasId,
        // videoSettings: {
        //     deviceId: deviceId,
        //     videoElement: document.getElementById('video2'),
        //     flipX: false,
        //     facingMode: "user"
        // },
        callbackMove: function (mv) {
            // console.log(mv?.dRy);
            const dy = mv?.dRy ?? 0
            detectLeftRight.current.value = dy;
            if (dy > 10) {
                detectLeftRight.current.desc = "Quay trái"
            }
            else if (dy < -10) {
                detectLeftRight.current.desc = "Quay phải"
            }
            else {
                detectLeftRight.current.desc = "Nhìn thẳng"
            }
            // dRx: 59.98825379868072
            // dRy: 653.5833715923376
            // dZ: 444.92784350704716
        },
        callbackReady: function (err, spec) {
            HeadControls.toggle(true);
            JEELIZFACEFILTER.update_videoSettings({ deviceId: deviceId })
        },
        callbackTrack: function (detectState) {

        },
        NNCPath: '/jeelizFace/neuralNets/', //where to find NN_DEFAULT.json from this path
        animateDelay: 2, //avoid DOM lags
        disableRestPosition: true,
    }); //end HeadControls.init params
}

export const initThreejs = (deviceId, threejsMaterial) => {
    init_faceFilter(deviceId, threejsMaterial);
}

function detect_callback(faceIndex, isDetected) {
    // if (isDetected) {
    //     console.log('INFO in detect_callback(): DETECTED');
    // } else {
    //     console.log('INFO in detect_callback(): LOST');
    // }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec, threejsMaterial) {
    spec.threeCanvasId = 'threeCanvas'; // enable 2 canvas mode
    const threeStuffs = JeelizThreeHelper.init(spec, detect_callback);

    // CREATE A CUBE
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    threeCube.frustumCulled = false;
    threeStuffs.faceObject.add(threeCube);

    // CREATE MOUTH MESHES:
    const create_mouthMesh = function (geom) {
        const mouthMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        const mouthMesh = new THREE.Mesh(geom, mouthMaterial);
        mouthMesh.rotateX(Math.PI / 2);
        mouthMesh.position.set(0, -0.2, 0.2);
        threeStuffs.faceObject.add(mouthMesh);
        return mouthMesh;
    }

    // CREATE MOUTH OPEN MESH:
    threejsMaterial.MOUTHOPENMESH = create_mouthMesh(new THREE.CylinderGeometry(0.3, 0.3, 1, 32));

    // CREATE MOUTH SMILE MESH:
    threejsMaterial.MOUTHSMILEMESH = create_mouthMesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 1, false, -Math.PI / 2, Math.PI));

    // CREATE EYEBROWS:
    threejsMaterial.EYEBROWSMESH = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 1), new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    threejsMaterial.EYEBROWSMESH.position.setZ(0.2).setY(0.3);
    threeStuffs.faceObject.add(threejsMaterial.EYEBROWSMESH);

    // CREATE EYES:
    [-0.2, 0.2].map(function (x) {
        const eyeMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000aa
        });
        const eyeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1), eyeMaterial);
        eyeMesh.rotateX(Math.PI / 2);
        eyeMesh.position.set(x, 0.1, 0.05);
        threeStuffs.faceObject.add(eyeMesh);
    });

    //CREATE THE CAMERA
    threejsMaterial.THREECAMERA = JeelizThreeHelper.create_camera();
}

function init_faceFilter(deviceId, threejsMaterial) {
    const JEELIZFACEFILTER2 = JEELIZFACEFILTER.create_new();
    JEELIZFACEFILTER2.init({
        canvasId: 'modelfacecanvas',
        NNCPath: '/jeelizFace/neuralNets/NN_4EXPR_1.json', // This neural network model has learnt 4 expressions
        maxFacesDetected: 1,
        callbackReady: function (errCode, spec) {
            if (errCode) {
                console.log('AN ERROR HAPPENS. ERR =', errCode);
                return;
            }
            JEELIZFACEFILTER2.update_videoSettings({ deviceId: deviceId })
            init_threeScene(spec, threejsMaterial);
        },
        // called at each render iteration (drawing loop):
        callbackTrack: function (detectState) {
            const expr = detectState.expressions;
            const mouthOpen = expr[0];
            const mouthSmile = expr[1];
            const eyebrowFrown = expr[2];
            const eyebrowRaised = expr[3];

            // set mouth according the expression:
            threejsMaterial.output.mouthOpen = mouthOpen;
            threejsMaterial.MOUTHOPENMESH.scale.setX(mouthOpen).setZ(mouthOpen);
            threejsMaterial.MOUTHSMILEMESH.scale.setX(mouthSmile).setZ(mouthSmile);

            // set eyebrows:
            const yEyeBrows = (eyebrowFrown > eyebrowRaised) ? -0.2 * eyebrowFrown : 0.7 * eyebrowRaised;
            threejsMaterial.EYEBROWSMESH.position.setY(0.3 + yEyeBrows);

            JeelizThreeHelper.render(detectState, threejsMaterial.THREECAMERA);
        }
    }); //end JEELIZFACEFILTER.init call
}

export const drawComponentFace = (ctx, component, width = 20, height = 20) => {
    ctx.rect(
        component?.x,
        component?.y,
        width, height);
    component?.text && ctx.fillText(component?.text, component?.x, component?.y);
}