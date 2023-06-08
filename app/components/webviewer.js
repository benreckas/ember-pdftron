import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WebviewerComponent extends Component {
  Core = window.Core;
  Annotations = window.Core.Annotations;
  Tools = window.Core.Tools;

  @tracked documentViewer;

  // dom elements
  @tracked scrollContainer = document.getElementById('ScrollContainer');
  @tracked viewerContainer = document.getElementById('ViewerContainer');

  @action
  async initializeViewer() {
    this.Core.setWorkerPath('/assets/webviewer/core');
    await this.Core.PDFNet.initialize();

    this.setupDocumentViewer();

    await this.documentViewer.loadDocument('/assets/test.xlsx');

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
    documentViewer.getDisplayModeManager().disableVirtualDisplayMode();

    this.documentViewer = documentViewer;
  }
}
