let dialogHoldRef = null;

export const setDialogHolder = dialogHolderRef => {
  dialogHoldRef = dialogHolderRef;
};

export const closeDialog = () => {
  if (dialogHoldRef) {
    dialogHoldRef.closeDialog();
  }
};

/**
 * Dialogs are applications screens detached from the usual application flow, same as in Maximo.
 * The Dialog has a mandatory "type" parameter that defines the kind of dialog opened by the application.
 * Users can define an arbitrary number of additional attributes.
 * @typedef {Object} Dialog
 * @property {string} type The type of the dialog to open. React Navigation opens the screen defined by the type. By default, all the dialogs are defined in the  DialogNavigation.js file
 * @example
 * openDialog({ type: "documentUpload", container, folder });
 */
export const openDialog = d => {
  if (dialogHoldRef) {
    dialogHoldRef.openDialog(d);
  }
};

/**
 * Use this function to open a dialog to route the Maximo workflow.
 * @function
 * @param {string} container The id of the contaienr
 * @param {string} processName The name of the active main workflow process for the application
 */
export const openWorkflowDialog = (container, processName) => {
  openDialog({ type: "workflow", container, processName });
};

/**
 * Use this function to open a dialog and activates the device camera. The photos are uploaded to the Maximo doclinks.
 * @function
 * @param {string} container The id of the container
 */
export const openPhotoUpload = container => {
  openDialog({ type: "photoUpload", container });
};

/**
 * Use this function to open a dialog with the device file picker. The files are uploaded to Maximo doclinks folder.
 * @function
 * @param {string} container The id of the container
 * @param {string} folder The Maximo DOCLINKS folder
 */
export const openDocumentUpload = (container, folder) => {
  openDialog({ type: "documentUpload", container, folder });
};

/**
 * Use this function to open a file picker for the doclinks files uploaded for the current Mbo
 * @function
 * @param {string} container The id of the container
 */
export const openDocumentViewer = container => {
  openDialog({ type: "documentViewer", container });
};

/**
 * @callback barcodeScanCb
 * @param {string} barcodeNumber The decoded barcode number
 */

/**
 * Use this function to open a barcode scan dialog
 * @function
 * @param {barcodeScanCb} onScan The callback function
 */
export const openBarcodeScan = onScan => {
  openDialog({ type: "barcodeScan", onScan });
};

/**
 *  Opens the dialog with the offline errors
 * @private
 */
export const openOfflineErrors = errors => {
  openDialog({ type: "offlineError", errors });
};
