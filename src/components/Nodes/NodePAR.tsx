import { Presets, Drag } from "rete-react-plugin";
import "./NodePAR.css";

const { RefSocket, RefControl } = Presets.classic; //Sacamos componentes internos de rete, piezas oficiales de rete

//RefSocket es el componente que representa los sockets de entrada y salida, RefControl representa los controles internos del nodo (inputs, selects, etc).

function sortByIndex(entries: Array<[string, any]>) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0;
    const bi = b[1]?.index || 0;

    return ai - bi;
  });
}

export function NodePAR(props: any) {
  const { data, emit } = props;

  const inputs = Object.entries(data.inputs ?? {});
  const outputs = Object.entries(data.outputs ?? {});
  const controls = Object.entries(data.controls ?? {});

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  return (
    <div
      className={`par-node ${data.selected ? "selected" : ""}`}
      style={{ width: data.width || 300 }}
    >
      <div className="par-node__header">
        <div>
          <span className="par-node__badge">PAR</span>
          <h3>{data.label}</h3>
          <p>PAR</p>
        </div>

        <Drag.NoDrag>
          <button type="button" className="par-node__button">
            X
          </button>
        </Drag.NoDrag>
      </div>

      <div className="par-node__info">
        <div className="par-node__row">
          
          <strong>Intriduce el Par</strong>
        </div>


       
      </div>

      <div className="par-node__controls">
        {controls.map(([key, control]: [string, any]) =>
          control ? (
            <div className="par-node__control" key={key}>
              <RefControl name="control" emit={emit} payload={control} />
            </div>
          ) : null,
        )}
      </div>

      <div className="par-node__inputs">
        {inputs.map(([key, input]: [string, any]) =>
          input ? (
            <div className="par-node__input" key={key}>
              <RefSocket
                name="input-socket"
                side="input"
                socketKey={key}
                nodeId={data.id}
                emit={emit}
                payload={input.socket}
              />

              {input.control && input.showControl ? (
                <RefControl
                  name="input-control"
                  emit={emit}
                  payload={input.control}
                />
              ) : (
                <span>{input.label}</span>
              )}
            </div>
          ) : null,
        )}
      </div>

      <div className="par-node__outputs">
        {outputs.map(([key, output]: [string, any]) =>
          output ? (
            <div className="par-node__output" key={key}>
              <span>{output.label}</span>

              <RefSocket
                name="output-socket"
                side="output"
                socketKey={key}
                nodeId={data.id}
                emit={emit}
                payload={output.socket}
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
