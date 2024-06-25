/** @type {import('tailwindcss').Config} */

function createSpacing() {
  const ans = {}
  for (let i = 1; i < 1000; ++i) {
    ans[i] = `${i}rpx` // 也可以替换成其他的尺寸和单位
  }
  return ans
}

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: createSpacing(),
    // 修改默认值
    extend: {
      fontSize: {
        // 将 'xs' 的默认尺寸设置为 14px,行高16px
        xs: ['14px', '16px'],
        sm: ['16px', '22px'],
        base: ['18px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['28px', '36px'],
        '3xl': ['32px', '40px']
      },
      borderRadius: {
        '4xl': '2rem'
      },
      colors: {
        main: '#13FCF4'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
