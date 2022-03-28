import { Cache, Http } from '@utils'
import Cookies from 'js-cookie'
import _ from 'lodash'
import config from './config'

window.Cache = Cache
window.Http = Http
window.Cookies = Cookies
window._ = _
window.config = config