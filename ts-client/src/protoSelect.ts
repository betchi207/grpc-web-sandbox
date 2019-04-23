import { init, scheme } from './common';
import { GrpcWebClient } from './grpc-web-client';
import { GrpcWeb } from './grpc-web';
import { GrpcWebText } from './grpc-web-text';

export const changeProto = (proto: string) => {
  switch (proto) {
    case "Health":
      init('grpc-web', GrpcWeb.healthCheckRun);
      init('grpc-web-text', GrpcWebText.healthCheckRun);
      init('grpc-web-client', GrpcWebClient.healthCheckRun);
      break;
    case "Echo":
      init('grpc-web', GrpcWeb.echoRun);
      init('grpc-web-text', GrpcWeb.echoRun);
      init('grpc-web-client', GrpcWebClient.echoRun);
      break;
    default:
      break;
    }
}

export const initProtoSelect = () => {
  const select: HTMLSelectElement = document.getElementById('form-stacked-select') as HTMLSelectElement;
  const proto = select.value;
  changeProto(proto);

  select.addEventListener('change', (e: Event) => {
    const proto = (<HTMLInputElement>event.target).value;
    changeProto(proto);
  })
}