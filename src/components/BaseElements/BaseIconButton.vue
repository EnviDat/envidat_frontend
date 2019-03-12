<template>
  <div @mouseover="hoverBadge = true" @mouseleave="hoverBadge = false"
      @click.stop="clicked"
      style="height: 36px;"
  >
    <v-tooltip v-bind="{ top: !toolTipBottom, bottom: toolTipBottom }" >

      <v-btn :icon="!isElevated"
              :fab="isElevated"
              :small="isElevated"
              :outline="outlined && !isToggled"
              :color="color ? color : disabled ? '' : 'primary'"
              :href="url"
              :disabled="disabled"
              @click.stop="clicked" slot="activator"
              v-bind="{['target'] : '_blank' }">

          <div class="iconCentering"
                v-if="customIcon">
              <img class="envidatIcon" :src="customIcon" />
          </div>

          <v-icon v-if="materialIconName"
                  :color="iconColor ? iconColor : 'primary'"
                  :style="rotateOnClick && isToggled ? 'transform: rotate(-180deg);' : ''"
          >
              {{ materialIconName }}
          </v-icon>


      </v-btn>
      <span>{{ toolTipText }}</span>

    </v-tooltip>

    <div v-if="count > 0"
          style="position: relative; right: -5px; top: -25px;">

      <v-badge v-bind="{ left: !hoverBadge }"
              overlap
              color="highlight"
              :class="{ envidatBadgeBigNumber : count > 9,
                        envidatBadge: count <= 9 }"
              >
        <span slot="badge" class="black--text">{{ count }}</span>
      </v-badge>              
    </div>
  </div>      
</template>

<script>

export default {
  props: {
    customIcon: String,
    materialIconName: String,
    toolTipText: String,
    toolTipBottom: Boolean,
    outlined: Boolean,
    color: String,
    iconColor: String,
    isToggled: Boolean,
    rotateOnClick: Boolean,
    url: String,
    isElevated: Boolean,
    disabled: Boolean,
    count: Number,
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked');
    },
  },
  data: () => ({
    showTagsExpanded: false,
    dark: false,
    blackTopToBottom: 'rgba(80,80,80, 0.1) 0%, rgba(80,80,80, 0.9) 70%',
    // whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    hoverBadge: false,
  }),
};

</script>