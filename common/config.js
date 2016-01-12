'use strict';

export default {
  loadPlugins: {
    lazy: true
  },
  help: {
    show: true,
    description: '',
    aliases: '',
    hideEmpty: true,
    hideDepsMessage: true,
    afterPrintCallback: () => {}
  }
};
