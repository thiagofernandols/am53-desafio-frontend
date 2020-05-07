<template>
  <div>
    <b-card class="mb-3">
      <b-row>
        <b-col sm="6" md="6">
          <ChatByIp></ChatByIp>
        </b-col>
        <b-col sm="6" md="6">
          <ChatByHour></ChatByHour>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import ChatByIp from './ChatByIp'
import ChatByHour from './ChatByHour'

export default {
  name: 'Home',
  components: {
    ChatByIp,
    ChatByHour
  }
}
</script>
