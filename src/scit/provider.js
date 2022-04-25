/**
 * @author sgpublic
 * @date 2022.04.24 20:23
 */

/**
 * 从网页中提取包含课表信息的 HTML 字符串
 * @returns {Promise<string>}
 */
async function scheduleHtmlProvider() {
  await loadTool('AIScheduleTools')
  try {
    const iframe = document.getElementsByTagName("iframe")[0]
        .contentWindow.document
    const action = iframe.getElementById('Form1')
        .getAttribute('action')
    // 检查当前是否在 专业推荐课表查询 页面
    if (action.startsWith('./tjkbcx.aspx')) {
      return iframe.getElementById("Table6")
          .innerHTML.replaceAll("&nbsp;", "")
    }
  } catch (e) { }
  await AIScheduleAlert('请在“应用中心”->“教务系统”->“信息查询”->“专业推荐课表查询”，打开您所在班级的课表后再尝试导入！')
  return 'do not continue'
}
