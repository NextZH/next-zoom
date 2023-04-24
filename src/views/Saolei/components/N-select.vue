<template>
  <div class="select">
    <div class="input" :disabled="props.disabled" :class="{ disabledInput: props.disabled }" @click="open" ref="select"
      @mouseenter="mouseenter" @mouseleave="mouseleave">
      <input type='text' class="choose" v-model="props.value" placeholder="请选择玩家名称" :disabled="true" name="players">
      <div class="icon">
        <span class="triangle">
          <template v-if="!isOpen">
            <!-- ▼▽△▲▶▷◀◁▸▾ -->▸
          </template>
          <template v-else>
            <!-- ▼▽△▲▶▷◀◁▸▾ -->▾
          </template>
        </span>
        <div class="clear" v-if="props.value && clearActive" @click="clear">
          ⨯
        </div>
      </div>
    </div>
    <div class="option" v-show="isOpen">
      <ul>
        <template v-if="props.data.length > 0">
          <li :key="index" v-for="item, index in props.data" @click="clickCheck(item)">{{ item }}</li>
        </template>
        <template v-else>
          <li>
            <slot name="blankSpace">
              暂无数据
            </slot>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
const props = defineProps(['data', 'value', 'disabled']);
const emits = defineEmits(['update:value']);

const select = ref();
//关闭下拉框
const bodyCLick = (e: any) => {
  // console.log(e, e.target);
  if ((e.target != select.value && e.target.className != 'choose' && e.target.className != 'triangle') && !props.disabled && isOpen.value) {
    isOpen.value = false;
  }
}
document.body.addEventListener('click', bodyCLick, true)
onUnmounted(() => {
  document.body.removeEventListener('click', bodyCLick, true)
})

watch(props, (value) => {
  // console.log(value);
  if (value.disabled) isOpen.value = false;
}, { deep: true })

// const selectValue=ref(props.value);

const isOpen = ref(false);
//打开下拉选项
const open = () => {
  // console.log(1);
  if (!props.disabled) isOpen.value = !isOpen.value;
}
//点击选项
const clickCheck = (item: any) => {
  emits('update:value', item)
}

const clearActive = ref(false);
const clear = () => {
  emits('update:value', null)
}
const mouseenter = () => {
  clearActive.value = true;
}
const mouseleave = () => {
  clearActive.value = false;
}
</script>

<style lang="scss" scoped>
.select {
  margin: 5px 10px;
  width: 160px;
  display: inline-block;
  position: relative;
  .input {
    box-shadow: 0px 1px 5px 1px skyblue;
    border: 1px solid skyblue;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      position: relative;
      display: inline;
    }

    span {
      display: inline-block;
      width: 15px;
      height: 15px;
      color: skyblue;
    }

    .clear {
      background-color: white;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      border-radius: 50%;
      color: #666;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      box-shadow: 0px 1px 5px 1px #666;
    }
  }

  .choose {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    outline: none;
    background-color: rgba($color: #000000, $alpha: 0);
    width: 100px;
    border: 0;
  }

  .option {
    font-size: 14px;
    margin-top: 5px;
    width: 100%;
    position: absolute;
    ul {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-shadow: 0px 1px 5px 1px #666;
      overflow: hidden;
      background-color: white;
    }

    li {
      // border: 1px solid #ccc;
      // height: 40px;
      padding: 10px 20px;
      transition: 0.5s;
      color: #666;

      &:hover {
        color: white;
        background-color: skyblue;
      }
    }
  }

  .disabledInput {
    border: 1px solid #ccc !important;
    background-color: rgb(209, 209, 209) !important;
    cursor: no-drop;
    box-shadow: 0px 1px 5px 1px #666 !important;

    .choose {
      cursor: no-drop;
    }

    span {
      color: #666;
    }
  }
}
</style>