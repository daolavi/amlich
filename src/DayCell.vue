<template>
  <div :class="['ayou-day-cell', isSelected? 'selected': '']" @click.stop.prevent="handleDayClick()" :title="showLunar && lunarText">
    <div class="day-wrapper">
      <div class="solar" :class="{'selected': isSelected, 'passive': day.isPassive, 'without-lunar':!showLunar}">{{day.dayMoment.date()}}</div>
      <div class="lunar" :class="{'passive': day.isPassive}">
        <template v-if="showLunar">{{lunarText}}</template>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Transformer from './lunar'
  import Translation from './lang'

  export default {
    props: {
      showLunar: {
        type: Boolean,
        default: false
      },
      day: {
        type: Object
      },
      isSelected: {
        type: Boolean,
        default: false
      },
      lang: {
        type: String,
        default: 'ko'
      }
    },
    mixins: [Transformer],
    data () {
      return {
        lunar: this.convertLunar(this.day),
        lan: this.lang
      }
    },
    watch: {
      day (val) {
        this.lunar = this.convertLunar(val)
      },
      lang (val) {
        this.lan = val
      }
    },
    methods: {
      handleDayClick () {
        if (this.day.isPassive) return
        this.$emit('dayClick', this.day, this.lunar.day)
      },
      convertLunar (day) {
        return this.solar2lunar(day.dayMoment._d)
      }
    },
    computed: {
      lunarText () {
        return this.lunar && this.lunar.dayTxt
      }
    }
  }
</script>

<style scoped>
  .ayou-day-cell{ margin: 1px; width: 13.73%; height: 60px; display: inline-block; text-align: center; background-color: #fbfbfb; }
  .ayou-day-cell.selected{ background-color: #dcaeae; color: #fff; }
  .ayou-day-cell:hover{ cursor: pointer; }
  .day-wrapper{ position: relative; width: 100%; height: 100%; }
  .solar{ position: absolute; bottom: 0; right: 0; text-align: right; color: #797979; padding: 10px 5px 0px 0px; font-size: 23px; font-weight: 300; }
  .solar.selected{ color: #ffffff; }
  .solar.passive{ color: #cccccc; }
  .solar.passive.selected{ opacity: 0.4; }
  .lunar{ position: absolute; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: #ec4141; padding: 5px 3px; text-align: left; }
  .without-lunar{ margin-top: 1px; }

  @media (max-width: 320px) {
    .ayou-day-cell { width: 13.63%; }
  }
</style>
