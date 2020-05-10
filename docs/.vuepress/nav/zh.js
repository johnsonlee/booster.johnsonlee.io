module.exports = [
  {
    text: '目录',
    arialLabel: '目录',
    items: [
      {
        text: '前言',
        items: [
          {
            text: '关于本书',
            link: '/zh/preface/'
          },
          {
            text: 'Booster 简介',
            link: '/zh/preface/overview.html'
          },
          {
            text: '快速上手',
            link: '/zh/preface/getting-started.html'
          }
        ]
      },
      {
        text: '功能与特性',
        items: [
          {
            text: '性能优化',
            link: '/zh/feature/performance/'
          },
          {
            text: '包体积瘦身',
            link: '/zh/feature/shrink/'
          },
          {
            text: '系统 bug 修复',
            link: '/zh/feature/bugfix/'
          },
          {
            text: '其他',
            link: '/zh/feature/misc/'
          }
        ]
      },
      {
        text: 'Booster 插件开发',
        items: [
          {
            text: 'Javassist 还是 ASM ?',
            link: '/zh/developer/javassist-or-asm.html'
          },
          {
            text: '第一个 Transformer',
            link: '/zh/developer/first-class-transformer.html'
          },
          {
            text: '第一个 VariantProcessor',
            link: '/zh/developer/first-variant-processor.html'
          },
          {
            text: 'ClassTransformer + VariantProcessor',
            link: '/zh/developer/class-transformer-plus-variant-processor.html'
          },
          {
            text: '在 Task 中使用 Transformer',
            link: '/zh/developer/using-transformer-in-task.html'
          },
          {
            text: '脱离 Gradle 环境',
            link: '/zh/developer/standalone-transformer.html'
          },
          {
            text: '调试 Gradle 插件',
            link: '/zh/developer/debug-gradle-plugin.html'
          }
        ]
      },
      {
        text: 'Booster 架构剖析',
        items: [
          {
            text: 'Booster 架构概述',
            link: '/zh/architecture/overview.html'
          },
          {
            text: '动态发现与依赖注入',
            link: '/zh/architecture/dynamic-discovery-and-dependency-injection.html'
          },
          {
            text: '字节码处理流水线',
            link: '/zh/architecture/transformer-pipeline.html'
          },
          {
            text: '高性能文件系统 I/O',
            link: '/zh/architecture/high-performance-io.html'
          },
          {
            text: 'AAPT2 产物逆向',
            link: '/zh/architecture/aapt2-output-reversing.html'
          },
          {
            text: '增量构建与构建缓存',
            link: '/zh/architecture/incremental-build-and-build-cache.html'
          },
        ],
      }
    ]
  },
  {
    text: 'FAQ',
    link: '/zh/faq/'
  },
  {
    text: '贡献者',
    link: '/zh/contributors/'
  },
  {
    text: '买杯咖啡',
    link: '/zh/donate/'
  },
  {
    text: 'API 文档',
    link: 'https://reference.johnsonlee.io/booster/'
  }
]
