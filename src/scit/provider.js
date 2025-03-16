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

  async function Pause(message) {
    await AIScheduleAlert(message)
    return 'do not continue'
  }

  try {
    const currentHref = document.location.href
    if (currentHref.indexOf("ai.scit.cn") >= 0) {
      // 当前仍在办事中心内
      if (currentHref.indexOf("/center-auth-server/") >= 0) {
        // 当前在登陆页面
        return await Pause('欢迎使用由四川工业科技学院指尖代码俱乐部提供的小爱课表导入适配，请先在此页面登陆您的账号，登陆成功后再次点击“一键导入”以获取下一步提示。您可以在任意时刻点击“一键导入”以获取提示。')
      } else if (currentHref.indexOf("/h5/") >= 0) {
        // 当前登陆成功
        if (currentHref.indexOf("/pages/workbench/") >= 0) {
          // 当前在“探索”页中
          return await Pause('您当前在探索页，请点击“应用中心”（上方 Tab 中），找到列表中“教务系统”，点击进入。')
        } else {
          // 当前在首页或其他位置
          return await Pause('您当前在办事大厅首页或其他位置，请回到首页，依次点击“探索”（下方导航栏中）->“应用中心”（上方 Tab 中），找到列表中“教务系统”，点击进入。')
        }
      }
    } else if (currentHref.indexOf("218.6.163.93:8081") >= 0) {
      // 当前在教务系统内
      if (currentHref.indexOf("/xs_main.aspx") >= 0) {
        // 当前在学生页面
        const iframe = document.getElementById("iframeautoheight")
            ?.contentWindow?.document
        if (iframe.getElementById('form1') !== null) {
          // 当前在首页
          return await Pause('您当前在教务系统首页，请依次点击“菜单”（“安全退出”按钮下方的三个横杠图标）->“信息查询”->“专业推荐课表查询”，进入课表查询界面。')
        }

        const action = iframe.getElementById('Form1')
            ?.getAttribute('action')
        if (action?.startsWith('./tjkbcx.aspx') === true) {
          // 当前在专业课表推荐
          const kbSectionOptions = iframe.getElementById("kb")
              ?.getElementsByTagName("option")
          let kbSelected = kbSectionOptions.length > 0
          for (let kbSectionOptionIndex = 0; kbSectionOptionIndex < kbSectionOptions.length; ++kbSectionOptionIndex) {
            const kbSectionOption = kbSectionOptions.item(kbSectionOptionIndex)
            if (kbSectionOption?.getAttribute("selected") === 'selected'
                && kbSectionOption?.getAttribute("value") === '') {
              // 未选中课表
              kbSelected = false
              break
            }
          }
          if (!kbSelected) {
            return await Pause('您当前在专业推荐课表查询页面，但未选中课表，请选择您需要导入课表的“学年”、“学期”、“年级”、“学院名称”、“专业”、“推荐课表”。')
          }

          await Pause('即将开始导入课表，点击确认即正式开始导入。若导入期间出现错误无法导入，请退出重试或向指尖代码俱乐部报告问题。')
          return iframe.getElementById("Table6")
              .innerHTML.replaceAll("&nbsp;", "")
        } else {
          // 在其他位置
          return await Pause('您当前在教务系统其他位置，请点击“首页”（教务管理系统标题下方“首页”二字）以回到首页。')
        }
      }
    }
  } catch (e) {
    console.error("发生错误", e)
  }
  return await Pause("发生未知错误，请退出并重新尝试导入。")
}
