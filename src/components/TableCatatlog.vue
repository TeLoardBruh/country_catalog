<template>
  <div class="table-layout">
    <el-input v-model="search" size="small" placeholder="Type to search" />
    here {{ filterTableData }}
    <el-table :data="filterTableData" style="width: 100%" border>
      <template v-for="value in headerTable">
        <el-table-column
          v-if="value === 'Flag'"
          :key="'if-' + value"
          :prop="value"
          :label="value"
        >
          <template #default="scope" class="demo-image__lazy">
            <el-image lazy :src="scope.row[value]" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="'else-' + value"
          :prop="value"
          :label="value"
        />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, Ref } from 'vue';
import IDataTable from '../common/interface/DataTable';

const props = defineProps<{
  dataTable: IDataTable[];
  headerTable: string[];
}>();

console.log('here : ', props.dataTable);

const search = ref('');

const filterTableData = computed(() =>
  props.dataTable.filter(
    (data) =>
      !search.value ||
      data['Country Name'].toLowerCase().includes(search.value.toLowerCase())
  )
);

const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(25);
</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.table-layout {
  max-width: 1400px;
  margin: auto;
  margin-top: 10px;
}

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
