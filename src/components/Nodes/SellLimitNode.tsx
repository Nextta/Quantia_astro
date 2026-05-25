import { Presets, Drag } from "rete-react-plugin";
import "./SellLimitNodeStyle.css";

const { RefSocket, RefControl } = Presets.classic; //Sacamos componentes internos de rete, piezas oficiales de rete

//RefSocket es el componente que representa los sockets de entrada y salida, RefControl representa los controles internos del nodo (inputs, selects, etc).

function sortByIndex(entries: Array<[string, any]>) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0;
    const bi = b[1]?.index || 0;

    return ai - bi;
  });
}

export function SellLimitNode(props: any) {
  const { data, emit } = props;

  const inputs = Object.entries(data.inputs ?? {});
  const outputs = Object.entries(data.outputs ?? {});
  const controls = Object.entries(data.controls ?? {});

  sortByIndex(inputs);
  sortByIndex(outputs);
  sortByIndex(controls);

  return (
    <div
      className={`sell-limit-node ${data.selected ? "selected" : ""}`}
      style={{ width: data.width || 300 }}
    >
      <div className="sell-limit-node__header">
        <div>
          <span className="sell-limit-node__badge">SELL LIMIT</span>
          <h3>{data.label}</h3>
          <p>Orden pendiente de venta</p>
        </div>

        <Drag.NoDrag>
          <button type="button" className="sell-limit-node__button">
            ...
          </button>
        </Drag.NoDrag>
      </div>

      <div className="sell-limit-node__info">
        <div className="sell-limit-node__row">
          <span>Tipo</span>
          <strong>Pending order</strong>
        </div>

        <div className="sell-limit-node__row">
          <span>Direccion</span>
          <strong className="sell-limit-node__sell">Venta</strong>
        </div>

        <div className="sell-limit-node__row">
          <span>Estado</span>
          <strong>Activo</strong>
        </div>
      </div>

      <div className="sell-limit-node__controls">
        {controls.map(([key, control]: [string, any]) =>
          control ? (
            <div className="sell-limit-node__control" key={key}>
              <RefControl name="control" emit={emit} payload={control} />
            </div>
          ) : null,
        )}
      </div>

      <div className="sell-limit-node__inputs">
        {inputs.map(([key, input]: [string, any]) =>
          input ? (
            <div className="sell-limit-node__input" key={key}>
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

      <div className="sell-limit-node__outputs">
        {outputs.map(([key, output]: [string, any]) =>
          output ? (
            <div className="sell-limit-node__output" key={key}>
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
