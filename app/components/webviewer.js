import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WebviewerComponent extends Component {
  Core = window.Core;
  Annotations = window.Annotations;
  Tools = window.Tools;

  @tracked documentViewer;

  // dom elements
  @tracked scrollContainer = document.getElementById('ScrollContainer');
  @tracked viewerContainer = document.getElementById('ViewerContainer');

  @action
  async initializeViewer() {
    this.Core.setWorkerPath('/assets/webviewer/core');
    this.Core.enableFullPDF();
    this.Core.PDFNet.initialize(null);

    this.setupDocumentViewer();

    this.documentViewer.loadDocument('/assets/test_01.pdf');

    this.documentViewer.setToolMode(
      this.documentViewer.getTool(this.Tools.ToolNames.TEXT_SELECT)
    );
  }

  @action
  setupDocumentViewer() {
    const documentViewer = new this.Core.DocumentViewer();
    documentViewer.setScrollViewElement(this.scrollContainer);
    documentViewer.setViewerElement(this.viewerContainer);
    documentViewer.enableAnnotations();

    this.documentViewer = documentViewer;
  }
}
