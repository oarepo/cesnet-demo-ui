export default {
  collection: {
    title: 'DEMO Video Repozitář',
    description: 'Kolekce záznamů z veřejných vystoupení (nejen) zaměstnanců sdružení CESNET o tématech týkajících se CESNETích služeb'
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
    updateRecordBtn: 'Upravit',
    importJSONBtn: 'Importovat JSON',
    // Sections
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
      difficulty: 'Náročnost',
      formats: 'Dostupné formáty',
      event: 'Událost',
      license: 'Licence',
      abstract: 'Abstrakt',
      description: 'Krátký popis',
      identifier: 'ID záznamu',
      created: 'Datum vytvoření',
      updated: 'Datum poslední úpravy',
      revision: 'Verze',
      source: 'URL adresa videozáznamu',
      links: 'Odkazy'
    },
    recordForm: {
      recordingLicense: 'Licence multimediálního záznamu',
      expectedAudience: 'Očekávaná úroveň posluchačů',
      mediaRecordingMetadata: 'Informace o multimediálním záznamu',
      basicMetadata: 'Základní informace'
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
        difficulty: 'Náročnost',
        event: {
          title: {
            value: {
              keyword: 'Událost'
            }
          }
        },
        formats: {
          title: {
            value: {
              keyword: 'Formát'
            }
          }
        },
        license: 'Licence',
        title: {
          lang: 'Jazyk'
        }
      },
      values: {
        difficulty: {
          beginner: 'Začátečník',
          intermediate: 'Středně pokročilý',
          advanced: 'Pokročilý',
          hacker: 'Hacker'
        },
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
      difficulty: 'Náročnost',
      title: {
        lang: 'Jazyk'
      },
      event: {
        title: {
          value: {
            keyword: 'Událost'
          }
        }
      },
      formats: {
        title: {
          value: {
            keyword: 'Formát'
          }
        }
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
    importJSON: 'Importovat záznamy z JSON souboru odpovídajícího DCterms schematu',
    anonymous: 'Nepřihlášený uživatel',
    notifications: 'Notifikace'
  },
  messages: {
    gdprPrompt: 'Kliknutím na "Souhlasím", vyjadřujete souhlas s našimi <strong>pravidly využití</strong> služeb a podmínkami zpracování <strong>osobních údajů</strong>.',
    validation: {
      failed: 'Opravte prosím chyby a zkuste to znovu',
      fieldRequired: 'Toto pole je vyžadováno',
      invalidURL: 'Zadané URL je neplatné'
    },
    recordSourceHint: 'URL adresa videa určená pro vkládání do stránek',
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
