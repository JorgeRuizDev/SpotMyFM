function isConditionalCheck(err: unknown): boolean {
  const e = err as any;

  if (e.code) {
    const code: string = e.code;
    return code.includes("ConditionalCheckFailedException");
  }
  return false;
}

export { isConditionalCheck };
