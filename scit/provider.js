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
    const iframe = document.getElementsByTagName("iframe")[0].contentWindow.document
    const form1 = iframe.getElementById('Form1')
    const action = form1.getAttribute('action')
    if (action.startsWith('./tjkbcx.aspx')) {
      return iframe.getElementById("Table6")
          .innerHTML.replaceAll("&nbsp;", "")
    }
  } catch (e) { }
  await AIScheduleAlert('请登录“办事大厅”后，在“应用中心”中进入“教务系统”，然后在“信息查询”->"专业推荐课表查询"中，打开您所在班级的课表后再尝试导入！')
  return 'do not continue'
}
