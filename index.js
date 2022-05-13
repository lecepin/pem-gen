const pem = require("pem");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const os = require("os");

if (os.platform() == "win32") {
  process.env.OPENSSL_CONF = path.join(__dirname, "./openssl/openssl.cnf");
  pem.config({
    pathOpenSSL: path.join(__dirname, "./openssl/openssl.exe"),
  });
}

pem.createCertificate(
  {
    days: 365 * 1000,
    selfSigned: true,
    commonName: "lecepin-" + new Date().toISOString().slice(0, 10),
  },
  (err, keys) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(keys);

    mkdirp.sync(path.join(__dirname, "./keys"));
    fs.writeFileSync(
      path.join(__dirname, "./keys/private.pem"),
      keys.serviceKey
    );
    fs.writeFileSync(
      path.join(__dirname, "./keys/private.key"),
      keys.serviceKey
    );
    fs.writeFileSync(
      path.join(__dirname, "./keys/public.pem"),
      keys.certificate
    );
    fs.writeFileSync(
      path.join(__dirname, "./keys/public.crt"),
      keys.certificate
    );
  }
);
