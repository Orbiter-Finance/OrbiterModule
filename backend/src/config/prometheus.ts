let envAlertmanager: { api: string } | undefined
const { PROMETHEUS_ALERTMANAGER } = process.env
if (PROMETHEUS_ALERTMANAGER) {
  envAlertmanager = JSON.parse(PROMETHEUS_ALERTMANAGER)
}

export const alertmanager = {
  api: envAlertmanager?.api || `http://localhost:9093`,
}
