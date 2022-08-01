import { drawComponentFace } from "./jeelizeService"
import React, { useEffect, useState } from "react";
import { random } from "lodash"

export function useChallengeEkycService(props) {
    const randomBoxPoseNoseX = [-40, -20, 20, 40]; //truc ngang
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

    const challenge_1 = (canvas, ctx, nosePos, smileData) => {
        if (templateChalleng_1.ekycStep.poseNose.isPass === false) {
            const centerPointWidth = 20;
            const centerPointHeight = 20;
            if (nosePos && templateChalleng_1.ekycStep.poseNose.box === null) {
                //draw a random box from a center ínide canvas
                const centerPosX = (canvas.width / 2) - (centerPointWidth / 2);
                const centerPosY = (canvas.height / 2) - (centerPointHeight / 2);
                const random_box = {
                    x: centerPosX + randomBoxPoseNoseX[random(0, randomBoxPoseNoseX.length - 1)],
                    y: centerPosY + randomBoxPoseNoseY[random(0, randomBoxPoseNoseY.length - 1)],
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
                drawComponentFace(ctx, templateChalleng_1.ekycStep.poseNose.box, centerPointWidth, centerPointHeight, 'yellow')
            }
        }
        else {
            if (templateChalleng_1.ekycStep.smiling === false && smileData?.expressions?.happy >= 0.3) {
                templateChalleng_1.ekycStep.smiling = true;
            }
        }
    }

    const resetChallenge_1 = () => {
        templateChalleng_1.ekycStep.poseNose.box = null;
        templateChalleng_1.ekycStep.poseNose.isPass = false;
        templateChalleng_1.ekycStep.smiling = false;
        setTemplateChalleng_1({ ...templateChalleng_1 })
    }

    return {
        challengeSimple: {
            ekycStep: templateChalleng_1.ekycStep,
            challenge_1: challenge_1,
            resetChallenge_1: resetChallenge_1
        }
    };
}
