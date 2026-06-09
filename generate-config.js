import fs from "fs";
import path from "path";

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  return content.split(/\r?\n/).reduce((env, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return env;
    const [key, ...rest] = trimmed.split("=");
    env[key.trim()] = rest.join("=").trim();
    return env;
  }, {});
}

const cwd = process.cwd();
const env = {
  ...process.env,
  ...parseEnv(path.join(cwd, ".env")),
  ...parseEnv(path.join(cwd, ".env.local")),
};

const required = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_DATABASE_URL",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
];

const missing = required.filter((key) => !env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const config = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_DATABASE_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

const file = `const firebaseConfig = ${JSON.stringify(config, null, 2)};

export default firebaseConfig;
`;

fs.writeFileSync(path.join(cwd, "firebase-config.js"), file, "utf8");
console.log("Generated firebase-config.js from env vars.");
