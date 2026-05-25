import { Presets, Drag } from "rete-react-plugin";
import "./RSINodeStyle.css";

const { RefSocket, RefControl } = Presets.classic; //Sacamos componentes internos de rete, piezas oficiales de rete

//RefSocket es el componente que representa los sockets de entrada y salida, RefControl representa los controles internos del nodo (inputs, selects, etc).

function sortByIndex(entries: Array<[string, any]>) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0;
    const bi = b[1]?.index || 0;

    return ai - bi;
  });
}

export function RSINode(props: any) {
  const { data, emit } = props;

  const inputs = Object.entries(data.inputs ?? {});
  const outputs = Object.entries(data.outputs ?? {});
  const controls = Object.entries(data.controls ?? {});

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  return (
    <div
      className={`rsi-node ${data.selected ? "selected" : ""}`}
      style={{ width: data.width || 300 }}
    >
      <div className="rsi-node__header">
        <div>
          <span className="rsi-node__badge">RSI</span>
          <h3>{data.label}</h3>
          <p>Relative Strength Index</p>
        </div>

        <Drag.NoDrag>
          <button type="button" className="rsi-node__button">
            X
          </button>
        </Drag.NoDrag>
      </div>

      

      <div className="rsi-node__controls">
        {controls.map(([key, control]: [string, any]) =>
          control ? (
            <div className="rsi-node__control" key={key}>
              <RefControl name="control" emit={emit} payload={control} />
            </div>
          ) : null,
        )}
      </div>

      <div className="rsi-node__inputs">
        {inputs.map(([key, input]: [string, any]) =>
          input ? (
            <div className="rsi-node__input" key={key}>
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

      <div className="rsi-node__outputs">
        {outputs.map(([key, output]: [string, any]) =>
          output ? (
            <div className="rsi-node__output" key={key}>
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
