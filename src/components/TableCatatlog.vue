<template>
  <div class="table-layout">
    <el-input
      v-model="search"
      size="small"
      placeholder="Type to search"
      style="margin-bottom: 10px; height: 50px"
    >
      <template #prefix>
        <el-icon class="el-input__icon"><Search /></el-icon>
      </template>
    </el-input>
    <el-table
      :data="filterTableData"
      stripe
      height="650"
      :default-sort="{ prop: 'Country Name', order: 'descending' }"
      style="width: 100%"
      border
    >
      <template v-for="value in headerTable">
        <el-table-column
          v-if="value === 'Flag'"
          :key="'if-' + value"
          :prop="value"
          :label="value"
          width="120"
        >
          <template #default="scope" class="demo-image__lazy">
            <el-image lazy :src="scope.row[value]" style="width: 80px" />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="value === 'Country Name'"
          :key="'else-if' + value"
          :prop="value"
          :label="value"
          sortable
        >
          <template #default="scope">
            <el-button text @click="popUpModal(scope.row[value])">
              {{ scope.row[value] }}
            </el-button>
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
    <div class="pagination" v-if="dataTable.length > 0">
      <el-pagination
        style="margin-top: 45px"
        :currentPage="currentPage"
        :page-size="pageSize"
        :background="background"
        layout="prev, pager, next"
        :total="totalLength"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogTableVisible" title="Country Detail">
      <el-card
        v-loading="loading"
        class="box-card"
        v-if="subDataTable"
        style="height: 400px; overflow: scroll"
      >
        <pre style="font-size: 13px">
        {{ JSON.stringify(subDataTable, undefined, '\t') }}
    </pre
        >
      </el-card>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, Ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import IDataTable from '../common/interface/DataTable';

const props = defineProps<{
  dataTable: IDataTable[];
  headerTable: string[];
  subDataTable?: any[];
}>();

const search = ref('');
const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(25);
const totalLength: Ref<number> = ref(0);
const background = ref(true);
const loading = ref(true);
const dialogTableVisible = ref(false);

const filterTableData = computed(() => {
  const searchingField = props.dataTable.filter(
    (data) =>
      !search.value ||
      data['Country Name'].toLowerCase().includes(search.value.toLowerCase())
  );
  totalLength.value = searchingField.length;
  return pagination(searchingField, pageSize.value, currentPage.value);
});

const pagination = (
  arrayData: any[],
  pageSizes: number,
  pageNumber: number
) => {
  return arrayData.slice((pageNumber - 1) * pageSizes, pageNumber * pageSizes);
};

const emit = defineEmits({
  popUpModal: (emitValue: boolean, name: string) => ({ emitValue, name }),
});

const popUpModal = (name: string) => {
  dialogTableVisible.value = true;
  emit('popUpModal', !dialogTableVisible.value, name);
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

onMounted(() => {
  if (props.dataTable && props.dataTable.length !== 0) {
    totalLength.value = props.dataTable.length;
  }
  if (!props.subDataTable || !props.dataTable) {
    loading.value = true;
  } else {
    loading.value = false;
  }
});
</script>

<style scoped>
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
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
