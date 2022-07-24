<template>
<div>

  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
  <a-form
    :model="currentTracker"
   ref="trackerForm"
     @finish="submit"
  >
    <a-form-item
      label="Search Keyword"
      name="search"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      :rules="[{ required: true, message: 'Please input Search Keyword!' }]"
    >
      <a-input v-model:value="currentTracker.search" />
    </a-form-item>

     <a-form-item
      label="Url"
      name="url"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      :rules="[{ required: true, message: 'Please input Url!' }]"
    >
      <a-input v-model:value="currentTracker.url" />
    </a-form-item>

     <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
   <a-row>
     <a-col>
       
       <a-button type="primary" :loading="loading" html-type="submit" style="width-200">Track</a-button>
    </a-col>
     <a-row class="ml-1"   v-if="!isFirst"
     >
          <h3>Ranks : </h3>
          <h3>{{currentTracker.ranks.length>0 ? currentTracker.ranks:'Not Listed'}}</h3>
    </a-row>
   </a-row>
    </a-form-item>
  </a-form>
  </a-card>
<TrackersView ref="myChild"></TrackersView>
  </div>
</template>
<script>
import { GetGoogleRank } from '../Stores/TrackerApi';
import TrackersView from '../components/TrackersView.vue';
export default {
  
  data() {
    return {
      currentTracker:{
        search: '',
         url: '',
         ranks:[]
      },
      refresh:false,
      loading:false,
      isFirst:true,
      componentKey:1
    };
  },
  mounted() {
    
  },
  methods: {
    async submit(){
      this.loading=true;
      var response= await GetGoogleRank(this.currentTracker);
      this.currentTracker.ranks=response.data;
      this.isFirst=false;
      this.loading=false;
      await this.$refs.myChild.fetchTracker();
    }
  },

  components: {
    TrackersView:TrackersView
  },
};

</script>
<style scoped>
.ml-1{
  margin-left: 1rem;
}

.width-200{
  min-width: 200px;
}
</style>