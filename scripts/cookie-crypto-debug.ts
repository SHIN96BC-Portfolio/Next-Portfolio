import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { aesDecrypt, aesEncrypt, fromBase64Url, toBase64Url } from '@core/crypto';

type Mode = 'encrypt' | 'decrypt';

function printUsage() {
  console.info(`Usage:
  pnpm crypto:debug
  pnpm crypto:debug encrypt <key> <value>
  pnpm crypto:debug decrypt <key> <value>

Examples:
  pnpm crypto:debug encrypt "Wg/zxSgAjnrrzQNACEVYTLsL0YJDIOInxWodm5z0OhI=" dark
  pnpm crypto:debug decrypt "Wg/zxSgAjnrrzQNACEVYTLsL0YJDIOInxWodm5z0OhI=" "GyGJo5+//D5xSz0eOaM5Hnr9v46o1hXXKFgXDqsPC1s="
`);
}

function encryptValue(key: string, value: string): string {
  const encrypted = aesEncrypt(value, key, {
    keyEncoding: 'utf8',
    output: 'base64',
  });

  return toBase64Url(encrypted);
}

function decryptValue(key: string, value: string): string {
  const candidates = [value, fromBase64Url(value), value.replace(/ /g, '+')];

  for (const candidate of candidates) {
    try {
      const decrypted = aesDecrypt(candidate, key, {
        keyEncoding: 'utf8',
        input: 'base64',
      });

      if (decrypted) return decrypted;
    } catch {
      // try next candidate
    }
  }

  throw new Error('decrypt failed');
}

function run(mode: Mode, key: string, value: string) {
  if (!key) throw new Error('key is required');
  if (!value) throw new Error('value is required');

  const result = mode === 'encrypt' ? encryptValue(key, value) : decryptValue(key, value);
  console.info(result);
}

async function promptMode(): Promise<Mode> {
  const rl = readline.createInterface({ input, output });

  try {
    while (true) {
      const answer = (await rl.question('mode (encrypt/decrypt): ')).trim().toLowerCase();

      if (answer === 'encrypt' || answer === 'decrypt') {
        return answer;
      }

      console.info('encrypt 또는 decrypt 를 입력하세요.');
    }
  } finally {
    rl.close();
  }
}

async function promptInput(label: string): Promise<string> {
  const rl = readline.createInterface({ input, output });

  try {
    return (await rl.question(`${label}: `)).trim();
  } finally {
    rl.close();
  }
}

async function runInteractive() {
  const mode = await promptMode();
  const key = await promptInput('key');
  const value = await promptInput('value');

  console.info('');
  run(mode, key, value);
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2).filter((arg) => arg !== '--');

  if (args.length === 0) {
    return null;
  }

  if (args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }

  const mode = args[0] as Mode;
  if (mode !== 'encrypt' && mode !== 'decrypt') {
    throw new Error('mode must be encrypt or decrypt');
  }

  const key = args[1] ?? '';
  const value = args[2] ?? '';

  return { mode, key, value };
}

async function main() {
  const parsed = parseArgs(process.argv);

  if (!parsed) {
    await runInteractive();
    return;
  }

  run(parsed.mode, parsed.key, parsed.value);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
