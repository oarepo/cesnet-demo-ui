export default {
  collection: {
    title: 'Repository DEMO',
    description: 'A collection of a Demo Records that adhere to the DCObject metadata schema'
  },
  labels: {
    // Inputs
    searchInput: 'I\'m looking for',
    searchInputMaximized: 'Search by title',
    fileInput: 'Pick a file',
    // Buttons
    createFormBtn: 'Back to form',
    searchBtn: 'Search',
    submitBtn: 'Submit',
    resetBtn: 'Reset',
    loginBtn: 'Sign In',
    logoutBtn: 'Log Out',
    createRecordBtn: 'Add record',
    importJSONBtn: 'Import from JSON',
    // Sections
    createNew: 'Create New Record',
    // Other components
    localeSwitcher: 'Language',
    record: {
      title: 'Record title',
      creator: 'Author',
      contributors: 'Contributors',
      abstract: 'Abstract',
      description: 'Description',
      identifier: 'Identifier',
      created: 'Creation date',
      updated: 'Last modification date',
      revision: 'Revision',
      links: 'Links'
    },
    recordList: {
      header: 'Found {num} records'
    },
    facets: {
      header: 'Filters'
    },
    activeFilters: {
      title: {
        lang: 'Language'
      },
      creator: 'Author',
      header: 'Active Filters',
      q: 'Search'
    },
    facetList: {
      filters: {
        creator: 'Filter by author name'
      },
      facets: {
        creator: 'Author',
        title: {
          lang: 'Language'
        }
      },
      values: {
        title: {
          lang: {
            cs: 'Czech',
            fr: 'French',
            en: 'English',
            es: 'Spanish',
            de: 'German'
          }
        }
      }
    }
  },
  values: {
    lang: {
      csCZ: 'Czech',
      enUS: 'English'
    }
  },
  tooltips: {
    close: 'Close',
    importJSON: 'Import records from a DCObject schema compliant JSON file',
    anonymous: 'Anonymous user',
    notifications: 'Notifications'
  },
  messages: {
    validation: {
      fieldRequired: 'Field is required'
    },
    allowPopups: 'Please allow popups for login to work',
    failed: 'Action failed',
    success: 'Action was successful'
  }
}
