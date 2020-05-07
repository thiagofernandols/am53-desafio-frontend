<template>
  <aside class="menu" v-show="isMenuVisible">
    <Tree :data="getTreeData" ref="tree">
      <div class="tree-text" slot-scope="{ node }">
        <template v-if="!node.data.icon">
          <span :class="node.data.classText ? node.data.classText : ''">{{ node.text }}</span>
        </template>
        <template v-else>
          <i :class="node.data.icon"></i>
          <span :class="node.data.classText">{{ node.text }}</span>
        </template>
      </div>
    </Tree>
  </aside>
</template>
<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'

export default {
  name: 'Menu',
  components: { Tree },
  computed: {
    ...mapState(['isMenuVisible']),
    getTreeData () {
      const menuList = [
        {
          text: this.$t('menu.dashboard'),
          data: { icon: 'fa fa-home', nameRouter: this.$routeDashboard.name, classText: 'text-menu' }
        },
        {
          text: this.$t('menu.logs'),
          data: { icon: 'fa fa-list', nameRouter: this.$routeDataLog.name, classText: 'text-menu' }
        }
      ]
      return menuList
    }
  },
  methods: {
    onNodeSelect (node) {
      this.$router.push({ name: node.data.nameRouter })

      if (this.$mq === 'xs' || this.$mq === 'sm') {
        this.$store.commit('toggleMenu', false)
      }
    }
  },
  mounted () {
    this.$refs.tree.$on('node:selected', this.onNodeSelect)
  }
}
</script>
<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #ffffff, #fcfcfc);
  width: 200px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);

  z-index: 1030;
}
.menu a,
.menu a:hover {
  color: rgb(83, 83, 83);
  text-decoration: none;
}
.menu a i,
.menu a svg,
.menu a i:hover {
  padding-right: 6px;
}
.tree {
  padding-top: 5px;
}
.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgb(255, 255, 255);
}
.menu .tree-node.selected > .tree-content .tree-text,
.menu .tree-node .tree-content .tree-text:hover {
  color: #cf102d;
}
.tree-arrow.has-child {
  filter: brightness(2);
}
.tree-anchor {
  padding: 6px 6px;
}
.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}
.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}
.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
  margin-left: 20px;
}
.text-menu {
  padding-left: 8px;
}

</style>
