<template>
  <h1 class="header-text">Country Calalog application</h1>
  <div v-if="dataTable">
    <TableCatatlog
      @popUpModal="popUpModal"
      :dataTable="dataTable"
      :headerTable="headerTable"
      :subDataTable="subDataTable"
    />
  </div>
</template>

<script setup lang="ts">
import TableCatatlog from './components/TableCatatlog.vue';
import IDataTable from './common/interface/DataTable';
import { useCountryStore } from './store/countryStore';
import { onMounted, ref, Ref } from 'vue';

const countryStore = useCountryStore();

const dataTable: Ref<IDataTable[]> = ref([]);
const subDataTable: Ref<any> = ref([]);

const headerTable: string[] = [
  'Flag',
  'Country Name',
  '2 Character Country',
  '3 Character Country',
  'Native Country',
  'Alternative Country',
  'Country Id',
];

onMounted(() => {
  getAllCountries();
});

const getAllCountries = async () => {
  await countryStore.getAllCountries();

  dataTable.value = countryStore.getAllCountriesState.map((data: any) => ({
    Flag: data.flags.png,
    'Country Name': data.name.official,
    '2 Character Country': data.cca2,
    '3 Character Country': data.cca3,
    'Native Country':
      'nativeName' in data.name &&
      data.name.nativeName[Object.keys(data.name.nativeName).toString()]
        ? data.name.nativeName[Object.keys(data.name.nativeName).toString()]
            .official
        : 'Not Available',
    'Alternative Country': data.altSpellings,
    'Country Id': data.idd.root,
  }));
};

const popUpModal = async (emitValue: boolean, name: string) => {
  await countryStore.getCountryByName(name);
  subDataTable.value = countryStore.getCountryByNameState;
};
</script>

<style>
.header-text {
  font-family: 'Arial Black', sans-serif;
  font-size: 4.5em;
  letter-spacing: -1px;
  background-color: #2faae3;
  color: white;
  text-align: center;
}
</style>
