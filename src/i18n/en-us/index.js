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
    recordDetailsBtn: 'Show Record Details',
    goBackBtn: 'Go Back',
    tosBtn: 'Terms of Service',
    privacyPolicyBtn: 'Privacy Policy',
    closeBtn: 'Zavřít',
    acceptBtn: 'Accept',
    declineBtn: 'Decline',
    createFormBtn: 'Back to form',
    searchBtn: 'Browse',
    submitBtn: 'Submit',
    myRecordsBtn: 'My records',
    importBtn: 'Import',
    importManyBtn: 'Import {num} records',
    resetBtn: 'Reset',
    loginBtn: 'Sign In',
    logoutBtn: 'Log Out',
    tryAgainBtn: 'Try Again',
    createMoreBtn: 'Create more',
    createRecordBtn: 'Add record',
    updateRecordBtn: 'Update record',
    importJSONBtn: 'Import from JSON',
    // Sections
    recordDetail: 'Record',
    createNew: 'Create New Record',
    editRecord: 'Edit Record',
    // Other components
    localeSwitcher: 'Language',
    record: {
      owner: 'Owner',
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
      owned: 'My records',
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
    gdprPrompt: 'By clicking on "Accept", you give your consent with our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong> for this service.',
    validation: {
      failed: 'Please fill the required fields and try again',
      fieldRequired: 'Field is required'
    },
    recordUpdateSuccess: 'Record successfully updated',
    recordCreateSuccess: 'Record successfully created',
    importFileNotice: 'JSON files containing a list of records in a DCterms metadata schema are accepted',
    importingRecord: 'Importing Record',
    creatingRecord: 'Creating Record',
    updatingRecord: 'Updating Record',
    recordUpdateError: 'Failed to save changes',
    recordCreateError: 'Failed to create record',
    allowPopups: 'Please allow popups for login to work',
    failed: 'Action failed',
    success: 'Action was successful'
  }
}
