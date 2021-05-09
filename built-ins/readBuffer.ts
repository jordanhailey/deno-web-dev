import start from './writeBuffer.ts';

const buffer = new Deno.Buffer();
start (buffer);
processLogs();
async function processLogs() {
    const destination = new Uint8Array(100);
    const readBytes = await buffer.read(destination);
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    if (readBytes) {
        const read = decoder.decode(destination);
        await Deno.stdout.write(encoder.encode(`${read}\n`));
    }
    setTimeout(processLogs, 1000);
}