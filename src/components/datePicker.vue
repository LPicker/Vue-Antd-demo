<template>
<div>
  <a-form
    :form="form"
    class="form"
    layout="vertical"
  >
      <a-col
        :xl="{ span: 6, offset: 0 }"
        :lg="{ span: 8 }"
        :md="{ span: 12 }"
        :sm="24"
      >
        <a-form-item label="年份">
          <a-date-picker
            :disabled-date="disabledYearDate"
            format="YYYY"
            mode="year"
            v-decorator="[
              'year',
              {
                rules: [{ required: true, message: '请选择年份' }],
              },
            ]"
            style="width: 100%"
            :open="open"
            @openChange="openChange"
            @panelChange="onYearChange"
          />
        </a-form-item>
      </a-col>
  </a-form>
</div>
</template>

<script>
export default {
  data(){
    return {
      year: null,
      open: false,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    disabledYearDate(current) {
      const date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let beforeDate = new Date(y - 10, m - 1, d); // 往前10年
      let afterDate = new Date(y + 10, m - 1, d); // 往后10年
      const result = current < beforeDate || current > afterDate;
      console.log('beforeDate', beforeDate);
      console.log('afterDate', afterDate);
      console.log('current', current);
      console.log('result', result);
      return result;
    },
    openChange(status) {
      if (status) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    onYearChange(value) {
      this.year = value;
      this.open = false;
    }
  }
};
</script>
