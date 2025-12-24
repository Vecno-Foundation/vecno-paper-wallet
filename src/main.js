import QRCode from 'qrcode';
import init, { Mnemonic, XPrv } from './wasm/vecno.js';

async function run() {
  await init();

  function deriveWallet(mnemonic) {
    const xprv = new XPrv(mnemonic.toSeed());

    const accountRoot = xprv
      .deriveChild(44, true)
      .deriveChild(111111, true)
      .deriveChild(0, true);

    const receiveXPub = accountRoot.toXPub().deriveChild(0, false);
    const changeXPub = accountRoot.toXPub().deriveChild(1, false);

    const receive = receiveXPub
      .deriveChild(0, false)
      .toPublicKey()
      .toAddress("mainnet")
      .toString();

    const change = changeXPub
      .deriveChild(0, false)
      .toPublicKey()
      .toAddress("mainnet")
      .toString();

    return { mnemonic: mnemonic.phrase, receive, change };
  }

  const generateBtn = document.getElementById('generate');
  const initialHeader = document.getElementById('initial-header');
  const output = document.getElementById('output');

  generateBtn.addEventListener('click', () => {
    const mnemonic = Mnemonic.random();
    const wallet = deriveWallet(mnemonic);
    const words = wallet.mnemonic.split(' ');

    initialHeader.style.display = 'none';

    output.innerHTML = `
      <h2>Vecno Paper Wallet</h2>

      <div class="section">
        <h3>Recovery Seed Phrase (24 words)</h3>
        <p style="text-align:center; color:#64748b; margin-bottom:12px; font-size:0.85rem;">
          Write these down in order • Never store digitally • Keep safe and private
        </p>
        <div class="mnemonic-grid">
          ${words.map((word, i) => `
            <div class="mnemonic-word">
              <span class="number">${i + 1}.</span>
              <span class="word">${word}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <h3>Deposit Addresses</h3>
        <div class="address-section">
          <div class="address-box">
            <h4>Primary Receive Address</h4>
            <pre>${wallet.receive}</pre>
            <div class="qr-container" id="receive-qr"></div>
          </div>
          <div class="address-box">
            <h4>Change Address</h4>
            <pre>${wallet.change}</pre>
            <div class="qr-container" id="change-qr"></div>
          </div>
        </div>
      </div>
    `;

    // Generate QR codes
    const receiveContainer = document.getElementById('receive-qr');
    const changeContainer = document.getElementById('change-qr');

    const receiveCanvas = document.createElement('canvas');
    const changeCanvas = document.createElement('canvas');

    receiveContainer.appendChild(receiveCanvas);
    changeContainer.appendChild(changeCanvas);

    QRCode.toCanvas(receiveCanvas, wallet.receive, { width: 160, errorCorrectionLevel: 'H' });
    QRCode.toCanvas(changeCanvas, wallet.change, { width: 160, errorCorrectionLevel: 'H' });

    // Show the wallet card
    output.classList.add('active');
  });
}

run().catch(err => {
  console.error('Init failed:', err);
  alert('Failed to load wallet generator. Check console.');
});