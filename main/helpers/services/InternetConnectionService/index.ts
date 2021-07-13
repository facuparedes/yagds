import { EventEmitter } from "events";
import Socket from "simple-websocket";

declare interface InternetConnectionService {
  on: (event: "statusChanged", listener: (status: boolean, retryingCountdown: number) => void) => this;
  emit: (event: "statusChanged", status: boolean, retryingCountdown: number) => boolean;
}

/**
 * Manage internet connection.
 * Implements listeners and emitters.
 *
 * @class
 */
class InternetConnectionService extends EventEmitter {
  /**
   * Public WebSocket URL's to check internet connection.
   * This WebSocket Servers are only used to detect connection loss.
   * Some of these WebSocket Servers requires periodical heartbeats to prevent the connection from being closed.
   * No additional data is sent, and received messages are discarded.
   *
   * @private
   */
  private testURLs = [
    "wss://echo.websocket.org",
    "wss://ws.achex.ca",
    "wss://s1.ripple.com",
    "wss://xrpl.ws",
    "wss://s2.ripple.com",
    "wss://s.altnet.rippletest.net",
    "wss://s.devnet.rippletest.net",
    "wss://ws-feed-public.sandbox.pro.coinbase.com",
    "wss://ws-feed.pro.coinbase.com",
    "wss://stream.binance.com:9443/ws/nanobtc@ticker",
    "wss://​stream.binance.com:9443/ws/!ticker@arr",
    "wss://stream.binance.com:9443/ws/!miniTicker@arr",
    "wss://stream.binance.com:9443/ws/btcusdt@depth",
    "wss://stream.binance.com:9443/ws/bnbbtc@depth",
    "wss://ws.blockchain.info/inv",
    "wss://api-pub.bitfinex.com/ws",
    "wss://api-pub.bitfinex.com/ws/2",
    "wss://ws.kraken.com",
    "wss://beta-ws.kraken.com",
    "wss://api.gemini.com/v2/marketdata",
    "wss://api.gemini.com/v1/marketdata/BTCUSD",
    "wss://main-light.eth.linkpool.io/ws",
    "wss://steemd.privex.io",
    "wss://rpc-mainnet.matic.quiknode.pro",
    "wss://ws-matic-mainnet.chainstacklabs.com",
    "wss://kusama-rpc.polkadot.io",
    "wss://karura.api.onfinality.io/public-ws",
    "wss://karura-rpc-0.aca-​api.network",
    "wss://karura-rpc-1.aca-​api.network",
    "wss://karura-rpc-2.aca-api.network/ws",
    "wss://karura-rpc-3.aca-api.network/ws",
    "wss://main.confluxrpc.com/ws",
    "wss://test.confluxrpc.com/ws",
  ];
  private urlsWithDisabledHeartbeat = ["binance.com", "gemini.com", "linkpool.io", "chainstacklabs.com"];
  private testURLsLength = this.testURLs.length - 1;

  private retryConnectionInterval: NodeJS.Timer;
  private baseCountdown = 5000;
  private retryingCountdown = this.baseCountdown;
  private heartbeatInterval: NodeJS.Timer;
  status: boolean = null;

  /**
   * Just start a WS connection.
   * If it fails or its disconnected for any reason, it will retry the connection with each `testURLs`'s url.
   *
   * @constructor
   */
  constructor() {
    super();

    this.startConnection();
  }

  /**
   * Start connection to a URL. Also it attach listeners to WS events (`connect`, `close` and `error`).
   *
   * @private
   */
  private startConnection(url = this.testURLs[0]) {
    const ws: Socket = new Socket({ url, autoDestroy: true, allowHalfOpen: true })
      .on("connect", () => this.setNewStatusAndEmit(true, ws, { url }))
      .on("error", () => this.setNewStatusAndEmit(false, ws, { toDestroy: true }))
      .on("close", () => this.setNewStatusAndEmit(false, ws, { toDestroy: true }));
  }

