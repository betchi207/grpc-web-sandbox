import { initProtoSelect, changeProto } from './protoSelect';
import { initHttpButton } from './httpButton';

const initExternalEndpointRunButton = () => {
  const externalEndpointInput: HTMLInputElement = document.getElementById('external-endpoint') as HTMLInputElement;
  const setExternalButton: HTMLButtonElement = document.getElementById('set-external-endpoint') as HTMLButtonElement;
  const runExternalButtons = document.getElementsByClassName('run-external-endpoint');
  const runExternalButtonsElements = Array.from(runExternalButtons);
  setExternalButton.addEventListener('click', () => {
    const externalEndpoint = externalEndpointInput.value;
    if (externalEndpoint === "") {
      runExternalButtonsElements.forEach((elm: HTMLButtonElement) => {
        elm.setAttribute("disabled", "true");
      });
      return;
    }

    runExternalButtonsElements.forEach((elm: HTMLButtonElement) => {
      elm.removeAttribute("disabled");
      elm.setAttribute("data-url-https", externalEndpoint);
      elm.setAttribute("data-url", externalEndpoint);
      const select: HTMLSelectElement = document.getElementById('form-stacked-select') as HTMLSelectElement;
      const proto = select.value;
      changeProto(proto);
    });
  });
}

const init = () => {
  initProtoSelect();
  initHttpButton();
  initExternalEndpointRunButton();
}

init();