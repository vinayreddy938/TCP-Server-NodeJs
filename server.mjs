import net from "net";

const server = net.createServer((socket)=>{
    console.log("Client connected");
    console.log(socket);
});
server.listen(4000, "0.0.0.0",()=>{  
    console.log("Server listening on port 4000");
 });
 /* it by default listen on ipv6 for all network interfaces, if you want to listen on ipv4 only, you can specify the host as 0.0.0.0, like this: server.listen(8080, "0.0.0.0", ()=>{  
    console.log("Server listening on port 8080");
 });*/  
