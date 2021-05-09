import { serve } from "../deps.js";

interface PostIt {
    title: string,
    id: string,
    body: string,
    createdAt: Date
}

let postIts: Record<PostIt["id"], PostIt> = {
    "321d4asd-b3432-412323":{
        title: "Read more stuff",
        body:"foobar baz",
        id: "321d4asd-b3432-412323",
        createdAt: new Date()
    },
    "121238hs-as30k-s81891":{
        title: "Break stuff",
        body:"abds ia oajfr u",
        id: "121238hs-as30k-s81891",
        createdAt: new Date()
    }
};

const PORT = 8080;
const HOST = "localhost";
const PROTOCOL = "http";
const server = serve({port:PORT, hostname: HOST});
console.log(`Server running at port ${HOST}:${PORT}`);
for await (const req of server) {
    const headers = new Headers ();
    headers.set("content-type","application/json");
    const url = new URL(`${PROTOCOL}://${HOST}${req.url}`);
    const pathWithMethod = `${req.method} ${url.pathname}`;
    let status = 200;
    switch (pathWithMethod) {
        case "POST /api/post-its":
            const body = await Deno.readAll(req.body);
            const decoder = new TextDecoder();
            console.log(decoder.decode(body));
            req.respond({status:201});
            continue;
        case "GET /api/post-its":
            const allPostIts = Object.keys(postIts).reduce((allPostIts: PostIt[], postItId)=>{
                return allPostIts.concat(postIts[postItId]);
            }, []);
            req.respond({headers, body: JSON.stringify({postIts: allPostIts},null,2)+"\n", status})
            continue;
        default:
            req.respond({body: `Uh oh, ${url} doesn't seem to exist!\n`, status: 404})
            break;
    }
    
}