export default function mergeClassNames(...args: Array<string | undefined | null | false>) {
  return args.filter(Boolean).join(' ');
}
