<template>
    <v-tooltip bottom >

        <v-btn :small="isSmall"
                :class="marginClass"
                :outline="isOutlined"
                :flat="isFlat"
                :color="color ? color : 'primary'"
                :href="url"
                @click.native="clicked" slot="activator"
                v-bind="{['target'] : '_blank' }"
        >

            {{ buttonText }}

            <div v-if="customIcon" class="iconCentering">
                <img class="envidatIcon" :src="customIcon" />
            </div>

            <v-icon v-if="materialIconName"
                    right
                    :color="iconColor ? iconColor : 'primary'"
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
    buttonText: String,
    toolTipText: String,
    isOutlined: Boolean,
    isFlat: Boolean,
    color: String,
    iconColor: String,
    isSmall: Boolean,
    url: String,
    marginClass: String,
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