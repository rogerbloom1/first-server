const http = require("http");

const html = `<main style="background-color: burlywood; height: 100vh; margin: 0; padding:0;">
    <h1>Raise the Anthem, Burlywood</h1>
</main>`

http
.createServer((request, response) => {
    const errorMsg = { 
        error: "You made a bad request", 
        code: 400, 
    };
    const { url } = request;
   
    request.on("error", (error) => {
        response.statusCode = 400;
        response.statusMessage = "Bad Request";
        response.setHeader("Content-Type", "application/json");
        
        response.write(JSON.stringify(errorMsg));
        return response.end();
    });

    request.emit("error");

    response.on("error", (error) => {
        errorMsg.error = "An error occurred on the server.";
        errorMsg.code = 500;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(errorMsg));
        return response.end();
    });

    

    response.setHeader("Content-Type", "text/html");
    if (url === "/") {
        response.write("<h1>Home</h1>");
    } else if (url === "/about") {
        response.write("<h1>About</h1>");
    } else {
        response.statusCode = 404;
        response.write("<h1>404 - Page Not Found</h1>")
    }
    return response.end();
})
.listen(3000, () => console.log("Server listening ..."));

/* http.createServer((request, response) => {
    const { method, url } = request;

    const chunks = [];

    request
    .on("data", (chunk) => {
        chunks.push(chunk);
    })
    .on("end", () => {
        const body = Buffer.concat(chunks).toString();
        response.writeHead(200, { "Content-Type": "application/json"});
        const responseBody = {method, url, body};

        response.write(JSON.stringify(responseBody));
        response.end();
    });
})
.listen(3000, () => consold.log("Server listening to port 3000 ..."));
 */
