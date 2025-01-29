const qrcode = require('qrcode-terminal');

// Incolla la stringa del QR code qui sotto
const qrString = "2@SggTmXEZSpZuhTPzcjflQN91eFiX+F2QO7FFpZJzwiXN5UovzFtGXrY5t5h01cLWceu7XWieiC8F/kRrLXUIBDGFJ0W8CzFmnds=,Q1VzEUMfT18TqZhNODg";
qrcode.generate(qrString, { small: true });
