import { METHOD, request } from '@/utils/request'

const URL_PREFIX = '/workflow'
// eslint-disable-next-line no-unused-vars
const { POST, GET } = METHOD

/**
 * @description: todo list
 */
export function loadTodoList(params) {
  return request(`${URL_PREFIX}/loadTodo`, GET, params)
}

/**
 * @description:已办列表
 * @param {*} query
 * @return {*}
 */
export function loadHisTask(query) {
  return request(`${URL_PREFIX}/loadHisTask`, GET, query)
}

/**
 * @description: 调查获取审批详情
 */
export function getApprovalSurvey(params) {
  return request('/questionnaire/approval', GET, params)
}
/**
 * @description: 调查审批
 */
export function doApprovalSurvey(params) {
  return request('/questionnaire/doApproval', POST, params)
}

/**
 * @description: 考试获取审批详情
 */
export function getApprovalExam(params) {
  return request('/exam/approval', GET, params)
}

/**
 * @description: 考试审批
 */
export function doApprovalExam(params) {
  return request('/exam/doApproval', POST, params)
}

/**
 * @description:历史任务
 * @param {*} query
 * @return {*}
 */
export function getHistoryTasks(processInstanceId) {
  return request(`${URL_PREFIX}/getHistoryTasks`, GET, { processInstanceId })
}
/**
 * @description: 获取审批流程记录
 * @param {*} query
 * @return {*}
 */
export function getTasksInfo(taskId) {
  return request(`${URL_PREFIX}/getTaskInfo`, GET, { taskId })
}
// 获取数字签名的UUID
export function getSignUUID() {
  return request('/mobile/qr/showMobileQR', GET)
}
// 获取数字签名信息
export function getSignInfo(uuid) {
  return request(`/mobile/qr/mobileQRByUuid/${uuid}`, GET)
}
// 获取数字签名状态--到开发环境再用回app的接口
// export function getSignSts(uuid) {
//   return rootRequest('/app/mobile-qr!polling.do', GET, { uuid })
// }
// 获取数字签名状态--这个是多包一层的接口，先注释
export function getSignSts(uuid) {
  return request(`/business/responsibility/polling/${uuid}/true`, GET)
}
