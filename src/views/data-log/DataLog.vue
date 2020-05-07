<template>
  <div>
    <b-card class="mb-3">
      <h4 class="card-title">
        {{ $t('dataLog.searchTitle') }}
        <b-button variant="outline-primary" class="float-right" size="sm" @click="action($actionNew)" v-b-tooltip.hover :title="$t('button.add')">
          <font-awesome-icon icon="plus" />
        </b-button>
        <b-button variant="outline-primary" class=" float-right mr-2" size="sm" @click="showModal" v-b-tooltip.hover :title="$t('button.upload')">
          <font-awesome-icon icon="upload" />
        </b-button>
      </h4>
      <b-form @submit.prevent="search">
        <b-row>
          <b-col sm="12" md="4">
            <b-form-group :label="$t('dataLog.ip')" label-for="ip">
              <b-form-input id="ip" v-model="formSearch.ip" type="text" />
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4">
            <b-form-group :label="$t('dataLog.start')" label-for="start">
              <date-picker v-model="formSearch.start" :config="options"></date-picker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4">
            <b-form-group :label="$t('dataLog.end')" label-for="end">
              <date-picker v-model="formSearch.end" :config="options"></date-picker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="8" offset-md="4" lg="5" offset-lg="7" class="text-right">
            <b-button @click="clearForm()" variant="outline-secondary" class="ml-2" size="sm">{{ $t('button.clear') }}</b-button>
            <b-button type="submit" variant="outline-primary" class="ml-2"  size="sm">{{ $t('button.search') }}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card class="mb-3">
      <b-row>
        <b-col sm="9" md="9">
          <h4 class="card-title">
            {{ $t('dataLog.listTitle') }}
          </h4>
        </b-col>
        <b-col sm="3" md="3">
          <b-form-group label-cols="8" :label="$t('label.perPage')" label-class="text-right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-table striped hover responsive show-empty
        :current-page="currentPage"
        :per-page="perPage"
        :items="items"
        :fields="fields">
        <template slot="empty">
          {{ $t('message.noRecords') }}
        </template>
        <template v-slot:cell(data)="row">
          {{ row.item.data | formatDateTime }}
        </template>
        <template v-slot:cell(actions)="row">
          <b-link @click="action($actionEdit, row.item)"
            variant="outline-primary"
            size="sm"
            v-b-tooltip.hover
            :title="$t('button.edit')">
            <font-awesome-icon icon="pencil-alt" />
          </b-link>
          <b-link @click="action($actionDelete, row.item)"
            variant="outline-primary"
            size="sm"
            class="ml-2"
            v-b-tooltip.hover
            :title="$t('button.del')">
            <font-awesome-icon icon="trash-alt" />
          </b-link>
        </template>
      </b-table>
      <b-row>
        <b-col>
          <b-pagination align="center"
            :total-rows="items.length"
            :per-page="perPage"
            v-model="currentPage" />
        </b-col>
      </b-row>
    </b-card>

    <b-modal id="modal" ref="modal" :title="$t('dataLog.upload')" @ok="handleOk" size="md">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col>
            <b-form-group>
              <b-form-file v-model="fileUpload" size="sm"></b-form-file>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'DataLog',
  data: function () {
    return {
      formSearch: {},
      fileUpload: null,
      options: {
        format: 'DD/MM/YYYY HH:mm:ss',
        useCurrent: true
      },
      items: [],
      fields: [
        { key: 'actions', label: this.$t('label.actions'), thStyle: { width: '60px' } },
        { key: 'data', label: this.$t('dataLog.data') },
        { key: 'ip', label: this.$t('dataLog.ip') },
        { key: 'request', label: this.$t('dataLog.request') },
        { key: 'status', label: this.$t('dataLog.status') },
        { key: 'userAgent', label: this.$t('dataLog.userAgent') }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20, 30, 40, 50, 100]
    }
  },
  methods: {
    clearForm: function () {
      this.formSearch = {}
    },
    search: function () {
      this.$store.dispatch('showPreload')
      let url = '/log'
      if (this.formSearch.ip) {
        url = `/log/ip/${this.formSearch.ip}`
      }
      axios.get(url)
        .then(response => {
          this.items = response.data

          if (this.formSearch.start || this.formSearch.end) {
            const start = new Date(this.formSearch.start).getTime()
            const end = new Date(this.formSearch.end).getTime()
            this.items = this.items.filter((item) => {
              const data = new Date(this.$options.filters.formatDateTime(item.data)).getTime()
              if (this.formSearch.start && this.formSearch.end) {
                return data >= start && data <= end
              } else if (this.formSearch.start) {
                return data >= start
              } else if (this.formSearch.end) {
                return data <= end
              }
            })
          }
        })
    },
    action: function (action, item) {
      if (action === this.$actionNew) {
        this.$router.push({ name: `${this.$routeDataLogForm.name}`, params: { id: this.$actionNew } })
      } else if (action === this.$actionDelete) {
        if (confirm(this.$t('message.confirmDel'))) {
          this.delete(item)
        }
      } else {
        this.$router.push({ name: `${this.$routeDataLogForm.name}`, params: { id: item.id } })
      }
    },
    delete: function (item) {
      axios.delete(`/log/${item.id}`)
        .then(response => {
          this.search()
        })
    },
    showModal: function () {
      this.fileUpload = null
      this.$refs.modal.show()
    },
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.fileUpload && this.fileUpload.name) {
        this.$store.dispatch('showPreload')
        const formData = new FormData()
        formData.append('file', this.fileUpload)
        axios
          .post('/upload',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(response => {
            this.$nextTick(() => {
              this.$toasted.global.defaultSuccess()
              this.$refs.modal.hide()
              this.search()
            })
          })
      }
    }
  },
  created: function () {
    this.search()
  }
}
</script>
