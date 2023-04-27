<template>
  <div>
    <MenuForm :menuItem="menuItem" :inline="true" :iconList="iconList" :form="searchForm"></MenuForm>
    <el-form-item>
      <el-button type="primary" @click="findMenu">查找</el-button>
      <el-button type="primary" @click="addMenu">新增</el-button>
    </el-form-item>
    <el-table :data="showMenu" stripe style="width: 100%;height: 60vh;" row-key="path">
      <template v-for="item, key in   menuItem  " :key="key">
        <el-table-column :prop="key" :label="key"  v-if="(key as any) != 'iconPath'">
          <template #default="{ row }: any" v-if="(key as any) == 'icon'">
            <el-icon :size=" 30 ">
              <component v-if=" row.icon " :is=" row.icon.render " />
              <img v-else :src=" row.iconPath " alt="" width="30" height="30">
            </el-icon>
          </template>
          <template #default="{ row }:any" v-else-if="(key as any) == 'component'">
            {{ formatComp(row.component) }}
          </template>
          <template #default="{ row }:any" v-else-if="(key as any) == 'meta'">
            <el-table-column v-for="item, key2 in menuItem.meta" :key="key2" :prop="key2" :label="key2" width="180">
              <template #header v-if="(key2 as any) == 'important'">
                是否为核心组件
              </template>
              <template #default="{ row }:any" v-if="(key2 as any) == 'important'">
                {{ row.meta.important?'是':'否' }}
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="200">
        <template #default=" { row }: any ">
          <el-button type="primary" @click=" updateItem(row) ">
            <el-icon>
              <Edit />
            </el-icon>
            修改
          </el-button>
          <el-button type="danger" @click=" deleteItem(row) " :disabled="row.meta.important">
            <el-icon>
              <Delete />
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Drawer ref="mydrawer">
      <template #header>
        {{ isAdd?'新增':'修改' }}菜单
      </template>
      <template #content>
        <MenuForm :menuItem=" menuItem " :inline=" false " :iconList=" iconList " :form=" isAdd ? addForm : updateForm ">
        </MenuForm>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import menu from '@/constant/menu';
import { ref, reactive, computed } from 'vue';
import _ from 'lodash';
import Drawer from '@/components/Drawer.vue';
import MenuForm from './components/MenuForm.vue';
const mydrawer = ref(null);//抽屉实例
const showMenu = reactive(_.cloneDeep(menu));//展示菜单列表
const menuItem: any = reactive(showMenu[0]);//用于循环table列项的样板对象
const isAdd = ref(false);//是否是新增
const searchForm: any = reactive({ icon: 0 });//查询表
const addForm: any = reactive({ icon: 0 });//新增表
let updateForm: any = reactive({});//修改表
//图标列表
const iconList = computed(() => {
  const arr: any[] = [];
  let i = 0;
  showMenu.forEach((e: any) => {
    if (e.icon) {
      if (!arr.some((e2: any) => e2.icon && e2.icon.name == e.icon.name)) {
        arr.push({ icon: e.icon, key: i++ });
      }
    }
    if (e.iconPath) {
      if (!arr.includes(e.iconPath)) {
        arr.push({ iconPath: e.iconPath, key: i++ });
      }
    }
  })
  return arr;
});

const formatComp = (component: any) => {
  return component?component.toString().split("\"")[1]:'无';
}
const updateItem = (item: any) => {
  isAdd.value = false;
  let icon = 0;
  if (item.icon) {
    const iconObj = iconList.value.find((e: any) => e.icon && e.icon.name == item.icon.name)
    if (iconObj) {
      icon = iconObj.key;
    }
  } else {
    const iconObj = iconList.value.find((e: any) => e.iconPath && e.iconPath == item.iconPath)
    if (iconObj) {
      icon = iconObj.key;
    }
  }
  (updateForm as any) = { ...item, component: formatComp(item.component), icon };
  (mydrawer.value as any).changeVisible();
}
const deleteItem = (item: any) => {

}


const findMenu = () => {
  console.log('submit!')
}
const addMenu = () => {
  // console.log(mydrawer);
  isAdd.value = true;
  (mydrawer.value as any).changeVisible();
}
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

// .el-table {
//   @include scrollBar();
// }
</style>