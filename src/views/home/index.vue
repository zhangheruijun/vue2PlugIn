<template>
  <div>
    <tree :data="initData" />
  </div>
</template>
<script>
import tree from './../tree/piece/tree';
export default {
  name: 'Home',
  data() {
    return {
      initData: [
        {
          key: 'a',
          title: '蔬菜',
          children: [
            {
              key: 'a-1',
              title: '白菜',
              children: [
                {
                  key: 'a-1-1',
                  title: '紫白菜',
                },
                {
                  key: 'a-1-2',
                  title: '小白菜',
                },
                {
                  key: 'a-1-3',
                  title: '烂菜',
                },
              ],
            },
            {
              key: 'a-2',
              title: '青菜',
              opened: '',
              checked: 'checked',
              children: [
                {
                  key: 'b-1-1',
                  title: '飘飘菜',
                },
                {
                  key: 'b-1-2',
                  title: '油麦菜',
                },
              ],
            },
          ],
        },
        { key: 'b', title: '水果' },
      ],
    };
  },
  components: { tree },
};
</script>
