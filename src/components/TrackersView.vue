<template>
      <a-table :columns="columns" :data-source="trackers">
   <template #bodyCell="{ column, record }">
      
      <template v-if="column.key === 'lastDateTime'">
        <span>
         {{moment(record.lastDateTime)}}
        </span>
      </template>
        <template v-if="column.key === 'lastRank'">
        <span>
         {{record.lastRank ? record.lastRank:'Not Listed'}}
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
           <router-link :to="'/history?id='+record.id" >History</router-link>
        </span>
      </template>
    </template>
     </a-table>
</template>
<script>
import moment from "moment";
import { GetAllTrackers } from '../Stores/TrackerApi';

export default {
 props: {
    refresh: Boolean
  },
  data() {
    return {
      trackers:[],
       columns :[{
            title: 'Search Keyword',
            dataIndex: 'search',
            key: 'search',
            }, {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            }, {
            title: 'Last Ranks',
            dataIndex: 'lastRank',
            key: 'lastRank',
            }, {
            title: 'Last DateTime',
            key: 'lastDateTime',
            dataIndex: 'lastDateTime',
            }, {
            title: 'Action',
            key: 'action',
            }]
    }
  },
  async mounted(){
    await  this.fetchTracker();
  },
  methods: {
  moment: function (date) {
    return moment(date).format('DD/MM/YYYY h:mm:ss');
  },
 async fetchTracker(){
    var response =await GetAllTrackers();
   this.trackers=response.data;
  }
}
}
</script>
