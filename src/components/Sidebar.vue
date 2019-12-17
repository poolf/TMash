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
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>

        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>

        <el-menu-item index="8-1">选项1</el-menu-item>
        <el-menu-item index="8-2">选项2</el-menu-item>
        <el-menu-item index="8-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
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
      }
    },
    data() {
      return {
        activeIndex: '1-1',
        isCollapse: false
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