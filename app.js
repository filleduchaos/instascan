var app = new Vue({
  el: '#app',
  data: {
    scans: [],
    links: 'ignore'
  },
  methods: {
    start: function () {
      var scanner = new CameraQrScanner(document.querySelector('#camera'));
      scanner.onResult = this.onScanResult;
      scanner.start();
    },

    addScan: function (content) {
      this.scans.push({ content: content });
    },

    onScanResult: function (content) {
      $('body').snackbar({
        alive: 5 * 1000,
        content: 'Scanned: ' + content
      });

      this.addScan(content);

      if (this.links !== 'ignore' && content.match(/^https?:\/\//i)) {
        if (this.links === 'new-tab') {
          var win = window.open(content, '_blank');
          win.focus();
        } else if (this.links === 'current-tab') {
          window.location = content;
        }
      }
    }
  }
});

app.start();
