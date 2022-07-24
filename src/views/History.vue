<template>
<div>
  <a-card>

    <a-row>
      <h3>Search Keyword : </h3>
    <h3>{{tracker.search}}</h3>
     <a-divider type="vertical" ></a-divider>
     <h3>Url : </h3>
    <h3>{{tracker.url}}</h3>
    <a-divider type="vertical" ></a-divider>
<a-button type="primary" :loading="loading" @click="submit" >Track now</a-button>
<a-divider type="vertical" ></a-divider>
<a-row class="ml-1"   v-if="!isFirst"
     >
          <h3>Ranks : </h3>
          <h3>{{currentTracker.length>0 ? currentTracker:'Not Listed'}}</h3>
    </a-row>
  </a-row>
    </a-card>

  <a-table :columns="columns" :data-source="tracker.histories">
   <template #bodyCell="{ column, record }">
      
      <template v-if="column.key === 'insertDate'">
        <span>
          {{moment(record.insertDate)}}
        </span>
      </template>
        <template v-if="column.key === 'lastRank'">
        <span>
          {{record.ranks ? record.ranks:'Not Listed'}}
        </span>
      </template>
    </template>
     </a-table>
          </div>
</template>
<script>
import moment from "moment";
import { GetTrackerByHistories,GetGoogleRank } from '../Stores/TrackerApi';

export default {
 props: {
    refresh: Boolean
  },
  data() {
    return {
      tracker:{},
      loading:false,
      isFirst:true,
      currentTracker:[],
       columns :[{
            title: 'Ranks',
            dataIndex: 'ranks',
            key: 'ranks',
            }, {
            title: 'DateTime',
            key: 'insertDate',
            dataIndex: 'insertDate',
            }]
    }
  },
  async mounted(){
    this.id=+this.$route.query.id;
    await  this.fetchTracker();
  },
  methods: {
  moment: function (date) {
    return moment(date).format('DD/MM/YYYY h:mm:ss');
  },
 async fetchTracker(){
    var response =await GetTrackerByHistories(this.id);
   this.tracker=response.data;
  },
   async submit(){
      this.loading=true;
      var response= await GetGoogleRank(this.tracker);
      this.currentTracker=response.data;
      this.loading=false;
      this.isFirst=false;
      await this.fetchTracker();
    }
}
}
</script>
