import axios from "axios"
import {logger} from '@/utils/logger'
import { JSON_PLACEHOLDER_URL } from "@/constants/app-variables"
import { Timeouts } from "@/constants/timeouts";


const log = logger({
  title: 'SERVICE',
  time: true,
  backgroundColor: '#b8c9f9'
})

export const service = async ({
  method = 'get',
  url,
  payload
} = {}) => {
  const normalizedMethod = method.toLowerCase();
  log.group('api request')
  try {
    log.await(`${normalizedMethod.toUpperCase()} | "${url}"`)
    const res = await axios({
      method: normalizedMethod,
      baseURL: JSON_PLACEHOLDER_URL,
      url: url,
      data: payload,
      timeout: Timeouts.ThirtySeconds,
    });
    log.info(res.data)
    log.complete(`request complete`)
    return res.data;
  } catch(err) {
    log.failed('request failed')
    log.error(err);
  } finally {
    log.groupEnd();
  }
}