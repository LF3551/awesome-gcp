// Requests the submitted link and prints one JSON line: {"url","status","finalUrl","error"}.
const url = process.argv[2];
const result = { url, status: 0, finalUrl: '', error: '' };
try {
  const res = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(20_000),
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 awesome-gcp-link-check',
      Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
    },
  });
  result.status = res.status;
  result.finalUrl = res.url;
  await res.body?.cancel();
} catch (e) {
  result.error = e.name === 'TimeoutError' ? 'timeout' : String(e.cause?.code || e.message);
}
console.log(JSON.stringify(result));
