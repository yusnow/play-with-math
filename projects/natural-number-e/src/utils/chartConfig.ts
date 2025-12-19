/**
 * ECharts 通用配置工具
 * 确保所有图表都有统一的样式和纵坐标轴显示
 */

import type { EChartsOption } from 'echarts'

/**
 * 标准坐标轴配置
 */
export const standardAxisConfig = {
  x: {
    axisLine: {
      show: true,
      lineStyle: { color: '#333', width: 2 }
    },
    axisTick: {
      show: true,
      lineStyle: { color: '#333' }
    },
    axisLabel: {
      color: '#666',
      fontSize: 12
    },
    splitLine: {
      show: true,
      lineStyle: { color: '#e0e0e0', type: 'dashed' }
    }
  },
  y: {
    axisLine: {
      show: true,  // 确保显示纵坐标轴
      lineStyle: { color: '#333', width: 2 }
    },
    axisTick: {
      show: true,
      lineStyle: { color: '#333' }
    },
    axisLabel: {
      color: '#666',
      fontSize: 12
    },
    splitLine: {
      show: true,
      lineStyle: { color: '#e0e0e0', type: 'dashed' }
    }
  }
}

/**
 * 创建标准图表配置
 * @param options 用户自定义配置
 * @returns 合并后的完整配置
 */
export function createChartConfig(options: EChartsOption): EChartsOption {
  const defaultConfig: EChartsOption = {
    backgroundColor: '#fff',
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      borderColor: '#333',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      top: 10,
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    xAxis: {
      type: 'value',
      name: 'x',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold'
      },
      ...standardAxisConfig.x
    },
    yAxis: {
      type: 'value',
      name: 'y',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold'
      },
      ...standardAxisConfig.y
    }
  }

  // 深度合并配置
  return mergeConfig(defaultConfig, options)
}

/**
 * 深度合并配置对象
 */
function mergeConfig(target: any, source: any): any {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      result[key] = mergeConfig(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  
  return result
}

/**
 * 函数图像专用配置
 */
export function createFunctionPlotConfig(options: Partial<EChartsOption> = {}): EChartsOption {
  return createChartConfig({
    title: {
      text: '函数图像',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50'
      }
    },
    grid: {
      left: '12%',
      right: '5%',
      bottom: '15%',
      top: '20%'
    },
    xAxis: {
      type: 'value',
      name: 'x',
      nameLocation: 'end',
      nameGap: 15,
      axisLine: {
        show: true,
        lineStyle: { color: '#333', width: 2 }
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#e0e0e0' }
      }
    },
    yAxis: {
      type: 'value',
      name: 'y',
      nameLocation: 'end',
      nameGap: 15,
      axisLine: {
        show: true,  // 强制显示
        lineStyle: { color: '#333', width: 2 }
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#e0e0e0' }
      }
    },
    series: [],
    ...options
  })
}

/**
 * 数据可视化专用配置（柱状图、折线图等）
 */
export function createDataVisualizationConfig(options: Partial<EChartsOption> = {}): EChartsOption {
  return createChartConfig({
    title: {
      text: '数据可视化',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50'
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: { color: '#333', width: 2 }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,  // 强制显示
        lineStyle: { color: '#333', width: 2 }
      }
    },
    ...options
  })
}

/**
 * 3D 图表配置
 */
export function create3DChartConfig(options: any = {}): any {
  return {
    backgroundColor: '#fff',
    tooltip: {},
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          '#313695', '#4575b4', '#74add1',
          '#abd9e9', '#e0f3f8', '#ffffbf',
          '#fee090', '#fdae61', '#f46d43',
          '#d73027', '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'value',
      name: 'x',
      axisLine: { lineStyle: { color: '#333' } }
    },
    yAxis3D: {
      type: 'value',
      name: 'y',
      axisLine: { lineStyle: { color: '#333' } }
    },
    zAxis3D: {
      type: 'value',
      name: 'z',
      axisLine: { lineStyle: { color: '#333' } }
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic',
        autoRotate: false,
        distance: 200
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    ...options
  }
}

/**
 * 响应式图表配置
 * 根据容器宽度自动调整配置
 */
export function createResponsiveConfig(containerWidth: number, baseConfig: EChartsOption): EChartsOption {
  const isMobile = containerWidth < 768
  
  return {
    ...baseConfig,
    grid: {
      ...baseConfig.grid,
      left: isMobile ? '15%' : '10%',
      right: isMobile ? '8%' : '5%'
    },
    legend: {
      ...baseConfig.legend,
      orient: isMobile ? 'horizontal' : 'horizontal',
      top: isMobile ? 5 : 10
    },
    xAxis: {
      ...baseConfig.xAxis,
      nameTextStyle: {
        fontSize: isMobile ? 12 : 14
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 12
      }
    },
    yAxis: {
      ...baseConfig.yAxis,
      nameTextStyle: {
        fontSize: isMobile ? 12 : 14
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 12
      },
      axisLine: {
        show: true,  // 确保移动端也显示
        lineStyle: { color: '#333', width: isMobile ? 1.5 : 2 }
      }
    }
  }
}

/**
 * 动画配置
 */
export const animationConfig = {
  standard: {
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  },
  fast: {
    animation: true,
    animationDuration: 500,
    animationEasing: 'linear'
  },
  slow: {
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicInOut'
  }
}

/**
 * 颜色主题
 */
export const colorThemes = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'],
  purple: ['#667eea', '#764ba2', '#9b59b6', '#8e44ad', '#a29bfe', '#6c5ce7'],
  blue: ['#3498db', '#2980b9', '#5dade2', '#85c1e9', '#3b82f6', '#2563eb'],
  green: ['#2ecc71', '#27ae60', '#52c41a', '#73c41a', '#10b981', '#059669']
}

export default {
  createChartConfig,
  createFunctionPlotConfig,
  createDataVisualizationConfig,
  create3DChartConfig,
  createResponsiveConfig,
  standardAxisConfig,
  animationConfig,
  colorThemes
}
