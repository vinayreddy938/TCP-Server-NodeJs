import net from "net";

const socket= net.createConnection({port:4000, host:"localhost"}, ()=>{
    console.log("Connected to server");
});
socket.on("data", (data)=>{
    console.log("Received data from server:", data.toString());
});
socket.on("end", ()=>{
    console.log("Disconnected from server");
});