# tako-session-tokens

Just a session token middleware for Tako.  Works great with
`tako-cookies`.

## Usage

```javascript
// various tako stuff...

var SessionToken = require("tako-session-tokens")
app.middle(new SessionToken("my-happy-app"))

// later...
app.route("/foo", function (req, res) {
  console.log(req.session) // some random string.

  // the idea is that then that random string will
  // be a key in some sort of persistent session
  // store such as redis, or something.
})
```

