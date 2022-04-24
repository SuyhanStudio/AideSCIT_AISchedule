/**
 * @author sgpublic
 * @date 2022.04.24 20:24
 */

/**
 * 时间配置函数<br>
 * totalWeek: number 总周数，[1, 30] 之间的整数<br>
 * startSemester: string 开学时间：时间戳，13 位长度字符串，推荐用代码生成<br>
 * startWithSunday: boolean 是否是周日为起始日，该选项为 true 时，会开启显示周末选项<br>
 * showWeekend: boolean 是否显示周末<br>
 * forenoon: number 上午课程节数，[1, 10] 之间的整数<br>
 * afternoon: number 下午课程节数，[0, 10]之间的整数<br>
 * night: number 晚间课程节数，[0, 10]之间的整数<br>
 * sections: [{<br>
 *   section: number 节次，[1, 30] 之间的整数<br>
 *   startTime: string 开始时间，参照这个标准格式 5 位长度字符串<br>
 *   endTime: string 结束时间，同上<br>
 * }] 课程时间表，注意：总长度要和上边配置的节数加和对齐<br>
 * @param providerRes
 * @param parserRes
 * @returns {Promise<{
 *     totalWeek: number,
 *     startSemester: string,
 *     startWithSunday: boolean,
 *     showWeekend: boolean,
 *     forenoon: number,
 *     afternoon: number,
 *     night: number,
 *     sections: [{
 *       section: number,
 *       startTime: string,
 *       endTime: string,
 *     }],
 *   }>}
 */
async function scheduleTimer({ providerRes, parserRes } = {}) {
    let maxWeek = 0
    for (let clazz = 0; clazz < parserRes.length; clazz++) {
        const weeks = parserRes[clazz].weeks
        maxWeek = Math.max(maxWeek, weeks)
    }
    return {
        totalWeek: maxWeek,
        showWeekend: true,
        forenoon: 4,
        afternoon: 4,
        night: 2,
    }
}