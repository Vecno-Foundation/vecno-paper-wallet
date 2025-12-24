# Vecno Paper Wallet Generator

A secure, fully client-side paper wallet generator for Vecno (Mainnet).

Generates a wallet entirely in your browser using WebAssembly — **nothing leaves your device**.

## Features

- 100% offline generation (no network requests)
- 24-word BIP-39 mnemonic seed phrase
- Primary Receive Address + Change Address
- High-quality QR codes (scannable even when printed)
- Modern dark UI with subtle futuristic background
- Fully responsive (desktop to mobile)
- Addresses wrap cleanly on small screens
- Seed phrase numbers are non-selectable (prevents copy-paste errors)
- Minimal final view — perfect for direct printing

## Usage

Simply open `index.html` in any modern browser.

1. Click **"Generate New Wallet"**
2. Carefully write down the 24-word seed phrase
3. Use the displayed addresses/QR codes to receive funds
4. Print the page (Ctrl+P / Cmd+P) for a physical backup

**Security Warning**:  
Never share your seed phrase. Anyone with access to it controls your funds permanently.

## Local Development

```bash
npm run dev
