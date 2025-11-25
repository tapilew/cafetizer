"use client";

import * as React from "react";
import { type Connector, useConnect } from "wagmi";
import { ClientOnly } from "~/lib/client-only";

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="w-fit rounded-sm bg-[peru] p-2"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <ClientOnly>
      <div className="flex flex-col items-center gap-2">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </div>
    </ClientOnly>
  );
}
