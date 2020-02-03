import { getterssetters } from "./getters-setters";
import { proxy } from "./proxy";
import { emitter } from "./emitter";

export type ProxySubscriber<T = any> = (
  T & emitter.Emitter<void>
)

export enum MustationStrategy {
    AUTO = 'AUTO',
    PROXY = 'PROXY',
    GETTER_SETTER = 'GETTER_SETTER'
}

export type CreateOptions = {
    mutationStrategy?: MustationStrategy,
}

export const create = <T>(source: T, {
    mutationStrategy = MustationStrategy.AUTO,
}: CreateOptions = {}) => {
    if (mutationStrategy === MustationStrategy.GETTER_SETTER) {
        return getterssetters.create(source)
    } else if (mutationStrategy === MustationStrategy.PROXY) {
        return proxy.create(source)
    } else if (typeof Proxy === "undefined") {
        return getterssetters.create(source)
    } else {
        return proxy.create(source)        
    }
}