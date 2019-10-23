export function urlRewrite(url, baseUrl, proxyUrl, replaceQuestionMark) {
  if (replaceQuestionMark) {
    url = url.replace('?', '&');
  }
  url = url.replace("'", '%22');

  // replace 'NULL' becaues the environment files can't have nothing and only strings
  // as values
  proxyUrl = proxyUrl.replace('NULL', '');

  url = `${proxyUrl}${baseUrl}${url}`;

  return url;
}
