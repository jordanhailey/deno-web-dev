import { serve } from "../deps.js";

const PORT = 8080;
const server = serve({port:PORT});
console.log(`Server running at port ${PORT}`);
for await (const req of server) {
    req.respond({body: "post-it api\n", status: 200})
}