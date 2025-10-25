import type { DeepReadonly } from "vue";

export interface KafkaInstance {
    brokers: Array<string>;
    auth?: SaslOptions;
    label?: string;
}

export type SaslOptions =
    | SaslPasswordOptions
    | SaslOauthBearerOptions
    | SaslGenericOptions;

export type SaslPasswordOptions = {
    mechanism: "plain" | "scram-sha-256" | "scram-sha-512";
    username: string;
    password: string;
};

export type SaslOauthBearerOptions = {
    mechanism: "oauthbear";
    oauthClientId: string;
    oauthSecret: string;
    host: string;
    path: string;
};

type GenericMechanism = Exclude<
    string,
    "plain" | "scram-sha-256" | "scram-sha-512" | "oauthbear"
>;

export type SaslGenericOptions = {
    mechanism: GenericMechanism;
};

export type InstanceStore = Record<string, KafkaInstance>;
export type ReadOnlyInstanceStore = DeepReadonly<Ref<InstanceStore>>;

export const useInstanceStore = defineStore("instance", () => {
    const store: Ref<InstanceStore> = ref({
        kafka150: {
            brokers: ["10.100.0.150:9092"],
        },
        kafka250: {
            brokers: ["10.100.0.250:9092"],
        },
        "kafka-remote": {
            brokers: ["https://www.example.com:9092"],
        },
    });

    function addInstance(clientId: string, options: KafkaInstance) {
        store.value = {
            [clientId]: options,
            ...store.value,
        };
    }

    function removeInstance(clientId: string) {
        const { [clientId]: _, ...newInstances } = store.value;

        store.value = newInstances;
    }

    return {
        instances: readonly(store) as ReadOnlyInstanceStore,
        addInstance,
        removeInstance,
    };
});
