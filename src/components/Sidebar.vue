<template>
  <div class="sidebar" :class="{'collapsed': isCollapse}">
    <el-button class="toggle" @click.stop="isCollapse=!isCollapse">
      <i :class="{'el-icon-arrow-right': isCollapse, 'el-icon-arrow-left': !isCollapse}"></i>
    </el-button>
    <el-menu 
      :collapse-transition="collapseTransition"
      :unique-opened="uniqueOpened"
      :default-active="activeIndex" 
      background-color="#232323"
      text-color="RGBA(255,255,255,0.44)"
      active-text-color="#ffffff"
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse">
      <div :key="item[defaultProps.id]" v-for="item in menuData">
        <el-submenu :index="item[defaultProps.id]" v-if="item && item[defaultProps.children] && item[defaultProps.children].length">
          <template slot="title">
            <i :class="item[defaultProps.icon]"></i>
            <span slot="title">{{item[defaultProps.name]}}</span>
          </template>
          <el-menu-item :index="subItem[defaultProps.id]" v-for="subItem in item[defaultProps.children]" :key="subItem[defaultProps.id]">
            {{subItem[defaultProps.name]}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item[defaultProps.id]" v-else>
          <i :class="item[defaultProps.icon]"></i>
          <span slot="title">{{item[defaultProps.name]}}</span>
        </el-menu-item>
      </div>
      
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      collapseTransition: {
        type: Boolean,
        default: false
      },
      uniqueOpened: {
        type: Boolean,
        default: true
      },
      defaultProps: {
        type: Object,
        default: () => {
          return {
            id: 'id',
            name: 'name',
            children: 'children',
            icon: 'icon'
          }
        }
      }
    },
    data() {
      return {
        activeIndex: '5',
        isCollapse: false,
        menuData: [
          {
            name: 'a',
            id: '1',
            children: [
              {
                name: 'x',
                id: '2'
              },{
                name: 'y',
                id: '3'
              },{
                name: 'z',
                id: '4'
              },{
                name: '&',
                id: '5'
              }
            ]
          },
          {
            name: 'b',
            id: '6'
          },
          {
            name: 'c',
            id: '7',
            children: [
              {
                name: 'j',
                id: '8'
              },{
                name: 'k',
                id: '9'
              },{
                name: 'l',
                id: '0'
              },{
                name: '#',
                id: 's'
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      setActiveIndex(value) {
        this.activeIndex = value
      }
    }
  }
</script>

<style>
  .sidebar {
    position: relative;
    width: 220px;
    height: 100%;
    padding-left: 0;
    list-style: none;
  }

  .sidebar .el-menu {
    margin: 0;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
  }

  .sidebar .el-submenu.is-opened > .el-submenu__title {
    color: #fff !important;
    background: #404040 !important;
  }

  .sidebar .el-submenu.is-active > .el-submenu__title {
    color: #fff !important;
    background: #007aff !important;
  }

  .sidebar .el-menu-item, 
  .sidebar .el-submenu .el-menu-item,
  .sidebar .el-submenu__title {
    height: 34px;
    padding: 7px 20px;
    line-height: 20px;
    font-size: .75rem;
    font-weight: 400;
  }

  .sidebar .toggle {
    position: absolute;
    bottom: 50px;
    right: 1px;
    width: 90px;
    height: 30px;
    margin: 0;
    padding: 0;
    line-height: 30px;
    color: rgba(255,255,255,.6);
    background: #181818;
    border: none;
    border-radius: 20px 0 0 20px;
    z-index: 1;
  }

  .sidebar.collapsed .toggle {
    width: 30px;
    left: 20px;
    border-radius: 20px;
    background-color: #4d4d4d;
  }
</style>