export default {
  collection: {
    title: 'Repository DEMO',
    description: 'A collection of a Demo Records that adhere to the DCObject metadata schema'
  },
  menu: {
    createRecord: 'Record'
  },
  labels: {
    // Inputs
    searchInput: 'I\'m looking for',
    searchInputMaximized: 'Search by title',
    // Buttons
    searchBtn: 'Search',
    submitBtn: 'Submit',
    loginBtn: 'Sign In',
    logoutBtn: 'Log Out',
    createRecordBtn: 'Add record',
    // Sections
    createNew: 'Create New',
    // Other components
    localeSwitcher: 'Language',
    record: {
      creator: 'Author',
      contributors: 'Contributors',
      abstract: 'Abstract',
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
    anonymous: 'Anonymous user',
    notifications: 'Notifications'
  },
  messages: {
    allowPopups: 'Please allow popups for login to work',
    failed: 'Action failed',
    success: 'Action was successful'
  }
}
