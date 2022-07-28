import { ROOT, LOGIN, ROLEPAGE, DASHBOARD, PAGE1, AUTH_PAGE1, EXAMPLE_PAGE } from "../utils/constant"
import NavBarMain from "../shared/packages/layout/nav/style_HDBank/nav-main"
// import NavBarMainOtherStyle from "../shared/packages/layout/nav/other_Style/nav-main"
import IconCustomize, { ICON_CODE } from "../shared/packages/control/icon"
import { TYPELAYOUT } from "../shared/packages/globalConstant/common"

export const masterConfig = {
    type: TYPELAYOUT.LANDING_PAGE,
    logo: 'https://hdbank.com.vn/asset/images/logo-en.svg',
    themeNavbar: <NavBarMain />,
    menu: [
        {
            icon: <IconCustomize code={ICON_CODE.HOME} />,
            title: 'menuhome',
            to: ROOT,
            items: []
        },
        {
            icon: <IconCustomize code={ICON_CODE.DASHBOARD} />,
            title: "Component",
            items: [
                {
                    icon: <IconCustomize code={ICON_CODE.LOGIN} />,
                    title: "Page Example",
                    menuLevel: 2,
                    items: [
                        {
                            icon: <IconCustomize code={ICON_CODE.LOGIN} />,
                            menuLevel: 3,
                            title: "Redux",
                            auth: true,
                            to: EXAMPLE_PAGE
                        }
                    ]
                },
                {
                    icon: <IconCustomize code={ICON_CODE.LOGIN} />,
                    title: "Compare Facing",
                    menuLevel: 2,
                    to: "/ekyc"
                }
            ]
        },
    ],
    //https://github.com/stephenway/react-flagkit/blob/master/src/countryCodes.ts
    language: [
        {
            code: 'GB',
            eventCode: 'en',
            default: true,
            text: 'English'
        },
        {
            code: 'VN',
            eventCode: 'vn',
            text: 'Tiếng Việt'
        }
    ]
}