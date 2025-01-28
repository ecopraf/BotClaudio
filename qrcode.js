const qrcode = require('qrcode-terminal');

// Incolla la stringa del QR code qui sotto
const qrString = "2@B7LCyupTx7hPzy6od/ybN5q5/DzIYsYzYE0uLL0XM7QV4o6joasqy225AQJJsScCL5zrb9CnJsZ7GxHkThzVCbDC+QFCdR7BiOk=,hjyuLS47RfO5bvvPS4wUDjfrGybM0IRKhCjFvE9HHlU=,1+GEqMF2t3JY0N2v8jaPXw+VtmAtfGLIeb+ST2ujAxI=,017rNMEsgm5rIpWBD99UoH6944SEXjIw3uAW1FW..."; // Sostituisci con la stringa alfanumerica copiata dai log di Railway

qrcode.generate(qrString, { small: true });