  /**
   * Callback used in `this.startConnection()`.
   * Check if saved status is different from the new one. If so, save the new one and emit a event change on `statusChanged`.
   * Start a retry if WebSocket was closed (or it had an error).
   * Destroy old WebSocket objects if it was closed (or it had an error).
   *
   * @private
   */
  private setNewStatusAndEmit(newStatus: boolean, ws: Socket, { toDestroy, url }: { toDestroy?: boolean; url?: string }) {
    if (newStatus !== this.status) this.emit("statusChanged", (this.status = newStatus), this.baseCountdown);
    if (url && !this.urlsWithDisabledHeartbeat.some((urlDisabled) => url.includes(urlDisabled))) this.heartbeatInterval = setInterval(() => ws.write("❤️"), 5000);

    if (!newStatus && !this.retryConnectionInterval) this.startRetryConnection();

    if (newStatus) {
      clearInterval(this.retryConnectionInterval);
      this.retryConnectionInterval = null;
      this.retryingCountdown = this.baseCountdown;
    }
    if (toDestroy) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      ws.destroy();
    }
  }

  /**
   * Start a interval to retry a WS connection.
   * This also loop through `testURLs` to test different servers on each try.
   *
   * @private
   */
  private startRetryConnection() {
    let nextRetryingCountdown = this.retryingCountdown;
    let tries = 0;

    this.retryConnectionInterval = setInterval(() => {
      this.emit("statusChanged", this.status, this.retryingCountdown);

      if (this.retryingCountdown < 1) {
        this.startConnection(this.testURLs[tries++]);
        this.retryingCountdown = nextRetryingCountdown * 2 > 60000 ? 60000 : (nextRetryingCountdown *= 2);
      } else {
        this.retryingCountdown -= 1000;
      }
      if (this.testURLsLength < tries) tries = 0;
    }, 1000);
  }
}

export default new InternetConnectionService();

/**
 * @ignore
 */
// const tester = async () => {
//   let timeout: NodeJS.Timeout;

//   console.log(new Date().toLocaleTimeString(), "-- STARTING WSS URL TESTING --");

//   for (const url of this.testURLs) {
//     let isClosedByConnectEvent = false;
//     await new Promise<void>((resolve, reject) => {
//       console.log("");
//       console.log(new Date().toLocaleTimeString(), `# Testing "${url}":`);
//       const ws = new Socket({ url: url, autoDestroy: true, allowHalfOpen: true })
//         .on("connect", () => {
//           console.log(new Date().toLocaleTimeString(), "--> Connected!");
//           console.log(new Date().toLocaleTimeString(), "--> Sending heartbeats...");
//           if (url.includes("binance.com") || url.includes("cex.io") || url.includes("gemini.com") || url.includes("linkpool.io") || url.includes("matic-") || url.includes("fantom.network"))
//             console.log(new Date().toLocaleTimeString(), "--> Heartbeats canceled!");
//           else this.heartbeatTimer = setInterval(() => ws.write("❤️"), 5000);
//           console.log(new Date().toLocaleTimeString(), "--> STARTING DESTROY COUNT IN 15MINS");
//           timeout = setTimeout(() => {
//             isClosedByConnectEvent = true;
//             resolve();
//             ws.destroy();
//             clearTimeout(this.heartbeatTimer);
//             clearTimeout(timeout);
//           }, 900000);
//         })
//         .on("close", () => {
//           console.log(new Date().toLocaleTimeString(), "--> Closed!");
//           !isClosedByConnectEvent && reject();
//           clearTimeout(this.heartbeatTimer);
//           clearTimeout(timeout);
//         })
//         .on("error", () => {
//           console.log(new Date().toLocaleTimeString(), "--> Error!");
//           !isClosedByConnectEvent && reject();
//           clearTimeout(this.heartbeatTimer);
//           clearTimeout(timeout);
//         });
//     })
//       .then(() => console.log(new Date().toLocaleTimeString(), "--> Finished. Status: SUCCESS!!"))
//       .catch(() => console.log(new Date().toLocaleTimeString(), "--> Finished. Status: ERROR/CLOSED!!"));
//   }
// };

// tester();

/**
 * @ignore
 * @deprecated
 */
// private static testURLs = [
//     "https://api.ipify.org",
//     "http://icanhazip.com",
//     "https://ip.seeip.org",
//     "https://checkip.amazonaws.com",
//     "https://www.cloudflare.com/cdn-cgi/trace",
//     "http://checkip.dyndns.org",
//     "https://ipinfo.io/ip",
//     "https://ipapi.co/ip",
//     "http://ip-api.com/line/?fields=query",
//     "https://api.techniknews.net/ip",
//   ];
//   private static testURLsLength = this.testURLs.length - 1;
//   private static tries = 0;

//   /**
//    * Check if there is internet connection, testing each `testURLs` already defined.
//    *
//    * @returns boolean
//    * @async
//    * @method
//    */
//   private static async checker(address: string): Promise<boolean> {
//     return await axios
//       .get(address, { timeout: 5000 })
//       .then(() => {
//         this.tries = 0;
//         return true;
//       })
//       .catch(() => {
//         if (this.tries === this.testURLsLength) {
//           this.tries = 0;
//           return false;
//         } else this.checker(this.testURLs[++this.tries]);
//       });
//   }

//   static async checkIsOnline() {
//     return await this.checker(this.testURLs[0]);
//   }
