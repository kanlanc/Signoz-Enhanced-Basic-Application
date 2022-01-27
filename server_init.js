const {
  lightstep,
  opentelemetry,
} = require("lightstep-opentelemetry-launcher-node");

const sdk = lightstep.configureOpenTelemetry();

sdk.start().then(() => {
  require("./server");
});

function shutdown() {
  sdk
    .shutdown()
    .then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err)
    )
    .finally(() => process.exit(0));
}

process.on("exit", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://localhost:55681/v1/trace" OTEL_METRICS_EXPORTER=none LS_SERVICE_NAME=sample_app node server_init.js
