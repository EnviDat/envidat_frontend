<template>
    <v-tooltip bottom >

        <v-btn :icon="!isElevated"
                :fab="isElevated"
                :small="isElevated"
                :outline="outlined"
                :color="color ? color : 'primary'"
                :href="url"
                @click.native="clicked" slot="activator"
                 v-bind="{['target'] : '_blank' }">

            <div v-if="customIcon" class="iconCentering">
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
</template>

<script>

export default {
  props: {
    customIcon: String,
    materialIconName: String,
    toolTipText: String,
    outlined: Boolean,
    color: String,
    iconColor: String,
    isToggled: Boolean,
    rotateOnClick: Boolean,
    url: String,
    isElevated: Boolean,
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
  }),
};

</script>