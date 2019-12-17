<template>
  <div id="app">
    <router-view name="header"/>
    <div class="page-wrap">
      <div class="page-content">
        <router-view name="sidebar"/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app .page-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 0 0 0;
  margin: 0;
}
#app .page-content{
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}
</style>
