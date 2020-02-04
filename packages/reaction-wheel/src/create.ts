import { getterssetters } from "./getters-setters";
import { proxy } from "./proxy";
import { emitter } from "./emitter";

export type ProxySubscriber<T = any> = (
  T & emitter.Emitter<void>
)

export enum MutationStrategy {
    AUTO = 'AUTO',
    PROXY = 'PROXY',
    GETTER_SETTER = 'GETTER_SETTER'
}

export type CreateOptions = {
    mutationStrategy?: MutationStrategy,
}

export const create = <T>(source: T, {
    mutationStrategy = MutationStrategy.AUTO,
}: CreateOptions = {}) => {
    if (mutationStrategy === MutationStrategy.GETTER_SETTER) {
        return getterssetters.create(source)
    } else if (mutationStrategy === MutationStrategy.PROXY) {
        return proxy.create(source)
    } else if (typeof Proxy === "undefined") {
        return getterssetters.create(source)
    } else {
        return proxy.create(source)        
    }
}