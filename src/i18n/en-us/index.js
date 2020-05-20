export default {
  collection: {
    title: 'Video Repository DEMO',
    description: 'A collection of recordings of public presentations of (not limited to) CESNET employees on topics related to CESNET services'
  },
  labels: {
    // Inputs
    searchInput: 'I\'m looking for',
    searchInputMaximized: 'Search by title',
    fileInput: 'Pick a file',
    // Buttons
    actionsBtn: 'Actions',
    tosBtn: 'Terms of Service',
    privacyPolicyBtn: 'Privacy Policy',
    closeBtn: 'Zavřít',
    acceptBtn: 'Accept',
    declineBtn: 'Decline',
    createFormBtn: 'Back to form',
    searchBtn: 'Search',
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
    updateRecordBtn: 'Edit',
    importJSONBtn: 'Import from JSON',
    // Sections
    createNew: 'Create New Record',
    editRecord: 'Edit Record',
    // Other components
    localeSwitcher: 'Language',
    record: {
      owner: 'Owner',
      title: 'Record title',
      creator: 'Author',
      event: 'Event',
      contributors: 'Contributors',
      difficulty: 'Difficulty',
      abstract: 'Abstract',
      formats: 'Formats available',
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
      difficulty: 'Difficulty',
      event: {
        title: {
          value: {
            keyword: 'Event'
          }
        }
      },
      formats: {
        title: {
          value: {
            keyword: 'Format'
          }
        }
      },
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
        difficulty: 'Difficulty',
        event: {
          title: {
            value: {
              keyword: 'Event'
            }
          }
        },
        formats: {
          title: {
            value: {
              keyword: 'Format'
            }
          }
        },
        license: 'Licence',
        title: {
          lang: 'Language'
        }
      },
      values: {
        difficulty: {
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          hacker: 'Hacker'
        },
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
