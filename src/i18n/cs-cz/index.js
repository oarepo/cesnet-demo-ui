export default {
  collection: {
    title: 'DEMO Repozitář',
    description: 'Kolekce ukázkových záznamů odpovídajících DCObject metadatovému schematu'
  },
  menu: {
    createRecord: 'Záznam'
  },
  labels: {
    // Inputs
    searchInput: 'Hledám',
    searchInputMaximized: 'Hledat podle názvu',
    // Buttons
    searchBtn: 'Hledat',
    submitBtn: 'Uložit',
    createRecordBtn: 'Přidat záznam',
    // Sections
    createNew: 'Vytvořit',
    // Other components
    localeSwitcher: 'Language',
    facets: {
      header: 'Filtry'
    },
    record: {
      creator: 'Autor',
      contributors: 'Spoluautoři',
      abstract: 'Abstrakt',
      identifier: 'ID záznamu',
      created: 'Datum vytvoření',
      updated: 'Datum poslední úpravy',
      revision: 'Verze',
      links: 'Odkazy'
    },
    recordList: {
      header: 'Nalezeno {num} záznamů'
    },
    facetList: {
      filters: {
        creator: 'Filtrovat autory'
      },
      facets: {
        creator: 'Autor',
        title: {
          lang: 'Jazyk'
        }
      },
      values: {
        title: {
          lang: {
            cs: 'Česky',
            fr: 'Francouzsky',
            en: 'Anglicky',
            es: 'Španělsky',
            de: 'Německy'
          }
        }
      }
    },
    activeFilters: {
      title: {
        lang: 'Jazyk'
      },
      creator: 'Autor',
      header: 'Aktivní filtry',
      q: 'Hledaný výraz'
    }
  },
  values: {
    lang: {
      csCZ: 'Česky',
      enUS: 'Anglicky'
    }
  },
  tooltips: {
    anonymous: 'Nepřihlášený uživatel',
    notifications: 'Notifikace'
  },
  messages: {
    failed: 'Operace se nezdařila',
    success: 'Akce byla úspěšná'
  }
}
