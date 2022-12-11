const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "553628230582-mukotk904of6bmchr5t987sob419a5b8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "9019670d05ee2376132e";
GITHUB_CLIENT_SECRET = "e19ac377402d9ad07a4a57184e63f7d08cd3a582";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});