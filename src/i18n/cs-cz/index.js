export default {
  collection: {
    title: 'DEMO Repozitář',
    description: 'Kolekce ukázkových záznamů odpovídajících DCObject metadatovému schematu'
  },
  labels: {
    // Inputs
    searchInput: 'Hledám',
    searchInputMaximized: 'Hledat podle názvu',
    fileInput: 'Vyberte soubor',
    // Buttons
    actionsBtn: 'Akce',
    goBackBtn: 'Zpět',
    recordDetailsBtn: 'Přejít na detail',
    tosBtn: 'Pravidla využití',
    privacyPolicyBtn: 'Zpracování osobních údajů',
    acceptBtn: 'Souhlasím',
    declineBtn: 'Nesouhlasím',
    closeBtn: 'Zavřít',
    loginBtn: 'Přihlásit se',
    logoutBtn: 'Odhlásit se',
    searchBtn: 'Procházet záznamy',
    resetBtn: 'Vrátit změny',
    submitBtn: 'Uložit',
    myRecordsBtn: 'Moje záznamy',
    importBtn: 'Importovat',
    importManyBtn: 'Importovat {num} záznamů',
    tryAgainBtn: 'Zkusit znovu',
    createFormBtn: 'Zpět na formulář',
    createMoreBtn: 'Vytvořit další',
    createRecordBtn: 'Přidat záznam',
    updateRecordBtn: 'Upravit záznam',
    importJSONBtn: 'Importovat JSON',
    // Sections
    preferences: 'Nastavení',
    noAttachments: 'žádné Přílohy',
    attachments: 'Přílohy',
    uploadAttachment: 'Nahrát přílohu',
    recordDetail: 'Detail záznamu',
    editRecord: 'Upravit záznam',
    createNew: 'Vytvořit záznam',
    // Other components
    localeSwitcher: 'Jazyk',
    facets: {
      header: 'Filtry'
    },
    record: {
      owner: 'Vlastník',
      title: 'Název záznamu',
      creator: 'Autor',
      contributors: 'Spoluautoři',
      abstract: 'Abstrakt',
      description: 'Krátký popis',
      identifier: 'ID záznamu',
      created: 'Datum vytvoření',
      updated: 'Datum poslední úpravy',
      revision: 'Verze',
      links: 'Odkazy',
      attachment: {
        filename: 'Název souboru',
        created: 'Nahráno',
        checksum: 'Kontrolní součet',
        filesize: 'Velikost'
      }
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
      owned: 'Moje záznamy',
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
      cs: 'Česky',
      csCZ: 'Česky',
      en: 'Anglicky',
      enUS: 'Anglicky'
    }
  },
  tooltips: {
    close: 'Zavřít',
    delete: 'Smazat',
    download: 'Stáhnout přílohu',
    importJSON: 'Importovat záznamy z JSON souboru odpovídajícího DCterms schematu',
    anonymous: 'Nepřihlášený uživatel',
    notifications: 'Notifikace'
  },
  messages: {
    gdprPrompt: 'Kliknutím na "Souhlasím", vyjadřujete souhlas s našimi <strong>pravidly využití</strong> služeb a podmínkami zpracování <strong>osobních údajů</strong>.',
    validation: {
      failed: 'Opravte prosím chyby a zkuste to znovu',
      fieldRequired: 'Toto pole je vyžadováno'
    },
    importFileNotice: 'Akceptovány jsou soubory ve formátu JSON obsahující seznam záznamů odpovídajících schematu DCterms',
    importingRecord: 'Importuji záznam',
    creatingRecord: 'Vytvářím záznam',
    updatingRecord: 'Aktualizuji záznam',
    recordUpdateSuccess: 'Změny uloženy',
    recordCreateSuccess: 'Záznam uložen',
    recordUpdateError: 'Při ukládání záznamu došlo k chybě',
    recordCreateError: 'Při vytváření záznamu došlo k chybě',
    allowPopups: 'Pro funkci přihlášení prosím povolte vyskakovací okna',
    failed: 'Operace se nezdařila',
    success: 'Akce byla úspěšná'
  }
}
