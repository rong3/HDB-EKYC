import { drawComponentFace } from "./jeelizeService"
import React, { useEffect, useState } from "react";
import { random } from "lodash"

export function useChallengeEkycService(props) {
    const randomBoxPoseNoseX = [-60, -40, 40, 60]; //truc ngang
    const randomBoxPoseNoseY = [-20, -10, 10, 20]; // truc doc

    const [templateChalleng_1, setTemplateChalleng_1] = useState({
        ekycStep: {
            poseNose: {
                isPass: false,
                box: null
            },
            smiling: false
        }
    })

    useEffect(() => {

    }, [])

    const challenge_1 = (ctx, nosePos, smileData) => {
        if (templateChalleng_1.ekycStep.poseNose.isPass === false) {
            if (nosePos && templateChalleng_1.ekycStep.poseNose.box === null) {
                const random_box = {
                    ...nosePos,
                    x: nosePos.x + randomBoxPoseNoseX[random(0, randomBoxPoseNoseX.length - 1)]
                    , y: nosePos.y + randomBoxPoseNoseY[random(0, randomBoxPoseNoseY.length - 1)],
                    text: ''
                }
                templateChalleng_1.ekycStep.poseNose.box = random_box;
            }
            else {
                const saiso = 5;
                if ((templateChalleng_1.ekycStep.poseNose.box.x > nosePos?.x - saiso
                    && templateChalleng_1.ekycStep.poseNose.box.x < nosePos?.x + saiso)
                    &&
                    (templateChalleng_1.ekycStep.poseNose.box.y > nosePos?.y - saiso
                        && templateChalleng_1.ekycStep.poseNose.box.y < nosePos?.y + saiso)
                ) {
                    templateChalleng_1.ekycStep.poseNose.isPass = true
                }
                drawComponentFace(ctx, templateChalleng_1.ekycStep.poseNose.box, 20, 20, 'yellow')
            }
        }
        else {
            if (templateChalleng_1.ekycStep.smiling === false && smileData?.expressions?.happy >= 0.3) {
                templateChalleng_1.ekycStep.smiling = true;
            }
        }
    }

    return {
        challengeSimple: {
            ekycStep: templateChalleng_1.ekycStep,
            challenge_1: challenge_1
        }
    };
}
