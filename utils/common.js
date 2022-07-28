import { masterConfig } from "../config/master"

export const getDefaultLanguage = () => {
  return masterConfig.language?.find(x => x.default)?.eventCode ?? 'vn'
}