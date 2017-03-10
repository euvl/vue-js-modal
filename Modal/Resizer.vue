<template>
  <div :class="{'vue-modal-resizer': true, 'clicked': clicked}">
  </div>
</template>
<script>
import util from '../util';
export default {
  name: 'Resizer',
  data() {
    return {
      clicked: false,
      min: {
        height: 50,
        width: 0
      },
      size: {}
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.start, false);
  },
  methods: {
    start(event) {
      this.clicked = true;

      window.addEventListener('mousemove', this.mousemove, false);
      window.addEventListener('mouseup', this.stop, false);

      util.stopEvent(event);
    },
    stop() {
      this.clicked = false;

      window.removeEventListener('mousemove', this.mousemove, false);
      window.removeEventListener('mouseup', this.stop, false);

      this.$emit('resize-stop', {
        element: this.$el.parentElement,
        size: this.size
      });
    },
    mousemove(event) {
      this.resize(event);
    },
    resize(event) {
      var el = this.$el.parentElement;

      if (event.clientX < window.innerWidth / 2) {
        return;
      }

      if (el) {
        var width = event.clientX - el.offsetLeft;
        var height = event.clientY - el.offsetTop;

        if (height < this.min.height) {
          return;
        }

        this.size = {width, height};
        el.style.width = width + 'px';
        el.style.height = height + 'px';

        this.$emit('resize', {
          element: el,
          size: this.size
        });
      }
    }
  }
}
</script>
<style lang="scss">
.vue-modal-resizer {
    display: block;
    overflow: hidden;
    position: absolute;
    width: 12px;
    height: 12px;
    right: 0;
    bottom: 0;
    z-index: 9999999;
    background: transparent;
    cursor: se-resize;

    &:after {
      display: block;
      position: absolute;
      content: '';
      background: transparent;
      left: 0;
      top: 0;
    	width: 0;
    	height: 0;
    	border-bottom: 10px solid #ddd;
    	border-left: 10px solid transparent;
    }

    &.clicked:after {
      border-bottom: 10px solid #369BE9;
    }
}
</style>
