export default class SocketHelpers {
    static subscribe(topic, func, client) {
        return client.subscribe(topic, func)
    }
    static fastSubscribe(topic, func, client) {
        const subscription = client.subscribe(topic, (message) => {
            func(message);
            subscription.unsubscribe();
        })
    }
    static unsubscribe(id, client) {
        return client.unsubscribe(id)
    }
}