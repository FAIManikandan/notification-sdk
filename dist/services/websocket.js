export class NotificationSocket {
    connect(url, onMessage) {
        this.url = url;
        this.onMessage = onMessage;
        this.open();
    }
    detachSocket() {
        if (this.socket) {
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            this.socket.close();
            this.socket = undefined;
        }
    }
    open() {
        if (!this.url || !this.onMessage)
            return;
        this.detachSocket();
        this.socket = new WebSocket(this.url);
        this.socket.onmessage = (message) => {
            try {
                const data = JSON.parse(message.data);
                this.onMessage(data);
            }
            catch (_a) {
                // ignore malformed frames
            }
        };
        this.socket.onerror = () => {
            var _a;
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
        };
        this.socket.onclose = () => {
            if (this.url) {
                this.reconnectTimer = setTimeout(() => this.open(), 3000);
            }
        };
    }
    disconnect() {
        clearTimeout(this.reconnectTimer);
        this.url = undefined;
        this.onMessage = undefined;
        this.detachSocket();
    }
}
