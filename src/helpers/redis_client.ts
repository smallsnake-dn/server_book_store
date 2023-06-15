import * as redis from "redis";

const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_HOST;

const client = redis.createClient({
    socket: {
        host: HOST,
        port: PORT !== undefined ? Number(PORT) : 6379,
    },
});
client.connect();
client.on("error", (err: Error) => console.log("Redis Client Error", err));
client.on("error", (err: Error) => {});
client.on("connect", (err: Error) => console.log("Connect Redis server"));
// client.ping((err, pong) => console.log(pong));
client.on("close", (err: Error) => {
    console.log("disconnect to server");
});

process.on("SIGINT", () => {
    client.quit();
});

export = client;
