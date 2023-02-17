<template>
  <div>
    <h1 style="color: black; margin: auto">Counttry Calalog application</h1>
    <div v-if="dataTable">
      <TableCatatlog :dataTable="dataTable" :headerTable="headerTable" />
    </div>
    <ModelCatalog />
  </div>
</template>

<script setup lang="ts">
import TableCatatlog from './components/TableCatatlog.vue';
import IDataTable from './common/interface/DataTable';
import { useCountryStore } from './store/countryStore';
import { onMounted } from 'vue';
import ModelCatalog from './components/ModelCatalog.vue';

const countryStore = useCountryStore();

let dataTable: IDataTable[];

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

  dataTable = countryStore.getAllCountriesState.map((data: any) => ({
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
</script>
