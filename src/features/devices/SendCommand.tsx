import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useState } from "react";
import { useI18n } from "../../shared/i18n/I18nProvider";

export default function SendCommand({ id }: { id: string }) {
  const { t } = useI18n();
  const qc = useQueryClient();
  const [disabled, setDisabled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const mutate = useMutation({
    mutationFn: (payload: any) => api.postDeviceCommand(id, payload),

    onMutate: async (payload) => {
      setDisabled(true);
      setToast(t("sending"));
      await qc.cancelQueries({ queryKey: ["devices"] });

      // feedback
      if (payload.type === "PING") setToast(t("pingOk"));
      else if (payload.type === "REBOOT") setToast(t("rebooting"));
      else if (payload.type === "VALVE_OPEN") setToast(t("valveOpened"));
    },

    onError: () => setToast(t("commandFailed")),

    onSettled: async () => {
      setDisabled(false);
      await qc.invalidateQueries({ queryKey: ["devices"] });
      await qc.invalidateQueries({ queryKey: ["metrics", id] });
    },
  });

  return (
    <div className="commands">
      <div className="row">
        <button
          className="btn"
          disabled={disabled || mutate.isPending}
          onClick={() => mutate.mutate({ type: "PING" })}
        >
          {mutate.isPending ? t("sending") : t("ping")}
        </button>

        <button
          className="btn"
          disabled={disabled || mutate.isPending}
          onClick={() => mutate.mutate({ type: "REBOOT" })}
        >
          {t("reboot")}
        </button>

        <button
          className="btn"
          disabled={disabled || mutate.isPending}
          onClick={() => mutate.mutate({ type: "VALVE_OPEN", value: true })}
        >
          {t("openValve")}
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
