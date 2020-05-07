<template>
  <div>
    <b-card :title="$t('dataLog.registerTitle')" class="mb-2">
      <b-form @submit.prevent="save">
        <b-row>
          <b-col sm="12" md="6">
            <b-form-group :label="$t('dataLog.data')" label-for="data">
              <date-picker v-model="form.data" :config="options"></date-picker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6">
            <b-form-group :label="$t('dataLog.ip')" label-for="ip">
              <b-form-input id="ip" v-model="form.ip" type="text" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="6">
            <b-form-group :label="$t('dataLog.request')" label-for="request">
              <b-form-input id="request" v-model="form.request" type="text" />
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6">
            <b-form-group :label="$t('dataLog.status')" label-for="status">
              <b-form-input id="status" v-model="form.status" type="text" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label="$t('dataLog.userAgent')" label-for="userAgent">
              <b-form-textarea id="userAgent" v-model="form.userAgent" rows="3" max-rows="6" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="8" offset-md="4" lg="5" offset-lg="7" class="text-right">
            <b-button @click="cancel()" class="ml-2" variant="outline-danger">{{ $t('button.cancel') }}</b-button>
            <b-button @click="clearForm()" class="ml-2" variant="outline-secondary">{{ $t('button.clear') }}</b-button>
            <b-button type="submit" class="ml-2" variant="outline-primary">{{ $t('button.save') }}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'DataLogForm',
  components: {
  },
  data: function () {
    return {
      options: {
        format: 'DD/MM/YYYY HH:mm:ss',
        useCurrent: true
      },
      action: this.$actionNew,
      form: {}
    }
  },
  methods: {
    clearForm: function () {
      this.form = {}
    },
    save: function () {
      const urlAction = '/log'
      this.form.data = new Date(this.form.data).toISOString()
      if (this.action === this.$actionNew) {
        axios
          .post(urlAction, this.form)
          .then(response => {
            this.$toasted.global.defaultSuccess()
            this.cancel()
          })
      } else {
        axios
          .put(`${urlAction}/${this.$route.params.id}`, this.form)
          .then(response => {
            this.$toasted.global.defaultSuccess()
            this.cancel()
          })
      }
    },
    cancel: function () {
      this.$router.replace(this.$routeDataLog.path)
    }
  },
  created: function () {
    this.action = this.$route.params.id !== this.$actionNew ? this.$actionEdit : this.$actionNew

    if (this.action === this.$actionEdit) {
      axios.get(`/log/${this.$route.params.id}`)
        .then(response => {
          this.form = response.data
          this.form.data = this.$options.filters.formatDateTime(response.data.data)
        })
    }
  }
}
</script>
