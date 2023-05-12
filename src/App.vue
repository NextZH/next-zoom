<template>
  <div id="app-config-page" :style="{ '--btnColor': buttonColor }">
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Main from '@/views/Main/index.vue'
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { initColor }=themeStore;
const { buttonType, buttonColor } = storeToRefs(themeStore);


const init=()=>{
  initColor();
}

//created生命周期
(() => {
  init();
  console.log(`
  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
  |   |‾|     |‾|   |‾|          |‾‾‾‾‾‾‾‾‾‾‾|   |‾‾‾‾‾‾‾‾‾\\      /‾‾‾‾‾‾\\      |
  |   | |     | |   | |           ‾‾‾‾| |‾‾‾‾    | |‾‾‾‾‾‾| |    / /‾‾‾‾\\ \\     |
  |   | |     | |   | |               | |        |  ‾‾‾‾‾‾ /    | |      | |    |
  |   \\ \\     / /   | |               | |        | |‾‾‾‾‾\\ \\    |  ‾‾‾‾‾‾  |    |
  |    \\ ‾‾‾‾‾ /    | ‾‾‾‾‾‾‾|        | |        | |      \\ \\   | |‾‾‾‾‾‾| |    |
  |     ‾‾‾‾‾‾‾      ‾‾‾‾‾‾‾‾          ‾          ‾        ‾‾    ‾        ‾     |
  |           |‾‾‾\\   |‾|   |‾‾‾‾‾‾‾‾|     \\‾\\   /‾/    |‾‾‾‾‾‾‾‾‾‾‾|           |
  |           | |\\ \\  | |   | |‾‾‾‾‾‾       \\ \\ / /      ‾‾‾‾| |‾‾‾‾            |
  |           | | \\ \\ | |   |  ‾‾‾‾‾‾|      /  ‾  \\          | |                |
  |           | |  \\ \\| |   | |‾‾‾‾‾‾      / /‾‾‾\\ \\         | |                |
  |           | |   \\   |   |  ‾‾‾‾‾‾|    / /     \\ \\        | |                |
  |            ‾     ‾‾‾     ‾‾‾‾‾‾‾‾     ‾‾       ‾‾         ‾                 |
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                ________________
              ヾ(≧▽≦*)o         made by Next         (o゜▽゜)o☆
                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  `);
})()
</script>

<style lang="scss">
#app-config-page {
  $btnColor: var(--btnColor);

  height: 100%;
  position: relative;
  overflow: hidden;
  // background-color: black;

  /* 按钮主题色配置 */
  .el-radio__input {
    $btnColor: var(--btnColor);

    &.is-checked {
      .el-radio__inner {
        background-color: $btnColor;
        border-color: $btnColor;
      }
    }

    &.is-checked+.el-radio__label {
      color: $btnColor;
    }

    .el-radio__inner:hover {
      border-color: $btnColor;
    }
  }

  .el-radio-button {
    .el-radio-button__inner:hover {
      color: $btnColor;
    }

    &.is-active .el-radio-button__inner:hover {
      color: white;
    }
  }

  .el-radio.is-bordered.is-checked {
    border-color: $btnColor;
  }

  .el-backtop__icon {
    color: $btnColor;
  }

  .el-tabs {
    .el-tabs__item {
      &.is-active {
        color: $btnColor;

        // &:hover {
        //   color: white;
        // }
      }

      &:hover {
        color: $btnColor;
      }
    }

    // .el-tabs__nav-wrap::after{
    //   background-color: $btnColor;
    // }
    .el-tabs__active-bar {
      background-color: $btnColor;
    }
  }


}
</style>