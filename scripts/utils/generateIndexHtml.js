export default function ({ head = '', body = '', production }) {
  const html =
`<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  ${typeof head === 'function' ? head(production) : head }
</head>

<body>
  <div id='app'></div>
  <script src="app.js"></script>
  ${typeof body === 'function' ? body(production) : body }
</body>

</html>`
  return html
}
